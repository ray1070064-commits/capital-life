import { escapeHtml } from './ui.js';
import { renderView as renderBaseView } from './views.js';
import { renderNativeCompany } from './company.js';
import { renderNativeNews, renderNativeProgress } from './content.js';
import { renderFamilySections } from './family.js';
import { renderNativeLife } from './life.js';
import { renderLaunchScreen } from './launch.js';
import { renderNativePower } from './power.js';
import { renderNativeSave } from './save.js';
import { renderNativeSettlement } from './settlement.js';
import { renderAdvancedTrading } from './trading.js';

function metric(label, value) {
  return `<div class="metric-card"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
}

function renderNativeSettings(state) {
  const server = state.server || {};
  const world = server.world || {};
  const saveTools = state.ui.saveTools || {};
  const connected = Boolean(state.connected);
  const started = Boolean(world.game_started);
  const gameOver = Boolean(world.game_over);
  const sessionId = String(server.session_id || server.session?.id || '未提供');
  const activeView = String(state.ui.activeView || 'trading');

  return `
    <div class="page-header">
      <div>
        <h1 class="page-title">系統中心</h1>
        <div class="page-subtitle">連線、Session、存檔與 Native 核心狀態都在這裡集中管理。</div>
      </div>
      <div class="toolbar">
        <button class="button" data-system-refresh ${connected ? '' : 'disabled'}>重新整理全部面板</button>
      </div>
    </div>
    <section class="panel">
      <div class="panel-header">執行狀態</div>
      <div class="panel-body">
        <div class="metric-grid">
          ${metric('後端連線', connected ? 'ONLINE' : 'OFFLINE')}
          ${metric('遊戲狀態', gameOver ? '已結束' : started ? '進行中' : '尚未開始')}
          ${metric('目前頁面', activeView)}
          ${metric('Day', Number(world.day || 0) > 0 ? String(Number(world.day)) : '—')}
        </div>
      </div>
    </section>
    <section class="panel">
      <div class="panel-header">Session 與存檔</div>
      <div class="panel-body">
        <div class="metric-grid">
          ${metric('Session', sessionId)}
          ${metric('自動存檔', saveTools.autosave_enabled === false ? '關閉' : '開啟')}
          ${metric('新版本機存檔', saveTools.exists ? '已存在' : '尚無')}
        </div>
        <div class="button-row" style="margin-top:14px">
          <button class="button primary" data-save-now ${started && connected ? '' : 'disabled'}>立即儲存</button>
          <button class="button" data-save-load ${connected ? '' : 'disabled'}>載入本機存檔</button>
          <button class="button" data-system-clear-save>刪除本機存檔</button>
        </div>
      </div>
    </section>
    <section class="panel">
      <div class="panel-header">自動存檔</div>
      <div class="panel-body">
        <label class="field" style="display:flex;gap:10px;align-items:center;margin:0">
          <input type="checkbox" data-save-autosave ${saveTools.autosave_enabled === false ? '' : 'checked'} ${connected ? '' : 'disabled'} />
          <span>成功完成遊戲操作後，自動保存後端驗證的加密進度。</span>
        </label>
      </div>
    </section>
    <section class="panel">
      <div class="panel-header">Native 核心覆蓋</div>
      <div class="panel-body">
        <div class="content-grid three">
          ${['股票交易','市場新聞 / PTT','人生 / 家庭','公司 / IPO','政治 / 法律','生涯 / 稱號'].map(label => `<article class="content-card"><strong>${escapeHtml(label)}</strong><p class="muted">由私有後端 GameState 驅動，前端不保存核心規則。</p></article>`).join('')}
        </div>
      </div>
    </section>
  `;
}

export function renderView(state) {
  if (state?.ui?.activeView === 'start') return renderLaunchScreen(state);
  if (state?.ui?.activeView === 'settlement') return renderNativeSettlement(state);
  if (state?.ui?.activeView === 'trading') return renderAdvancedTrading(state);
  if (state?.ui?.activeView === 'life') return `${renderNativeLife(state)}${renderFamilySections(state)}`;
  if (state?.ui?.activeView === 'company') return renderNativeCompany(state);
  if (state?.ui?.activeView === 'politics') return renderNativePower(state);
  if (state?.ui?.activeView === 'news') return renderNativeNews(state);
  if (state?.ui?.activeView === 'progress') return renderNativeProgress(state);
  if (state?.ui?.activeView === 'save') return renderNativeSave(state);
  if (state?.ui?.activeView === 'settings') return renderNativeSettings(state);
  return renderBaseView(state);
}
