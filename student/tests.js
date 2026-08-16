<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Vinayak ProEdu | Student Mock Exams</title>
<link rel="icon" type="image/png" href="https://pasteimg.com/images/2026/03/31/WhatsApp-Image-2026-03-19-at-6.49.19-PM.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<script src="https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.5/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore-compat.js"></script>

<style>
:root{
  --navy:#0D1B40; --navy-mid:#1a2e5e; --blue:#1e3c72; --gold:#C9922A; --gold-lt:#E8AA48;
  --amber:#F5C04A; --ink:#1A1A2E; --muted:#6B7280; --smoke:#EFF1F6; --white:#FFFFFF;
  --shadow-sm:0 4px 20px rgba(13,27,64,0.08); --shadow-md:0 12px 45px rgba(13,27,64,0.14);
  --r-sm:10px; --r-md:16px; --r-lg:24px;
  --card:#ffffff; --border:#e5e7eb; --text:#15223b;
}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;font-size:16px;}
body{font-family:'DM Sans',sans-serif;color:var(--ink);background:#f5f7fb;line-height:1.65;overflow-x:hidden;}
img{max-width:100%;display:block;}
a{text-decoration:none;color:inherit;}
h1,h2,h3{font-family:'Playfair Display',serif;line-height:1.2;}

/* Login */
.login-wrap{position:fixed;inset:0;z-index:9999;background:linear-gradient(135deg,var(--navy) 0%,var(--blue) 100%);display:flex;align-items:center;justify-content:center;padding:20px;}
.login-box{width:min(420px,92vw);background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:var(--r-lg);padding:clamp(32px,6vw,48px);backdrop-filter:blur(20px);box-shadow:0 40px 100px rgba(0,0,0,0.4);}
.login-box h2{font-family:'Playfair Display',serif;color:#fff;font-size:1.6rem;margin-bottom:6px;text-align:center;}
.login-box p{color:rgba(255,255,255,0.55);font-size:0.9rem;text-align:center;margin-bottom:28px;}
.login-field{display:flex;flex-direction:column;gap:6px;margin-bottom:16px;}
.login-field label{font-size:0.74rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,0.65);}
.login-field input{width:100%;padding:13px 16px;background:rgba(255,255,255,0.09);border:1px solid rgba(255,255,255,0.14);border-radius:var(--r-sm);color:#fff;font-size:0.95em;font-family:'DM Sans',sans-serif;transition:all 0.25s;}
.login-field input::placeholder{color:rgba(255,255,255,0.32);}
.login-field input:focus{outline:none;border-color:rgba(201,146,42,0.6);background:rgba(255,255,255,0.13);box-shadow:0 0 0 3px rgba(201,146,42,0.15);}
.login-btn{width:100%;padding:15px;border-radius:50px;border:none;cursor:pointer;background:linear-gradient(135deg,var(--gold),var(--gold-lt));color:var(--navy);font-size:1em;font-weight:700;font-family:'DM Sans',sans-serif;box-shadow:0 8px 28px rgba(201,146,42,0.35);transition:all 0.3s;}
.login-btn:hover{transform:translateY(-2px);box-shadow:0 16px 40px rgba(201,146,42,0.5);}
.login-status{margin-top:12px;font-size:0.9rem;font-weight:700;text-align:center;min-height:22px;}
.login-status.error{color:#fca5a5;}

/* App */
.app-shell{display:none;width:100%;min-height:100vh;}
.app-shell.active{display:flex;}
.app-sidebar{width:260px;background:var(--navy);color:#fff;padding:18px;overflow:auto;flex-shrink:0;position:fixed;height:100vh;left:0;top:0;z-index:100;}
.app-brand{display:flex;align-items:center;gap:10px;margin-bottom:24px;padding-bottom:18px;border-bottom:1px solid rgba(255,255,255,0.08);}
.app-brand img{width:40px;height:40px;border-radius:50%;border:2px solid var(--gold);object-fit:cover;}
.app-brand h3{font-family:'Playfair Display',serif;font-size:1.05rem;margin:0;color:#fff;}
.app-brand p{font-size:0.72rem;letter-spacing:1.4px;text-transform:uppercase;color:rgba(232,170,72,0.8);margin-top:2px;}
.app-menu{display:grid;gap:6px;}
.app-menu button{width:100%;border:none;background:transparent;color:#fff;padding:11px 14px;border-radius:10px;cursor:pointer;text-align:left;font-weight:600;font-size:0.9rem;font-family:'DM Sans',sans-serif;display:flex;align-items:center;gap:10px;transition:all 0.2s;}
.app-menu button:hover,.app-menu button.active{background:var(--gold);color:var(--navy);}
.app-main{flex:1;margin-left:260px;padding:24px 28px;overflow:auto;min-height:100vh;}

/* Topbar */
.app-topbar{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid #e5e7eb;}
.app-title{font-family:'Playfair Display',serif;color:var(--navy);font-size:1.6rem;margin:0;}
.app-sub{color:var(--muted);font-size:0.9rem;}

/* Content */
.content{display:grid;gap:18px;}
.view{display:none}
.view.active{display:block}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.card,.panel{padding:18px;background:var(--card);border:1px solid var(--border);border-radius:var(--r-md);box-shadow:var(--shadow-sm);}
.title{margin:0 0 14px;font-size:1.2rem;font-family:'Playfair Display',serif;color:var(--navy);}
.sub{margin:0 0 16px;color:var(--muted);font-size:.92rem;line-height:1.6}
input,select,textarea{width:100%;padding:12px 14px;border:1px solid var(--border);border-radius:12px;background:#fff;color:var(--text);margin-bottom:12px;font:inherit;outline:none;}
input:focus,select:focus,textarea:focus{border-color:#b8c7ea;box-shadow:0 0 0 3px rgba(30,60,114,.07)}
.btn{border:none;border-radius:12px;padding:11px 14px;cursor:pointer;font-weight:800;font:inherit;transition:transform .15s ease, box-shadow .15s ease, opacity .15s ease;}
.btn:hover{transform:translateY(-1px)}
.btn-primary{background:linear-gradient(135deg,var(--navy),var(--blue));color:#fff;}
.btn-gold{background:linear-gradient(135deg,var(--gold),var(--gold-lt));color:#111;}
.btn-ghost{background:#eff6ff;color:var(--navy);border:1px solid #dbe4f0}
.btn-row{display:flex;gap:10px;flex-wrap:wrap}
.stat{background:linear-gradient(135deg,var(--navy) 0%, var(--blue) 100%);color:#fff;border-radius:16px;padding:16px;min-height:92px;}
.stat .n{font-size:2rem;font-weight:900;line-height:1}
.stat .l{margin-top:6px;font-size:.75rem;letter-spacing:1px;text-transform:uppercase;color:#d7e6ff}
.list{display:grid;gap:10px}
.small{color:var(--muted);font-size:.85rem}
.badge{display:inline-block;padding:6px 10px;border-radius:999px;background:#eef4ff;color:var(--navy);font-size:.75rem;font-weight:800;margin-bottom:8px;}
.section-head{display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:12px;}
.empty{padding:16px;border:1px dashed #d9e2ef;border-radius:14px;background:#fbfdff;color:#5d6e83}
.item{padding:18px;background:var(--card);border:1px solid var(--border);border-radius:var(--r-md);box-shadow:var(--shadow-sm);}
.item h3{margin:0 0 8px}
.pill{display:inline-flex;align-items:center;gap:8px;background:#f1f5ff;color:var(--navy);border:1px solid #dce4fb;padding:8px 12px;border-radius:999px;font-size:.82rem;font-weight:700;}

/* Paper cards */
.paper-card{padding:18px;background:var(--card);border:1.5px solid var(--border);border-radius:var(--r-md);box-shadow:var(--shadow-sm);transition:border-color .2s;}
.paper-card:hover{border-color:rgba(201,146,42,.35);}
.paper-card .badge-wrap{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;}
.paper-card h3{font-family:'Playfair Display',serif;color:var(--navy);margin:0 0 6px;font-size:1.1rem;}
.paper-card .meta{color:var(--muted);font-size:.9rem;margin-bottom:12px;}
.paper-card .actions{display:flex;gap:10px;flex-wrap:wrap;}

/* Chapter grouping */
.chapter-group{margin-bottom:14px;border:1px solid var(--border);border-radius:14px;overflow:hidden;background:#fff;}
.chapter-head{padding:14px 16px;background:#f8fafc;cursor:pointer;font-weight:700;color:var(--navy);display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--border);}
.chapter-body{padding:14px;display:none;}
.chapter-body.open{display:block;}

/* Attempt cards */
.attempt-card{padding:16px;background:var(--card);border:1px solid var(--border);border-radius:var(--r-md);box-shadow:var(--shadow-sm);}
.attempt-card .badge{margin-bottom:8px;}
.attempt-card h3{margin:0 0 6px;font-size:1.05rem;}
.attempt-meta{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;}

/* Mock overlay */
.mock-overlay{position:fixed;inset:0;background:#08111f;z-index:9998;overflow:auto;display:none;}
.mock-overlay.active{display:flex;flex-direction:column;}
.mock-shell{width:100vw;min-height:100vh;background:#f5f7fb;display:flex;flex-direction:column;}
.mock-topbar{background:#ffffff;color:#111827;padding:12px 22px;display:grid;grid-template-columns:minmax(260px,1fr) auto auto;gap:18px;align-items:center;position:sticky;top:0;z-index:8;border-bottom:1px solid #d8dee9;box-shadow:0 8px 22px rgba(15,23,42,.08);}
.mock-topbar h2{margin:2px 0 0;font-size:1rem;line-height:1.35;color:#111827;}
.exam-brandline{display:flex;align-items:center;gap:14px;min-width:0;}
.exam-logo{width:56px;height:56px;border-radius:14px;object-fit:cover;border:1px solid #e5e7eb;box-shadow:0 8px 18px rgba(15,23,42,.12);}
.exam-kicker{font-size:.72rem;letter-spacing:1.7px;text-transform:uppercase;color:#64748b;font-weight:900;}
.exam-meta-bar{display:flex;gap:10px;align-items:center;flex-wrap:wrap;justify-content:flex-end;}
.exam-pill{display:inline-flex;align-items:center;gap:7px;min-height:38px;padding:8px 12px;border-radius:10px;background:#f8fafc;border:1px solid #e2e8f0;color:#334155;font-weight:800;font-size:.86rem;white-space:nowrap;}
.exam-progress{width:180px;height:8px;overflow:hidden;border-radius:999px;background:#e2e8f0;}
.exam-progress > span{display:block;height:100%;width:0%;border-radius:999px;background:linear-gradient(90deg,var(--gold),var(--blue));transition:width .2s ease;}
.mock-body{flex:1;width:100%;}
.exam-shell{gap:18px;width:min(1180px,100%);margin:0 auto;padding:22px 22px 118px;}
.exam-nav-shell{border-radius:14px;border:1px solid #d8dee9;box-shadow:0 12px 30px rgba(15,23,42,.08);overflow:hidden;background:#fff;}
.question-card.exam-question{border-radius:18px;border:1px solid #d8dee9;box-shadow:0 18px 46px rgba(15,23,42,.10);padding:0;overflow:hidden;background:#fff;}
.exam-question-head{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;padding:14px 18px;border-bottom:1px solid #e2e8f0;background:linear-gradient(180deg,#ffffff,#f8fafc);}
.exam-question-main{color:#111827;padding:18px 22px 6px;font-size:1.13rem;font-weight:800;line-height:1.5;white-space:pre-wrap;word-break:break-word;tab-size:4;background:transparent !important;}
.exam-question-body{padding:18px 22px 22px;background:#fff;}
.question-text-block{color:#111827;font-size:1.03rem;line-height:1.65;font-weight:400;white-space:pre-wrap;word-break:break-word;tab-size:4;margin:0 0 14px;}
.option{display:flex;align-items:flex-start;gap:10px;padding:14px 16px;border:1px solid #d8dee9;border-radius:12px;margin:8px 0;background:#fff;transition:background .15s ease,border-color .15s ease;cursor:pointer;}
.option:hover{background:#f8fafc;border-color:#c4cedd}
.option input{width:auto;margin:2px 0 0;accent-color:var(--blue);}
.exam-actions{position:fixed;left:0;right:0;bottom:0;z-index:9;display:grid !important;grid-template-columns:1fr auto auto auto auto;align-items:center;gap:10px;min-height:82px;padding:14px 28px;border-top:1px solid #263244;background:#111827;box-shadow:0 -16px 34px rgba(15,23,42,.22);}
.exam-actions .btn{min-width:116px;border-radius:10px;}
.exam-actions::before{content:"Vinayak ProEdu Mock Exam";color:#cbd5e1;font-weight:800;justify-self:start;}

/* Navigator */
.nav-wrap{display:grid;gap:10px}
.nav-progress{width:100%;height:12px;overflow:hidden;border-radius:999px;background:#e5e7eb;border:1px solid #dbe4f0;}
.nav-progress-bar{height:100%;width:0%;border-radius:999px;background:linear-gradient(135deg,var(--navy),var(--blue));transition:width .2s ease;}
.nav-arrow-row{display:flex;justify-content:center}
.nav-arrow{width:38px;height:32px;padding:0;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;font-size:.95rem;line-height:1;}
.nav-panel{display:none}
.nav-panel.open{display:block}
.nav-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px}
.nav-btn{border:1px solid #dbe4f0;background:#eef4ff;padding:7px 0;border-radius:10px;font-weight:800;cursor:pointer;font-size:.84rem;}
.nav-btn.answered{background:#d1fae5;border-color:#a7f3d0}
.nav-btn.review{background:#fef3c7;border-color:var(--gold)}
.nav-btn.current{outline:2px solid var(--blue);background:#dbeafe}
.nav-legend{display:flex;gap:8px;flex-wrap:wrap;font-size:.78rem;color:var(--muted);margin:8px 0 0}
.legend-chip{display:inline-flex;align-items:center;gap:6px;padding:4px 8px;border-radius:999px;background:#f8fafc;border:1px solid var(--border)}

/* Section B */
.sb-layout{display:grid;grid-template-columns:1fr 1.1fr;gap:16px;align-items:start;}
.sb-exhibit,.sb-panel{background:#fff;border:1px solid var(--border);border-radius:16px;padding:14px;box-shadow:var(--shadow-sm)}
.sb-title{margin:0 0 10px;font-size:1rem;font-weight:900;color:var(--navy)}
.sb-custom-html{width:100%;}
.sb-custom-html table{width:100%;border-collapse:collapse;}
.sb-custom-html th,.sb-custom-html td{padding:8px;border:1px solid var(--border);text-align:left;vertical-align:top;}
.sb-custom-html input,.sb-custom-html select,.sb-custom-html textarea{width:100%;margin:0;padding:8px;border:1px solid var(--border);border-radius:8px;}
.sb-custom-html .sb-block{margin-bottom:12px;background:#f8fafc;font-weight:800;color:#111827;}
.sb-table-title{font-weight:900;color:#111827;margin:0 0 10px;font-size:1.05rem;}
.question-image{max-width:100%;border-radius:16px;border:1px solid var(--border);margin:12px 0}
.question-image img{width:100%;display:block;border-radius:16px}

/* Fill in blank */
.fib-input{min-width:120px;width:160px;padding:8px 10px;margin:0 4px;border:1px solid var(--border);border-radius:10px;background:#fff;font:inherit;}

/* Lock screen */
.lock-screen{padding:26px;border:1px solid #fecaca;background:#fff5f5;border-radius:18px;text-align:center}
.lock-screen h3{margin:0 0 8px}

/* Results */
.result-shell{display:grid;gap:16px}
.result-summary{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px}
.result-card{padding:16px;border:1px solid var(--border);border-radius:16px;background:#fff;box-shadow:var(--shadow-sm)}
.result-card h3{margin:0 0 6px}
.result-ok{background:#ecfdf5;border-color:#86efac}
.result-bad{background:#fff1f2;border-color:#fecdd3}

/* Center modal */
.center-modal{position:fixed;inset:0;z-index:10000;display:none;align-items:center;justify-content:center;padding:20px;background:rgba(15,23,42,.62);backdrop-filter:blur(5px);}
.center-modal.active{display:flex;}
.center-modal-card{width:min(430px,100%);background:#fff;border:1px solid var(--border);border-radius:18px;box-shadow:0 24px 70px rgba(15,23,42,.28);padding:22px;}
.center-modal-card h3{margin:0 0 8px;font-size:1.18rem;color:var(--navy)}
.center-modal-card p{margin:0 0 14px;color:var(--muted);line-height:1.55}

/* Timer */
.timer{background:linear-gradient(135deg,var(--navy),var(--blue));color:#fff;padding:10px 14px;border-radius:12px;font-weight:900;letter-spacing:.3px;}
.timer.warning{background:#fff7ed;color:#c2410c;border:1px solid #fdba74;box-shadow:0 0 0 4px rgba(249,115,22,.10);}
.timer.critical{background:#fecaca;color:#7f1d1d;border:1px solid #f87171;box-shadow:0 0 0 4px rgba(239,68,68,.10);}

/* Watermark */
.question-shell{position:relative;padding:8px 0 28px;}
.question-watermark{position:absolute;right:12px;bottom:10px;font-family:"Times New Roman", Georgia, serif;font-size:1.15rem;letter-spacing:.18em;color:#111;opacity:.08;pointer-events:none;user-select:none;white-space:nowrap;}

.hidden{display:none !important}

@media (max-width: 980px){
  .app-main{margin-left:0;}
  .app-sidebar{position:relative;height:auto;width:100%;}
  .grid-3{grid-template-columns:1fr}
  .sb-layout{grid-template-columns:1fr;}
}
@media (max-width: 640px){
  .app-main{padding:14px}
  .card,.panel{padding:16px}
}
@media (max-width: 900px){
  .mock-topbar{grid-template-columns:1fr;align-items:start;}
  .exam-meta-bar{justify-content:flex-start;}
  .exam-actions{grid-template-columns:1fr 1fr;position:sticky;}
  .exam-actions::before{grid-column:1 / -1;}
  .exam-actions .btn{min-width:0;width:100%;}
  .exam-shell{padding:16px 14px 24px;}
}
</style>
<base target="_blank">
</head>
<body>

<!-- LOGIN -->
<div class="login-wrap" id="loginWrap">
  <div class="login-box">
    <h2>Student Portal</h2>
    <p>Vinayak ProEdu Mock Exams</p>
    <div class="login-field"><label>Email</label><input type="email" id="loginEmail" placeholder="you@example.com"></div>
    <div class="login-field"><label>Password</label><input type="password" id="loginPassword" placeholder="••••••••"></div>
    <button class="login-btn" id="loginBtn" type="button">Login</button>
    <div class="login-status" id="loginStatus"></div>
    <div style="margin-top:14px;text-align:center;font-size:0.82rem;color:rgba(255,255,255,0.45);">
      Use your registered student email to access mock exams.
    </div>
  </div>
</div>

<!-- APP -->
<div class="app-shell" id="appShell">
  <aside class="app-sidebar">
    <div class="app-brand">
      <img src="https://pasteimg.com/images/2026/03/31/WhatsApp-Image-2026-03-19-at-6.49.19-PM.jpg" alt="Vinayak ProEdu">
      <div>
        <h3>Vinayak ProEdu</h3>
        <p>Student Portal</p>
      </div>
    </div>
    <nav class="app-menu">
      <button class="active" data-view="dashboardView">📊 Dashboard</button>
      <button data-view="papersView">📝 Mock Papers</button>
      <button data-view="attemptsView">📋 My Attempts</button>
      <button id="logoutBtn" type="button">🚪 Logout</button>
    </nav>
  </aside>

  <main class="app-main">
    <div class="app-topbar">
      <div>
        <h1 class="app-title">Mock Exams</h1>
        <div class="app-sub">Practice with real exam-style questions</div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;">
        <span id="userLabel" style="color:var(--muted);font-size:.9rem;"></span>
        <button class="btn btn-ghost" id="closeBtn" type="button">Close</button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid-3" style="margin-bottom:16px;">
      <div class="stat"><div class="n" id="paperCount">0</div><div class="l">Available Papers</div></div>
      <div class="stat"><div class="n" id="myAttemptCount">0</div><div class="l">My Attempts</div></div>
      <div class="stat"><div class="n" id="bestScore">0%</div><div class="l">Best Score</div></div>
    </div>

    <div class="content">
      <!-- DASHBOARD -->
      <section id="dashboardView" class="view active">
        <div class="card">
          <div class="section-head">
            <div>
              <h2 class="title">Available Papers</h2>
              <p class="sub">Select a paper to start your mock exam.</p>
            </div>
            <input id="paperSearch" placeholder="Search paper code or title" style="max-width:280px;">
          </div>
          <div id="paperList" class="list"></div>
        </div>
      </section>

      <!-- PAPERS -->
      <section id="papersView" class="view">
        <div class="card">
          <div class="section-head">
            <div>
              <h2 class="title">All Mock Papers</h2>
              <p class="sub">Browse and start any available paper.</p>
            </div>
            <input id="paperSearch2" placeholder="Search paper code or title" style="max-width:280px;">
          </div>
          <div id="papersPanel" class="list"></div>
        </div>
      </section>

      <!-- ATTEMPTS -->
      <section id="attemptsView" class="view">
        <div class="card">
          <h2 class="title">My Attempts</h2>
          <div id="attemptList" class="list"></div>
        </div>
      </section>
    </div>
  </main>
</div>

<!-- MOCK EXAM OVERLAY -->
<div id="mockOverlay" class="mock-overlay">
  <div class="mock-shell">
    <div class="mock-topbar">
      <div class="exam-brandline">
        <img class="exam-logo" src="https://pasteimg.com/images/2026/03/31/WhatsApp-Image-2026-03-19-at-6.49.19-PM.jpg" alt="Vinayak ProEdu">
        <div>
          <div class="exam-kicker">Vinayak ProEdu Mock Paper</div>
          <h2 id="overlayTitle">Paper</h2>
        </div>
      </div>
      <div class="exam-meta-bar">
        <span class="exam-pill" id="examQuestionPill">Question 1 of 1</span>
        <span class="exam-pill" id="examMarksPill">0 marks</span>
        <span class="exam-pill"><span id="overlayMetricLabel">Time</span> <strong class="timer" id="overlayTimer">00:00</strong></span>
        <div id="timerWarning" class="small" style="display:none;color:#92400e;background:#fef3c7;border:1px solid #f3d18b;padding:8px 10px;border-radius:10px;">15 minutes left</div>
      </div>
      <div class="exam-meta-bar">
        <span class="exam-pill"><span id="examProgressLabel">0% complete</span><span class="exam-progress"><span id="examProgressFill"></span></span></span>
        <button class="btn btn-gold" id="submitMockBtn">Submit</button>
      </div>
    </div>
    <div class="mock-body">
      <div id="overlayBody"></div>
    </div>
  </div>
</div>

<!-- CENTER MODAL -->
<div id="centerModal" class="center-modal" role="dialog" aria-modal="true">
  <div class="center-modal-card">
    <h3 id="centerModalTitle">Confirm</h3>
    <p id="centerModalMessage"></p>
    <div id="centerModalInputWrap" class="hidden">
      <label>Student Name</label>
      <input id="centerModalInput" type="text" placeholder="Enter your name">
    </div>
    <div class="btn-row" style="justify-content:flex-end;margin-top:12px;">
      <button class="btn btn-ghost" id="centerModalCancelBtn" type="button">Cancel</button>
      <button class="btn btn-primary" id="centerModalConfirmBtn" type="button">Confirm</button>
    </div>
  </div>
</div>

<script>
/* ================= FIREBASE ================= */
const firebaseConfig = {
  apiKey: "AIzaSyCwZGVK9I_GQmJkRatZOyMs0gdcZ8nSouc",
  authDomain: "vinayak-proedu.firebaseapp.com",
  projectId: "vinayak-proedu",
  storageBucket: "vinayak-proedu.appspot.com",
  messagingSenderId: "993646562333",
  appId: "1:993646562333:web:5f37a0b63d4d177adf4af4"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(()=>{});

/* ================= STATE ================= */
const state = {
  user: null, papers: [], questions: [], attempts: [],
  activePaper: null, activeQuestions: [], currentIndex: 0,
  selected: {}, reviewed: {}, examActive: false, examLocked: false,
  examProtectionArmed: false, lockReason: '', remaining: 0,
  timerEndAt: 0, timerWarningShown: false, submitting: false,
  startTime: 0, timer: null, studentName: '',
  pendingStartPaperId: '', centerModalAction: null, resultData: null
};

/* ================= DOM ================= */
const el = {
  loginWrap: document.getElementById('loginWrap'),
  appShell: document.getElementById('appShell'),
  loginStatus: document.getElementById('loginStatus'),
  loginEmail: document.getElementById('loginEmail'),
  loginPassword: document.getElementById('loginPassword'),
  loginBtn: document.getElementById('loginBtn'),
  logoutBtn: document.getElementById('logoutBtn'),
  closeBtn: document.getElementById('closeBtn'),
  userLabel: document.getElementById('userLabel'),
  views: [...document.querySelectorAll('.view')],
  menuBtns: [...document.querySelectorAll('.app-menu button')],
  paperList: document.getElementById('paperList'),
  papersPanel: document.getElementById('papersPanel'),
  attemptList: document.getElementById('attemptList'),
  paperCount: document.getElementById('paperCount'),
  myAttemptCount: document.getElementById('myAttemptCount'),
  bestScore: document.getElementById('bestScore'),
  paperSearch: document.getElementById('paperSearch'),
  paperSearch2: document.getElementById('paperSearch2'),
  mockOverlay: document.getElementById('mockOverlay'),
  overlayTitle: document.getElementById('overlayTitle'),
  overlayMetricLabel: document.getElementById('overlayMetricLabel'),
  overlayTimer: document.getElementById('overlayTimer'),
  overlayBody: document.getElementById('overlayBody'),
  examQuestionPill: document.getElementById('examQuestionPill'),
  examMarksPill: document.getElementById('examMarksPill'),
  examProgressLabel: document.getElementById('examProgressLabel'),
  examProgressFill: document.getElementById('examProgressFill'),
  submitMockBtn: document.getElementById('submitMockBtn'),
  timerWarning: document.getElementById('timerWarning'),
  centerModal: document.getElementById('centerModal'),
  centerModalTitle: document.getElementById('centerModalTitle'),
  centerModalMessage: document.getElementById('centerModalMessage'),
  centerModalInputWrap: document.getElementById('centerModalInputWrap'),
  centerModalInput: document.getElementById('centerModalInput'),
  centerModalCancelBtn: document.getElementById('centerModalCancelBtn'),
  centerModalConfirmBtn: document.getElementById('centerModalConfirmBtn')
};

const esc = s => String(s ?? '').replace(/[&<>'"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]));
const renderPastedText = value => esc(value).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
const normalizeText = value => String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
const pad2 = n => String(n).padStart(2, '0');
const fmtTime = sec => `${pad2(Math.floor(sec / 60))}:${pad2(sec % 60)}`;

function showView(id) {
  el.views.forEach(v => v.classList.toggle('active', v.id === id));
  el.menuBtns.forEach(b => b.classList.toggle('active', b.dataset.view === id));
}

/* ================= AUTH ================= */
async function doLogin() {
  try {
    const email = el.loginEmail.value.trim();
    const pw = el.loginPassword.value;
    if (!email || !pw) throw new Error('Email and password required.');
    await auth.signInWithEmailAndPassword(email, pw);
  } catch (err) {
    el.loginStatus.textContent = err.message;
    el.loginStatus.className = 'login-status error';
  }
}

auth.onAuthStateChanged(async user => {
  state.user = user || null;
  if (user) {
    el.userLabel.textContent = user.email || 'Student';
    el.loginWrap.classList.add('hidden');
    el.appShell.classList.add('active');
    await refreshAll();
  } else {
    el.loginWrap.classList.remove('hidden');
    el.appShell.classList.remove('active');
  }
});

el.loginBtn.addEventListener('click', doLogin);
el.logoutBtn.addEventListener('click', async () => { await auth.signOut(); location.reload(); });
if(el.closeBtn) el.closeBtn.addEventListener('click', () => { window.location.href = 'index.html'; });

/* ================= DATA ================= */
async function loadData() {
  try {
    const [pSnap, qSnap, aSnap] = await Promise.all([
      db.collection('mockPapers').orderBy('createdAt', 'desc').get().catch(() => ({ docs: [] })),
      db.collection('mockQuestions').orderBy('createdAt', 'asc').get().catch(() => ({ docs: [] })),
      state.user ? db.collection('mockAttempts').where('userId', '==', state.user.uid).get().catch(() => ({ docs: [] })) : Promise.resolve({ docs: [] })
    ]);
    state.papers = pSnap.docs.map(d => ({ id: d.id, ...d.data() })).filter(p => !p.locked);
    state.questions = qSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    state.attempts = aSnap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('Firebase load error:', err);
    state.papers = state.papers || [];
    state.questions = state.questions || [];
    state.attempts = state.attempts || [];
  }

  const myAttempts = state.attempts.filter(a => String(a.userId) === String(state.user?.uid));
  el.paperCount.textContent = state.papers.length;
  el.myAttemptCount.textContent = myAttempts.length;
  const best = myAttempts.length ? Math.max(...myAttempts.map(a => Number(a.percentage || 0))) : 0;
  el.bestScore.textContent = best + '%';
}

function getQuestionsForPaper(paperId) {
  return state.questions.filter(q => String(q.paperId) === String(paperId));
}

function getAttemptCount(paperId) {
  return state.attempts.filter(a => String(a.paperId) === String(paperId) && String(a.userId) === String(state.user?.uid)).length;
}

function paperCard(p) {
  const qCount = getQuestionsForPaper(p.id).length;
  const attempts = getAttemptCount(p.id);
  const maxAttempts = Math.max(1, Number(p.attemptLimit || 1));
  const canStart = attempts < maxAttempts && qCount > 0;
  const best = state.attempts
    .filter(a => String(a.paperId) === String(p.id) && String(a.userId) === String(state.user?.uid))
    .map(a => Number(a.percentage || 0));
  const bestScore = best.length ? Math.max(...best) : 0;

  return `
    <div class="paper-card">
      <div class="badge-wrap">
        <span class="badge">${esc(p.code || '')}</span>
        <span class="badge">${esc(p.level || '')}</span>
        ${attempts > 0 ? `<span class="badge" style="background:#ecfdf5;color:#0f7a2a;">Best: ${bestScore}%</span>` : ''}
      </div>
      <h3>${esc(p.title || 'Mock Paper')}</h3>
      <div class="meta">${Number(p.timeLimit || 0)} min · ${Number(p.totalMarks || 0)} marks · ${qCount} questions · ${attempts}/${maxAttempts} attempts used</div>
      <div class="actions">
        ${canStart
          ? `<button class="btn btn-primary" onclick="window.startMock('${p.id}')">Start Mock</button>`
          : `<button class="btn btn-ghost" disabled>${qCount === 0 ? 'No Questions' : 'Attempts Exhausted'}</button>`}
      </div>
    </div>`;
}

function renderPapers() {
  const search = (el.paperSearch?.value || el.paperSearch2?.value || '').toLowerCase();
  const filtered = state.papers.filter(p =>
    `${p.code || ''} ${p.title || ''} ${p.level || ''}`.toLowerCase().includes(search)
  );
  const html = filtered.length ? filtered.map(paperCard).join('') : '<div class="empty">No papers available.</div>';
  if(el.paperList) el.paperList.innerHTML = html;
  if(el.papersPanel) el.papersPanel.innerHTML = html;
}

function renderAttempts() {
  const myAttempts = state.attempts.filter(a => String(a.userId) === String(state.user?.uid));
  el.attemptList.innerHTML = myAttempts.length ? myAttempts.map(a => {
    const created = a.createdAt?.toDate ? a.createdAt.toDate().toLocaleString() : '';
    return `
      <div class="attempt-card">
        <div class="badge">${esc(a.paperCode || '')}</div>
        <h3>${esc(a.paperTitle || 'Mock Paper')}</h3>
        <div class="small"><strong>Student:</strong> ${esc(a.studentName || a.userEmail || 'Student')}</div>
        <div class="attempt-meta">
          <span class="pill">Score ${Number(a.score || 0)}/${Number(a.total || 0)}</span>
          <span class="pill">${Number(a.percentage || 0)}%</span>
          <span class="pill">Time ${fmtTime(Number(a.timeTakenSec || 0))}</span>
          <span class="pill">Answered ${Number(a.answered || 0)}</span>
        </div>
        <div class="small" style="margin-top:6px;">${esc(created)}</div>
      </div>`;
  }).join('') : '<div class="empty">No attempts yet. Start a mock exam!</div>';
}

async function refreshAll() {
  await loadData();
  renderPapers();
  renderAttempts();
}

if(el.paperSearch) el.paperSearch.addEventListener('input', renderPapers);
if(el.paperSearch2) el.paperSearch2.addEventListener('input', renderPapers);

/* ================= EXAM ENGINE ================= */
function openCenterModal({ title, message, input = false, inputValue = '', confirmText = 'Confirm', onConfirm }) {
  state.centerModalAction = typeof onConfirm === 'function' ? onConfirm : null;
  el.centerModalTitle.textContent = title || 'Confirm';
  el.centerModalMessage.textContent = message || '';
  el.centerModalConfirmBtn.textContent = confirmText || 'Confirm';
  el.centerModalInputWrap.classList.toggle('hidden', !input);
  el.centerModalInput.value = inputValue || '';
  el.centerModal.classList.add('active');
  setTimeout(() => { if (input) el.centerModalInput.focus(); else el.centerModalConfirmBtn.focus(); }, 0);
}
function closeCenterModal() { el.centerModal.classList.remove('active'); state.centerModalAction = null; }

function confirmStartMock(paperId) {
  const paper = state.papers.find(p => p.id === paperId);
  if (!paper) return;
  state.pendingStartPaperId = paperId;
  const defaultName = state.studentName || (state.user?.displayName || '').trim();
  openCenterModal({
    title: 'Start Test',
    message: `Enter your name before starting ${paper.code || ''} - ${paper.title || 'this test'}.`,
    input: true,
    inputValue: defaultName,
    confirmText: 'Start Test',
    onConfirm: () => {
      const name = el.centerModalInput.value.trim();
      if (!name) { el.centerModalInput.focus(); el.centerModalInput.style.borderColor = '#ef4444'; return false; }
      el.centerModalInput.style.borderColor = '';
      state.studentName = name;
      closeCenterModal();
      beginMock(state.pendingStartPaperId);
      return true;
    }
  });
}

function requestSubmitMock() {
  if (!state.examActive || state.submitting) return;
  openCenterModal({
    title: 'Are you sure?',
    message: 'Once submitted, this attempt will be scored and saved.',
    confirmText: 'Submit Paper',
    onConfirm: () => { closeCenterModal(); submitMock(true); return true; }
  });
}

function updateTimerDisplay() {
  if (!state.examActive || state.examLocked) return;
  const secondsLeft = Math.max(0, Math.ceil((state.timerEndAt - Date.now()) / 1000));
  state.remaining = secondsLeft;
  if (el.overlayMetricLabel) el.overlayMetricLabel.textContent = 'Time';
  el.overlayTimer.textContent = fmtTime(secondsLeft);
  el.overlayTimer.classList.toggle('warning', secondsLeft <= 900 && secondsLeft > 300);
  el.overlayTimer.classList.toggle('critical', secondsLeft <= 300 && secondsLeft > 0);
  if (el.timerWarning) {
    if (secondsLeft <= 900 && secondsLeft > 300) { el.timerWarning.style.display = 'inline-flex'; el.timerWarning.textContent = 'Warning: 15 minutes left'; }
    else if (secondsLeft <= 300 && secondsLeft > 0) { el.timerWarning.style.display = 'inline-flex'; el.timerWarning.textContent = 'Urgent: 5 minutes left'; }
    else { el.timerWarning.style.display = 'none'; }
  }
  if (secondsLeft <= 0) { state.remaining = 0; clearInterval(state.timer); submitMock(true); }
}
function startTimer() {
  clearInterval(state.timer);
  state.timerEndAt = Date.now() + (Number(state.remaining || 0) * 1000);
  updateTimerDisplay();
  state.timer = setInterval(updateTimerDisplay, 1000);
}

function questionHasAnswer(q) {
  const ans = state.selected[q.id];
  const type = q.type || 'mcq';
  if (type === 'fill') { const arr = Array.isArray(ans) ? ans : []; return arr.some(v => String(v ?? '').trim() !== ''); }
  if (type === 'sectionb') { const arr = Array.isArray(ans) ? ans : []; return arr.some(v => String(v ?? '').trim() !== ''); }
  if (type === 'multi') return Array.isArray(ans) ? ans.length > 0 : false;
  if (type === 'mcq' || type === 'dropdown') return ans !== undefined && ans !== null && String(ans) !== '';
  return Array.isArray(ans) ? ans.length > 0 : String(ans || '').trim() !== '';
}
function navButtonClass(q, idx) {
  const parts = ['nav-btn'];
  if (idx === state.currentIndex) parts.push('current');
  if (questionHasAnswer(q)) parts.push('answered');
  if (state.reviewed[q.id]) parts.push('review');
  return parts.join(' ');
}

function renderNavigator() {
  const total = state.activeQuestions.length;
  const answered = state.activeQuestions.filter(questionHasAnswer).length;
  const reviewed = state.activeQuestions.filter(q => state.reviewed[q.id]).length;
  const progress = total ? Math.round((answered / total) * 100) : 0;
  const isOpen = !!state.examNavOpen;
  return `
    <div class="exam-nav-shell">
      <div class="exam-nav-content">
        <div class="section-head" style="margin-bottom:10px;">
          <span style="font-weight:900;color:var(--navy);">Question Navigator</span>
          <span class="small" id="navCurrentCount">${state.currentIndex + 1}/${total}</span>
        </div>
        <div class="exam-nav-mini">
          <span class="legend-chip">Answered: <strong id="navAnsweredCount">${answered}</strong>/${total}</span>
          <span class="legend-chip">Review: <strong id="navReviewCount">${reviewed}</strong></span>
        </div>
        <div class="nav-wrap" style="margin-top:12px;">
          <div class="nav-progress"><div class="nav-progress-bar" id="navProgressBar" style="width:${progress}%"></div></div>
          <div class="nav-arrow-row">
            <button class="btn btn-ghost nav-arrow" type="button" onclick="window.toggleExamNavigator()">${isOpen ? '▲' : '▼'}</button>
          </div>
          <div class="nav-panel ${isOpen ? 'open' : ''}" id="navPanel">
            <div class="nav-grid" style="margin-top:2px;">
              ${state.activeQuestions.map((q, idx) => `
                <button type="button" class="${navButtonClass(q, idx)}" data-idx="${idx}" onclick="window.gotoQuestion(${idx})">${idx + 1}${state.reviewed[q.id] ? ' ★' : ''}</button>
              `).join('')}
            </div>
            <div class="exam-nav-top-actions">
              <button class="btn btn-ghost" type="button" onclick="window.prevQ()">Previous</button>
              <button class="btn btn-primary" type="button" onclick="window.nextQ()">Next</button>
              <button class="btn btn-gold" type="button" onclick="window.toggleReviewFlag()">${state.reviewed[state.activeQuestions[state.currentIndex]?.id] ? 'Unflag Review' : 'Flag for Review'}</button>
              <button class="btn btn-ghost" type="button" onclick="window.requestSubmitMock()">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}
window.toggleExamNavigator = function () {
  state.examNavOpen = !state.examNavOpen;
  const panel = document.getElementById('navPanel');
  if (panel) panel.classList.toggle('open', state.examNavOpen);
};
function updateNavigatorVisuals() {
  document.querySelectorAll('.nav-btn[data-idx]').forEach(btn => {
    const idx = Number(btn.dataset.idx);
    const q = state.activeQuestions[idx];
    btn.className = navButtonClass(q, idx);
    btn.textContent = `${idx + 1}${state.reviewed[q.id] ? ' ★' : ''}`;
  });
  const navCounter = document.getElementById('navCurrentCount');
  if (navCounter) navCounter.textContent = `${state.currentIndex + 1}/${state.activeQuestions.length}`;
  const reviewBtn = document.querySelector('.exam-nav-top-actions .btn.btn-gold');
  if (reviewBtn) { const q = state.activeQuestions[state.currentIndex]; reviewBtn.textContent = state.reviewed[q?.id] ? 'Unflag Review' : 'Flag for Review'; }
  const answerCount = document.getElementById('navAnsweredCount');
  const answered = state.activeQuestions.filter(questionHasAnswer).length;
  if (answerCount) answerCount.textContent = String(answered);
  const progressBar = document.getElementById('navProgressBar');
  if (progressBar) { const total = state.activeQuestions.length || 1; progressBar.style.width = `${Math.round((answered / total) * 100)}%`; }
  const reviewCount = document.getElementById('navReviewCount');
  if (reviewCount) reviewCount.textContent = String(state.activeQuestions.filter(q => state.reviewed[q.id]).length);
  updateExamHeaderStats();
}
function updateExamHeaderStats() {
  const total = state.activeQuestions.length || 0;
  const q = state.activeQuestions[state.currentIndex];
  const answered = state.activeQuestions.filter(questionHasAnswer).length;
  const progress = total ? Math.round((answered / total) * 100) : 0;
  if (el.examQuestionPill) el.examQuestionPill.textContent = `Question ${Math.min(state.currentIndex + 1, total || 1)} of ${total || 1}`;
  if (el.examMarksPill) el.examMarksPill.textContent = `${Number(q?.marks || 0)} marks`;
  if (el.examProgressLabel) el.examProgressLabel.textContent = `${progress}% complete`;
  if (el.examProgressFill) el.examProgressFill.style.width = `${progress}%`;
}
function getDisplayMainQuestion(q) { return String(q?.mainQuestion || q?.mainQuestionText || '').trim(); }

function renderFillInline(q, selected) {
  const sentence = String(q.sentence || q.question || '');
  const values = Array.isArray(selected) ? selected : [];
  const safeSentence = renderPastedText(sentence);
  const placeholderMatches = [...sentence.matchAll(/\{\{(\d+)\}\}/g)].map(m => Number(m[1]));
  if (placeholderMatches.length) {
    const html = safeSentence.replace(/\{\{(\d+)\}\}/g, (_, n) => {
      const idx = Number(n) - 1;
      const value = values[idx] ?? '';
      return `<input type="text" class="fib-input" data-idx="${idx}" value="${esc(value)}">`;
    });
    return `<div class="question-text-block">${html}</div>`;
  }
  if (/\[blank\]/i.test(sentence)) { const value = values[0] ?? ''; const html = safeSentence.replace(/\[blank\]/i, `<input type="text" class="fib-input" data-idx="0" value="${esc(value)}">`); return `<div class="question-text-block">${html}</div>`; }
  if (/_{3,}/.test(sentence)) { const value = values[0] ?? ''; const html = safeSentence.replace(/_{3,}/, `<input type="text" class="fib-input" data-idx="0" value="${esc(value)}">`); return `<div class="question-text-block">${html}</div>`; }
  const blankCount = Array.isArray(q.answers) && q.answers.length ? q.answers.length : (q.answer ? 1 : 0);
  if (!blankCount) return `<div class="question-text-block">${renderPastedText(sentence)}</div>`;
  return `<div class="question-text-block">${renderPastedText(sentence)}</div><div class="option-list">${Array.from({ length: blankCount }, (_, i) => `<label style="display:block;"><span class="small" style="display:block;margin-bottom:6px;">Blank ${i + 1}</span><input type="text" class="fib-input" data-idx="${i}" value="${esc(values[i] ?? '')}"></label>`).join('')}</div>`;
}
function renderDropdownInline(q, selected) {
  const options = Array.isArray(q.options) ? q.options : [];
  const selectHtml = `<select id="dropAnswer" style="margin-top:10px;padding:10px;border:1px solid var(--border);border-radius:10px;"><option value="">Select</option>${options.map((opt, idx) => `<option value="${idx}" ${String(selected) === String(idx) ? 'selected' : ''}>${esc(opt)}</option>`).join('')}</select>`;
  const sentence = String(q.sentence || q.question || '');
  const safeSentence = renderPastedText(sentence);
  if (sentence.includes('[blank]')) return `<div class="question-text-block">${safeSentence.replace(/\[blank\]/i, selectHtml)}</div>`;
  if (sentence.match(/\{\{1\}\}/)) return `<div class="question-text-block">${safeSentence.replace(/\{\{1\}\}/, selectHtml)}</div>`;
  return `<div class="question-text-block">${safeSentence}</div>${selectHtml}`;
}

function normalizeComparable(value) {
  return normalizeText(value).normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[₹$£€,%]/g, '').replace(/,/g, '').replace(/[^\w.\- ]+/g, ' ').replace(/\s+/g, ' ').trim();
}
function numericComparable(value) {
  const text = String(value ?? '').trim().replace(/[₹$£€,%\s,]/g, '');
  if (!text || !/^-?\d+(\.\d+)?$/.test(text)) return null;
  const num = Number(text);
  return Number.isFinite(num) ? num : null;
}
function answerMatches(given, expected, alternatives = []) {
  const cleanGiven = normalizeComparable(given);
  const accepted = [expected, ...(Array.isArray(alternatives) ? alternatives : [])].map(v => normalizeComparable(v)).filter(Boolean);
  if (!cleanGiven || !accepted.length) return false;
  const givenNum = numericComparable(given);
  if (givenNum !== null) {
    return [expected, ...(Array.isArray(alternatives) ? alternatives : [])].some(v => {
      const expectedNum = numericComparable(v);
      return expectedNum !== null && Math.abs(givenNum - expectedNum) <= 0.0001;
    });
  }
  return accepted.includes(cleanGiven);
}

function sectionBAnswerFields(root = document) {
  const scopedSelector = '.sb-custom-html [data-answer], .sb-custom-html [data-sb-answer]';
  const rootIsAnswerArea = root !== document && root.matches && root.matches('.sb-custom-html');
  const scoped = rootIsAnswerArea ? [...root.querySelectorAll('[data-answer], [data-sb-answer]')] : [...root.querySelectorAll(scopedSelector)];
  if (scoped.length || root === document || rootIsAnswerArea) return scoped;
  return [...root.querySelectorAll('[data-answer], [data-sb-answer]')];
}
function normalizeFieldValue(field) {
  if (!field) return '';
  if (field.tagName === 'SELECT') return String(field.value ?? '').trim();
  if (field.type === 'checkbox') return field.checked ? 'true' : '';
  if (field.type === 'radio') return field.checked ? String(field.value ?? '').trim() : '';
  return String(field.value ?? '').trim();
}
function sectionBFieldExpected(field) { return String(field?.dataset?.answer || field?.dataset?.sbAnswer || '').trim(); }
function sectionBFieldAlt(field) {
  const raw = String(field?.dataset?.alt || field?.dataset?.sbAlt || '').trim();
  return raw ? raw.split(/[,|]/).map(v => normalizeComparable(v)).filter(Boolean) : [];
}
function fillSectionBFields(q, values, root = document) {
  const fields = sectionBAnswerFields(root);
  const arr = Array.isArray(values) ? values : [];
  fields.forEach((field, idx) => {
    const value = arr[idx] ?? '';
    if (field.type === 'checkbox') field.checked = String(value) === 'true';
    else if (field.type === 'radio') field.checked = String(field.value) === String(value);
    else if (field.tagName === 'SELECT') field.value = value;
    else if (field.tagName === 'TEXTAREA') { field.value = value; field.textContent = value; }
    else { field.value = value; field.setAttribute('value', value); }
  });
}
function scoreSectionBHtml(q, values, root = document) {
  const temp = document.createElement('div');
  temp.innerHTML = `<div class="sb-custom-html">${getSectionBHtmlSource(q)}</div>`;
  const fields = sectionBAnswerFields(temp);
  fillSectionBFields(q, values, temp);
  let gained = 0, total = 0;
  fields.forEach(field => {
    const marks = Number(field?.dataset?.marks || field?.dataset?.sbMarks || 1);
    const expected = sectionBFieldExpected(field);
    const alt = sectionBFieldAlt(field);
    const given = normalizeFieldValue(field);
    total += marks;
    if (answerMatches(given, expected, alt)) gained += marks;
  });
  return { gained, total };
}

function getSectionBHtmlSource(q) {
  const raw = String(q?.sectionBHtml || '').trim();
  const rawSpecRegex = /(?:^|\n)\s*(?:type\s*=\s*calcTable|layout\s*=\s*calcTable|calcTable\b|calctable\b|statementTable\b|statementtable\b|cashflowtable\b|cash flow table\b|row\s*\||fixed\s*\||text\s*\||heading\s*\||label\s*\||total\s*\||grandtotal\s*\|)/i;
  if (raw) {
    if (/<table|<div|<tr|<td|<th/i.test(raw) && !rawSpecRegex.test(raw)) return raw;
    const spec = parseSectionBSpec(raw);
    if (spec && (spec.rows.length || spec.layout || spec.title)) return generateSectionBHtmlFromRows(spec.rows, { layout: spec.layout, title: spec.title });
  }
  const rows = Array.isArray(q?.sectionBRows) ? q.sectionBRows : [];
  const layout = String(q?.sectionBLayout || '').trim();
  const title = String(q?.sectionBTitle || '').trim();
  return generateSectionBHtmlFromRows(rows, { layout, title });
}

function generateSectionBHtmlFromRows(rows, options = {}) {
  const safeRows = Array.isArray(rows) ? rows.map(r => r).filter(Boolean) : [];
  const layout = normalizeText(options.layout || '');
  const title = String(options.title || '').trim();
  if (!safeRows.length) return '';
  const renderInput = (row, idx) => {
    const label = row.label || `Field ${idx + 1}`;
    const type = String(row.fieldType || 'text').toLowerCase();
    const marks = Number(row.marks || 0);
    const alt = Array.isArray(row.altAnswers) && row.altAnswers.length ? row.altAnswers.join(',') : '';
    const optionList = Array.isArray(row.options) ? row.options : [];
    const answer = String(row.correct ?? '').trim();
    if (['dropdown', 'mcq', 'yesno'].includes(type)) {
      const opts = optionList.length ? optionList : (type === 'yesno' ? ['Yes', 'No'] : (answer ? [answer] : ['Option 1', 'Option 2']));
      return `<tr><td>${esc(label)}</td><td><select data-answer="${esc(answer)}" data-marks="${marks}" data-alt="${esc(alt)}"><option value="">Select</option>${opts.map(opt => `<option value="${esc(opt)}">${esc(opt)}</option>`).join('')}</select></td></tr>`;
    }
    if (type === 'number' || type === 'input' || type === 'amount' || type === 'currency') {
      return `<tr><td>${esc(label)}</td><td><input type="number" step="any" data-answer="${esc(answer)}" data-marks="${marks}" data-alt="${esc(alt)}" placeholder="Enter answer"></td></tr>`;
    }
    return `<tr><td>${esc(label)}</td><td><input type="text" data-answer="${esc(answer)}" data-marks="${marks}" data-alt="${esc(alt)}" placeholder="Enter answer"></td></tr>`;
  };
  const bodyRows = safeRows.map((row, idx) => {
    const type = String(row.fieldType || 'text').toLowerCase();
    const label = String(row.label || '').trim();
    const answer = String(row.correct ?? '').trim();
    if (['text', 'heading', 'label'].includes(type) && label) return `<tr><td colspan="2" class="sb-block">${esc(label)}</td></tr>`;
    if (['fixed', 'display'].includes(type)) return `<tr><td>${esc(label)}</td><td style="font-weight:700;text-align:right;">${esc(answer)}</td></tr>`;
    if (type === 'total') return renderInput({ ...row, fieldType: 'number' }, idx);
    return renderInput(row, idx);
  }).join('');
  const table = layout === 'calctable' ? `<table class="sb-inline-table"><tbody>${bodyRows}</tbody></table>` : `<table class="sb-inline-table"><thead><tr><th style="width:46%;">Item</th><th>Answer</th></tr></thead><tbody>${bodyRows}</tbody></table>`;
  return `${title ? `<div class="sb-table-title">${esc(title)}</div>` : ''}${table}`;
}

function parseSectionBSpec(raw) {
  const lines = String(raw || '').split('\n').map(s => s.trim()).filter(Boolean);
  let layout = '', title = '', startIndex = 0;
  if (lines.length) {
    const header = parseSectionBHeader(lines[0]);
    if (header && (header.layout || header.title)) { layout = header.layout || ''; title = header.title || ''; startIndex = 1; }
    if (!title && lines[startIndex]) { const maybeTitle = parseSectionBHeader(lines[startIndex]); if (maybeTitle && !maybeTitle.layout && maybeTitle.title) { title = maybeTitle.title; startIndex += 1; } }
  }
  const rows = [];
  for (const line of lines.slice(startIndex)) {
    const parsed = parseSectionBRowLine(line);
    if (!parsed) continue;
    if (parsed.__header) { if (!layout && parsed.layout) layout = parsed.layout; if (!title && parsed.title) title = parsed.title; continue; }
    rows.push(parsed);
  }
  return { layout, title, rows };
}
function parseSectionBHeader(line) {
  const cleaned = String(line || '').trim();
  if (!cleaned) return null;
  const typeMatch = cleaned.match(/^(?:type|layout)\s*=\s*(calc\s*table|statement\s*table|statement|cash\s*flow\s*table|cashflow\s*table)(?:\s*[|]\s*(.*))?$/i);
  if (typeMatch) { const rawLayout = normalizeText(typeMatch[1]).replace(/\s+/g, ''); const layout = rawLayout.includes('calc') ? 'calcTable' : 'statementTable'; return { layout, title: String(typeMatch[2] || '').trim() }; }
  const parts = cleaned.includes('||') ? cleaned.split('||').map(s => s.trim()) : cleaned.split('|').map(s => s.trim());
  const key = normalizeText(parts[0]);
  if (['calctable', 'calc table', 'statementtable', 'statement table', 'cashflowtable', 'cash flow table'].includes(key)) { const layout = key.includes('calc') ? 'calcTable' : 'statementTable'; const title = parts.slice(1).join(' | ').trim(); return { layout, title }; }
  if (['title', 'heading'].includes(key)) return { title: parts.slice(1).join(' | ').trim() };
  return null;
}
function parseSectionBRowLine(line) {
  let parts = String(line || '').trim().includes('||') ? String(line || '').trim().split('||').map(s => s.trim()) : String(line || '').trim().split('|').map(s => s.trim());
  if (!parts.length) return null;
  while (parts.length > 1) {
    const p0 = normalizeText(parts[0]);
    const p1 = normalizeText(parts[1]);
    if (p0 && p0 === p1 && ['row', 'fixed', 'text', 'heading', 'label', 'total', 'grandtotal'].includes(p0)) { parts = parts.slice(1); continue; }
    if (p0 === 'row' && ['row', 'fixed', 'text', 'heading', 'label', 'total', 'grandtotal'].includes(p1)) { parts = parts.slice(1); continue; }
    break;
  }
  let label = '', fieldType = 'text', options = [], correct = '', marks = 0, altAnswers = [];
  const prefix = normalizeText(parts[0]);
  const parseAlt = idx => { const rawAlt = parts[idx]; return rawAlt ? String(rawAlt).split(/[,|]/).map(s => normalizeText(s)).filter(Boolean) : []; };
  const parseOptions = idx => { const rawOptions = parts[idx]; return rawOptions ? String(rawOptions).split(/[,;]/).map(s => s.trim()).filter(Boolean) : []; };
  const asInt = value => { const n = Number(String(value ?? '').trim()); return Number.isFinite(n) ? n : NaN; };
  const isNumericLike = value => /^-?\d[\d,]*(\.\d+)?$/.test(String(value ?? '').trim());
  if (['row', 'fixed', 'text', 'heading', 'label', 'total', 'grandtotal'].includes(prefix)) {
    if (prefix === 'row') {
      label = parts[1] || '';
      fieldType = normalizeSectionBKind(parts[2] || 'number');
      if (['dropdown', 'mcq', 'yesno'].includes(fieldType)) { options = parseOptions(3); correct = parts[4] || ''; marks = asInt(parts[5]); if (Number.isNaN(marks)) marks = 1; altAnswers = parseAlt(6); }
      else if (['fixed', 'text', 'heading', 'label'].includes(fieldType)) { correct = parts[3] || parts[2] || ''; marks = 0; }
      else if (fieldType === 'total') { fieldType = 'number'; correct = parts[3] || parts[2] || ''; marks = asInt(parts[4]); if (Number.isNaN(marks)) marks = 1; altAnswers = parseAlt(5); }
      else { if (parts.length >= 5) { correct = parts[3] || ''; marks = asInt(parts[4]); altAnswers = parseAlt(5); } else { correct = parts[2] || ''; marks = asInt(parts[3]); altAnswers = parseAlt(4); } if (Number.isNaN(marks)) marks = 1; }
    } else if (prefix === 'fixed') { label = parts[1] || ''; fieldType = 'fixed'; correct = parts[2] || ''; marks = 0; }
    else if (prefix === 'total' || prefix === 'grandtotal') {
      fieldType = 'number';
      const second = parts[1] || '', third = parts[2] || '';
      if (!second || second === 'input' || second === 'blank' || second === 'answer') { label = ''; correct = third || parts[1] || ''; marks = asInt(parts[3]); }
      else if (isNumericLike(second) && (!third || isNumericLike(third))) { label = ''; correct = second; marks = asInt(third); }
      else { label = second; correct = third || second; marks = asInt(parts[3]); }
      if (Number.isNaN(marks)) marks = 0;
      altAnswers = parseAlt(4);
    } else { fieldType = 'text'; label = parts.slice(1).join(' | ') || parts[0] || ''; correct = ''; marks = 0; }
  } else {
    label = parts[0] || '';
    fieldType = normalizeSectionBKind(parts[1] || 'text');
    if (['dropdown', 'mcq', 'yesno'].includes(fieldType)) { options = parseOptions(2); correct = parts[3] || ''; marks = asInt(parts[4]); if (Number.isNaN(marks)) marks = 1; altAnswers = parseAlt(5); }
    else if (['fixed', 'text', 'heading', 'label'].includes(fieldType)) { correct = parts[2] || ''; marks = 0; }
    else if (fieldType === 'total') { fieldType = 'number'; correct = parts[2] || ''; marks = asInt(parts[3]); if (Number.isNaN(marks)) marks = 0; altAnswers = parseAlt(4); }
    else { correct = parts[2] || ''; marks = asInt(parts[3]); altAnswers = parseAlt(4); if (Number.isNaN(marks)) marks = 1; }
  }
  const row = { label, fieldType, options, correct, marks, altAnswers };
  if (['text', 'heading', 'label'].includes(fieldType) && !label) return null;
  if (fieldType === 'fixed' && !label && !String(correct).trim()) return null;
  return row;
}
function normalizeSectionBKind(value) {
  const v = normalizeText(value);
  if (['row', 'entry', 'answer', 'field'].includes(v)) return 'row';
  if (['fixed', 'static', 'display', 'label', 'value'].includes(v)) return 'fixed';
  if (['text', 'heading', 'note', 'instruction', 'subheading'].includes(v)) return 'text';
  if (['number', 'num', 'input', 'amount', 'currency'].includes(v)) return 'number';
  if (['dropdown', 'select', 'choice'].includes(v)) return 'dropdown';
  if (['mcq', 'radio'].includes(v)) return 'mcq';
  if (['yesno', 'yes/no'].includes(v)) return 'yesno';
  if (['total', 'sum'].includes(v)) return 'total';
  return v || 'text';
}

function renderSectionBHtmlBlock(q, selected, readonly = false, mode = 'student') {
  const urls = Array.isArray(q?.imageUrls) && q.imageUrls.length ? q.imageUrls : (q?.imageUrl ? [q.imageUrl] : []);
  const images = urls.filter(Boolean);
  const html = getSectionBHtmlSource(q);
  const exhibitHtml = images.length ? `<div class="sb-exhibit-stack">${images.map((url, idx) => `<div class="question-image"><img src="${esc(url)}" alt="${esc(q.imageAlt || q.question || 'Exhibit')} ${idx + 1}"></div>`).join('')}</div>` : '<div class="empty">No exhibit images.</div>';
  if (!html && !images.length) return '<div class="empty">No Section B content found.</div>';
  const tmp = document.createElement('div');
  tmp.innerHTML = html || '<div class="empty">No Section B content found.</div>';
  const fields = sectionBAnswerFields(tmp);
  const values = Array.isArray(selected) ? selected : [];
  if (mode === 'correct' && fields.length) {
    fields.forEach(field => {
      const expected = sectionBFieldExpected(field);
      if (field.type === 'checkbox') field.checked = expected === 'true';
      else if (field.type === 'radio') field.checked = String(field.value) === expected;
      else field.value = expected;
      if (readonly && 'disabled' in field) field.disabled = true;
    });
  } else {
    fillSectionBFields(q, values, tmp);
    if (readonly) fields.forEach(field => { if ('disabled' in field) field.disabled = true; });
  }
  const markingScheme = String(q.sectionBMarkingScheme || '').trim();
  return `<div class="sb-layout"><div class="sb-exhibit"><h4 class="sb-title">Exhibit</h4>${exhibitHtml}</div><div class="sb-panel"><h4 class="sb-title">Answer Area</h4>${markingScheme ? `<div class="sb-scheme"><strong>Marking scheme:</strong> ${esc(markingScheme)}</div>` : ''}<div class="sb-custom-html">${tmp.innerHTML}</div></div></div>`;
}

function questionTotalMarks(q) {
  if ((q.type || 'mcq') === 'sectionb') {
    const rowsTotal = Array.isArray(q.sectionBRows) ? q.sectionBRows.reduce((sum, row) => sum + Number(row.marks || 0), 0) : 0;
    return rowsTotal || Number(q.marks || 0);
  }
  return Number(q.marks || 0);
}

function renderQuestionBody(q) {
  const selected = state.selected[q.id];
  const type = q.type || 'mcq';
  const mediaUrls = Array.isArray(q.imageUrls) && q.imageUrls.length ? q.imageUrls : (q.imageUrl ? [q.imageUrl] : []);
  const media = mediaUrls.length ? `<div class="question-image">${mediaUrls.map((url, idx) => `<img src="${esc(url)}" alt="${esc(q.imageAlt || q.question || 'Question image')} ${idx + 1}" style="${idx > 0 ? 'margin-top:10px;' : ''}">`).join('')}</div>` : '';
  if (type === 'mcq' || type === 'screenshot') {
    const options = Array.isArray(q.options) ? q.options : [];
    return `${media}<div class="option-list">${options.map((opt, idx) => `<label class="option"><input type="radio" name="answer" value="${idx}" ${String(selected) === String(idx) ? 'checked' : ''}><span>${esc(opt)}</span></label>`).join('')}</div>`;
  }
  if (type === 'multi') {
    const options = Array.isArray(q.options) ? q.options : [];
    const picked = Array.isArray(selected) ? selected : [];
    return `${media}<div class="option-list">${options.map((opt, idx) => `<label class="option"><input type="checkbox" class="multiBox" value="${idx}" ${picked.includes(idx) ? 'checked' : ''}><span>${esc(opt)}</span></label>`).join('')}</div>`;
  }
  if (type === 'fill') return `${media}${renderFillInline(q, selected)}`;
  if (type === 'sectionb') return `${renderSectionBHtmlBlock(q, selected)}`;
  if (type === 'dropdown') return `${media}${renderDropdownInline(q, selected)}`;
  return `${media}<textarea id="freeAnswer" placeholder="Type your answer here" style="min-height:120px;padding:12px;border:1px solid var(--border);border-radius:12px;">${esc(selected || '')}</textarea>`;
}

function wireQuestionInputs() {
  const q = state.activeQuestions[state.currentIndex];
  if (!q) return;
  const type = q.type || 'mcq';
  if (type === 'mcq' || type === 'screenshot') {
    document.querySelectorAll('input[name="answer"]').forEach(r => { r.addEventListener('change', () => { captureAnswer(); updateNavigatorVisuals(); }); });
  }
  if (type === 'multi') {
    document.querySelectorAll('.multiBox').forEach(cb => { cb.addEventListener('change', () => { captureAnswer(); updateNavigatorVisuals(); }); });
  }
  if (type === 'fill') {
    document.querySelectorAll('.fib-input').forEach(input => { input.addEventListener('input', () => { captureAnswer(); updateNavigatorVisuals(); }); });
  }
  if (type === 'dropdown') {
    const node = document.getElementById('dropAnswer');
    if (node) { node.addEventListener('change', () => { captureAnswer(); updateNavigatorVisuals(); }); }
  }
  if (type === 'sectionb') {
    document.querySelectorAll('.sb-custom-html [data-answer], .sb-custom-html [data-sb-answer]').forEach(field => {
      field.addEventListener('input', () => { captureAnswer(); updateNavigatorVisuals(); });
      field.addEventListener('change', () => { captureAnswer(); updateNavigatorVisuals(); });
    });
  }
  const free = document.getElementById('freeAnswer');
  if (free) { free.addEventListener('input', () => { captureAnswer(); }); }
}

function renderMockQuestion() {
  if (!state.examActive) return;
  if (state.examLocked) {
    el.overlayBody.innerHTML = `<div class="lock-screen"><h3>Exam Locked</h3><p>${esc(state.lockReason || 'The exam lost focus.')}</p><p>The attempt is frozen because the browser tab or window changed.</p><div class="btn-row" style="justify-content:center;margin-top:14px;"><button class="btn btn-gold" onclick="window.requestSubmitMock()">Submit Now</button></div></div>`;
    return;
  }
  const q = state.activeQuestions[state.currentIndex];
  if (!q) { el.overlayBody.innerHTML = '<div class="empty">No question found.</div>'; return; }
  const nav = renderNavigator();
  const body = renderQuestionBody(q);
  const reviewed = !!state.reviewed[q.id];
  const mainQuestion = getDisplayMainQuestion(q);
  const normalQuestion = String(q.question || '').trim();
  updateExamHeaderStats();
  el.overlayBody.innerHTML = `
    <div class="exam-shell">
      ${nav}
      <div class="question-card exam-question">
        <div class="exam-question-head">
          <div><div class="small" style="font-weight:800;color:#111827;">Section ${esc(q.section || '-')}</div></div>
          <div class="small">Question ${state.currentIndex + 1} of ${state.activeQuestions.length}</div>
        </div>
        ${normalQuestion ? `<div class="question-text-block" style="padding:12px 14px 4px;margin:0;">${renderPastedText(normalQuestion)}</div>` : ''}
        ${mainQuestion ? `<div class="exam-question-main">${renderPastedText(mainQuestion)}</div>` : ''}
        <div class="exam-question-body">
          <div class="question-shell">
            <div class="question-watermark">Vinayak ProEdu</div>
            ${body}
          </div>
          <div class="btn-row exam-actions" style="margin-top:14px;position:static;background:transparent;border:none;box-shadow:none;padding:0;display:flex !important;">
            <button class="btn btn-ghost" onclick="window.prevQ()">Previous</button>
            <button class="btn btn-primary" onclick="window.nextQ()">Next</button>
            <button class="btn btn-gold" id="reviewToggleBtn" onclick="window.toggleReviewFlag()">${reviewed ? 'Unflag Review' : 'Flag for Review'}</button>
            <button class="btn btn-ghost" onclick="window.requestSubmitMock()">Submit Paper</button>
          </div>
        </div>
      </div>
    </div>`;
  wireQuestionInputs();
  updateNavigatorVisuals();
}

function captureAnswer() {
  const q = state.activeQuestions[state.currentIndex];
  if (!q) return;
  const type = q.type || 'mcq';
  let answer = null;
  if (type === 'mcq' || type === 'screenshot') {
    const checked = document.querySelector('input[name="answer"]:checked');
    answer = checked ? Number(checked.value) : null;
  } else if (type === 'multi') {
    answer = [...document.querySelectorAll('.multiBox:checked')].map(c => Number(c.value));
  } else if (type === 'fill') {
    const inputs = [...document.querySelectorAll('.fib-input')];
    if (!inputs.length) return;
    answer = inputs.map(i => i.value.trim());
  } else if (type === 'sectionb') {
    const fields = sectionBAnswerFields(document);
    if (!fields.length) return;
    answer = fields.map(field => normalizeFieldValue(field));
  } else if (type === 'dropdown') {
    const node = document.getElementById('dropAnswer');
    if (!node) return;
    answer = node && node.value !== '' ? Number(node.value) : null;
  } else {
    const node = document.getElementById('freeAnswer');
    if (!node) return;
    answer = node ? node.value.trim() : '';
  }
  state.selected[q.id] = answer;
}

window.gotoQuestion = function(idx) { if (idx < 0 || idx >= state.activeQuestions.length) return; captureAnswer(); state.currentIndex = idx; renderMockQuestion(); };
window.nextQ = function () { captureAnswer(); if (state.currentIndex < state.activeQuestions.length - 1) { state.currentIndex++; renderMockQuestion(); } };
window.prevQ = function () { captureAnswer(); if (state.currentIndex > 0) { state.currentIndex--; renderMockQuestion(); } };
window.toggleReviewFlag = function () { const q = state.activeQuestions[state.currentIndex]; if (!q) return; state.reviewed[q.id] = !state.reviewed[q.id]; renderMockQuestion(); };

function lockExam(reason) { if (!state.examActive || state.examLocked || !state.examProtectionArmed) return; state.examLocked = true; state.lockReason = reason || 'Focus changed'; renderMockQuestion(); }
function enterFullscreen() { const root = document.documentElement; const request = root.requestFullscreen || root.webkitRequestFullscreen || root.msRequestFullscreen; if (!request) return; try { const result = request.call(root); if (result && typeof result.catch === 'function') result.catch(() => { }); } catch (err) { } }
function exitFullscreen() { const exit = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen; if (!document.fullscreenElement || !exit) return; try { const result = exit.call(document); if (result && typeof result.catch === 'function') result.catch(() => { }); } catch (err) { } }

window.startMock = async function (paperId) {
  const paper = state.papers.find(p => p.id === paperId);
  const questions = getQuestionsForPaper(paperId);
  if (!paper) { alert('Paper not found'); return; }
  if (paper.locked) { alert('This test is locked by the admin.'); return; }
  if (!questions.length) { alert('No questions uploaded for this paper yet'); return; }
  const usedAttempts = state.attempts.filter(a => String(a.paperId) === String(paperId) && String(a.userId) === String(state.user?.uid || '')).length;
  const maxAttempts = Math.max(1, Number(paper.attemptLimit || 1));
  if (usedAttempts >= maxAttempts) { alert(`You have already used all ${maxAttempts} allowed attempt(s) for this paper.`); return; }
  confirmStartMock(paperId);
};

async function beginMock(paperId) {
  const paper = state.papers.find(p => p.id === paperId);
  const questions = getQuestionsForPaper(paperId);
  if (!paper || !questions.length) return;
  state.activePaper = paper;
  state.activeQuestions = questions;
  state.currentIndex = 0;
  state.selected = {};
  state.reviewed = {};
  state.examActive = true;
  state.examLocked = false;
  state.examProtectionArmed = false;
  state.lockReason = '';
  state.resultData = null;
  state.remaining = Number(paper.timeLimit || 90) * 60;
  state.startTime = Date.now();
  state.timerWarningShown = false;
  state.submitting = false;
  state.examNavOpen = false;
  el.overlayTitle.textContent = `${paper.code} - ${paper.title}`;
  if (el.overlayMetricLabel) el.overlayMetricLabel.textContent = 'Time';
  el.mockOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  enterFullscreen();
  setTimeout(() => { if (state.examActive && !state.examLocked) state.examProtectionArmed = true; }, 3000);
  renderMockQuestion();
  startTimer();
}

function closeMock() {
  closeCenterModal();
  el.mockOverlay.classList.remove('active');
  document.body.style.overflow = '';
  clearInterval(state.timer);
  state.examActive = false;
  state.examLocked = false;
  state.examProtectionArmed = false;
  state.lockReason = '';
  state.resultData = null;
  state.submitting = false;
  state.timerWarningShown = false;
  state.examNavOpen = false;
  if (el.timerWarning) el.timerWarning.style.display = 'none';
  if (el.overlayTimer) el.overlayTimer.classList.remove('warning', 'critical');
  exitFullscreen();
}

async function submitMock() {
  if (state.submitting) return;
  state.submitting = true;
  captureAnswer();
  clearInterval(state.timer);
  let score = 0, total = 0;
  for (let i = 0; i < state.activeQuestions.length; i++) {
    const q = state.activeQuestions[i];
    const marks = questionTotalMarks(q);
    total += marks;
    const ans = state.selected[q.id];
    const type = q.type || 'mcq';
    let correct = false, gained = 0;
    if (type === 'mcq' || type === 'screenshot') { correct = String(ans) !== '' && String(ans) === String(q.correct); gained = correct ? marks : 0; }
    else if (type === 'dropdown') { const correctIndex = Number(q.correctIndex ?? q.correct); correct = String(ans) !== '' && String(ans) === String(correctIndex); gained = correct ? marks : 0; }
    else if (type === 'multi') { const student = JSON.stringify((Array.isArray(ans) ? ans : []).map(v => String(v)).sort()); const correctArr = JSON.stringify((Array.isArray(q.correct) ? q.correct : []).map(v => String(v)).sort()); correct = student === correctArr; gained = correct ? marks : 0; }
    else if (type === 'fill') {
      const given = Array.isArray(ans) ? ans : [ans];
      const corrects = Array.isArray(q.answers) && q.answers.length ? q.answers : (q.answer ? [q.answer] : []);
      const altRaw = Array.isArray(q.altAnswers) ? q.altAnswers : [];
      const altLists = corrects.map((_, idx) => { const item = altRaw[idx]; if (Array.isArray(item)) return item; if (typeof item === 'string') return item.split(/[,|]/).map(v => v.trim()).filter(Boolean); return []; });
      const matchedCount = corrects.filter((correct, idx) => answerMatches(given[idx] || '', correct, altLists[idx])).length;
      const allMatch = corrects.length > 0 && matchedCount === corrects.length;
      correct = allMatch; gained = corrects.length ? Math.round((marks * matchedCount / corrects.length) * 100) / 100 : 0;
    } else if (type === 'sectionb') {
      const scored = scoreSectionBHtml(q, Array.isArray(ans) ? ans : []);
      correct = scored.total > 0 && scored.gained === scored.total;
      gained = scored.gained;
    } else {
      correct = answerMatches(ans || '', q.correct || q.answer || '', Array.isArray(q.altAnswers) ? q.altAnswers : []);
      gained = correct ? marks : 0;
    }
    score += gained;
  }
  const paperTotal = Number(state.activePaper?.totalMarks || 0);
  const totalForResult = paperTotal > 0 ? paperTotal : total;
  const percentage = totalForResult ? Math.round((score / totalForResult) * 100) : 0;
  const answered = state.activeQuestions.filter(questionHasAnswer).length;
  const reviewed = Object.keys(state.reviewed || {}).filter(k => state.reviewed[k]).length;
  const timeTakenSec = Math.max(0, Math.round((Date.now() - (state.startTime || Date.now())) / 1000));
  const studentName = (state.studentName || state.user?.displayName || state.user?.email || 'Student').trim();

  try {
    await db.collection('mockAttempts').add({
      userId: state.user ? state.user.uid : '',
      userEmail: state.user ? state.user.email || '' : '',
      studentName,
      paperId: state.activePaper.id,
      paperCode: state.activePaper.code || '',
      paperTitle: state.activePaper.title || '',
      score,
      total: totalForResult,
      percentage,
      answered,
      reviewedCount: reviewed,
      timeTakenSec,
      answers: state.selected,
      reviewed: state.reviewed,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch (err) {
    console.error('Failed to save attempt:', err);
    alert('Could not save your attempt. Please check your connection and try again.');
    state.submitting = false;
    return;
  }

  state.examActive = false;
  state.submitting = false;
  state.resultData = {
    paperCode: state.activePaper.code || '',
    paperTitle: state.activePaper.title || '',
    studentName,
    score,
    total: totalForResult,
    percentage,
    answered,
    reviewed,
    timeTakenSec
  };
  state.activeQuestions = [];
  state.currentIndex = 0;
  el.mockOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  exitFullscreen();
  renderResultPage();
  await refreshAll();
}

function renderResultPage() {
  const rd = state.resultData;
  if (!rd) return;
  el.overlayTitle.textContent = 'Exam Results';
  if (el.overlayMetricLabel) el.overlayMetricLabel.textContent = 'Score';
  el.overlayTimer.textContent = `${rd.score}/${rd.total}`;
  el.overlayBody.innerHTML = `
    <div class="result-shell">
      <div class="card">
        <div class="section-head">
          <div>
            <h2 class="title" style="margin-bottom:6px;">${esc(rd.paperTitle || 'Exam Results')}</h2>
            <p class="sub" style="margin-bottom:0;">${esc(rd.paperCode || '')} - ${esc(rd.studentName || 'Student')} - Completed attempt</p>
          </div>
          <div class="btn-row"><button class="btn btn-ghost" onclick="window.closeMock()">Back to Dashboard</button></div>
        </div>
        <div class="result-summary">
          <div class="result-card result-ok"><h3>Score</h3><div style="font-size:2rem;font-weight:900;">${rd.score}/${rd.total}</div></div>
          <div class="result-card"><h3>Percentage</h3><div style="font-size:2rem;font-weight:900;">${rd.percentage}%</div></div>
          <div class="result-card"><h3>Answered</h3><div style="font-size:2rem;font-weight:900;">${rd.answered}</div></div>
          <div class="result-card"><h3>Time Taken</h3><div style="font-size:2rem;font-weight:900;">${fmtTime(rd.timeTakenSec || 0)}</div></div>
        </div>
      </div>
    </div>`;
}

/* Global exam protection */
window.addEventListener('blur', () => { if (state.examActive) lockExam('Browser focus changed.'); });
document.addEventListener('visibilitychange', () => { if (document.hidden && state.examActive) lockExam('Tab switch detected.'); });
window.addEventListener('beforeunload', e => { if (state.examActive) { e.preventDefault(); e.returnValue = ''; } });

/* Modal events */
if(el.submitMockBtn) el.submitMockBtn.addEventListener('click', requestSubmitMock);
if(el.centerModalCancelBtn) el.centerModalCancelBtn.addEventListener('click', closeCenterModal);
if(el.centerModalConfirmBtn) el.centerModalConfirmBtn.addEventListener('click', () => { if (typeof state.centerModalAction === 'function') { const ok = state.centerModalAction(); if (ok === false) return; } closeCenterModal(); });
if(el.centerModalInput) el.centerModalInput.addEventListener('keydown', e => { if (e.key === 'Enter') el.centerModalConfirmBtn.click(); });

/* Menu events */
el.menuBtns.forEach(btn => btn.addEventListener('click', () => showView(btn.dataset.view)));

/* Init */
refreshAll();
</script>
</body>
</html>
