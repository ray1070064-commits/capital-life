import { getState, patchUI } from './state.js';

document.addEventListener('click', event => {
  const tab = event.target.closest('[data-asset-info-tab]');
  if (tab) {
    patchUI({ assetInfoTab: String(tab.dataset.assetInfoTab || 'overview') });
    return;
  }
  const filter = event.target.closest('[data-asset-info-filter]');
  if (filter) {
    patchUI({ assetInfoNewsFilter: String(filter.dataset.assetInfoFilter || '全部'), assetInfoTab: 'news' });
  }
});

window.addEventListener('capital-life:refresh-panels', () => {
  const state = getState();
  if (state.ui.activeView === 'trading' && !state.ui.assetInfoTab) patchUI({ assetInfoTab: 'overview' });
});
