import { loadGameState } from './api.js';
import { getState, setServerState } from './state.js';

const POLL_MS = 2500;
let inFlight = false;
let lastFingerprint = '';

function fingerprint(state) {
  if (!state) return '';
  const world = state.world || {};
  const player = state.player || {};
  const market = state.market || {};
  return JSON.stringify([
    world.day,
    world.game_started,
    world.game_over,
    player.cash,
    player.net_worth,
    market.selected_symbol,
    Array.isArray(market.watchlist) ? market.watchlist.map(x => [x.symbol, x.price, x.change_pct]) : [],
    Array.isArray(state.portfolio?.positions)
      ? state.portfolio.positions.map(x => [x.symbol, x.size, x.unrealized_pnl])
      : [],
  ]);
}

async function refreshState() {
  const current = getState();
  if (!current.connected || !current.server?.world?.game_started || inFlight) return;

  inFlight = true;
  try {
    const payload = await loadGameState(false);
    const next = payload?.state || payload?.game_state || payload;
    if (!next) return;
    const nextFingerprint = fingerprint(next);
    if (nextFingerprint && nextFingerprint !== lastFingerprint) {
      lastFingerprint = nextFingerprint;
      setServerState(next);
      window.dispatchEvent(new CustomEvent('capital-life:refresh-panels'));
    }
  } catch {
    // Primary action flow handles user-visible request errors; this background sync stays quiet.
  } finally {
    inFlight = false;
  }
}

window.setInterval(refreshState, POLL_MS);
window.setTimeout(refreshState, 1800);
