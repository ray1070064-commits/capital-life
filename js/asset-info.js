import { escapeHtml, formatMoney, formatPercent } from './ui.js';

function money(value) { return formatMoney(Number(value || 0)); }
function pct(value, digits = 2) { return `${(Number(value || 0) * 100).toFixed(digits)}%`; }

function overview(info) {
  const f = info.financials;
  return `<div class="asset-info-content">
    <div class="asset-profile"><strong>${escapeHtml(info.profile?.nature || '')}</strong><p>${escapeHtml(info.profile?.description || '')}</p><span>${escapeHtml(info.profile?.sector || '')}｜${escapeHtml(info.profile?.category || '')}</span></div>
    ${f ? `<div class="info-metric-grid">${[['市值', money(f.marketCap)],['季度營收',money(f.quarterRevenue)],['季度獲利',money(f.quarterProfit)],['淨利率',pct(f.netMargin)],['自由現金流',money(f.freeCashFlow)],['FCF Margin',pct(f.fcfMargin)],['負債／市值',pct(f.debtRatio)],['P/E',`${Number(f.currentPe || 0).toFixed(1)}x`],['EPS',money(f.eps)]].map(([l,v]) => `<div class="metric-card"><span>${escapeHtml(l)}</span><strong>${escapeHtml(v)}</strong></div>`).join('')}</div>` : '<div class="empty-state">此標的沒有股票財務報表欄位。</div>'}
  </div>`;
}

function dividend(info) {
  const d = info.dividend || {};
  return `<div class="asset-info-content"><div class="dividend-hero"><div><span>收益類型</span><strong>${escapeHtml(d.type || '無')}</strong></div><div><span>年化殖利率</span><strong>${d.annualYield > 0 ? escapeHtml(pct(d.annualYield)) : '—'}</strong></div><div><span>預估單次／每單位</span><strong>${d.estimatedPerShare > 0 ? escapeHtml(money(d.estimatedPerShare)) : '—'}</strong></div><div><span>下次預估</span><strong>${d.nextDay ? `Day ${Number(d.nextDay)}` : '—'}</strong></div></div>${d.annualYield > 0 ? `<div class="info-metric-grid compact"><div class="metric-card"><span>配發率</span><strong>${escapeHtml(pct(d.payoutRatio))}</strong></div><div class="metric-card"><span>週期</span><strong>約 ${Number(d.intervalDays || 90)} 日</strong></div></div>` : ''}</div>`;
}

function fund(info) {
  if (!info.fund) return '<div class="asset-info-content"><div class="empty-state">此標的不是基金／ETF。</div></div>';
  const components = Array.isArray(info.fund.components) ? info.fund.components : [];
  const max = Math.max(...components.map(row => Number(row.weight || 0)), 0.01);
  return `<div class="asset-info-content"><div class="fund-summary"><span>年費率</span><strong>${escapeHtml(pct(info.fund.expenseRatio,3))}</strong></div><div class="component-list">${components.map(row => `<div class="component-row"><div class="component-label"><strong>${escapeHtml(row.symbol)}</strong><span>${escapeHtml(row.name)}</span></div><div class="component-track"><i style="width:${Math.max(4, Number(row.weight || 0) / max * 100)}%"></i></div><strong>${escapeHtml(pct(row.weight,1))}</strong></div>`).join('')}</div></div>`;
}

function news(info, filter) {
  const levels = ['全部','重大','重要','財報','一般'];
  const rows = (Array.isArray(info.news) ? info.news : []).filter(row => filter === '全部' || String(row.importance || '一般') === filter);
  return `<div class="asset-info-content"><div class="news-filter">${levels.map(level => `<button class="button compact ${level === filter ? 'primary' : ''}" data-asset-info-filter="${escapeHtml(level)}">${escapeHtml(level)}</button>`).join('')}</div><div class="structured-news-list">${rows.length ? rows.map(row => `<article class="structured-news-row"><div class="news-badges"><span>${escapeHtml(row.importance || '一般')}</span><span>${escapeHtml(row.category || '市場')}</span><span>Day ${Number(row.day || 0)}</span></div><strong>${escapeHtml(row.title || '市場消息')}</strong><p>${escapeHtml(row.desc || '')}</p></article>`).join('') : '<div class="empty-state">目前沒有符合條件的新聞。</div>'}</div></div>`;
}

function ptt(state) {
  const p = state.ui.pttPanel || {};
  const rows = Array.isArray(p.rows) ? p.rows : [];
  const marker = prefix => prefix === '推' ? '🟢' : prefix === '噓' ? '🔴' : '⚪';
  return `<div class="asset-info-content"><div class="ptt-toolbar"><strong>模擬鄉民聊天室</strong><button class="button compact" data-ptt-refresh ${state.connected ? '' : 'disabled'}>換一批</button></div><div class="ptt-feed">${rows.length ? rows.map(row => `<div class="ptt-row"><strong>${marker(row.prefix)} ${escapeHtml(row.user)}</strong><span>${escapeHtml(row.message)}</span></div>`).join('') : '<div class="empty-state">PTT 資訊載入中。</div>'}</div></div>`;
}

function depth(info) {
  const d = info.depth || { bids: [], asks: [], spreadPct: 0, imbalance: 0 };
  const bids = Array.isArray(d.bids) ? d.bids : [];
  const asks = Array.isArray(d.asks) ? d.asks : [];
  const max = Math.max(...bids.concat(asks).map(row => Number(row.size || 0)), 1);
  const side = (rows, cls) => `<div class="depth-side ${cls}"><div class="depth-head"><span>${cls === 'asks' ? '賣價' : '買價'}</span><span>量</span></div>${rows.map(row => `<div class="depth-level"><i style="width:${Number(row.size || 0) / max * 100}%"></i><strong>${Number(row.price || 0) >= 100 ? Number(row.price).toFixed(2) : Number(row.price || 0).toFixed(4)}</strong><span>${Number(row.size || 0).toLocaleString()}</span></div>`).join('')}</div>`;
  return `<div class="asset-info-content depth-content"><div class="depth-summary"><div class="metric-card"><span>Spread</span><strong>${Number(d.spreadPct || 0).toFixed(3)}%</strong></div><div class="metric-card"><span>買賣失衡</span><strong>${Number(d.imbalance || 0) >= 0 ? '+' : ''}${(Number(d.imbalance || 0) * 100).toFixed(1)}%</strong></div></div><div class="depth-book">${side([...asks].reverse(),'asks')}<div class="depth-mid">MID</div>${side(bids,'bids')}</div></div>`;
}

export function renderAssetInfo(state, selected) {
  const info = state.ui.marketPanel?.asset_info;
  if (!info || String(info.symbol) !== String(selected)) return '';
  const tab = String(state.ui.assetInfoTab || 'overview');
  const filter = String(state.ui.assetInfoNewsFilter || '全部');
  const tabs = [['overview','概況'],['dividend','配息／收益'],...(info.fund ? [['fund','ETF 成分']] : []),['news','新聞'],['ptt','PTT'],['depth','市場深度']];
  let body = overview(info);
  if (tab === 'dividend') body = dividend(info);
  else if (tab === 'fund') body = fund(info);
  else if (tab === 'news') body = news(info, filter);
  else if (tab === 'ptt') body = ptt(state);
  else if (tab === 'depth') body = depth(info);
  return `<section class="panel asset-info-panel"><div class="panel-header">${escapeHtml(info.profile?.category || '標的')}｜${escapeHtml(selected)}｜${escapeHtml(info.profile?.sector || '')}</div><div class="asset-info-tabs">${tabs.map(([id,label]) => `<button class="button compact ${id === tab ? 'primary' : ''}" data-asset-info-tab="${id}">${escapeHtml(label)}</button>`).join('')}</div>${body}</section>`;
}
