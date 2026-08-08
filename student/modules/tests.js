/* ============================================================
   Phase 3A — Student Practice Tests (Test List + Attempt History)
   ============================================================ */
(function(){
  'use strict';

  const $ = id => document.getElementById(id);
  const esc = v => String(v ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const fmtDate = v => {
    if(!v) return '';
    const d = v.toDate ? v.toDate() : new Date(v.seconds ? v.seconds*1000 : v);
    return d.toLocaleString();
  };

  const db = () => firebase.firestore();
  const currentUser = () => firebase.auth().currentUser;

  // ── state ──
  let testsData = [];
  let attemptsData = [];
  let questionsData = [];

  function slugify(text){
    return String(text||'').toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
  }

  function normalizeTestId(v){
    return String(v??'').trim();
  }

  function getTestIdValue(q){
    return normalizeTestId(q?.testId ?? q?.testID ?? q?.test_id ?? q?.testid ?? '');
  }

  // ── Public API ──
  window.__loadStudentTests = async function(){
    const container = $('testsContainer');
    const status = $('testsStatus');
    if(!container) return;
    container.innerHTML = '<div class="empty-box">Loading tests…</div>';
    if(status) status.textContent = '';

    const user = currentUser();
    if(!user){ if(status) status.textContent='Please log in first.'; return; }

    try{
      // Fetch user doc for batch filter
      const userSnap = await db().collection('users').doc(user.uid).get();
      const userData = userSnap.exists ? userSnap.data() : {};
      const myBatch = userData.batchCode || '';

      // Fetch tests + questions in parallel
      const [tSnap, qSnap, aSnap] = await Promise.all([
        db().collection('tests').limit(200).get(),
        db().collection('questions').limit(500).get(),
        db().collection('attempts').where('userId','==',user.uid).orderBy('createdAt','desc').limit(200).get()
      ]);

      testsData = tSnap.docs.map(d => ({id:d.id, ...d.data()}));
      questionsData = qSnap.docs.map(d => ({id:d.id, ...d.data()}));
      attemptsData = aSnap.docs.map(d => ({id:d.id, ...d.data()}));

      // Filter by batch if student has one
      if(myBatch){
        testsData = testsData.filter(t => {
          const b = t.batchCodes || [];
          return b.length === 0 || b.includes(myBatch);
        });
      }

      renderTestsList();
      setupSearch();

    }catch(err){
      console.error('loadStudentTests error', err);
      if(status) status.textContent = 'Failed to load tests. ' + err.message;
      container.innerHTML = '<div class="empty-box">Unable to load tests.</div>';
    }
  };

  function renderTestsList(){
    const container = $('testsContainer');
    const status = $('testsStatus');
    const searchVal = ($('practiceSearch')?.value || '').toLowerCase().trim();

    if(!testsData.length){
      container.innerHTML = '<div class="empty-box">No tests available yet.</div>';
      if(status) status.textContent = '';
      return;
    }

    // Filter by search
    let visible = testsData;
    if(searchVal){
      visible = testsData.filter(t => {
        const hay = [t.id, t.title, t.subject, t.chapter, t.code].filter(Boolean).join(' ').toLowerCase();
        return hay.includes(searchVal);
      });
    }

    if(!visible.length){
      container.innerHTML = '<div class="empty-box">No tests match your search.</div>';
      return;
    }

    // Group by subject → chapter
    const grouped = {};
    visible.forEach(t => {
      const sub = t.subject || 'Other';
      const chap = t.chapter || 'General';
      if(!grouped[sub]) grouped[sub] = {};
      if(!grouped[sub][chap]) grouped[sub][chap] = [];
      grouped[sub][chap].push(t);
    });

    const subjects = Object.keys(grouped).sort((a,b) => a.localeCompare(b));
    container.innerHTML = '';

    subjects.forEach((subject, sIdx) => {
      const subjectId = 'sub-' + slugify(subject);
      const subCard = document.createElement('div');
      subCard.className = 'subject-group';
      subCard.innerHTML = `
        <button class="subject-group-head" type="button" onclick="window.__toggleSubjectGroup('${subjectId}', this)">
          <span>${esc(subject)}</span>
          <span>${Object.values(grouped[subject]).flat().length} test(s)</span>
        </button>
        <div class="subject-group-body" id="${subjectId}"></div>
      `;
      const subBody = subCard.querySelector('#' + subjectId);

      Object.keys(grouped[subject]).sort((a,b) => a.localeCompare(b)).forEach((chapter, cIdx) => {
        const chapId = 'chap-' + slugify(subject) + '-' + slugify(chapter);
        const openDefault = sIdx === 0 && cIdx === 0;
        const chapWrap = document.createElement('div');
        chapWrap.innerHTML = `
          <div class="chapter-head" onclick="window.__toggleChapter('${chapId}')">
            <span>${openDefault ? '▼' : '▶'} ${esc(chapter)}</span>
            <span class="small" style="color:#dbe8ff;">${grouped[subject][chapter].length} test(s)</span>
          </div>
          <div id="${chapId}" class="chapter-body" style="display:${openDefault ? 'block' : 'none'}"></div>
        `;
        const body = chapWrap.querySelector('#' + chapId);

        grouped[subject][chapter].forEach(test => {
          const qCount = questionsData.filter(q => String(getTestIdValue(q)).trim() === String(test.id).trim()).length;
          const displayCode = test.code || `${String(test.subject || 'TEST').replace(/[^A-Za-z0-9]/g,'').slice(0,5).toUpperCase()}-${String(test.id).slice(0,6).toUpperCase()}`;

          const card = document.createElement('div');
          card.className = 'test-card';
          card.innerHTML = `
            <strong>${esc(test.title || 'Test')}</strong><br>
            <span class="test-code">${esc(displayCode)}</span><br>
            <span class="small" style="color:#6b7280;">${esc(test.subject || '')}${test.chapter ? ' · ' + esc(test.chapter) : ''}</span><br>
            <span class="small" style="color:#6b7280;">${qCount} questions</span><br>
            <span class="small" style="color:#9ca3af;">Unlimited retakes enabled</span>
            <div class="btn-row">
              <button class="primary-btn" type="button" onclick="window.__startTest('${test.id}')">Start Test</button>
            </div>
            <div id="attemptBox-${test.id}" class="attempts-box"></div>
          `;
          body.appendChild(card);
        });

        subBody.appendChild(chapWrap);
      });

      container.appendChild(subCard);
    });

    // Populate attempt boxes for visible chapters
    refreshAttemptBoxes();
  }

  // ── Toggle helpers ──
  window.__toggleSubjectGroup = function(id, btn){
    const body = document.getElementById(id);
    const group = body?.closest('.subject-group');
    if(!group) return;
    group.classList.toggle('collapsed');
    const count = group.querySelectorAll('.test-card').length;
    const label = group.classList.contains('collapsed') ? 'expand' : 'collapse';
    btn.querySelector('span:last-child').textContent = `${count} test(s) · tap to ${label}`;
  };

  window.__toggleChapter = function(id){
    const body = document.getElementById(id);
    if(!body) return;
    const isOpen = body.style.display !== 'none' && body.style.display !== '';
    body.style.display = isOpen ? 'none' : 'block';
    const head = body.previousElementSibling;
    if(head){
      const arrow = isOpen ? '▶' : '▼';
      head.querySelector('span:first-child').textContent = `${arrow} ${head.querySelector('span:first-child').textContent.slice(2)}`;
    }
    if(!isOpen) populateAttemptBox(id);
  };

  // ── Attempt History ──
  function refreshAttemptBoxes(){
    document.querySelectorAll('.chapter-body').forEach(el => {
      if(el.style.display !== 'none') populateAttemptBox(el.id);
    });
  }

  function populateAttemptBox(chapterId){
    const body = document.getElementById(chapterId);
    if(!body) return;
    const testCards = body.querySelectorAll('.test-card');
    testCards.forEach(card => {
      const box = card.querySelector('.attempts-box');
      if(!box) return;
      const testId = box.id.replace('attemptBox-','');
      renderAttemptsForTest(testId, box);
    });
  }

  function renderAttemptsForTest(testId, box){
    const user = currentUser();
    if(!user) return;
    const attempts = attemptsData.filter(a =>
      String(a.testId || '') === String(testId) &&
      String(a.userId || '') === String(user.uid)
    );

    if(!attempts.length){
      box.innerHTML = '<div class="small" style="color:#9ca3af;">No attempts yet. You can retry anytime.</div>';
      return;
    }

    const best = attempts.reduce((m,a) => Math.max(m, Number(a.percentage || 0)), 0);
    box.innerHTML = `
      <div class="small" style="margin-bottom:6px;"><strong>Attempts:</strong> ${attempts.length} • <strong>Best:</strong> ${best}%</div>
      ${attempts.slice(0,3).map(a => `
        <div class="attempt-item">
          <strong style="color:${(a.percentage||0) >= 70 ? '#1f9d55' : (a.percentage||0) >= 40 ? '#C9922A' : '#c54b4b'};">${Number(a.percentage || 0)}%</strong>
          <span style="color:#6b7280;font-size:.85rem;"> — ${a.score}/${a.total}</span><br>
          <span style="color:#9ca3af;font-size:.78rem;">${fmtDate(a.createdAt)}</span>
        </div>
      `).join('')}
    `;
  }

  // ── Search ──
  function setupSearch(){
    const input = $('practiceSearch');
    const clearBtn = $('clearSearchBtn');
    if(!input) return;

    let timer;
    input.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(renderTestsList, 200);
    });

    if(clearBtn){
      clearBtn.addEventListener('click', () => {
        input.value = '';
        renderTestsList();
      });
    }
  }

  // ── Placeholder for Phase 3B ──
  window.__startTest = function(testId){
    alert('Test engine coming in Phase 3B!\nTest ID: ' + testId);
  };

})();
