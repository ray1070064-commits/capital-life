import {
  loadCompanyPanel,
  loadFamilyPanel,
  loadLifePanel,
  loadNewsPanel,
  loadPowerPanel,
  loadProgressPanel,
  loadSaveTools,
  loadSettlementPanel,
} from './api.js';
import {
  getState,
  setCompanyPanel,
  setFamilyPanel,
  setLifePanel,
  setNewsPanel,
  setPowerPanel,
  setProgressPanel,
  setSaveTools,
  setSettlementPanel,
} from './state.js';
import { toast } from './ui.js';

const loaders = {
  life: async () => {
    const payload = await loadLifePanel();
    setLifePanel(payload?.life_panel || null);
    const family = await loadFamilyPanel();
    setFamilyPanel(family?.family_panel || null);
  },
  company: async () => {
    const payload = await loadCompanyPanel();
    setCompanyPanel(payload?.company_panel || null);
  },
  politics: async () => {
    const payload = await loadPowerPanel();
    setPowerPanel(payload?.power_panel || null);
  },
  news: async () => {
    const payload = await loadNewsPanel();
    setNewsPanel(payload?.news_panel || null);
  },
  progress: async () => {
    const payload = await loadProgressPanel();
    setProgressPanel(payload?.progress_panel || null);
  },
  settlement: async () => {
    const payload = await loadSettlementPanel();
    setSettlementPanel(payload?.settlement_panel || null);
  },
  save: async () => {
    const payload = await loadSaveTools();
    setSaveTools(payload?.save_tools || null);
  },
};

const inFlight = new Map();
const loaded = new Set();

async function refreshView(view, force = false) {
  const state = getState();
  if (!state.connected || !state.server?.world?.game_started) return;
  const loader = loaders[view];
  if (!loader) return;
  if (!force && loaded.has(view)) return;
  if (inFlight.has(view)) return inFlight.get(view);

  const promise = (async () => {
    try {
      await loader();
      loaded.add(view);
    } catch (error) {
      toast(error?.message || `無法載入「${view}」資料`, 'error');
    } finally {
      inFlight.delete(view);
    }
  })();

  inFlight.set(view, promise);
  return promise;
}

document.addEventListener('click', event => {
  const nav = event.target.closest('.nav-button[data-view]');
  if (!nav) return;
  const view = String(nav.dataset.view || '');
  if (loaders[view]) window.setTimeout(() => refreshView(view), 0);
});

// GameState 由 app.js 更新，但不發出專用的「新遊戲完成」事件；
// 因此用低頻輪詢補上首次進入各頁的資料同步，避免頁面長期停在空殼。
window.setInterval(() => {
  const state = getState();
  if (!state.connected || !state.server?.world?.game_started) return;
  const view = String(state.ui.activeView || '');
  if (loaders[view]) refreshView(view);
}, 1500);

// 玩家從新遊戲／存檔返回交易頁後，先預熱首頁之外最常用的資訊頁。
window.setTimeout(() => {
  const state = getState();
  if (state.connected && state.server?.world?.game_started) {
    refreshView('life');
    refreshView('news');
    refreshView('progress');
  }
}, 1200);
