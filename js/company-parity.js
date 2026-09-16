import { escapeHtml, formatMoney, formatPercent } from './ui.js';

function metric(label, value) {
  return `<div class="metric-card"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
}

function signedMoney(value) {
  const n = Number(value || 0);
  return `${n >= 0 ? '+' : ''}${formatMoney(n)}`;
}

export function renderCompanyParity(panel) {
  if (!panel?.exists) return '';
  const d = panel.daily || {};
  const q = panel.quarter || {};
  const bs = panel.balance_sheet || {};
  const op = panel.operations || {};
  const c = panel.company || {};
  const debt = panel.debt || {};
  const dividend = panel.dividend || null;
  const shares = panel.public_shares || null;
  const freeCashFlow = Number(q.operating_cashflow || 0) + Number(q.investing_cashflow || 0);
  const priorRevenue = Number(q.last_revenue || 0);
  const priorProfit = Number(q.last_profit || 0);

  return `
    <section class="panel company-wide-panel">
      <div class="panel-header">完整財務報表</div>
      <div class="panel-body company-finance-grid">
        <div>
          <h3>每日損益與成本</h3>
          <div class="metric-grid">
            ${metric('薪資', formatMoney(d.payroll))}
            ${metric('行政', formatMoney(d.admin))}
            ${metric('研發', formatMoney(d.rd))}
            ${metric('行銷', formatMoney(d.marketing))}
            ${metric('資本支出成本', formatMoney(d.capital_cost))}
            ${metric('折舊', formatMoney(d.depreciation))}
            ${metric('利息', formatMoney(d.interest))}
            ${metric('營業現金流', signedMoney(d.operating_cashflow))}
          </div>
        </div>
        <div>
          <h3>季度損益</h3>
          <div class="metric-grid">
            ${metric('本季營收', formatMoney(q.revenue))}
            ${metric('本季淨利', signedMoney(q.profit))}
            ${metric('上季營收', formatMoney(priorRevenue))}
            ${metric('上季淨利', signedMoney(priorProfit))}
            ${metric('稅負', formatMoney(q.tax))}
            ${metric('獲利季度', `${Number(q.profitable_quarters || 0)} 季`)}</div>
        </div>
        <div>
          <h3>現金流量表</h3>
          <div class="metric-grid">
            ${metric('營業現金流', signedMoney(q.operating_cashflow))}
            ${metric('投資現金流', signedMoney(q.investing_cashflow))}
            ${metric('融資現金流', signedMoney(q.financing_cashflow))}
            ${metric('自由現金流', signedMoney(freeCashFlow))}
            ${metric('公司現金', formatMoney(bs.cash))}
            ${metric('負債', formatMoney(bs.debt))}
          </div>
        </div>
        <div>
          <h3>資產負債表</h3>
          <div class="metric-grid">
            ${metric('現金', formatMoney(bs.cash))}
            ${metric('固定資產', formatMoney(bs.fixed_assets))}
            ${metric('研發資產', formatMoney(bs.rd_asset))}
            ${metric('總資產', formatMoney(bs.total_assets))}
            ${metric('股東權益', signedMoney(bs.equity))}
            ${metric('負債／資產', formatPercent(Number(bs.debt_to_assets || 0) * 100))}
          </div>
        </div>
      </div>
    </section>

    <section class="panel company-wide-panel">
      <div class="panel-header">人力、產能與擴張能力</div>
      <div class="panel-body">
        <div class="metric-grid">
          ${metric('產能利用率', formatPercent(Number(op.capacity_utilization || 0) * 100))}
          ${metric('資產支援員工', `${Number(op.asset_supported_employees || 0).toFixed(1)} 人`)}
          ${metric('員工上限', `${Number(op.employee_cap || 0)} 人`)}
          ${metric('剩餘職缺', `${Number(op.remaining_slots || 0)} 人`)}
          ${metric('平均日薪', formatMoney(op.average_salary))}
          ${metric('薪資區間', `${formatMoney(op.salary_low)} ～ ${formatMoney(op.salary_high)}`)}
          ${metric('預估每日薪資', formatMoney(op.daily_payroll_estimate))}
          ${metric('R&D 生產力加成', formatPercent(Number(op.rd_productivity_bonus || 0) * 100))}
          ${metric('R&D 毛利加成', `${Number(op.rd_margin_bonus || 0) * 100 >= 0 ? '+' : ''}${(Number(op.rd_margin_bonus || 0) * 100).toFixed(1)} pp`)}
          ${metric('借款額度', formatMoney(debt.capacity))}
          ${metric('年利率', formatPercent(Number(debt.annual_rate || 0) * 100))}
          ${metric('公司年齡', `${Number(c.age_days || 0)} 天`)}
        </div>
        <div class="life-callout" style="margin-top:12px">
          <strong>營運狀態：${escapeHtml(c.status_name || '—')}</strong>
          <span>董事會支持 ${Number(c.board_support || 0).toFixed(0)}/100｜創辦人持股 ${formatPercent(Number(c.founder_ownership || 0) * 100)}｜控制權 ${escapeHtml(c.control_label || '—')}</span>
        </div>
      </div>
    </section>

    ${c.public && shares && dividend ? `
      <section class="panel company-wide-panel">
        <div class="panel-header">上市公司完整資本市場資料</div>
        <div class="panel-body">
          <div class="metric-grid">
            ${metric('總股數', Number(shares.total_shares || 0).toLocaleString())}
            ${metric('玩家持股', Number(shares.player_shares || 0).toLocaleString())}
            ${metric('玩家持股比', formatPercent(Number(shares.player_pct || 0) * 100))}
            ${metric('公開流通股', Number(shares.public_float || 0).toLocaleString())}
            ${metric('MYCO 現價', formatMoney(shares.price))}
            ${metric('目標殖利率', formatPercent(Number(dividend.target_yield || 0) * 100))}
            ${metric('公司現金保留', formatMoney(dividend.reserve))}
            ${metric('預估總股利', formatMoney(dividend.projected_total))}
            ${metric('預估每股股利', formatMoney(dividend.projected_per_share))}
            ${metric('預估玩家季收入', formatMoney(dividend.projected_player_income))}
            ${metric('上次股利', formatMoney(dividend.last_total))}
            ${metric('累計股利收入', formatMoney(dividend.total_received))}
          </div>
          <div class="muted" style="margin-top:12px">上次股利結算日：Day ${Number(dividend.last_day || 0) || '—'}｜上次每股股利：${formatMoney(dividend.last_per_share)}｜上次玩家收入：${formatMoney(dividend.last_player_income)}</div>
        </div>
      </section>` : ''}
  `;
}
