(function(){
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = v => String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const fmtDate = v => { if(!v) return ''; const d = v.toDate ? v.toDate() : new Date(v.seconds ? v.seconds*1000 : v); return d.toLocaleString(); };
  const db = () => firebase.firestore();
  const currentUser = () => firebase.auth().currentUser;

  let testsData = [], attemptsData = [], questionsData = [];
  let currentSubject = '';
  let currentPage = 1;
  const PAGE_SIZE = 20;

  function slugify(t){ return String(t||'').toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''); }
  function normId(v){ return String(v??'').trim(); }
  function getTestId(q){ return normId(q?.testId ?? q?.testID ?? q?.test_id ?? q?.testid ?? ''); }

  /* ================================================================
     PUBLIC API — called by index.html when student opens Mocks
     ================================================================ */
  window.__loadMocksForCourse = async function(subject, page = 1) {
    currentSubject = subject;
    currentPage = page;

    const container = $('mockListX');
    const empty     = $('mockEmptyX');
    const pag       = $('mockPaginationX');
    if(!container) return;

    container.innerHTML = '<div class="skeleton" style="height:80px;margin-bottom:8px;"></div><div class="skeleton" style="height:80px;margin-bottom:8px;"></div>';
    if(empty) empty.classList.add('hidden');
    if(pag)   pag.style.display = 'none';

    const user = currentUser();
    if(!user){ container.innerHTML='<div class="empty-box">Please log in to view tests.</div>'; return; }

    try {
      // 1) Tests scoped to subject
      let tSnap;
      try {
        tSnap = await db().collection('tests')
          .where('subject','==',subject)
          .orderBy('createdAt','desc')
          .limit(PAGE_SIZE)
          .get();
      } catch(e) {
        tSnap = await db().collection('tests')
          .where('subject','==',subject)
          .limit(PAGE_SIZE)
          .get();
      }
      testsData = tSnap.docs.map(d => ({id: d.id, ...d.data()}));

      // 2) Attempts scoped to user + subject
      const aSnap = await db().collection('attempts')
        .where('userId','==',user.uid)
        .where('subject','==',subject)
        .orderBy('createdAt','desc')
        .limit(200)
        .get();
      attemptsData = aSnap.docs.map(d => ({id: d.id, ...d.data()}));

      // 3) Questions scoped to subject
      const qSnap = await db().collection('questions')
        .where('subject','==',subject)
        .limit(500)
        .get();
      questionsData = qSnap.docs.map(d => ({id: d.id, ...d.data()}));

      renderMocksList();
      bindMockFilters();

      if(pag && testsData.length){
        pag.style.display = 'flex';
        pag.innerHTML = `
          <button ${currentPage<=1?'disabled':''} onclick="window.__changeMockPage(-1)">← Prev</button>
          <button class="active">Page ${currentPage}</button>
          <button onclick="window.__changeMockPage(1)">Next →</button>
        `;
      }
    } catch(err) {
      console.error('loadMocksForCourse error:', err);
      container.innerHTML = '<div class="empty-box">Unable to load tests. If this persists, ask admin to check Firestore indexes.</div>';
      if(pag) pag.style.display = 'none';
    }
  };

  window.__changeMockPage = function(dir){
    window.__loadMocksForCourse(currentSubject, Math.max(1, currentPage + dir));
  };

  // Hook so test-engine.js can refresh after finishing a test
  window.__loadStudentTests = function(){
    if(currentSubject) window.__loadMocksForCourse(currentSubject, currentPage);
  };

  /* ================================================================
     RENDERING — grouped by Chapter
     ================================================================ */
  function renderMocksList(){
    const container = $('mockListX');
    const empty     = $('mockEmptyX');
    const searchVal = ($('mockSearchX')?.value || '').toLowerCase().trim();
    const chapterFilter = ($('mockFilterX')?.value || '');

    if(!testsData.length){
      if(container) container.innerHTML = '';
      if(empty) empty.classList.remove('hidden');
      return;
    }
    if(empty) empty.classList.add('hidden');

    let visible = testsData;
    if(searchVal) visible = visible.filter(t => [t.title, t.chapter, t.code].filter(Boolean).join(' ').toLowerCase().includes(searchVal));
    if(chapterFilter) visible = visible.filter(t => t.chapter === chapterFilter);

    if(!visible.length){
      if(container) container.innerHTML = '<div class="empty-box">No tests match your search or filter.</div>';
      return;
    }

    // Populate chapter dropdown once
    const sel = $('mockFilterX');
    if(sel && !sel.dataset.populated){
      const chapters = [...new Set(testsData.map(t => t.chapter).filter(Boolean))].sort();
      const savedVal = sel.value;
      sel.innerHTML = '<option value="">All Chapters</option>' +
        chapters.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join('');
      sel.value = savedVal;
      sel.dataset.populated = '1';
    }

    // Group by chapter
    const grouped = {};
    visible.forEach(t => {
      const chap = t.chapter || 'General';
      if(!grouped[chap]) grouped[chap] = [];
      grouped[chap].push(t);
    });

    const chapters = Object.keys(grouped).sort((a,b) => a.localeCompare(b));
    if(container){
      container.innerHTML = chapters.map((chapter, cIdx) => {
        const chapId = 'mock-chap-' + slugify(currentSubject) + '-' + slugify(chapter);
        const isOpen = cIdx === 0;
        return `
          <div style="margin-bottom:12px;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
            <div class="chapter-head" style="padding:14px 16px;background:#f8fafc;cursor:pointer;font-weight:700;color:#0D1B40;display:flex;justify-content:space-between;align-items:center;" onclick="window.__toggleMockChapter('${chapId}')">
              <span id="arrow-${chapId}">${isOpen?'▼':'▶'} ${esc(chapter)}</span>
              <span style="font-size:.8rem;color:#6b7280;">${grouped[chapter].length} test(s)</span>
            </div>
            <div id="${chapId}" style="display:${isOpen?'block':'none'};padding:12px;background:#fff;">
              ${grouped[chapter].map(test => renderTestCard(test)).join('')}
            </div>
          </div>`;
      }).join('');
    }
  }

  function renderTestCard(test){
    const qCount = questionsData.filter(q => String(getTestId(q)).trim() === String(test.id).trim()).length;
    const displayCode = test.code || `${String(test.subject||'TEST').replace(/[^A-Za-z0-9]/g,'').slice(0,5).toUpperCase()}-${String(test.id).slice(0,6).toUpperCase()}`;
    const user = currentUser();
    const attempts = user ? attemptsData.filter(a => String(a.testId||'') === String(test.id) && String(a.userId||'') === String(user.uid)) : [];
    const best = attempts.length ? Math.max(...attempts.map(a => Number(a.percentage||0))) : 0;

    const bestColor = best >= 70 ? '#1f9d55' : best >= 40 ? '#C9922A' : '#c54b4b';
    const attemptHtml = attempts.length
      ? `<div style="margin-top:10px;font-size:.85rem;color:#6b7280;">
          <strong>Attempts:</strong> ${attempts.length} • <strong>Best:</strong> <span style="color:${bestColor};font-weight:700;">${best}%</span>
          <div style="margin-top:6px;display:flex;flex-wrap:wrap;gap:6px;">
            ${attempts.slice(0,2).map(a => `
              <span style="display:inline-block;background:#f1f5f9;padding:4px 10px;border-radius:8px;font-size:.78rem;">
                ${a.score}/${a.total} · ${fmtDate(a.createdAt)}
              </span>`).join('')}
          </div>
         </div>`
      : `<div style="margin-top:10px;font-size:.85rem;color:#9ca3af;">No attempts yet. Unlimited retakes enabled.</div>`;

    return `
      <div style="padding:16px;border:1.5px solid #e5e7eb;border-radius:12px;margin-bottom:10px;background:#fff;transition:border-color .2s;" onmouseenter="this.style.borderColor='rgba(201,146,42,.35)'" onmouseleave="this.style.borderColor='#e5e7eb'">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;">
          <div style="flex:1;min-width:200px;">
            <strong style="font-size:1.05rem;color:#0D1B40;">${esc(test.title||'Test')}</strong><br>
            <span class="mock-tag" style="margin-top:6px;display:inline-block;">${esc(displayCode)}</span>
            <span style="font-size:.85rem;color:#6b7280;margin-left:8px;">${qCount} questions · ${test.marks||1} mark${(test.marks||1)>1?'s':''}</span>
          </div>
          <button class="primary-btn" type="button" onclick="window.__startTest('${test.id}')" style="white-space:nowrap;">Start Test</button>
        </div>
        ${attemptHtml}
      </div>`;
  }

  window.__toggleMockChapter = function(id){
    const body = document.getElementById(id);
    if(!body) return;
    const isOpen = body.style.display !== 'none' && body.style.display !== '';
    body.style.display = isOpen ? 'none' : 'block';
    const arrow = document.getElementById('arrow-'+id);
    if(arrow){
      const text = arrow.textContent.slice(2);
      arrow.textContent = (isOpen ? '▶ ' : '▼ ') + text;
    }
  };

  /* ================================================================
     SEARCH & FILTER BINDING
     ================================================================ */
  function bindMockFilters(){
    const input = $('mockSearchX');
    const sel   = $('mockFilterX');
    if(input && !input.dataset.bound){
      input.addEventListener('input', () => renderMocksList());
      input.dataset.bound = '1';
    }
    if(sel && !sel.dataset.bound){
      sel.addEventListener('change', () => renderMocksList());
      sel.dataset.bound = '1';
    }
  }
})();
