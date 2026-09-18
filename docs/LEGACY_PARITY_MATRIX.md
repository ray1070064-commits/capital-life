# Legacy → Native 完整 Parity Matrix

> 驗證日期：2026-09-18。此文件把舊 `app.py` 的互動 widget inventory 與目前 `capital-life` Native UI／FastAPI action 對照。`145` 原先是前端 contract 的硬編碼數字，不是舊核心可驗證的固定控制項數量；目前原始碼證明為 **144 個唯一固定 literal key + 51 個 dynamic/no-key widget callsite = 195 個 widget callsite**。因此不製造不存在的第 145 個固定控制項。

## 最終結果

- 固定 literal controls：**144 / 144 已建立功能對應**
- dynamic / no-key widget callsites：**51 / 51 已分類並對應**
- widget callsites：**195 / 195 有 inventory**
- `buy_usd_input`：已補成 Native「數量／投入金額」雙模式。
- `temp_show_days`：已補成 Native 自訂圖表天數滑桿。
- `v165_quick_start`、`v166_reroll_quick`：已補成 Native 快速開始／重新隨機。
- FastAPI backend CI 最新驗證通過；exact inventory workflow 會以 144/51/195 為來源真實基準。

## 144 個固定控制項

| # | 舊控制 key | Native UI / 功能 | Backend action | 是否可操作 |
|---:|---|---|---|---|
| 001 | `v165_continue_game` | 開局／存檔區 | `瀏覽器加密存檔恢復` | ✅ 可操作 |
| 002 | `v165_open_new` | 開局頁 | `UI：開始新局` | ✅ 可操作 |
| 003 | `v165_open_save_tools` | 主導覽／存檔中心 | `UI：切換存檔頁` | ✅ 可操作 |
| 004 | `v165_back_home_from_new` | 開局頁 | `UI：返回開局頁` | ✅ 可操作 |
| 005 | `quick_start_tutorial_v166` | 開局頁教學開關 | `new_game.tutorial_enabled` | ✅ 可操作 |
| 006 | `v166_reroll_quick` | 開局頁「重新隨機」 | `UI randomizer → new_game` | ✅ 已補回 Native |
| 007 | `v165_quick_start` | 開局頁「快速開始」 | `new_game` | ✅ 已補回 Native |
| 008 | `start_init_fund_v165` | 起始資金 | `new_game {init_balance}` | ✅ 可操作 |
| 009 | `start_job_choice_v165` | 開局工作 | `new_game {job_key}` | ✅ 可操作 |
| 010 | `start_age_choice_v165` | 起始年齡 | `new_game {start_age}` | ✅ 可操作 |
| 011 | `new_game_seed_input_v165` | 世界 Seed | `new_game {world_seed}` | ✅ 可操作 |
| 012 | `new_game_tutorial_v165` | 股票核心教學 | `new_game {tutorial_enabled}` | ✅ 可操作 |
| 013 | `v165_custom_go` | 自訂開局 | `new_game` | ✅ 可操作 |
| 014 | `v165_import_from_new` | 新局頁匯入 | `存檔中心／legacy import` | ✅ 可操作 |
| 015 | `v165_save_back` | 存檔頁返回 | `UI：返回開局流程` | ✅ 可操作 |
| 016 | `v165_load_from_save_tools` | 正式存檔載入 | `browser-save import` | ✅ 可操作 |
| 017 | `start_save_code_v165` | 舊版存檔碼輸入 | `legacy-save/import` | ✅ 可操作 |
| 018 | `start_load_code_v165` | 舊版存檔碼載入 | `legacy-save/import` | ✅ 可操作 |
| 019 | `start_save_uploader_v165` | 舊版 JSON/GZ 選檔 | `legacy-save/import` | ✅ 可操作 |
| 020 | `start_load_save_v165` | 舊版檔案載入 | `legacy-save/import` | ✅ 可操作 |
| 021 | `ui_primary_mode_v157` | 市場／人生模式 | `UI state: trading ↔ life` | ✅ 可操作 |
| 022 | `end_game_first_v141` | 結束遊戲第一次確認 | `UI confirmation` | ✅ 可操作 |
| 023 | `end_game_confirm_yes_v141` | 結束遊戲確認 | `settlement_end_game` | ✅ 可操作 |
| 024 | `end_game_confirm_no_v141` | 取消結束遊戲 | `UI confirmation cancel` | ✅ 可操作 |
| 025 | `market_life_policy_v157` | 市場時間推進策略 | `market_set_advance_policy` | ✅ 可操作 |
| 026 | `market_save_now_v157` | 市場頁立即存檔 | `browser-save export/import` | ✅ 可操作 |
| 027 | `title_category_filter_sidebar` | 稱號分類 | `UI filter` | ✅ 可操作 |
| 028 | `title_selector_sidebar` | 選擇稱號 | `progress_select_title` | ✅ 可操作 |
| 029 | `compact_mental_btn` | 心理照護 | `life_health_action {kind: mental_care}` | ✅ 可操作 |
| 030 | `compact_checkup_btn` | 健康檢查 | `life_health_action {kind: checkup}` | ✅ 可操作 |
| 031 | `compact_auto_medical` | 自動就醫 | `life_update_settings` | ✅ 可操作 |
| 032 | `compact_health_threshold` | 健康門檻 | `life_update_settings` | ✅ 可操作 |
| 033 | `compact_stress_threshold` | 壓力門檻 | `life_update_settings` | ✅ 可操作 |
| 034 | `compact_living_cost` | 每日生活費 | `life_update_settings` | ✅ 可操作 |
| 035 | `learn_skill_choice` | 選擇學習技能 | `life_start_skill_training` | ✅ 可操作 |
| 036 | `start_skill_training` | 開始技能訓練 | `life_start_skill_training` | ✅ 可操作 |
| 037 | `job_apply_pick` | 職涯職種選擇 | `life_apply_job` | ✅ 可操作 |
| 038 | `job_employer_pick` | 雇主選擇 | `life_apply_job` | ✅ 可操作 |
| 039 | `apply_job_btn` | 應徵 | `life_apply_job` | ✅ 可操作 |
| 040 | `promotion_btn` | 升遷 | `life_apply_promotion` | ✅ 可操作 |
| 041 | `advance_days_v156` | 推進天數 | `advance_time` | ✅ 可操作 |
| 042 | `global_auto_life_policy_v156` | 全域人生事件策略 | `market_set_advance_policy` | ✅ 可操作 |
| 043 | `browser_save_v41` | 正式瀏覽器存檔 | `browser-save export` | ✅ 可操作 |
| 044 | `browser_load_v41` | 正式瀏覽器載入 | `browser-save import` | ✅ 可操作 |
| 045 | `browser_autosave_v41` | 自動存檔 | `save_set_autosave + browser-save` | ✅ 可操作 |
| 046 | `browser_delete_v41` | 刪除瀏覽器存檔 | `local encrypted-save delete` | ✅ 可操作 |
| 047 | `prepare_local_code_v35` | 準備舊版存檔碼 | `legacy-save/export` | ✅ 可操作 |
| 048 | `prepare_local_file_v35` | 準備舊版檔案 | `legacy-save/export` | ✅ 可操作 |
| 049 | `local_save_code_display_v35` | 顯示舊版存檔碼 | `UI output` | ✅ 可操作 |
| 050 | `download_full_save_v35` | 下載舊版完整存檔 | `legacy-save/export file` | ✅ 可操作 |
| 051 | `sidebar_import_code_v35` | 側欄匯入存檔碼 | `legacy-save/import` | ✅ 可操作 |
| 052 | `sidebar_load_code_v35` | 側欄載入存檔碼 | `legacy-save/import` | ✅ 可操作 |
| 053 | `sidebar_save_uploader_v35` | 側欄選擇存檔檔案 | `legacy-save/import` | ✅ 可操作 |
| 054 | `sidebar_load_save_v35` | 側欄載入存檔 | `legacy-save/import` | ✅ 可操作 |
| 055 | `watch_remove_selected_v158` | 移除自選股 | `market_watchlist_remove` | ✅ 可操作 |
| 056 | `watch_add_selected_v158` | 加入自選股 | `market_watchlist_add` | ✅ 可操作 |
| 057 | `asset_search_query` | 市場搜尋 | `UI filter` | ✅ 可操作 |
| 058 | `asset_category_filter` | 市場分類 | `UI filter` | ✅ 可操作 |
| 059 | `ind_choice` | 成交量／RSI／MACD | `market_set_indicator_settings` | ✅ 可操作 |
| 060 | `ma1_param` | MA1 | `market_set_indicator_settings` | ✅ 可操作 |
| 061 | `ma2_param` | MA2 | `market_set_indicator_settings` | ✅ 可操作 |
| 062 | `ma3_param` | MA3 | `market_set_indicator_settings` | ✅ 可操作 |
| 063 | `rsi_param` | RSI 週期 | `market_set_indicator_settings` | ✅ 可操作 |
| 064 | `macd_fast_param` | MACD Fast | `market_set_indicator_settings` | ✅ 可操作 |
| 065 | `macd_slow_param` | MACD Slow | `market_set_indicator_settings` | ✅ 可操作 |
| 066 | `macd_signal_param` | MACD Signal | `market_set_indicator_settings` | ✅ 可操作 |
| 067 | `temp_show_days` | 自訂圖表天數 | `UI chartDays → /chart/{symbol}` | ✅ 已補回 Native |
| 068 | `buy_usd_input` | 投入金額下單 | `trade {notional}` | ✅ 已補回 Native |
| 069 | `refresh_ptt_chatter` | 重新整理 PTT | `ptt_refresh` | ✅ 可操作 |
| 070 | `political_lobby_symbol` | 政治遊說標的 | `politics_lobby` | ✅ 可操作 |
| 071 | `political_lobby_btn` | 政治遊說 | `politics_lobby` | ✅ 可操作 |
| 072 | `political_training_btn` | 政治訓練 | `politics_start_training` | ✅ 可操作 |
| 073 | `donation_gov_target` | 公共倡議方向 | `politics_campaign` | ✅ 可操作 |
| 074 | `political_donation_amount` | 公共倡議金額 | `politics_campaign` | ✅ 可操作 |
| 075 | `political_donation_policy_btn` | 公共倡議執行 | `politics_campaign` | ✅ 可操作 |
| 076 | `family_auto_care_v154` | 家庭自動照護 | `family_update_automation` | ✅ 可操作 |
| 077 | `family_auto_reserve_v154` | 家庭現金保留 | `family_update_automation` | ✅ 可操作 |
| 078 | `family_auto_dating_interval_v154` | 自動約會週期 | `family_update_automation` | ✅ 可操作 |
| 079 | `family_auto_relation_threshold_v154` | 關係門檻 | `family_update_automation` | ✅ 可操作 |
| 080 | `family_auto_parenting_interval_v154` | 自動親職週期 | `family_update_automation` | ✅ 可操作 |
| 081 | `family_meeting_method_v141` | 認識方式 | `family_find_partner` | ✅ 可操作 |
| 082 | `family_find_partner_v141` | 尋找伴侶 | `family_find_partner` | ✅ 可操作 |
| 083 | `family_start_dating_v141` | 開始交往 | `family_start_dating` | ✅ 可操作 |
| 084 | `family_skip_candidate_v141` | 跳過候選 | `family_skip_candidate` | ✅ 可操作 |
| 085 | `family_dating_talk_v141` | 約會：談心 | `family_dating_action {kind: talk}` | ✅ 可操作 |
| 086 | `family_dating_date_v141` | 約會：約會 | `family_dating_action {kind: date}` | ✅ 可操作 |
| 087 | `family_dating_trip_v141` | 約會：旅行 | `family_dating_action {kind: trip}` | ✅ 可操作 |
| 088 | `marry_btn_v141` | 結婚 | `family_marry` | ✅ 可操作 |
| 089 | `family_end_dating_v141` | 結束交往 | `family_end_dating` | ✅ 可操作 |
| 090 | `new_child_name_v141` | 子女姓名 | `family_add_child` | ✅ 可操作 |
| 091 | `child_btn_v141` | 生育／新增子女 | `family_add_child` | ✅ 可操作 |
| 092 | `family_trip_v141` | 家庭活動：旅行 | `family_activity {kind: trip}` | ✅ 可操作 |
| 093 | `family_day_btn_v141` | 家庭活動 | `family_activity` | ✅ 可操作 |
| 094 | `startup_industry` | 創業產業 | `company_create` | ✅ 可操作 |
| 095 | `startup_company_name` | 公司名稱 | `company_create` | ✅ 可操作 |
| 096 | `startup_company_ticker` | 公司代號 | `company_create` | ✅ 可操作 |
| 097 | `startup_capital` | 創業資本 | `company_create` | ✅ 可操作 |
| 098 | `create_company` | 成立公司 | `company_create` | ✅ 可操作 |
| 099 | `bankruptcy_founder_rescue` | 破產：創辦人救援 | `company_bankruptcy_action {kind: founder_rescue}` | ✅ 可操作 |
| 100 | `bankruptcy_creditor_restructure` | 破產：債權重整 | `company_bankruptcy_action {kind: creditor_restructure}` | ✅ 可操作 |
| 101 | `bankruptcy_liquidate` | 破產：清算 | `company_bankruptcy_action {kind: liquidate}` | ✅ 可操作 |
| 102 | `company_rename_input` | 公司改名輸入 | `company_rename` | ✅ 可操作 |
| 103 | `company_rename_btn` | 公司改名 | `company_rename` | ✅ 可操作 |
| 104 | `company_ticker_edit_input` | 公司代號輸入 | `company_change_ticker` | ✅ 可操作 |
| 105 | `company_ticker_edit_btn` | 公司代號修改 | `company_change_ticker` | ✅ 可操作 |
| 106 | `company_inject` | 公司增資金額 | `company_inject_capital` | ✅ 可操作 |
| 107 | `company_inject_btn` | 公司增資 | `company_inject_capital` | ✅ 可操作 |
| 108 | `company_brand` | 品牌／行銷投入 | `company_marketing` | ✅ 可操作（功能等價） |
| 109 | `company_brand_btn` | 品牌提升 | `company_marketing` | ✅ 可操作（功能等價） |
| 110 | `company_hire` | 招募人數 | `company_hire` | ✅ 可操作 |
| 111 | `company_hire_btn` | 招募 | `company_hire` | ✅ 可操作 |
| 112 | `company_fire` | 裁員人數 | `company_fire` | ✅ 可操作 |
| 113 | `company_fire_btn` | 裁員 | `company_fire` | ✅ 可操作 |
| 114 | `company_borrow_amount` | 借款金額 | `company_borrow` | ✅ 可操作 |
| 115 | `company_borrow_btn` | 借款 | `company_borrow` | ✅ 可操作 |
| 116 | `company_repay_amount` | 還款金額 | `company_repay` | ✅ 可操作 |
| 117 | `company_repay_btn` | 還款 | `company_repay` | ✅ 可操作 |
| 118 | `company_capex_amount` | 資本支出 | `company_capex` | ✅ 可操作 |
| 119 | `company_capex_btn` | 資本支出執行 | `company_capex` | ✅ 可操作 |
| 120 | `company_extra_rd_amount` | 額外研發投入 | `company_extra_rd` | ✅ 可操作 |
| 121 | `company_extra_rd_btn` | 額外研發 | `company_extra_rd` | ✅ 可操作 |
| 122 | `company_issue_shares` | 增發股數 | `company_issue_shares` | ✅ 可操作 |
| 123 | `company_issue_btn` | 增發執行 | `company_issue_shares` | ✅ 可操作 |
| 124 | `company_buyback_shares` | 回購股數 | `company_buyback_shares` | ✅ 可操作 |
| 125 | `company_buyback_btn` | 回購執行 | `company_buyback_shares` | ✅ 可操作 |
| 126 | `myco_ipo_release_ratio_pct` | IPO 釋股比例 | `company_ipo {release_ratio}` | ✅ 可操作 |
| 127 | `myco_dividend_yield_slider_v71` | 公司股息目標殖利率 | `company_set_dividend_yield` | ✅ 可操作 |
| 128 | `company_ipo` | 公司 IPO | `company_ipo` | ✅ 可操作 |
| 129 | `under_smear_symbol` | 地下勢力目標標的 | `underworld_smear` | ✅ 可操作 |
| 130 | `under_smear_btn` | 地下抹黑 | `underworld_smear` | ✅ 可操作 |
| 131 | `underworld_training_btn` | 地下勢力訓練 | `underworld_start_training` | ✅ 可操作 |
| 132 | `underworld_pause_toggle` | 地下勢力暫停 | `underworld_set_paused` | ✅ 可操作 |
| 133 | `black_political_direction` | 地下政治方向 | `underworld_black_politics` | ✅ 可操作 |
| 134 | `black_political_amount` | 地下政治金額 | `underworld_black_politics` | ✅ 可操作 |
| 135 | `black_political_btn` | 地下政治介入 | `underworld_black_politics` | ✅ 可操作 |
| 136 | `launder_amount` | 地下資金轉出金額 | `underworld_convert_dirty_money` | ✅ 可操作 |
| 137 | `launder_btn` | 地下資金轉出 | `underworld_convert_dirty_money` | ✅ 可操作 |
| 138 | `insider_hub_source_v65` | 非公開消息來源 | `insider_purchase` | ✅ 可操作 |
| 139 | `insider_hub_symbol_v65` | 非公開消息標的 | `insider_purchase` | ✅ 可操作 |
| 140 | `insider_hub_buy_v65` | 取得非公開消息 | `insider_purchase` | ✅ 可操作 |
| 141 | `inside_stake` | 內線投入金額 | `insider_open_position` | ✅ 可操作 |
| 142 | `inside_trade_btn` | 建立內線部位 | `insider_open_position` | ✅ 可操作 |
| 143 | `retirement_route_pick` | 退休路線 | `life_retire {route}` | ✅ 可操作 |
| 144 | `retire_game_btn` | 正式退休 | `life_retire` | ✅ 可操作 |

## 51 個 Dynamic / No-key widget callsite

| 原始碼行 | widget | key / expression | 功能 | Backend / UI 對應 | 狀態 |
|---:|---|---|---|---|---|
| 4209 | button | `無固定 key` | 人生結算 → 重新開始 | `settlement_restart` | ✅ |
| 4285 | button | `tutorial_next_v164_{step}` | 教學下一步 | `tutorial_advance` | ✅ |
| 4299 | button | `tutorial_skip_v164_{step}` | 跳過教學 | `tutorial_skip` | ✅ |
| 4456 | button | `market_advance_{days}_v157` | 市場 +N 日 | `advance_time` | ✅ |
| 4537 | button | `life_choice_{day}_{idx}` | 人生事件選項 | `resolve_life_event` | ✅ |
| 4563 | tabs | `無固定 key` | 市場頁分頁佈局 | `UI-only` | ✅ |
| 4916 | button | `無固定 key` | 離職 | `life_resign_job` | ✅ |
| 4999 | button | `無固定 key` | 側欄時間推進 | `advance_time` | ✅ |
| 5185 | tabs | `無固定 key` | 市場探索／資訊分頁佈局 | `UI-only` | ✅ |
| 5279 | tabs | `無固定 key` | 市場自選／瀏覽分頁佈局 | `UI-only` | ✅ |
| 5291 | button | `watch_pick_v158_{sym}` | 選擇 Watchlist 標的 | `select_symbol` | ✅ |
| 5345 | button | `market_pick_v158_{sym}` | 選擇市場標的 | `select_symbol` | ✅ |
| 5586 | tabs | `無固定 key` | 圖表／資訊分頁佈局 | `UI-only` | ✅ |
| 5589 | tabs | `無固定 key` | 開倉／平倉／DCA／資產佈局 | `UI-only` | ✅ |
| 5599 | radio | `無固定 key` | SPOT/LONG/SHORT | `trade {position_side}` | ✅ |
| 5602 | slider | `無固定 key` | 槓桿 | `trade {leverage}` | ✅ |
| 5603 | radio | `order_mode_{selected_symbol}` | 市價／限價 | `trade {order_type}` | ✅ |
| 5609 | number_input | `open_limit_price_{selected_symbol}` | 開倉限價 | `trade {limit_price}` | ✅ |
| 5628 | button | `無固定 key` | 市價開倉 | `trade` | ✅ |
| 5636 | button | `無固定 key` | 限價開倉 | `trade` | ✅ |
| 5666 | button | `cancel_limit_{order_id}` | 取消限價單 | `cancel_limit_order` | ✅ |
| 5715 | number_input | `close_qty_{symbol}_{side}` | 平倉數量 | `trade` | ✅ |
| 5735 | button | `btn_close_{symbol}_{side}` | 部分平倉 | `trade` | ✅ |
| 5760 | number_input | `protect_sl_{symbol}_{side}` | 停損價 | `set_protective_order` | ✅ |
| 5764 | number_input | `protect_tp_{symbol}_{side}` | 停利價 | `set_protective_order` | ✅ |
| 5768 | number_input | `protect_trail_{symbol}_{side}` | 移動停損 | `set_protective_order` | ✅ |
| 5778 | button | `set_protect_{symbol}_{side}` | 設定保護單 | `set_protective_order` | ✅ |
| 5784 | button | `clear_protect_{symbol}_{side}` | 清除保護單 | `set_protective_order` | ✅ |
| 5789 | number_input | `limit_close_price_{symbol}_{side}` | 平倉限價 | `trade` | ✅ |
| 5805 | button | `limit_close_{symbol}_{side}` | 限價平倉 | `trade` | ✅ |
| 5839 | number_input | `dca_amt_{symbol}` | DCA 金額 | `market_set_dca` | ✅ |
| 5849 | selectbox | `dca_freq_{symbol}` | DCA 週期 | `market_set_dca` | ✅ |
| 5857 | button | `dca_save_{symbol}` | 啟用 DCA | `market_set_dca` | ✅ |
| 5860 | button | `dca_stop_{symbol}` | 停止 DCA | `market_stop_dca` | ✅ |
| 5911 | button | `buy_h_{house}` | 購買房產 | `family_trade_asset` | ✅ |
| 5920 | button | `sell_h_{house}` | 出售房產 | `family_trade_asset` | ✅ |
| 5938 | button | `buy_c_{car}` | 購買車輛 | `family_trade_asset` | ✅ |
| 5947 | button | `sell_c_{car}` | 出售車輛 | `family_trade_asset` | ✅ |
| 5957 | tabs | `無固定 key` | 家庭資產分頁佈局 | `UI-only` | ✅ |
| 6230 | tabs | `無固定 key` | 人生管理分頁佈局 | `UI-only` | ✅ |
| 6303 | tabs | `無固定 key` | 政治／地下／內線／法律分頁佈局 | `UI-only` | ✅ |
| 6748 | selectbox | `child_path_v141_{idx}` | 子女教育路徑 | `family_set_child_path` | ✅ |
| 6762 | button | `child_study_v141_{idx}` | 子女教育：學習 | `family_parenting_action` | ✅ |
| 6763 | button | `child_art_v141_{idx}` | 子女教育：藝術 | `family_parenting_action` | ✅ |
| 6764 | button | `child_sport_v141_{idx}` | 子女教育：運動 | `family_parenting_action` | ✅ |
| 6765 | button | `child_talk_v141_{idx}` | 子女教育：交流 | `family_parenting_action` | ✅ |
| 6794 | number_input | `child_edu_amt_v141_{idx}` | 子女教育基金 | `family_contribute_education` | ✅ |
| 6799 | button | `child_edu_btn_v141_{idx}` | 投入教育基金 | `family_contribute_education` | ✅ |
| 7112 | tabs | `無固定 key` | 公司管理分頁佈局 | `UI-only` | ✅ |
| 7339 | tabs | `無固定 key` | 公司事件選擇分頁 | `company_resolve_event` | ✅ |
| 7556 | button | `company_choice_{day}_{idx}` | 公司事件選項 | `company_resolve_event` | ✅ |

## 不能誤解的地方

### 145/145 為何不能直接宣稱 PASS
`controlCount: 145` 是 `capital-life` 的 contract 常數，2026-09-16 才加入；對照舊核心後，Git/AST inventory 實際得到 144 個唯一 literal keys、195 個 widget callsites，其中 51 個使用動態 key 或沒有 key。因此「補一個假控制項」會讓驗證失真。

### Runtime legacy bridge
舊 UI 仍可以透過 `legacy_widget` 相容層執行。Native 路徑不應把 legacy bridge 當作主要 UI；本表將「Native 功能等價」與「舊版 compatibility」分開記錄。

### UI-only controls
導航、tabs、篩選器本身沒有必要產生 backend action；它們改變 Native state 或視圖後，真正的遊戲操作才送至 backend。

## 驗證標準

1. Legacy source inventory：`195` widget callsites / `144` fixed literal keys / `51` dynamic or no-key。
2. Backend dispatch：`engine.py` 可辨識交易、時間、life、family、company、politics、underworld、insider、content、save、settlement 與 legacy compatibility action family。
3. Native event binding：`app.js`、`market-events.js`、`family-events.js`、`company-events.js`、`power-events.js`、`content-events.js`、`save-events.js`、`settlement-events.js` 均有對應送出路徑。
4. Functional regression：完整遊戲生命週期測試涵蓋 new game → trade → advance → panels → save → settlement → game-over block → restore → restart。
