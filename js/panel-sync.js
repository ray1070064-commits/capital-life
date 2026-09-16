import {
  loadCompanyPanel,
  loadFamilyPanel,
  loadLifePanel,
  loadMarketPanel,
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
  setMarketPanel,
  setNewsPanel,
  setPowerPanel,
  setProgressPanel,
  setSaveTools,
  setSettlementPanel,
} from './state.js';
import { toast } from './ui.js';

const loaders = {
  trading: async () => {
    const payload = await loadMarketPanel();
    setMarketPanel(payload?.market_panel || null);
  },
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
const lastLoadedAt = new Map();
const REFRESH_TTL_MS = 4500;

async function refreshView(view, force = false) {
  const state = getState();
  if (!state.connected || !state.server?.world?.game_started) return;
  const loader = loaders[view];
  if (!loader) return;

  const now = Date.now();
  if (!force && now - Number(lastLoadedAt.get(view) || 0) < REFRESH_TTL_MS) return;
  if (inFlight.has(view)) return inFlight.get(view);

  const promise = (async () => {
    try {
      await loader();
      lastLoadedAt.set(view, Date.now());
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
  if (loaders[view]) window.setTimeout(() => refreshView(view, true), 0);
});

window.addEventListener('capital-life:refresh-panels', () => {
  const view = String(getState().ui.activeView || '');
  if (loaders[view]) refreshView(view, true);
});

window.setInterval(() => {
  const state = getState();
  if (!state.connected || !state.server?.world?.game_started) return;
  const view = String(state.ui.activeView || '');
  if (loaders[view]) refreshView(view);
}, 1500);

window.setTimeout(() => {
  const state = getState();
  if (state.connected && state.server?.world?.game_started) {
    refreshView('trading', true);
    refreshView('life', true);
    refreshView('news', true);
    refreshView('progress', true);
  }
}, 1200);
