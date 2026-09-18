import { escapeHtml, formatMoney } from './ui.js';

function optionList(jobs = []) {
  if (!jobs.length) return '<option value="">等待後端載入工作清單</option>';
  return jobs.map(job => `
    <option value="${escapeHtml(job.key)}">
      ${escapeHtml(job.name)}｜日薪 ${escapeHtml(formatMoney(job.daily_salary))}
    </option>
  `).join('');
}

const tutorialSteps = [
  ['市場清單', '先從左側市場清單選擇想觀察的標的。'],
  ['K 線圖', '中央區域會顯示目前標的的價格走勢與市場資訊。'],
  ['買賣下單', '右側下單區可以選擇交易方向、價格與數量。'],
  ['持倉與損益', '下單後可在持倉區查看成本、現價與損益。'],
  ['推進時間', '完成操作後推進時間，市場與人生事件會繼續發展。'],
  ['開始你的策略', '熟悉基本操作後，就可以自行決定投資與人生路線。']
];

let tutorialIndex = 0;
let tutorialOpen = false;

function closeTutorial() {
  const panel = document.getElementById('capital-life-tutorial');
  if (panel) panel.remove();
  tutorialOpen = false;
}

function renderTutorial() {
  const old = document.getElementById('capital-life-tutorial');
  if (old) old.remove();

  const [title, text] = tutorialSteps[tutorialIndex];
  const last = tutorialIndex === tutorialSteps.length - 1;
  const panel = document.createElement('div');
  panel.id = 'capital-life-tutorial';
  panel.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.58);display:flex;align-items:center;justify-content:center;padding:24px;box-sizing:border-box;';
  panel.innerHTML = `
    <div style="width:min(560px,92vw);background:#111923;color:#fff;border:1px solid rgba(255,255,255,.16);border-radius:18px;padding:26px;box-shadow:0 24px 80px rgba(0,0,0,.45);font-family:inherit;">
      <div style="font-size:12px;letter-spacing:.12em;opacity:.65;margin-bottom:8px;">CAPITAL LIFE · BEGINNER GUIDE</div>
      <h2 style="margin:0 0 12px;font-size:25px;">${title}</h2>
      <p style="margin:0;line-height:1.8;opacity:.86;">${text}</p>
      <div style="margin-top:22px;font-size:13px;opacity:.55;">第 ${tutorialIndex + 1} / ${tutorialSteps.length} 步</div>
      <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:18px;">
        <button type="button" data-tutorial-close style="padding:9px 14px;border-radius:9px;border:1px solid rgba(255,255,255,.18);background:transparent;color:#fff;cursor:pointer;">稍後再看</button>
        ${tutorialIndex > 0 ? '<button type="button" data-tutorial-prev style="padding:9px 14px;border-radius:9px;border:0;background:#283444;color:#fff;cursor:pointer;">上一步</button>' : ''}
        <button type="button" data-tutorial-next style="padding:9px 16px;border-radius:9px;border:0;background:#fff;color:#111;cursor:pointer;">${last ? '完成教學' : '下一步'}</button>
      </div>
    </div>`;

  document.body.appendChild(panel);
  panel.querySelector('[data-tutorial-close]')?.addEventListener('click', closeTutorial);
  panel.querySelector('[data-tutorial-prev]')?.addEventListener('click', () => {
    tutorialIndex = Math.max(0, tutorialIndex - 1);
    renderTutorial();
  });
  panel.querySelector('[data-tutorial-next]')?.addEventListener('click', () => {
    if (last) {
      closeTutorial();
      try { localStorage.setItem('capital-life-tutorial-seen', '1'); } catch (_) {}
      return;
    }
    tutorialIndex += 1;
    renderTutorial();
  });
  tutorialOpen = true;
}

function startTutorialIfEnabled() {
  const enabled = document.getElementById('start-tutorial')?.checked;
  if (!enabled) return;
  tutorialIndex = 0;
  setTimeout(() => {
    if (!tutorialOpen) renderTutorial();
  }, 900);
}

document.addEventListener('click', event => {
  const button = event.target.closest?.('[data-game-action="new_game"]');
  if (button && !button.disabled) startTutorialIfEnabled();
});

export function renderLaunchScreen(state) {
  const config = state.ui.startup || {};
  const balance = config.balance || {};
  const age = config.age || {};
  const jobs = Array.isArray(config.jobs) ? config.jobs : [];
  const ready = Boolean(state.connected && jobs.length);
  const balanceMin = Number(balance.min ?? 10000);
  const balanceMax = Number(balance.max ?? 5000000);

  return `
    <section class="launch-screen">
      <div class="launch-orb launch-orb-a"></div>
      <div class="launch-orb launch-orb-b"></div>

      <header class="launch-header">
        <div class="launch-brand">
          <div class="launch-logo">CL</div>
          <div>
            <strong>資本人生</strong>
            <span>Capital Life</span>
          </div>
        </div>
        <div class="launch-status ${state.connected ? 'is-online' : 'is-offline'}">
          <i></i>${state.connected ? '遊戲核心已連線' : '等待遊戲核心連線'}
        </div>
      </header>

      <div class="launch-layout">
        <section class="launch-copy">
          <div class="launch-kicker">LIFE × CAPITAL × MARKET</div>
          <h1>在市場累積資本，<br>在人生承擔選擇。</h1>
          <p>《資本人生》是一款以股票交易為核心的網頁投資遊戲，結合股票模擬、人生模擬、職涯、家庭、公司經營與 IPO；由 AI 協作製作，但市場結果與遊戲規則都由私有後端運算。</p>
          <div class="launch-features">
            <span>股票模擬與多空交易</span>
            <span>投資與資產配置</span>
            <span>職涯與人生模擬</span>
            <span>公司經營與 IPO</span>
          </div>
        </section>

        <section class="launch-card">
          <div class="launch-card-head">
            <div>
              <span>NEW GAME</span>
              <h2>開始新人生</h2>
            </div>
            <div class="launch-step">01</div>
          </div>

          <div class="launch-form-grid">
            <label class="launch-field">
              <span>起始資金</span>
              <input id="start-balance" class="input" type="number" min="${escapeHtml(balanceMin)}" max="${escapeHtml(balanceMax)}" step="${escapeHtml(balance.step ?? 10000)}" value="${escapeHtml(balance.default ?? 100000)}" />
              <small class="launch-range">最小 ${escapeHtml(formatMoney(balanceMin))}　·　最大 ${escapeHtml(formatMoney(balanceMax))}</small>
            </label>

            <label class="launch-field">
              <span>起始年齡</span>
              <input id="start-age" class="input" type="number" min="${escapeHtml(age.min ?? 18)}" max="${escapeHtml(age.max ?? 60)}" step="1" value="${escapeHtml(age.default ?? 25)}" />
            </label>

            <label class="launch-field launch-field-wide">
              <span>開局工作</span>
              <select id="start-job" class="select">${optionList(jobs)}</select>
            </label>

            <label class="launch-field launch-field-wide">
              <span>世界 Seed <small>可留空隨機</small></span>
              <input id="start-seed" class="input" type="text" maxlength="${escapeHtml(config.seed?.max_length ?? 64)}" placeholder="例如 CAPITAL-2026" autocomplete="off" />
            </label>
          </div>

          <label class="launch-tutorial">
            <input id="start-tutorial" type="checkbox" ${config.tutorial_default === false ? '' : 'checked'} />
            <span><strong>啟用股票核心教學</strong><small>第一次遊玩建議開啟</small></span>
          </label>

          <div class="launch-quick-actions">
            <button class="button" data-game-action="quick_start" ${ready ? '' : 'disabled'}>快速開始／隨機人生</button>
            <button class="button" data-quick-reroll ${ready ? '' : 'disabled'}>重新隨機</button>
          </div>

          <button class="launch-start-button" data-game-action="new_game" ${ready ? '' : 'disabled'}>
            <span>開始遊戲</span><b>→</b>
          </button>
          <button class="launch-load-button" data-game-action="load_save" ${state.connected ? '' : 'disabled'}>
            載入這台瀏覽器的加密存檔
          </button>

          <p class="launch-note">所有市場生成、事件機率與遊戲規則都在 Private Backend 執行；公開前端不保存核心公式。</p>
        </section>
      </div>

      <footer class="launch-footer">
        <span>CAPITAL LIFE · PRIVATE GAME CORE · WEB CLIENT</span>
        <a class="launch-about-link" href="./about.html">遊戲介紹</a>
      </footer>
    </section>
  `;
}
