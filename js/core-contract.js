// Shared migration contract mirrored from app/web_integration_contract.py.
// Keep endpoint names stable while the legacy Streamlit core is exposed through
// the private migration API.
export const CORE_CONTRACT = Object.freeze({
  frontendRepository: 'ray1070064-commits/capital-life',
  domains: [
    'market', 'life', 'family', 'company', 'politics',
    'news', 'ptt', 'progress', 'settlement', 'save',
  ],
  panels: Object.freeze({
    market: '/market',
    life: '/life',
    family: '/family',
    company: '/company',
    politics: '/power',
    news: '/news',
    ptt: '/ptt',
    progress: '/progress',
    settlement: '/settlement',
    save: '/save-tools',
  }),
  coreActionPrefixes: [
    'trade', 'advance_time', 'life_', 'family_', 'company_',
    'politics_', 'underworld_', 'insider_', 'settlement_',
    'legacy_widget',
  ],
  legacyCompatibility: Object.freeze({
    enabled: true,
    // Source-of-truth inventory from app.py:
    // 144 unique literal widget keys + 51 dynamic/no-key widget callsites.
    fixedControlKeyCount: 144,
    dynamicWidgetCallSiteCount: 51,
    totalWidgetCallSites: 195,
    endpoint: '/ui',
    action: 'legacy_widget',
  }),
});

export function isKnownCoreAction(action = '') {
  const value = String(action);
  return CORE_CONTRACT.coreActionPrefixes.some(prefix => value === prefix || value.startsWith(prefix));
}
