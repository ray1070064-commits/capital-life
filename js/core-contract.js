// Shared API contract for the native web game.
 // The public frontend uses only semantic GameEngine actions; legacy UI controls
 // are no longer part of the production browser path.
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
  ],
  nativeOnly: true,
});

export function isKnownCoreAction(action = '') {
  const value = String(action);
  return CORE_CONTRACT.coreActionPrefixes.some(prefix => value === prefix || value.startsWith(prefix));
}
