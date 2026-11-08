/* Дашборд воронки «Облигации 2026» — собирается из dashboard_template.html (make_tilda_block.py), руками не править */
(function(){var s=document.createElement("style");s.textContent=":root{--ink:#14130F;--text:#3F3B33;--mute:#6E6A5E;--faint:#9A9586;--line:#E4E0D6;--soft:#F1EFE9;--cream:#F4F2EC;--card:#fff;--green:#2F7D52;--green-2:#6FAD8B;--green-3:#BBD9C6;--green-lt:#E8F1EA;--red:#B9472E;--red-lt:#FBEBE6;--amber:#9A6210;--amber-lt:#FFF3DC;--spend:#C9785E;--shadow:0 1px 2px rgba(20,19,15,.04),0 6px 20px rgba(20,19,15,.05)}\nhtml,body{background:var(--cream)!important}\n.zd{min-height:100vh;color:var(--ink);font-family:Manrope,-apple-system,\"Segoe UI\",Arial,sans-serif;font-size:14px;line-height:1.45;-webkit-font-smoothing:antialiased}\n.zd *{box-sizing:border-box}\n.zd{max-width:1240px;margin:0 auto;padding:24px 16px 64px}\n.zd h1{margin:0;font-size:26px;letter-spacing:-.025em;font-weight:800}\n.zd h2{margin:0;font-size:19px;letter-spacing:-.015em;font-weight:800}\n.zd h3{margin:0;font-size:15px;font-weight:800}\n.zd .sub,.zd .h2sub{color:var(--mute);font-size:12.5px;margin-top:3px}\n.zd .rerr{color:var(--red)}\n/* фильтры: липкая полоса */\n.zd .bar{position:sticky;top:0;z-index:5;background:rgba(244,242,236,.94);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);margin:12px -16px 0;padding:10px 16px;border-bottom:1px solid var(--line)}\n.zd .filters{display:flex;flex-wrap:wrap;gap:8px;align-items:center}\n.zd .filters select,.zd .filters>button{font:inherit;font-weight:600;font-size:13px;border:1px solid var(--line);background:#fff;border-radius:10px;padding:7px 12px;color:var(--ink);cursor:pointer;min-height:36px;max-width:100%}\n.zd .seg{display:inline-flex;background:#fff;border:1px solid var(--line);border-radius:10px;padding:2px;gap:2px}\n.zd .seg button{font:inherit;font-weight:600;font-size:13px;border:0;background:none;border-radius:8px;padding:6px 10px;min-height:30px;cursor:pointer;color:var(--text)}\n.zd .seg button.on{background:var(--ink);color:#fff}\n.zd .filters .grow{flex:1}\n.zd .filters{position:relative}\n.zd .filters>button.camp.part{border-color:var(--amber);background:var(--amber-lt)}\n/* выбор кампаний */\n.zd .cpop{position:absolute;left:0;top:calc(100% + 8px);z-index:20;width:min(520px,100%);background:#fff;border:1px solid var(--line);border-radius:16px;box-shadow:0 12px 40px rgba(20,19,15,.16);padding:16px}\n.zd .cpop h3{margin-bottom:2px}\n.zd .cpop .h2sub{margin-bottom:10px}\n.zd .cpop label{display:grid;grid-template-columns:20px minmax(0,1fr);gap:4px 10px;align-items:start;padding:10px 4px;border-top:1px solid var(--soft);cursor:pointer}\n.zd .cpop input{width:18px;height:18px;margin:1px 0 0;accent-color:var(--green);cursor:pointer}\n.zd .cpop .cn{font-weight:700;font-size:13.5px;line-height:1.3;overflow-wrap:anywhere}\n.zd .cpop .cs{grid-column:2;font-size:12px;color:var(--mute)}\n.zd .cpop .cs.off{color:var(--amber)}\n.zd .cpop .cb{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}\n.zd .cpop .cb button{font:inherit;font-weight:700;font-size:12.5px;border:1px solid var(--line);background:#fff;border-radius:9px;padding:7px 11px;cursor:pointer;color:var(--text);min-height:34px}\n.zd .cpop .cb .grow{flex:1}\n.zd .cpop .cb .ok{background:var(--ink);border-color:var(--ink);color:#fff}\n.zd .csvbtn{font:inherit;font-size:12.5px;font-weight:700;border:1px solid var(--line);background:#fff;border-radius:9px;padding:6px 11px;cursor:pointer;color:var(--text)}\n.zd td.nm small{display:block;color:var(--faint);font-size:11px;font-weight:600}\n/* вкладки страницы: аналитика / нажали кнопку */\n.zd .views{display:inline-flex;background:#fff;border:1px solid var(--line);border-radius:12px;padding:3px;gap:3px;margin-top:14px}\n.zd .views button{font:inherit;font-weight:700;font-size:13.5px;border:0;background:none;border-radius:9px;padding:8px 14px;cursor:pointer;color:var(--text);min-height:36px}\n.zd .views button.on{background:var(--ink);color:#fff}\n.zd .views b{display:inline-block;min-width:20px;margin-left:6px;padding:0 6px;border-radius:999px;background:var(--red);color:#fff;font-size:11.5px;line-height:19px;text-align:center}\n.zd .views b:empty{display:none}\n/* нажали кнопку тарифа */\n.zd .kday{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:baseline;margin:22px 0 4px;padding-bottom:6px;border-bottom:2px solid var(--ink)}\n.zd .kday:first-child{margin-top:0}\n.zd .kday h3 span{color:var(--mute);font-weight:700}\n.zd .kday small{color:var(--mute);font-size:12.5px;font-weight:600}\n.zd table.kl{table-layout:fixed;min-width:680px}\n.zd table.kl td{vertical-align:top;white-space:normal;text-align:left;overflow-wrap:anywhere}\n.zd table.kl th{text-align:left}\n.zd table.kl td.who{font-weight:800;min-width:130px}\n.zd table.kl td.who small,.zd table.kl td small{display:block;font-weight:600;color:var(--mute);font-size:11.5px;margin-top:2px}\n.zd table.kl a{color:var(--green);font-weight:700;text-decoration:none;white-space:nowrap}\n.zd table.kl a:hover{text-decoration:underline}\n.zd table.kl .ct{display:flex;flex-direction:column;gap:2px;min-width:150px}\n.zd table.kl tr.todo td:first-child{box-shadow:inset 3px 0 0 var(--red)}\n.zd .chip.warn{background:var(--amber-lt);color:var(--amber)}\n.zd .kstat{display:flex;gap:8px;flex-wrap:wrap;font-size:13px;color:var(--text)}\n.zd .kstat b{font-weight:800}\n@media(max-width:760px){.zd .bar{position:static;background:none;-webkit-backdrop-filter:none;backdrop-filter:none;border-bottom:0;padding-bottom:0}.zd .filters select{flex:1 1 40%}.zd .seg{flex:1 1 100%}.zd .seg button{flex:1;padding:6px 4px}.zd .filters .grow{display:none}.zd .filters>button{flex:1}}\n.zd #refresh{background:var(--green);border-color:var(--green);color:#fff}\n.zd #refresh:disabled{opacity:.75;cursor:progress}\n.zd .note{background:var(--amber-lt);color:#6B4A12;border-radius:12px;padding:10px 14px;font-size:13px;margin-top:14px}\n.zd .sec{margin:30px 0 12px}\n.zd .card{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:20px;box-shadow:var(--shadow);min-width:0}\n.zd .card .h2sub{margin-bottom:14px}\n.zd .grid2{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px}\n@media(max-width:900px){.zd .grid2{grid-template-columns:1fr}}\n/* деньги */\n.zd .hero{background:var(--ink);color:#fff;border-radius:22px;padding:22px 24px;display:grid;grid-template-columns:1.35fr repeat(5,1fr);gap:20px;margin-top:18px}\n.zd .hero .m{min-width:0}\n.zd .hero .v{font-size:24px;font-weight:800;letter-spacing:-.02em;white-space:nowrap;line-height:1.15}\n.zd .hero .main .v{font-size:40px}\n.zd .hero .l{color:#C9C4B6;font-size:12.5px;margin-top:4px;font-weight:600}\n.zd .hero .d{font-size:12px;font-weight:700;margin-top:6px;color:#9F9A8C}\n.zd .hero .d.up{color:#9ED3B3}.zd .hero .d.down{color:#F0A08E}\n@media(max-width:1060px){.zd .hero{grid-template-columns:repeat(3,1fr)}.zd .hero .main{grid-column:1/-1}}\n@media(max-width:560px){.zd .hero{grid-template-columns:1fr 1fr;padding:18px}.zd .hero .main .v{font-size:32px}.zd .hero .v{font-size:20px}}\n/* выводы */\n.zd .ins{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:12px}\n.zd .in{border-radius:16px;padding:16px 16px 14px;border:1px solid var(--line);background:#fff}\n.zd .in .t{font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--mute);display:flex;gap:6px;align-items:center}\n.zd .in .t i{width:8px;height:8px;border-radius:50%;background:var(--faint);display:inline-block}\n.zd .in .big{font-size:17px;font-weight:800;margin:8px 0 6px;line-height:1.3;letter-spacing:-.01em}\n.zd .in p{margin:0;color:var(--text);font-size:13px}\n.zd .in.bad{background:var(--red-lt);border-color:#F0D0C6}.zd .in.bad .t{color:var(--red)}.zd .in.bad .t i{background:var(--red)}\n.zd .in.warn{background:var(--amber-lt);border-color:#F0DCAE}.zd .in.warn .t{color:var(--amber)}.zd .in.warn .t i{background:#D69A2D}\n.zd .in.good{background:var(--green-lt);border-color:#CADFD1}.zd .in.good .t{color:var(--green)}.zd .in.good .t i{background:var(--green)}\n/* воронка */\n.zd .fwrap{display:grid;grid-template-columns:minmax(0,1.65fr) minmax(0,1fr);gap:14px}\n@media(max-width:960px){.zd .fwrap{grid-template-columns:1fr}}\n.zd .fr,.zd .fc{display:grid;grid-template-columns:160px minmax(0,1fr) 96px;gap:12px;align-items:center}\n.zd .fr{min-height:42px}\n.zd .fr .nm{font-weight:700;font-size:13.5px;line-height:1.2}\n.zd .fr .nm small{display:block;font-weight:500;color:var(--mute);font-size:11.5px;margin-top:2px}\n.zd .fr .tr{display:flex;justify-content:center;height:34px}\n.zd .fr .b{height:34px;border-radius:7px;transition:width .35s ease}\n.zd .fr .val{text-align:right;font-weight:800;font-size:19px;font-variant-numeric:tabular-nums;line-height:1.1}\n.zd .fr .val small{display:block;font-size:11px;color:var(--mute);font-weight:600;margin-top:2px}\n.zd .fc{min-height:28px}\n.zd .fc .cv{justify-self:center;font-size:12px;font-weight:600;color:var(--mute);display:flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:center;text-align:center;padding:2px 8px;border-radius:8px}\n.zd .fc .cv b{color:var(--ink);font-weight:800}\n.zd .fc.hot .cv{background:var(--red-lt);color:var(--red)}\n.zd .fc.hot .cv b{color:var(--red)}\n.zd .fsplit{font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--faint);font-weight:800;margin:10px 0 6px;border-top:1px dashed var(--line);padding-top:10px}\n.zd .chip{display:inline-flex;align-items:center;gap:4px;border-radius:999px;padding:2px 8px;font-size:11.5px;font-weight:700;background:var(--soft);color:var(--mute);white-space:nowrap}\n.zd .chip.ok,.zd .chip.hi{background:var(--green-lt);color:var(--green)}\n.zd .chip.bad{background:var(--red-lt);color:var(--red)}\n@media(max-width:600px){.zd .fr{grid-template-columns:minmax(0,1fr) auto;grid-template-areas:\"nm val\" \"tr tr\";gap:4px 8px;margin-top:4px}.zd .fr .nm{grid-area:nm}.zd .fr .val{grid-area:val;font-size:16px}.zd .fr .val small{display:inline;margin-left:6px}.zd .fr .tr{grid-area:tr;height:20px;justify-content:flex-start}.zd .fr .b{height:20px;border-radius:5px}.zd .fr .nm small{display:none}.zd .fc{grid-template-columns:1fr}.zd .fc>span{display:none}.zd .fc .cv{justify-self:start;justify-content:flex-start;padding-left:0}.zd .card{padding:16px}}\n/* нормы */\n.zd .bl{display:flex;flex-direction:column;gap:18px}\n.zd .bi .top{display:flex;justify-content:space-between;gap:8px;font-size:13px;font-weight:700;align-items:baseline}\n.zd .bi .top .r{font-size:15px;font-weight:800;white-space:nowrap}\n.zd .bi .top .r.bad{color:var(--red)}.zd .bi .top .r.ok,.zd .bi .top .r.hi{color:var(--green)}.zd .bi .top .r.small{color:var(--faint)}\n.zd .bt{position:relative;height:12px;background:var(--soft);border-radius:6px;margin-top:8px}\n.zd .bt .band{position:absolute;top:0;bottom:0;background:var(--green-3);border-radius:6px}\n.zd .bt .mk{position:absolute;top:-5px;width:4px;height:22px;border-radius:2px;background:var(--ink);margin-left:-2px;box-shadow:0 0 0 2px #fff}\n.zd .bt .mk.bad{background:var(--red)}.zd .bt .mk.small{background:var(--faint)}\n.zd .bi .sc{display:flex;justify-content:space-between;font-size:11px;color:var(--mute);margin-top:6px}\n/* экономика */\n.zd .kps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}\n@media(max-width:560px){.zd .kps{grid-template-columns:repeat(2,minmax(0,1fr))}.zd .kp b{font-size:20px}}\n.zd .kp{background:#fff;border:1px solid var(--line);border-radius:16px;padding:14px 16px;box-shadow:var(--shadow);min-width:0}\n.zd .kp .lb{font-weight:700;font-size:12.5px;color:var(--text)}\n.zd .kp b{display:block;font-size:24px;letter-spacing:-.02em;margin-top:4px;white-space:nowrap}\n.zd .kp small{display:block;font-size:12px;font-weight:700;color:var(--mute);min-height:16px}\n.zd .kp small.up{color:var(--green)}.zd .kp small.down{color:var(--red)}\n.zd .kp p{font-size:12px;color:var(--mute);margin:6px 0 0;line-height:1.4}\n/* графики */\n.zd svg{display:block;overflow:visible}\n.zd svg text{font-family:inherit}\n.zd .legend{display:flex;gap:14px;font-size:12px;color:var(--mute);margin-top:8px;flex-wrap:wrap}\n.zd .legend i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:5px;vertical-align:-1px}\n.zd .legend i.ln{height:3px;border-radius:2px;vertical-align:3px;width:14px}\n.zd .hit{fill:transparent;cursor:default}\n.zd .hit:hover{fill:rgba(20,19,15,.04)}\n.zd .empty{color:var(--mute);font-size:13px;padding:24px 0;text-align:center}\n/* удержание эфира */\n.zd .retwrap{display:grid;grid-template-columns:minmax(0,2.2fr) minmax(0,1fr);gap:20px;align-items:start}\n@media(max-width:900px){.zd .retwrap{grid-template-columns:1fr}}\n.zd .st{padding:11px 0;border-bottom:1px solid #EEEBE3}\n.zd .st:first-child{padding-top:0}\n.zd .st:last-child{border-bottom:0}\n.zd .st .k{font-size:12px;color:var(--mute);font-weight:600}\n.zd .st b{display:block;font-size:20px;letter-spacing:-.01em;margin-top:2px}\n.zd .st p{margin:3px 0 0;font-size:12px;color:var(--text)}\n.zd .st.bad b{color:var(--red)}\n/* слоты и мессенджеры */\n.zd .rows{display:flex;flex-direction:column;gap:12px}\n.zd .rw{display:grid;grid-template-columns:76px minmax(0,1fr);gap:12px;align-items:center}\n.zd .rw .nm{font-weight:800;font-size:14px}\n.zd .rw .tk{position:relative;height:26px;background:var(--soft);border-radius:7px;overflow:hidden}\n.zd .rw .tk span{position:absolute;left:0;top:0;bottom:0;border-radius:7px}\n.zd .rw .in1{background:var(--green-3)}\n.zd .rw .in2{background:var(--green)}\n.zd .rw .tx{font-size:12px;color:var(--mute);margin-top:4px}\n.zd .rw .tx b{color:var(--ink)}\n/* таблицы */\n.zd .tabs{display:flex;gap:4px;flex-wrap:wrap}\n.zd .tabs button{font:inherit;font-size:12.5px;font-weight:700;border:1px solid var(--line);background:#fff;border-radius:9px;padding:6px 11px;cursor:pointer;color:var(--text)}\n.zd .tabs button.on{background:var(--ink);border-color:var(--ink);color:#fff}\n.zd .head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap;margin-bottom:12px}\n.zd .head .h2sub{margin-bottom:0}\n.zd .tblwrap{overflow-x:auto;margin:0 -4px;padding:0 4px}\n.zd table{width:100%;border-collapse:collapse;font-variant-numeric:tabular-nums;font-size:13px}\n.zd th,.zd td{padding:9px 8px;text-align:right;border-bottom:1px solid #EEEBE3;white-space:nowrap}\n.zd th:first-child,.zd td:first-child{text-align:left}\n.zd th{font-size:11px;letter-spacing:.04em;text-transform:uppercase;color:var(--mute);font-weight:700;vertical-align:bottom}\n.zd td.pc{color:var(--mute)}\n.zd td.nm{font-weight:700;max-width:220px;overflow:hidden;text-overflow:ellipsis}\n.zd td.db{position:relative;min-width:90px}\n.zd td.db span{position:absolute;right:8px;top:7px;bottom:7px;background:var(--green-lt);border-radius:4px;z-index:0}\n.zd td.db em{position:relative;z-index:1;font-style:normal;font-weight:700}\n.zd tr.tot td{font-weight:800;background:var(--soft);border-bottom:0}\n.zd details.card{padding:0}\n.zd details.card>summary{cursor:pointer;list-style:none;padding:18px 20px;font-weight:800;font-size:15px;display:flex;justify-content:space-between;gap:10px}\n.zd details.card>summary::-webkit-details-marker{display:none}\n.zd details.card>summary:after{content:'Показать';font-size:12.5px;font-weight:700;color:var(--green)}\n.zd details.card[open]>summary:after{content:'Скрыть'}\n.zd details.card>.inner{padding:0 20px 20px}\n.zd .defs{font-size:13px;color:var(--text);display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:4px 28px;margin:0}\n.zd .defs dt{font-weight:800;margin-top:10px;color:var(--ink)}\n.zd .defs dd{margin:2px 0 0}\n.zd .quality{display:flex;flex-wrap:wrap;gap:6px 18px;font-size:12px;color:var(--mute);margin-top:16px}\n.zd .quality b{color:var(--text)}\n.zd .tip{position:fixed;z-index:50;pointer-events:none;background:var(--ink);color:#fff;border-radius:10px;padding:9px 11px;font-size:12px;line-height:1.45;box-shadow:0 8px 24px rgba(0,0,0,.18);max-width:280px;opacity:0;transition:opacity .08s;left:0;top:0}\n.zd .tip.on{opacity:1}\n.zd .tip b{font-weight:800}\n.zd .tip .tm{color:#B9B4A6}\n/* вход */\n.zd .gate{max-width:380px;margin:12vh auto;background:#fff;border:1px solid var(--line);border-radius:18px;padding:28px 24px;text-align:center}\n.zd .gate h1{font-size:20px;margin-bottom:6px}\n.zd .gate p{color:var(--mute);font-size:13px;margin:0 0 16px}\n.zd .gate input{width:100%;font:inherit;font-size:16px;padding:12px 14px;border:1px solid var(--line);border-radius:12px;margin-bottom:10px}\n.zd .gate button{width:100%;font:inherit;font-weight:700;font-size:15px;padding:13px;border:0;border-radius:12px;background:var(--green);color:#fff;cursor:pointer}\n.zd .gate .err{color:var(--red);font-size:13px;min-height:18px;margin-top:8px}";document.head.appendChild(s);})();
(function(){
const root = document.getElementById('zd');
const $ = s => root.querySelector(s);
const fmt = n => (Math.round(n)).toLocaleString('ru-RU');
const money = n => fmt(n) + ' ₽';
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const pc = v => v === null || !isFinite(v) ? '—' : (v * 100).toFixed(v > 0 && v < 0.1 ? 1 : 0).replace('.', ',') + '%';
const ratio = (a, b) => b ? a / b : null;
const ddmm = d => d.slice(8, 10) + '.' + d.slice(5, 7);
const plural = (n, a, b, c) => { const m = Math.abs(n) % 100, k = m % 10; return m > 10 && m < 20 ? c : k === 1 ? a : k > 1 && k < 5 ? b : c; };
const ppl = n => fmt(n) + ' ' + plural(n, 'человек', 'человека', 'человек');

/* все числовые поля строки данных (новые поля сборки появляются автоматически) */
const BASE = ['visits', 'form_open', 'lead_goal', 'leads', 'attended', 'attended30', 'offer', 'clicked', 'att_min', 'orders', 'paid', 'revenue', 'spend',
  'c_attended', 'c_attended30', 'c_offer', 'c_clicked', 'c_orders', 'c_paid', 'c_revenue'];
const SLOTS = ['10', '15', '17', '19'];
const OFFER_AT = '1:21', OFFER_MIN = 81;
const MIN_BASE = 20;   // меньше людей на шаге — процент считаем предварительным

/* шаги воронки: до регистрации — по дате события, после — когорта зарегистрировавшихся за период */
const STEPS = [
  { k: 'visits', name: 'Визиты', hint: 'заходы на лендинг' },
  { k: 'form_open', name: 'Открыли форму', hint: 'нажали «Записаться»' },
  { k: 'leads', name: 'Регистрации', hint: 'попали в GetCourse', bench: 'lead' },
  { k: 'c_attended', name: 'Пришли на эфир', hint: 'зашли в комнату Бизона', bench: 'attend' },
  { k: 'c_offer', name: 'Дошли до оффера', hint: 'были на эфире в ' + OFFER_AT + ' или позже', bench: 'offer' },
  { k: 'c_clicked', name: 'Нажали кнопку тарифа', hint: 'кнопка на эфире' },
  { k: 'c_orders', name: 'Оформили заказ', hint: 'любой тариф' },
  { k: 'c_paid', name: 'Оплатили', hint: 'полностью или частично', bench: 'buy' },
];
const SHADES = ['#B9D8C5', '#A3CBB3', '#82B897', '#5FA37C', '#45916A', '#347F59', '#2A6E4C', '#1F5B3E'];

/* ориентиры для бесплатных вебинаров в онлайн-образовании: lo–hi — нормальный диапазон */
const BENCH = {
  lead: { label: 'Регистрация из визитов', num: 'leads', den: 'visits', denL: 'от визитов', lo: .15, hi: .30, max: .5,
    advice: 'Смотрите лендинг: первый экран и обещание вебинара, форма в одно-два поля, скорость на телефоне, совпадение рекламы и лендинга.' },
  attend: { label: 'Доходимость до эфира', num: 'c_attended', den: 'leads', denL: 'от регистраций', lo: .25, hi: .45, max: .8,
    advice: 'Усильте напоминания: бот, SMS и письма за день, за час и за 5 минут, вход в комнату в один клик, удобное время эфира.' },
  stay: { label: 'Досмотр 30+ минут', num: 'c_attended30', den: 'c_attended', denL: 'от пришедших', lo: .5, hi: .7, max: 1,
    advice: 'Первые 10 минут эфира: сразу обещание результата и бонуса в конце, без долгого вступления, вовлечение в чат.' },
  offer: { label: 'Дошли до оффера (' + OFFER_AT + ')', num: 'c_offer', den: 'c_attended', denL: 'от пришедших', lo: .3, hi: .5, max: 1,
    advice: 'Люди уходят до продажи: сократите путь до оффера, анонсируйте подарок в конце, держите интригу и интерактив.' },
  buy: { label: 'Покупка из пришедших', num: 'c_paid', den: 'c_attended', denL: 'от пришедших', lo: .03, hi: .08, max: .2,
    advice: 'Оффер и дожим: понятные тарифы, дедлайн и бонус за быстрое решение, рассрочка, дожимы в боте и письмах.' },
  pay: { label: 'Оплата заказов', num: 'c_paid', den: 'c_orders', denL: 'от заказов', lo: .4, hi: .7, max: 1,
    advice: 'Оформили, но не оплатили: свяжитесь в течение часа, предложите рассрочку, напомните о дедлайне.' },
};
/* потери между шагами после регистрации (ключ — шаг, на который не дошли): что это значит и что делать */
const LOSS = {
  c_attended: ['не пришли на эфир', 'Это люди, которые уже хотели прийти. Усильте напоминания и отправьте им запись или повтор эфира.'],
  c_attended30: ['ушли в первые 30 минут', 'Начало эфира не держит. Сразу покажите, что человек получит к концу, и уберите долгое вступление.'],
  c_offer: ['ушли с эфира до оффера', 'Не увидели продажу. Посмотрите на кривую удержания ниже: на какой минуте уходят и что в сценарии в этот момент.'],
  c_clicked: ['видели оффер, но не нажали кнопку тарифа', 'Оффер не зацепил: усилите ценность и дедлайн, покажите результаты учеников, разберите возражения прямо перед кнопками.'],
  c_orders: { c_clicked: ['нажали кнопку тарифа, но не оформили заказ', 'Споткнулись на странице заказа: проверьте цену, рассрочку и лишние поля в форме.'],
    c_offer: ['видели оффер, но не заказали', 'Самая тёплая аудитория: дожим в боте и письмах с дедлайном, разбор возражений.'] },
  c_paid: ['оформили заказ, но не оплатили', 'Свяжитесь с ними сегодня: часто не хватает рассрочки или ответа на один вопрос.'],
};

let DATA = null, rows = [], period = 30, cut = 'source', KEYS = BASE.slice();

const LAYOUT = `
<header>
  <h1>Воронка «Облигации 2026»</h1>
  <div class="sub" id="sub"></div>
  <div class="views" id="views" role="tablist"><button data-v="main" class="on" role="tab">Аналитика</button><button data-v="click" role="tab" title="Нажатия за выбранный период">Нажали кнопку тарифа<b id="clickN"></b></button></div>
</header>
<div class="bar"><div class="filters">
  <select id="fFunnel" aria-label="Воронка"><option value="">Все воронки</option><option>Реклама</option><option>Органика</option></select>
  <select id="fSource" aria-label="Источник"><option value="">Все источники</option></select>
  <select id="fMedium" aria-label="Канал"><option value="">Все каналы</option></select>
  <select id="fMsg" aria-label="Мессенджер"><option value="">Все мессенджеры</option></select>
  <button id="fCamp" class="camp" hidden aria-haspopup="true" aria-expanded="false"></button>
  <div class="seg" id="per"><button data-p="7">7 дней</button><button data-p="14">14 дней</button><button data-p="30" class="on">30 дней</button><button data-p="0">Всё время</button></div>
  <span class="grow"></span>
  <button id="csv" title="Скачать строки за выбранный период">CSV</button>
  <button id="refresh" title="Собрать свежие данные прямо сейчас (несколько минут)">↻ Обновить</button>
  <div class="cpop" id="cpop" hidden></div>
</div></div>
<div id="vClick" hidden>
<div class="sec"><h2>Нажали кнопку тарифа</h2><div class="h2sub">Кто на эфире нажал кнопку тарифа — по дням и эфирам, сверху свежие. Красная полоса — заказ ещё не оформлен: им стоит написать первыми. Учитываются фильтры воронки, мессенджера и период</div></div>
<div class="card"><div class="head"><div class="kstat" id="clickStat"></div><button class="csvbtn" id="clickCsv" title="Скачать список за период">CSV</button></div><div class="tblwrap" id="clickList"></div></div>
</div>
<div id="vMain">
<div id="warn" class="note" hidden></div>
<div class="hero" id="hero"></div>

<div class="sec"><h2>Что важно сейчас</h2><div class="h2sub">Выводы считаются автоматически по выбранному периоду и фильтрам</div></div>
<div class="ins" id="ins"></div>

<div class="sec"><h2>Воронка</h2><div class="h2sub">Сколько людей дошло до каждого шага и где они уходят</div></div>
<div class="fwrap">
  <div class="card"><div id="sample"></div><div id="funnel"></div></div>
  <div class="card"><h3>Конверсии против нормы рынка</h3><div class="h2sub">Зелёная полоса — нормальный диапазон для бесплатных вебинаров, чёрточка — ваш результат</div><div class="bl" id="bench"></div></div>
</div>

<div class="sec"><h2>Экономика одного человека</h2><div class="h2sub">Сколько стоит и сколько приносит человек на каждом шаге</div></div>
<div class="kps" id="econ"></div>

<div class="sec"><h2>Как смотрят эфир</h2><div class="h2sub">Сколько зрителей остаётся в комнате на каждой минуте и где они уходят</div></div>
<div class="card"><div class="retwrap"><div><h3>Кривая удержания</h3><div class="h2sub">Доля пришедших на эфир, которые были в комнате на этой минуте. Красным — самый сильный отток за 5 минут</div><div id="ret"></div></div><div id="retStats"></div></div></div>
<div class="grid2">
  <div class="card"><h3>Эфиры по времени</h3><div class="h2sub">Светлая полоса — пришли, тёмная — дошли до оффера (${OFFER_AT}). По дню эфира</div><div class="rows" id="slots"></div></div>
  <div class="card"><h3>Telegram или MAX</h3><div class="h2sub">Какую кнопку выбрали на лендинге и что стало с этими людьми</div><div class="rows" id="msgs"></div></div>
</div>

<div class="sec"><h2>Динамика</h2><div class="h2sub">Наведите на день, чтобы увидеть цифры</div></div>
<div class="grid2" style="margin-top:0">
  <div class="card"><h3>Регистрации и эфир по дням</h3><div class="h2sub">Регистрации — по дню записи, пришедшие и оплаты — по дню эфира и оплаты</div><div id="chart"></div>
    <div class="legend"><span><i style="background:#2F7D52"></i>Регистрации</span><span><i style="background:#BBD9C6"></i>Пришли на эфир</span><span><i style="background:#14130F;border-radius:50%"></i>Оплаты</span></div></div>
  <div class="card"><h3>Выручка и расход нарастающим итогом</h3><div class="h2sub">Пока зелёная линия выше красной, реклама окупается</div><div id="chart2"></div>
    <div class="legend"><span><i class="ln" style="background:#2F7D52"></i>Выручка</span><span><i class="ln" style="background:#C9785E"></i>Расход на рекламу</span></div></div>
</div>

<div class="card" style="margin-top:14px">
  <div class="head"><div><h3>Откуда приходят и кто покупает</h3><div class="h2sub">Пришли, оффер и оплаты — по когорте: что стало с людьми, которые зарегистрировались из этого источника за период</div></div>
    <div class="tabs" id="cuts"><button data-c="source" class="on">Источник</button><button data-c="medium">Канал</button><button data-c="campaign">Кампания</button><button data-c="messenger">Мессенджер</button><button data-c="funnel">Воронка</button><button class="csvbtn" id="cutCsv" title="Скачать эту таблицу">CSV</button></div></div>
  <div class="tblwrap"><table id="tCut"></table></div>
</div>

<details class="card" style="margin-top:14px"><summary>Таблица по дням</summary><div class="inner"><div class="h2sub" style="margin:0 0 10px">Все цифры по дате события: визита, регистрации, эфира, заказа, оплаты</div><div class="tblwrap"><table id="tDay"></table></div></div></details>

<details class="card" style="margin-top:14px"><summary>Как считаются цифры</summary><div class="inner"><dl class="defs">
<dt>Визиты, открыли форму</dt><dd>Яндекс Метрика, счётчики рекламного и органического лендингов, по UTM визита.</dd>
<dt>Регистрации</dt><dd>GetCourse: человек добавлен в группу «Вебинар - облигации - реклама» или «…органика». Тестовые адреса исключены.</dd>
<dt>Пришли, 30+ мин, дошли до оффера</dt><dd>Бизон: зрители комнат bonds, bonds-10, bonds-15, bonds-17. «Дошли до оффера» — были в комнате в ${OFFER_AT} или позже, когда на эфире уже кнопки тарифов. Человек считается один раз в день.</dd>
<dt>Нажали кнопку тарифа</dt><dd>Бизон фиксирует нажатия на кнопки тарифов во время эфира.</dd>
<dt>Вкладка «Нажали кнопку тарифа»</dt><dd>Каждый, кто нажал кнопку тарифа в комнате Бизона, — один раз за день эфира, даже если нажимал несколько раз. Имя и телефон — из Бизона, почта и мессенджер — из регистрации в GetCourse. «Заказ» — есть ли у человека заказ курса в GetCourse. Список виден только после ввода пароля.</dd>
<dt>Кривая удержания</dt><dd>Для каждой минуты эфира — сколько пришедших были в комнате хотя бы часть этой минуты. Опоздавшие добавляются, ушедшие вычитаются, поэтому в начале кривая может расти.</dd>
<dt>Когорта</dt><dd>В воронке шаги после регистрации считаются по людям, зарегистрировавшимся за период: что с ними стало. Поэтому по свежим регистрациям цифры ещё дорастут.</dd>
<dt>Заказы и оплаты</dt><dd>GetCourse: заказы тарифов «Облигации: пошаговая сборка портфеля» от людей из групп вебинара. Оплата — «Завершён» или «Частично оплачен».</dd>
<dt>Расход</dt><dd>Яндекс Директ — автоматически, по дням и кампаниям, с НДС. Расход кампании ложится на её визиты и регистрации по метке utm_campaign={campaign_id}. Другие площадки — файл spend.csv в репозитории: дата; воронка; источник; канал; сумма. Без расхода CPL, CAC и ROMI не считаются.</dd>
<dt>Кампании</dt><dd>Кнопка «Кампании» в фильтрах: снятая галочка убирает кампанию из всех цифр — расход, визиты, регистрации, оплаты. Новые кампании, которые ведут на лендинг (есть визиты или регистрации с их меткой), включаются сами. Кампании только с расходом — выключены, пока их не отметить. Выбор запоминается в этом браузере.</dd>
<dt>Доход с регистрации</dt><dd>Выручка когорты, делённая на число регистраций. Это потолок цены регистрации: если платить за регистрацию меньше, реклама окупается.</dd>
<dt>CPL, CAC, ROMI</dt><dd>CPL = расход / регистрации. CAC = расход / покупатели. ROMI = (выручка − расход) / расход. Прибыль — без налогов и комиссий.</dd>
<dt>Нормы рынка</dt><dd>Типичные диапазоны для бесплатных вебинаров в онлайн-образовании. Это не план, а подсказка, где искать проблему. Пока на шаге меньше ${MIN_BASE} человек, вывод предварительный.</dd>
<dt>Сравнение</dt><dd>Стрелки — изменение к предыдущему периоду той же длины.</dd>
</dl></div></details>
<div class="quality" id="quality"></div>
</div>
<div class="tip" id="tip"></div>`;

function init(data) {
  DATA = data; rows = (data && data.rows) || [];
  const seen = new Set(BASE); rows.forEach(r => Object.keys(r).forEach(k => { if (typeof r[k] === 'number') seen.add(k); }));
  KEYS = [...seen];
  root.innerHTML = LAYOUT;
  $('#sub').textContent = data ? 'Обновлено ' + data.generated + ' МСК · данные с ' + data.start.split('-').reverse().join('.') + ' · ' + ((data.meta || {}).next_run || 'обновление ежедневно') : 'Нет данных';
  if (!rows.length) { $('#warn').hidden = false; $('#warn').textContent = 'Данных пока нет: сборка ещё не прошла или за период пусто.'; }
  const fill = (sel, vals) => { const s = $(sel); [...new Set(vals)].sort().forEach(v => { const o = document.createElement('option'); o.textContent = v; s.appendChild(o); }); };
  fill('#fSource', rows.map(r => r.source)); fill('#fMedium', rows.map(r => r.medium)); fill('#fMsg', rows.map(r => r.messenger || '(не указан)'));
  ['#fFunnel', '#fSource', '#fMedium', '#fMsg'].forEach(s => $(s).addEventListener('change', draw));
  root.querySelectorAll('#per button').forEach(b => b.addEventListener('click', () => { root.querySelectorAll('#per button').forEach(x => x.classList.remove('on')); b.classList.add('on'); period = +b.dataset.p; draw(); }));
  root.querySelectorAll('#cuts button[data-c]').forEach(b => b.addEventListener('click', () => { root.querySelectorAll('#cuts button[data-c]').forEach(x => x.classList.remove('on')); b.classList.add('on'); cut = b.dataset.c; draw(); }));
  $('#csv').addEventListener('click', exportCsv);
  $('#cutCsv').addEventListener('click', exportCut);
  $('#clickCsv').addEventListener('click', exportClicks);
  root.querySelectorAll('#views button').forEach(b => b.addEventListener('click', () => showView(b.dataset.v)));
  let v0 = 'main'; try { v0 = localStorage.getItem('zd_view') || 'main'; } catch (e) {}
  showView(v0, true);
  setupCamps();
  $('#refresh').addEventListener('click', refresh);
  draw();
}

/* ---- данные под фильтры ---- */
const today = () => { const d = new Date(); return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10); };
const shift = (iso, n) => { const d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
function range() { if (!period) return ['', '']; const from = shift(today(), -period + 1); return [from, shift(from, -period)]; }
function base() {
  const f = $('#fFunnel').value, s = $('#fSource').value, m = $('#fMedium').value, g = $('#fMsg').value;
  return rows.filter(r => (!f || r.funnel === f) && (!s || r.source === s) && (!m || r.medium === m) && (!g || (r.messenger || '(не указан)') === g) && campOn(r.campaign));
}

/* ---- кампании Директа: галочки «считать / не считать». По умолчанию включены те, что ведут на лендинг (есть визиты или регистрации
   с их меткой); кампании только с расходом выключены. Ручной выбор хранится в этом браузере и перекрывает умолчание. ---- */
let CAMPS = [], campPick = {};
const CAMP_KEY = 'zd_camps';
const campName = id => ((DATA && DATA.meta && DATA.meta.campaigns) || {})[id] || '';
const campDefault = c => c.visits + c.leads > 0;
function campOn(id) { const c = CAMPS.find(x => x.id === id); return !c || (id in campPick ? campPick[id] : campDefault(c)); }
function setupCamps() {
  const names = (DATA && DATA.meta && DATA.meta.campaigns) || {}, by = {};
  rows.forEach(r => { if (!(r.campaign in names) && !(r.spend > 0 && r.campaign && r.campaign !== '(не указан)')) return;
    const c = by[r.campaign] = by[r.campaign] || { id: r.campaign, spend: 0, visits: 0, leads: 0, paid: 0, revenue: 0 };
    c.spend += +r.spend || 0; c.visits += +r.visits || 0; c.leads += +r.leads || 0; c.paid += +r.c_paid || 0; c.revenue += +r.c_revenue || 0; });
  CAMPS = Object.values(by).sort((a, b) => campDefault(b) - campDefault(a) || b.spend - a.spend);
  try { campPick = JSON.parse(localStorage.getItem(CAMP_KEY) || '{}') || {}; } catch (e) { campPick = {}; }
  const btn = $('#fCamp'), pop = $('#cpop');
  if (!CAMPS.length) return;
  btn.hidden = false; campLabel();
  btn.addEventListener('click', e => { e.stopPropagation(); pop.hidden ? openCamps() : closeCamps(); });
  document.addEventListener('click', e => { if (!pop.hidden && !e.composedPath().includes(pop) && e.target !== btn) closeCamps(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !pop.hidden) closeCamps(); });
}
function campLabel() {
  const on = CAMPS.filter(c => campOn(c.id)).length, btn = $('#fCamp');
  btn.textContent = on === CAMPS.length ? 'Кампании: все ' + on : 'Кампании: ' + on + ' из ' + CAMPS.length;
  btn.classList.toggle('part', on < CAMPS.length);
}
function openCamps() {
  const pop = $('#cpop');
  pop.innerHTML = `<h3>Какие кампании считать</h3><div class="h2sub">Снятая кампания пропадает из всех цифр дашборда. Цифры в строках — за всё время</div>`
    + CAMPS.map(c => {
      const nm = campName(c.id), on = campOn(c.id);
      const stat = [money(c.spend) + ' расход', fmt(c.visits) + ' ' + plural(c.visits, 'визит', 'визита', 'визитов'), fmt(c.leads) + ' рег.', c.paid ? fmt(c.paid) + ' ' + plural(c.paid, 'оплата', 'оплаты', 'оплат') : ''].filter(Boolean).join(' · ');
      const why = campDefault(c) ? '' : `<div class="cs off">Нет визитов с меткой этой кампании — похоже, она ведёт не на лендинг вебинара</div>`;
      return `<label><input type="checkbox" data-id="${esc(c.id)}"${on ? ' checked' : ''}><span class="cn">${esc(nm || c.id)}</span><span class="cs">${nm ? '№ ' + esc(c.id) + ' · ' : ''}${stat}</span>${why}</label>`;
    }).join('')
    + `<div class="cb"><button data-a="all">Отметить все</button><button data-a="def" title="Включены кампании, которые ведут на лендинг">По умолчанию</button><span class="grow"></span><button class="ok" data-a="close">Готово</button></div>`;
  pop.querySelectorAll('input').forEach(i => i.addEventListener('change', () => { campPick[i.dataset.id] = i.checked; campSave(); }));
  pop.querySelectorAll('.cb button').forEach(b => b.addEventListener('click', () => {
    if (b.dataset.a === 'close') return closeCamps();
    campPick = {}; if (b.dataset.a === 'all') CAMPS.forEach(c => campPick[c.id] = true);
    campSave(); openCamps();
  }));
  pop.hidden = false; $('#fCamp').setAttribute('aria-expanded', 'true');
}
function closeCamps() { $('#cpop').hidden = true; $('#fCamp').setAttribute('aria-expanded', 'false'); }
function campSave() {
  try { localStorage.setItem(CAMP_KEY, JSON.stringify(campPick)); } catch (e) {}
  campLabel(); draw();
}
function filtered() { const [from] = range(); return base().filter(r => !from || r.date >= from); }
function previous() { const [from, pfrom] = range(); if (!from) return []; return base().filter(r => r.date >= pfrom && r.date < from); }
function sum(list) { const t = {}; KEYS.forEach(k => t[k] = 0); list.forEach(r => KEYS.forEach(k => t[k] += +r[k] || 0)); return t; }
function group(list, key) { const g = {}; list.forEach(r => { const k = r[key] || '(не указан)'; (g[k] = g[k] || []).push(r); }); return Object.keys(g).map(k => ({ key: k, t: sum(g[k]) })); }
const has = k => rows.some(r => k in r);
function delta(cur, prev, inverse) {
  if (!period || (!prev && !cur)) return ['', ''];
  if (!prev) return [inverse ? '' : 'up', 'раньше было 0'];
  const d = (cur - prev) / prev;
  let cls = d > 0 ? 'up' : d < 0 ? 'down' : '';
  if (inverse) cls = cls === 'up' ? 'down' : cls === 'down' ? 'up' : '';
  return [cls, (d > 0 ? '▲ ' : d < 0 ? '▼ ' : '') + Math.abs(Math.round(d * 100)) + '% к прошлым ' + period + ' дн.'];
}
function bstate(key, t) {
  const b = BENCH[key], den = t[b.den] || 0, num = t[b.num] || 0, r = ratio(num, den);
  const cls = r === null ? 'none' : den < MIN_BASE ? 'small' : r < b.lo ? 'bad' : r > b.hi ? 'hi' : 'ok';
  return { key, b, den, num, r, cls };
}
const STATE_TXT = { ok: 'в норме', hi: 'выше нормы', bad: 'ниже нормы', small: 'мало данных', none: 'нет данных' };
const range_txt = b => pc(b.lo).replace('%', '') + '–' + pc(b.hi);
function benchKeys(t) { return Object.keys(BENCH).filter(k => has(BENCH[k].num) && has(BENCH[k].den) && !(BENCH[k].den === 'visits' && !t.visits)); }
function bottleneck(t) {
  const below = benchKeys(t).map(k => bstate(k, t)).filter(x => x.r !== null && x.r < x.b.lo).sort((a, b) => a.r / a.b.lo - b.r / b.b.lo);
  const solid = below.filter(x => x.den >= MIN_BASE);
  return solid[0] ? Object.assign(solid[0], { sure: true }) : below[0] ? Object.assign(below[0], { sure: false }) : null;
}

function draw() {
  const list = filtered(), t = sum(list), p = sum(previous());
  const noVisits = !!$('#fMsg').value;
  const w = [];
  if (noVisits) w.push('Визиты Метрики по мессенджеру не делятся, поэтому воронка начинается с регистраций.');
  $('#warn').hidden = !w.length; $('#warn').textContent = w.join(' ');
  const bn = bottleneck(t);
  drawHero(t, p); drawInsights(t, list, bn); drawFunnel(t, noVisits, bn); drawBench(t); drawEcon(t, p);
  const days = dayList(list); chart(days); chart2(days);
  drawRet(list, t); drawSlots(t); drawMsgs(list); drawCut(list); drawDayTable(days); drawQuality(); drawClicks();
}

/* ---- деньги ---- */
function drawHero(t, p) {
  const it = (cls, v, l, d) => `<div class="m ${cls}"><div class="v">${v}</div><div class="l">${l}</div><div class="d ${d[0] || ''}">${d[1] || '&nbsp;'}</div></div>`;
  const profit = t.revenue - t.spend, pprofit = p.revenue - p.spend;
  const romi = t.spend ? (t.revenue - t.spend) / t.spend : null;
  const epl = t.leads ? t.c_revenue / t.leads : 0;
  let h = it('main', money(t.revenue), 'Выручка за период', delta(t.revenue, p.revenue));
  h += it('', fmt(t.paid), plural(t.paid, 'оплата', 'оплаты', 'оплат') + (t.paid ? ' · средний чек ' + money(t.revenue / t.paid) : ''), delta(t.paid, p.paid));
  h += it('', money(t.spend), 'Расход на рекламу', t.spend ? delta(t.spend, p.spend, true) : ['', 'не внесён в spend.csv']);
  h += it('', money(profit), 'Прибыль', delta(profit, pprofit));
  h += it('', romi === null ? '—' : Math.round(romi * 100) + '%', 'ROMI, окупаемость рекламы', romi === null ? ['', 'нет расхода — не считается'] : [romi >= 0 ? 'up' : 'down', romi >= 0 ? 'реклама окупилась' : 'реклама пока в минусе']);
  h += it('', epl ? money(epl) : '—', 'Доход с 1 регистрации', ['', epl ? 'столько можно платить за регистрацию, чтобы выйти в ноль' : 'появится после первых оплат']);
  $('#hero').innerHTML = h;
}

/* ---- автоматические выводы ---- */
function drawInsights(t, list, bn) {
  const card = (cls, title, big, text) => `<div class="in ${cls}"><div class="t"><i></i>${title}</div><div class="big">${big}</div><p>${text}</p></div>`;
  let h = '';
  // 1. узкое место
  if (bn) h += card(bn.sure ? 'bad' : 'warn', 'Узкое место', `${bn.b.label}: ${pc(bn.r)} при норме ${range_txt(bn.b)}`,
    bn.b.advice + (bn.sure ? '' : ` Вывод предварительный: на этом шаге пока ${ppl(bn.den)}.`));
  else if (t.leads) h += card('good', 'Узкое место', 'Все шаги в норме', 'Главный рычаг сейчас — трафик: при тех же конверсиях больше визитов даст пропорционально больше продаж.');
  else h += card('', 'Узкое место', 'Пока нет регистраций', 'Выводы появятся, когда за период будут регистрации.');
  // 2. где теряем больше всего людей
  const chain = ['leads', ...STEPS.slice(STEPS.findIndex(s => s.k === 'c_attended')).filter(s => has(s.k)).map(s => s.k)];
  const losses = chain.slice(1).map((k, i) => { let l = LOSS[k]; if (l && !Array.isArray(l)) l = l[chain[i]]; return l && { l, from: t[chain[i]] || 0, lost: Math.max(0, (t[chain[i]] || 0) - (t[k] || 0)) }; })
    .filter(x => x && x.from > 0).sort((a, b) => b.lost - a.lost);
  if (losses[0] && losses[0].lost) { const x = losses[0]; h += card('warn', 'Где теряем больше всего людей', `${fmt(x.lost)} из ${fmt(x.from)} ${x.l[0]}`, x.l[1]); }
  else h += card('', 'Где теряем больше всего людей', 'Потерь пока нет', 'Нет людей после регистрации за выбранный период.');
  // 3. деньги на столе: незакрытые заказы и тёплые после оффера
  const avg = t.c_paid ? t.c_revenue / t.c_paid : t.paid ? t.revenue / t.paid : 0;
  const unpaid = Math.max(0, (t.c_orders || 0) - (t.c_paid || 0)), warm = Math.max(0, (t.c_offer || 0) - (t.c_orders || 0));
  const clickedNo = has('c_clicked') ? Math.max(0, (t.c_clicked || 0) - (t.c_orders || 0)) : 0;
  if (!unpaid && clickedNo) h += card('bad', 'Деньги на столе', `${ppl(clickedNo)} ${plural(clickedNo, 'нажал кнопку тарифа, но не оформил заказ', 'нажали кнопку тарифа, но не оформили заказ', 'нажали кнопку тарифа, но не оформили заказ')}`,
    'Они уже выбирали тариф. Напишите им лично в боте и проверьте страницу заказа.' + (avg ? ` Каждый покупатель — около ${money(avg)}.` : ''));
  else if (unpaid) h += card('bad', 'Деньги на столе', `${fmt(unpaid)} ${plural(unpaid, 'заказ не оплачен', 'заказа не оплачены', 'заказов не оплачены')}`, 'Свяжитесь с ними сегодня: рассрочка, ответ на вопрос, напоминание о дедлайне.' + (avg ? ` Это до ${money(unpaid * avg)} при текущем среднем чеке.` : ''));
  else if (warm) h += card('warn', 'Деньги на столе', `${ppl(warm)} ${plural(warm, 'видел оффер, но не заказал', 'видели оффер, но не заказали', 'видели оффер, но не заказали')}`, 'Самая тёплая аудитория: персональный дожим в боте и письмах с дедлайном.' + (avg ? ` Каждый покупатель — около ${money(avg)}.` : ''));
  else h += card('good', 'Деньги на столе', 'Незакрытых заказов нет', has('c_orders') ? 'Все, кто оформил заказ, оплатили.' : 'Данные о заказах появятся после следующей сборки.');
  // 4. лучший источник
  const src = group(list, 'source').filter(g => g.t.leads >= 3).sort((a, b) => b.t.c_paid - a.t.c_paid || b.t.c_revenue - a.t.c_revenue || ratio(b.t.c_attended, b.t.leads) - ratio(a.t.c_attended, a.t.leads) || b.t.leads - a.t.leads);
  if (src.length > 1 || (src[0] && src[0].t.c_paid)) { const s = src[0].t;
    h += card('good', 'Лучший источник', `${esc(src[0].key)}: ${fmt(s.leads)} рег., ${fmt(s.c_paid)} ${plural(s.c_paid, 'оплата', 'оплаты', 'оплат')}`,
      `Доходимость ${pc(ratio(s.c_attended, s.leads))}` + (s.c_revenue ? `, доход с регистрации ${money(s.c_revenue / s.leads)}` : '') + (s.spend ? `, CPL ${money(s.spend / s.leads)}` : '') + (src.length > 1 ? `. Дальше: ${esc(src[1].key)} (${fmt(src[1].t.leads)} рег.).` : '.'));
  } else h += card('', 'Лучший источник', src[0] ? 'Пока один источник: ' + esc(src[0].key) : 'Мало данных', 'Сравнение появится, когда хотя бы два источника дадут по 3+ регистрации.');
  $('#ins').innerHTML = h;
}

/* ---- воронка ---- */
function drawFunnel(t, noVisits, bn) {
  const steps = STEPS.filter(s => has(s.k) && !(noVisits && (s.k === 'visits' || s.k === 'form_open')));
  const cohort = s => STEPS.indexOf(s) >= STEPS.findIndex(x => x.k === 'c_attended');
  const topPre = Math.max(1, ...steps.filter(s => !cohort(s)).map(s => t[s.k] || 0)), topPost = Math.max(1, t.leads || 0, ...steps.filter(cohort).map(s => t[s.k] || 0));
  const first = steps[0] ? t[steps[0].k] || 0 : 0;
  $('#sample').innerHTML = t.leads && t.leads < 100 ? `<div class="note" style="margin:0 0 14px">Пока мало данных: ${fmt(t.leads)} ${plural(t.leads, 'регистрация', 'регистрации', 'регистраций')} за период. Проценты ориентировочные, надёжнее от 100 регистраций.</div>` : '';
  let h = '';
  steps.forEach((s, i) => {
    const v = t[s.k] || 0;
    if (i) {
      const pv = t[steps[i - 1].k] || 0, cr = ratio(v, pv), lost = Math.max(0, pv - v);
      let chip = '', hot = false;
      if (s.bench && BENCH[s.bench] && benchKeys(t).includes(s.bench)) {
        const st = bstate(s.bench, t), b = st.b;
        const head = b.den !== steps[i - 1].k ? pc(st.r) + ' ' + b.denL + ' · ' : '';
        chip = `<span class="chip ${st.cls}" data-tip="${esc(`<b>${b.label}</b><br>${pc(st.r)} ${b.denL}, норма ${range_txt(b)}<br><span class='tm'>${STATE_TXT[st.cls]}${st.cls === 'small' ? ': на шаге ' + ppl(st.den) : ''}</span>`)}">${head}${STATE_TXT[st.cls]}</span>`;
        hot = bn && bn.key === s.bench && bn.sure;
      }
      h += `<div class="fc${hot ? ' hot' : ''}"><span></span><div class="cv">↓ <b>${pc(cr)}</b> дошли${lost ? ' · ушли ' + fmt(lost) : ''} ${chip}${hot ? ' <b>узкое место</b>' : ''}</div><span></span></div>`;
    }
    if (s.k === 'c_attended') h += `<div class="fsplit">Дальше — что стало с теми, кто зарегистрировался за период · ширина полос от регистраций</div>`;
    const w = v ? Math.max(1.5, 100 * v / (cohort(s) ? topPost : topPre)) : 0;
    const share = cohort(s) ? `<small>${pc(ratio(v, t.leads))} от рег.</small>` : i && first ? `<small>${pc(v / first)} от ${steps[0].k === 'visits' ? 'визитов' : 'рег.'}</small>` : '<small>&nbsp;</small>';
    const tip = `<b>${s.name}: ${fmt(v)}</b><br><span class='tm'>${s.hint}</span>`;
    h += `<div class="fr" data-tip="${esc(tip)}"><div class="nm">${s.name}<small>${s.hint}</small></div><div class="tr"><div class="b" style="width:${w}%;background:${SHADES[STEPS.indexOf(s)]}"></div></div><div class="val">${fmt(v)}${share}</div></div>`;
  });
  $('#funnel').innerHTML = h;
}
function drawBench(t) {
  const keys = benchKeys(t);
  $('#bench').innerHTML = keys.map(k => {
    const st = bstate(k, t), b = st.b, x = v => Math.min(100, 100 * v / b.max);
    const mk = st.r === null ? '' : `<div class="mk ${st.cls === 'bad' ? 'bad' : st.cls === 'small' ? 'small' : ''}" style="left:${x(st.r)}%"></div>`;
    const tip = `<b>${b.label}</b><br>${fmt(st.num)} из ${fmt(st.den)} (${b.denL})<br>норма ${range_txt(b)}<br><span class='tm'>${STATE_TXT[st.cls]}</span>`;
    return `<div class="bi" data-tip="${esc(tip)}"><div class="top"><span>${b.label}</span><span class="r ${st.cls}">${pc(st.r)}</span></div>
      <div class="bt"><div class="band" style="left:${x(b.lo)}%;width:${x(b.hi) - x(b.lo)}%"></div>${mk}</div>
      <div class="sc"><span>${STATE_TXT[st.cls]}${st.cls === 'small' ? ' · ' + ppl(st.den) : ''}</span><span>норма ${range_txt(b)}</span></div></div>`;
  }).join('') || '<div class="empty">Нет данных за период</div>';
}

/* ---- экономика ---- */
function drawEcon(t, p) {
  const kp = (label, val, d, text) => `<div class="kp"><div class="lb">${label}</div><b>${val}</b><small class="${d[0] || ''}">${d[1] || ''}</small><p>${text}</p></div>`;
  const per = (a, b) => a && b ? a / b : 0;
  const noSpend = 'нужен расход в spend.csv';
  const cpl = per(t.spend, t.leads), pcpl = per(p.spend, p.leads);
  const cpa = per(t.spend, t.c_attended), cac = per(t.spend, t.c_paid), pcac = per(p.spend, p.c_paid);
  const conv = ratio(t.c_paid, t.leads), rev_att = per(t.c_revenue, t.c_attended);
  const avgMin = per(t.att_min, t.attended);
  let h = '';
  h += kp('Цена регистрации · CPL', cpl ? money(cpl) : '—', cpl ? delta(cpl, pcpl, true) : ['', ''], cpl ? 'Сколько стоит один зарегистрировавшийся.' : noSpend);
  h += kp('Цена зрителя эфира', cpa ? money(cpa) : '—', ['', ''], cpa ? 'Сколько стоит человек, который пришёл на эфир.' : noSpend);
  h += kp('Цена покупателя · CAC', cac ? money(cac) : '—', cac ? delta(cac, pcac, true) : ['', ''], cac ? 'Сколько рекламы уходит на одного покупателя.' : noSpend);
  h += kp('Регистрация → оплата', pc(conv), ['', ''], t.c_paid ? `Одна продажа примерно на ${fmt(t.leads / t.c_paid)} ${plural(Math.round(t.leads / t.c_paid), 'регистрацию', 'регистрации', 'регистраций')}.` : 'Доля зарегистрировавшихся, которые купили.');
  h += kp('Доход со зрителя', rev_att ? money(rev_att) : '—', ['', ''], 'Сколько в среднем приносит каждый, кто пришёл на эфир.');
  if (has('att_min')) h += kp('Среднее время просмотра', avgMin ? fmt(avgMin) + ' мин' : '—', ['', ''], `Оффер — на ${OFFER_AT}. ` + (t.attended ? `До него досмотрели ${fmt(t.offer)} из ${fmt(t.attended)} зрителей.` : 'Зрителей за период нет.'));
  $('#econ').innerHTML = h;
}

/* ---- динамика ---- */
function dayList(list) {
  const by = {}; list.forEach(r => (by[r.date] = by[r.date] || []).push(r));
  const start = (DATA && DATA.start) || Object.keys(by).sort()[0] || '', r0 = range()[0];
  const from = r0 && r0 > start ? r0 : start, to = today();
  const out = [];
  if (!from) return out;
  for (let d = from; d <= to && out.length < 400; d = shift(d, 1)) out.push({ key: d, t: sum(by[d] || []) });
  return out;
}
function axis(W, H, pl, pb, max, f) {
  const y = v => H - pb - (H - pb - 12) * v / max;
  let s = '';
  [0, .5, 1].forEach(g => { s += `<line x1="${pl}" x2="${W}" y1="${y(max * g)}" y2="${y(max * g)}" stroke="#EEEBE3"/><text x="${pl - 8}" y="${y(max * g) + 4}" font-size="11" fill="#6E6A5E" text-anchor="end">${(f || fmt)(max * g)}</text>`; });
  return [s, y];
}
const nice = m => { if (m <= 4) return 4; const p = Math.pow(10, Math.floor(Math.log10(m))); return [1, 2, 2.5, 5, 10].map(k => k * p).find(v => v >= m); };
const kfmt = v => v >= 1000 ? (Math.round(v / 100) / 10).toString().replace('.', ',') + ' тыс' : fmt(v);
function xlabels(days, x, bw, H) {
  const n = days.length, step = Math.ceil(n / 12);
  return days.map((d, i) => i % step === 0 ? `<text x="${x(i) + bw / 2}" y="${H - 6}" font-size="11" fill="#6E6A5E" text-anchor="middle">${ddmm(d.key)}</text>` : '').join('');
}
function chart(days) {
  const W = 600, H = 240, pl = 34, pb = 26, n = days.length;
  if (!n || !days.some(d => d.t.leads || d.t.attended || d.t.paid)) { $('#chart').innerHTML = '<div class="empty">Нет данных за период</div>'; return; }
  const max = nice(Math.max(1, ...days.map(d => Math.max(d.t.leads, d.t.attended))));
  const [grid, y] = axis(W, H, pl, pb, max), bw = (W - pl) / n, x = i => pl + i * bw, g = Math.min(2, bw * .06), bar = Math.max(1, (bw * .76 - g) / 2);
  let s = `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Регистрации и пришедшие по дням">` + grid;
  days.forEach((d, i) => {
    const x0 = x(i) + bw * .12;
    if (d.t.leads) s += `<rect x="${x0}" y="${y(d.t.leads)}" width="${bar}" height="${H - pb - y(d.t.leads)}" rx="${Math.min(3, bar / 2)}" fill="#2F7D52"/>`;
    if (d.t.attended) s += `<rect x="${x0 + bar + g}" y="${y(d.t.attended)}" width="${bar}" height="${H - pb - y(d.t.attended)}" rx="${Math.min(3, bar / 2)}" fill="#BBD9C6"/>`;
    if (d.t.paid) s += `<circle cx="${x(i) + bw / 2}" cy="${Math.max(10, y(Math.max(d.t.leads, d.t.attended)) - 10)}" r="5" fill="#14130F" stroke="#fff" stroke-width="2"/>`;
  });
  s += xlabels(days, x, bw, H);
  days.forEach((d, i) => {
    const tip = `<b>${ddmm(d.key)}</b><br>Регистрации: <b>${fmt(d.t.leads)}</b><br>Пришли на эфир: <b>${fmt(d.t.attended)}</b>` + (has('offer') ? `<br>Дошли до оффера: <b>${fmt(d.t.offer)}</b>` : '') + `<br>Оплаты: <b>${fmt(d.t.paid)}</b>${d.t.revenue ? ' · ' + money(d.t.revenue) : ''}`;
    s += `<rect class="hit" x="${x(i)}" y="0" width="${bw}" height="${H - pb}" data-tip="${esc(tip)}"/>`;
  });
  $('#chart').innerHTML = s + '</svg>';
}
function chart2(days) {
  const W = 600, H = 240, pl = 52, pb = 26, n = days.length;
  let rv = 0, sp = 0; const cum = days.map(d => ({ key: d.key, rev: rv += d.t.revenue, sp: sp += d.t.spend, d: d.t }));
  if (!n || (!rv && !sp)) { $('#chart2').innerHTML = '<div class="empty">Пока нет ни выручки, ни расхода за период</div>'; return; }
  const max = nice(Math.max(1, rv, sp));
  const [grid, y] = axis(W, H, pl, pb, max, kfmt), bw = (W - pl) / n, x = i => pl + i * bw + bw / 2;
  const path = k => cum.map((c, i) => (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(c[k]).toFixed(1)).join(' ');
  let s = `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Выручка и расход нарастающим итогом">` + grid;
  if (sp) s += `<path d="${path('sp')}" fill="none" stroke="#C9785E" stroke-width="2" stroke-linejoin="round"/>`;
  s += `<path d="${path('rev')}" fill="none" stroke="#2F7D52" stroke-width="2" stroke-linejoin="round"/>`;
  const last = cum[n - 1];
  s += `<circle cx="${x(n - 1)}" cy="${y(last.rev)}" r="4" fill="#2F7D52" stroke="#fff" stroke-width="2"/><text x="${x(n - 1) - 8}" y="${y(last.rev) - 10}" font-size="12" font-weight="800" fill="#14130F" text-anchor="end">${money(last.rev)}</text>`;
  if (sp) s += `<circle cx="${x(n - 1)}" cy="${y(last.sp)}" r="4" fill="#C9785E" stroke="#fff" stroke-width="2"/>`;
  s += xlabels(days, i => pl + i * bw, bw, H);
  cum.forEach((c, i) => {
    const tip = `<b>${ddmm(c.key)}</b><br>Выручка за день: <b>${money(c.d.revenue)}</b><br>Расход за день: <b>${money(c.d.spend)}</b><br><span class='tm'>Нарастающим итогом: ${money(c.rev)} / ${money(c.sp)}</span>`;
    s += `<rect class="hit" x="${pl + i * bw}" y="0" width="${bw}" height="${H - pb}" data-tip="${esc(tip)}"/>`;
  });
  $('#chart2').innerHTML = s + '</svg>';
}

/* ---- кривая удержания эфира ---- */
const hm = m => Math.floor(m / 60) + ':' + String(m % 60).padStart(2, '0');
function sumRet(list) {
  const n = Math.max(0, ...rows.map(r => (r.ret || []).length)), a = new Array(n).fill(0);
  list.forEach(r => (r.ret || []).forEach((v, i) => { a[i] += v; }));
  return a;
}
function drawRet(list, t) {
  const box = $('#ret'), side = $('#retStats');
  if (!has('ret')) { box.innerHTML = '<div class="empty">Кривая появится после следующей сборки данных</div>'; side.innerHTML = ''; return; }
  const ret = sumRet(list), n = ret.length, peak = Math.max(0, ...ret), base = Math.max(t.attended || 0, peak);
  if (!peak) { box.innerHTML = '<div class="empty">За период никто не пришёл на эфир</div>'; side.innerHTML = ''; return; }
  const peakM = ret.indexOf(peak);
  let drop = { m: -1, d: 0 }; for (let m = peakM; m + 5 < n; m++) { const d = ret[m] - ret[m + 5]; if (d > drop.d) drop = { m, d }; }
  let half = -1; for (let m = peakM; m < n; m++) if (ret[m] <= peak / 2) { half = m; break; }
  const atOffer = ret[Math.min(n - 1, OFFER_MIN)] || 0;
  const W = 760, H = 260, pl = 40, pr = 12, pt = 22, pb = 26, top = Math.min(1, Math.ceil(peak / base * 4 + 1e-9) / 4) || 1;
  const x = m => pl + (W - pl - pr) * m / Math.max(1, n - 1), y = v => H - pb - (H - pb - pt) * v / (base * top);
  let s = `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Кривая удержания зрителей эфира">`;
  [0, .5, 1].forEach(g => { const v = base * top * g; s += `<line x1="${pl}" x2="${W - pr}" y1="${y(v)}" y2="${y(v)}" stroke="#EEEBE3"/><text x="${pl - 8}" y="${y(v) + 4}" font-size="11" fill="#6E6A5E" text-anchor="end">${Math.round(top * g * 100)}%</text>`; });
  const bigDrop = drop.d >= 2 && drop.d >= peak * 0.1;
  if (bigDrop) s += `<rect x="${x(drop.m)}" y="${pt}" width="${x(drop.m + 5) - x(drop.m)}" height="${H - pb - pt}" fill="#FBEBE6"/>`;
  const pts = ret.map((v, m) => x(m).toFixed(1) + ' ' + y(v).toFixed(1));
  s += `<path d="M${x(0)} ${y(0)} L${pts.join(' L')} L${x(n - 1)} ${y(0)} Z" fill="#E8F1EA"/>`;
  s += `<path d="M${pts.join(' L')}" fill="none" stroke="#2F7D52" stroke-width="2" stroke-linejoin="round"/>`;
  const mark = (m, label, strong) => m < n ? `<line x1="${x(m)}" x2="${x(m)}" y1="${pt - 6}" y2="${H - pb}" stroke="${strong ? '#14130F' : '#9A9586'}" stroke-dasharray="4 3" stroke-width="${strong ? 1.5 : 1}"/><text x="${x(m) + 5}" y="${pt - 8}" font-size="11" font-weight="${strong ? 800 : 600}" fill="${strong ? '#14130F' : '#6E6A5E'}">${label}</text>` : '';
  s += mark(30, '30 мин', false) + mark(OFFER_MIN, 'Оффер ' + OFFER_AT, true);
  for (let m = 0; m < n; m += 10) s += `<text x="${x(m)}" y="${H - 6}" font-size="11" fill="#6E6A5E" text-anchor="middle">${hm(m)}</text>`;
  const bw = (W - pl - pr) / Math.max(1, n - 1);
  ret.forEach((v, m) => {
    const tip = `<b>${hm(m)} от начала</b><br>В комнате: <b>${fmt(v)}</b> (${pc(v / base)} пришедших)` + (m >= OFFER_MIN ? `<br><span class='tm'>кнопки тарифов уже на экране</span>` : '') + (bigDrop && m >= drop.m && m < drop.m + 5 ? `<br><span class='tm'>зона самого сильного оттока</span>` : '');
    s += `<rect class="hit" x="${x(m) - bw / 2}" y="${pt}" width="${bw}" height="${H - pb - pt}" data-tip="${esc(tip)}"/>`;
  });
  box.innerHTML = s + '</svg>';
  const st = (k, v, p, cls) => `<div class="st ${cls || ''}"><div class="k">${k}</div><b>${v}</b>${p ? `<p>${p}</p>` : ''}</div>`;
  let h = '';
  h += st('Пришли на эфир', ppl(base), `Больше всего одновременно — ${fmt(peak)} на ${hm(peakM)}.` + (base < MIN_BASE ? ' Зрителей пока мало, кривая шумная.' : ''));
  h += st('Половина ушла к', half >= 0 ? hm(half) : 'не ушла', half >= 0 ? 'От пика осталось меньше половины зрителей.' : 'До конца эфира в комнате больше половины от пика.');
  h += st('Были в комнате, когда появился оффер', `${fmt(atOffer)} · ${pc(atOffer / base)}`, `Кнопки тарифов появляются на ${OFFER_AT}.`, atOffer / base < BENCH.offer.lo ? 'bad' : '');
  const atSale = drop.m <= OFFER_MIN && drop.m + 5 >= OFFER_MIN - 2;
  if (bigDrop) h += st('Сильнее всего уходят', `${hm(drop.m)}–${hm(drop.m + 5)} · −${fmt(drop.d)}`, atSale
    ? 'Уходят ровно на продаже, когда появляются кнопки. Смягчите переход: история ученика и анонс бонуса до кнопок, дедлайн и подарок за быстрое решение.'
    : 'Посмотрите, что в сценарии в эти минуты: длинная теория, пауза, смена темы.', 'bad');
  if (has('clicked')) h += st('Нажали кнопку тарифа', ppl(t.clicked || 0), t.offer ? `Из ${ppl(t.offer)}, кто застал оффер.` : '');
  side.innerHTML = h;
}

/* ---- слоты эфира и мессенджеры ---- */
function drawSlots(t) {
  if (!has('a19')) { $('#slots').innerHTML = '<div class="empty">Разбивка по слотам появится после следующей сборки данных</div>'; return; }
  const max = Math.max(1, ...SLOTS.map(h => t['a' + h] || 0));
  if (!SLOTS.some(h => t['a' + h])) { $('#slots').innerHTML = '<div class="empty">За период никто не пришёл на эфир</div>'; return; }
  const cand = SLOTS.filter(h => (t['a' + h] || 0) >= 3).sort((a, b) => ratio(t['q' + b], t['a' + b]) - ratio(t['q' + a], t['a' + a]));
  const best = cand.length > 1 && ratio(t['q' + cand[0]], t['a' + cand[0]]) > ratio(t['q' + cand[1]], t['a' + cand[1]]) ? cand[0] : null;
  $('#slots').innerHTML = SLOTS.map(h => {
    const a = t['a' + h] || 0, q = t['q' + h] || 0, m = a ? (t['m' + h] || 0) / a : 0;
    const tip = `<b>Эфир в ${h}:00</b><br>Пришли: <b>${fmt(a)}</b><br>Дошли до оффера: <b>${fmt(q)}</b> (${pc(ratio(q, a))})<br>Среднее время: <b>${fmt(m)} мин</b>`;
    return `<div class="rw" data-tip="${esc(tip)}"><div class="nm">${h}:00</div><div><div class="tk"><span class="in1" style="width:${100 * a / max}%"></span><span class="in2" style="width:${100 * q / max}%"></span></div>
      <div class="tx"><b>${fmt(a)}</b> пришли · <b>${fmt(q)}</b> до оффера${a ? ' (' + pc(ratio(q, a)) + ')' : ''}${a ? ' · в среднем ' + fmt(m) + ' мин' : ''}${h === best ? ' · <b style="color:var(--green)">лучше всех досматривают</b>' : ''}</div></div></div>`;
  }).join('');
}
function drawMsgs(list) {
  const NAMES = { telegram: 'Telegram', max: 'MAX', '(не указан)': 'Не указан' };
  const g = group(list.map(r => Object.assign({}, r, { messenger: r.messenger || '(не указан)' })), 'messenger').filter(x => x.t.leads).sort((a, b) => b.t.leads - a.t.leads);
  if (!g.length) { $('#msgs').innerHTML = '<div class="empty">Нет регистраций за период</div>'; return; }
  const max = Math.max(1, ...g.map(x => x.t.leads));
  $('#msgs').innerHTML = g.map(x => {
    const t = x.t, name = NAMES[x.key] || esc(x.key);
    const tip = `<b>${name}</b><br>Регистрации: <b>${fmt(t.leads)}</b><br>Пришли: <b>${fmt(t.c_attended)}</b> (${pc(ratio(t.c_attended, t.leads))})<br>Оплаты: <b>${fmt(t.c_paid)}</b>${t.c_revenue ? ' · ' + money(t.c_revenue) : ''}`;
    return `<div class="rw" data-tip="${esc(tip)}"><div class="nm">${name}</div><div><div class="tk"><span class="in1" style="width:${100 * t.leads / max}%"></span><span class="in2" style="width:${100 * t.c_attended / max}%"></span></div>
      <div class="tx"><b>${fmt(t.leads)}</b> рег. · пришли <b>${pc(ratio(t.c_attended, t.leads))}</b> · <b>${fmt(t.c_paid)}</b> ${plural(t.c_paid, 'оплата', 'оплаты', 'оплат')}${t.leads < 10 ? ' · мало данных' : ''}</div></div></div>`;
  }).join('') + msgVerdict(g, NAMES) + '<div class="tx" style="font-size:12px;color:var(--mute)">Светлая полоса — регистрации, тёмная — пришли на эфир. «Не указан» — регистрации до появления выбора мессенджера.</div>';
}

function msgVerdict(g, NAMES) {
  const two = g.filter(x => x.key !== '(не указан)' && x.t.leads >= 10).sort((a, b) => ratio(b.t.c_attended, b.t.leads) - ratio(a.t.c_attended, a.t.leads));
  if (two.length < 2) return '';
  const a = ratio(two[0].t.c_attended, two[0].t.leads), b = ratio(two[1].t.c_attended, two[1].t.leads);
  if (!b || a / b < 1.2) return `<div class="note" style="margin:0;background:var(--soft);color:var(--text)">Доходимость в ${NAMES[two[0].key] || esc(two[0].key)} и ${NAMES[two[1].key] || esc(two[1].key)} почти одинаковая.</div>`;
  return `<div class="note" style="margin:0;background:var(--green-lt);color:var(--green)"><b>${NAMES[two[0].key] || esc(two[0].key)}</b>: до эфира доходят в ${(a / b).toFixed(1).replace('.', ',')} раза чаще, чем в ${NAMES[two[1].key] || esc(two[1].key)} (${pc(a)} против ${pc(b)}).${two[0].t.leads + two[1].t.leads < 60 ? ' Пока на малой выборке.' : ''}</div>`;
}

/* ---- таблицы ---- */
// во вкладке «Кампания» — только реклама: у органики кампаний нет, там метки ссылок из профилей
const cutRows = list => cut === 'campaign' ? list.filter(r => r.funnel === 'Реклама') : list;
function drawCut(list) {
  list = cutRows(list);
  const keyLabel = { source: 'Источник', medium: 'Канал', campaign: 'Кампания', messenger: 'Мессенджер', funnel: 'Воронка' }[cut];
  const groups = group(list.map(r => cut === 'messenger' ? Object.assign({}, r, { messenger: r.messenger || '(не указан)' }) : r), cut)
    .filter(g => g.t.visits || g.t.leads || g.t.c_attended || g.t.orders || g.t.spend).sort((a, b) => b.t.leads - a.t.leads || b.t.visits - a.t.visits);
  const tot = sum(list), maxL = Math.max(1, ...groups.map(g => g.t.leads));
  const nov = cut === 'messenger';
  const chip = (num, den, key) => { const r = ratio(num, den); if (r === null) return '<span class="chip">—</span>'; const b = BENCH[key]; const cls = den < 10 ? '' : r < b.lo ? 'bad' : 'ok'; return `<span class="chip ${cls}">${pc(r)}</span>`; };
  const row = (name, t, cls) => {
    const cpl = t.leads && t.spend ? t.spend / t.leads : 0, cac = t.c_paid && t.spend ? t.spend / t.c_paid : 0;
    const romi = t.spend ? Math.round((t.c_revenue - t.spend) / t.spend * 100) + '%' : '—';
    const isTot = cls === 'tot';
    const cn = cut === 'campaign' && !isTot ? campName(name) || (name === '(не указан)' ? 'Без метки кампании' : '') : '';
    if (cut === 'campaign' && isTot) name = 'Итого по рекламе';
    return `<tr class="${cls || ''}"><td class="nm" title="${esc(cn && campName(name) ? cn + ' · № ' + name : cn || name)}">${cn ? esc(cn) + (campName(name) ? '<small>№ ' + esc(name) + '</small>' : '') : esc(name)}</td><td>${nov && !isTot ? '—' : fmt(t.visits)}</td>
      <td class="db">${isTot ? '' : `<span style="width:${Math.max(4, 70 * t.leads / maxL)}%"></span>`}<em>${fmt(t.leads)}</em></td>
      <td class="pc">${nov && !isTot ? '—' : pc(ratio(t.leads, t.visits))}</td>
      <td>${fmt(t.c_attended)} ${chip(t.c_attended, t.leads, 'attend')}</td>
      ${has('c_offer') ? `<td>${fmt(t.c_offer)}</td>` : ''}<td>${fmt(t.c_paid)}</td><td>${money(t.c_revenue)}</td>
      <td>${t.leads && t.c_revenue ? money(t.c_revenue / t.leads) : '—'}</td><td>${money(t.spend)}</td><td>${cpl ? money(cpl) : '—'}</td><td>${cac ? money(cac) : '—'}</td><td>${romi}</td></tr>`;
  };
  $('#tCut').innerHTML = `<tr><th>${keyLabel}</th><th>Визиты</th><th>Рег.</th><th>Визит→рег.</th><th>Пришли</th>${has('c_offer') ? '<th>До оффера</th>' : ''}<th>Оплаты</th><th>Выручка</th><th>Доход с рег.</th><th>Расход</th><th>CPL</th><th>CAC</th><th>ROMI</th></tr>`
    + (groups.length ? groups.map(g => row(g.key, g.t)).join('') + row('Итого', tot, 'tot') : '<tr><td colspan="13" class="pc" style="text-align:center">Нет данных за период</td></tr>');
}
function drawDayTable(days) {
  const list = days.slice().reverse().filter(d => KEYS.some(k => d.t[k]));
  const tot = sum([]); days.forEach(d => KEYS.forEach(k => tot[k] += d.t[k]));
  const off = has('offer');
  const row = (name, t, cls) => `<tr class="${cls || ''}"><td>${name}</td><td>${fmt(t.visits)}</td><td>${fmt(t.form_open)}</td><td>${fmt(t.leads)}</td><td class="pc">${pc(ratio(t.leads, t.visits))}</td><td>${fmt(t.attended)}</td><td>${fmt(t.attended30)}</td>${off ? `<td>${fmt(t.offer)}</td>` : ''}<td>${fmt(t.orders)}</td><td>${fmt(t.paid)}</td><td>${money(t.revenue)}</td><td>${money(t.spend)}</td></tr>`;
  $('#tDay').innerHTML = `<tr><th>Дата</th><th>Визиты</th><th>Форма</th><th>Рег.</th><th>CR</th><th>Пришли</th><th>30+ мин</th>${off ? '<th>До оффера</th>' : ''}<th>Заказы</th><th>Оплаты</th><th>Выручка</th><th>Расход</th></tr>`
    + list.map(d => row(d.key.split('-').reverse().join('.'), d.t)).join('') + row('Итого', tot, 'tot');
}
function drawQuality() {
  const m = (DATA && DATA.meta) || {};
  $('#quality').innerHTML = `<span>Зарегистрировано всего: <b>${fmt(m.members || 0)}</b></span><span>Зрителей Бизона без регистрации в GetCourse: <b>${fmt(m.unknown_viewers || 0)}</b></span><span>Тестовых адресов исключено: <b>${m.excluded || 0}</b></span><span>Строк данных: <b>${fmt(rows.length)}</b></span>`;
}
function exportCsv() {
  const list = filtered(); if (!list.length) return;
  const cols = ['date', 'funnel', 'source', 'medium', 'campaign', 'campaign_name', 'messenger', ...KEYS];
  saveCsv(cols, list.map(r => Object.assign({ campaign_name: campName(r.campaign) }, r)), 'voronka-obligacii.csv');
}
function saveCsv(cols, list, name) {
  const cell = v => { const x = typeof v === 'number' ? String(Math.round(v * 100) / 100).replace('.', ',') : String(v ?? ''); return /[;"\n]/.test(x) ? '"' + x.replace(/"/g, '""') + '"' : x; };
  const csv = '\ufeff' + cols.join(';') + '\n' + list.map(r => cols.map(c => cell(r[c])).join(';')).join('\n');
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })); a.download = name; a.click();
}
function exportCut() {   // таблица «Откуда приходят» в текущем разрезе, периоде и фильтрах
  const list = cutRows(filtered()); if (!list.length) return;
  const g = group(list.map(r => cut === 'messenger' ? Object.assign({}, r, { messenger: r.messenger || '(не указан)' }) : r), cut)
    .filter(x => x.t.visits || x.t.leads || x.t.c_attended || x.t.orders || x.t.spend).sort((a, b) => b.t.leads - a.t.leads || b.t.visits - a.t.visits);
  const out = g.map(x => { const t = x.t; return { [cut]: x.key, name: cut === 'campaign' ? campName(x.key) : '', visits: t.visits, leads: t.leads, attended: t.c_attended, offer: t.c_offer || 0,
    paid: t.c_paid, revenue: t.c_revenue, spend: t.spend, cpl: t.leads && t.spend ? t.spend / t.leads : '', cac: t.c_paid && t.spend ? t.spend / t.c_paid : '',
    romi: t.spend ? Math.round((t.c_revenue - t.spend) / t.spend * 100) + '%' : '' }; });
  const [from] = range();
  saveCsv([cut, ...(cut === 'campaign' ? ['name'] : []), 'visits', 'leads', 'attended', 'offer', 'paid', 'revenue', 'spend', 'cpl', 'cac', 'romi'], out, 'razrez-' + cut + '-' + (from || 'vse') + '.csv');
}

/* ---- вкладка «Нажали кнопку тарифа»: список людей из отчётов Бизона, чтобы им написать ---- */
function showView(v, quiet) {
  if (v !== 'click') v = 'main';
  root.querySelectorAll('#views button').forEach(b => { const on = b.dataset.v === v; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); });
  $('#vMain').hidden = v !== 'main'; $('#vClick').hidden = v !== 'click';
  try { localStorage.setItem('zd_view', v); } catch (e) {}
  if (!quiet) window.scrollTo({ top: Math.min(window.scrollY, root.offsetTop) });
}
function clickList() {
  const [from] = range(), f = $('#fFunnel').value, g = $('#fMsg').value, s = $('#fSource').value;
  return ((DATA && DATA.meta && DATA.meta.clickers) || []).filter(c => (!from || c.date >= from) && (!f || c.funnel === f)
    && (!g || (c.messenger || '(не указан)') === g) && (!s || c.source === s));
}
const WD = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
const ORDER = { paid: ['ok', 'Оплатил'], order: ['warn', 'Оформил заказ'], '': ['bad', 'Нет заказа'] };
const MSGN = { telegram: 'Telegram', max: 'MAX' };
function drawClicks() {
  const list = clickList(), todo = list.filter(c => !c.order).length;
  $('#clickN').textContent = todo ? String(todo) : '';
  $('#clickN').title = todo ? todo + ' без заказа' : '';
  if (!list.length) { $('#clickStat').innerHTML = ''; $('#clickList').innerHTML = '<div class="empty">За выбранный период никто не нажимал кнопку тарифа</div>'; return; }
  const cnt = k => list.filter(c => c.order === k).length;
  $('#clickStat').innerHTML = `<span><b>${fmt(list.length)}</b> ${plural(list.length, 'нажатие', 'нажатия', 'нажатий')}</span><span class="chip bad">${fmt(cnt(''))} без заказа</span><span class="chip warn">${fmt(cnt('order'))} оформили</span><span class="chip ok">${fmt(cnt('paid'))} оплатили</span>`;
  const groups = {};
  list.forEach(c => { const k = c.date + '|' + c.slot; (groups[k] = groups[k] || []).push(c); });
  const keys = Object.keys(groups).sort().reverse();
  $('#clickList').innerHTML = keys.map(k => {
    const [d, slot] = k.split('|'), rows = groups[k].sort((a, b) => (!!a.order - !!b.order) || (a.time < b.time ? -1 : 1));
    const wd = WD[new Date(d + 'T12:00:00Z').getUTCDay()], n = rows.filter(c => !c.order).length;
    return `<div class="kday"><h3>${ddmm(d)}, ${wd} <span>· эфир ${slot}:00</span></h3><small>${ppl(rows.length)}${n ? ' · без заказа ' + n : ''}</small></div>
      <table class="kl"><colgroup><col style="width:22%"><col style="width:27%"><col style="width:19%"><col style="width:9%"><col style="width:10%"><col style="width:13%"></colgroup><tr><th>Кто</th><th>Связаться</th><th>Тариф</th><th>Нажал</th><th>Смотрел</th><th>Заказ</th></tr>${rows.map(clickRow).join('')}</table>`;
  }).join('');
}
function clickRow(c) {
  const ph = c.phone ? '7' + c.phone : '', o = ORDER[c.order || ''];
  const where = [c.funnel !== '(не указан)' ? c.funnel : 'не нашли регистрацию', MSGN[c.messenger] || ''].filter(Boolean).join(' · ');
  const ct = [ph ? `<a href="tel:+${ph}">+${ph.replace(/^(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/, '$1 $2 $3-$4-$5')}</a>` : '',
    ph ? `<a href="https://t.me/+${ph}" target="_blank" rel="noopener" title="Откроется, только если человек разрешил искать себя по номеру">Telegram по номеру</a>` : '',
    ph ? `<a href="#" data-copy="+${ph}" title="У MAX нет ссылки на чат по номеру: номер скопируется — вставьте его в поиск MAX">MAX: скопировать номер</a>` : '',
    c.email ? `<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>` : '',
    c.bhid ? `<small title="Найти в BotHelp → Подписчики">BotHelp: ${esc(c.bhid)}</small>` : ''].filter(Boolean).join('');
  return `<tr class="${c.order ? '' : 'todo'}"><td class="who">${esc(c.name || 'Без имени')}<small>${esc(where)}</small></td><td><div class="ct">${ct || '—'}</div></td>
    <td>${esc((c.tariffs || []).join(', ') || '—')}</td><td>${esc(c.time || '—')}</td><td>${fmt(c.mins)} мин</td><td><span class="chip ${o[0]}">${o[1]}</span></td></tr>`;
}
function exportClicks() {
  const list = clickList(); if (!list.length) return;
  const out = list.map(c => ({ date: c.date, slot: c.slot + ':00', time: c.time, name: c.name, phone: c.phone ? '+7' + c.phone : '', email: c.email,
    messenger: MSGN[c.messenger] || '', funnel: c.funnel, tariffs: (c.tariffs || []).join(', '), minutes: c.mins, order: ORDER[c.order || ''][1], bothelp: c.bhid }));
  const [from] = range();
  saveCsv(['date', 'slot', 'time', 'name', 'phone', 'email', 'messenger', 'funnel', 'tariffs', 'minutes', 'order', 'bothelp'], out, 'nazhali-knopku-' + (from || 'vse') + '.csv');
}

root.addEventListener('click', e => {   // «MAX: скопировать номер»
  const a = e.target.closest && e.target.closest('[data-copy]'); if (!a) return;
  e.preventDefault();
  const done = () => { const t = a.textContent; a.textContent = 'Скопировано ✓'; setTimeout(() => { a.textContent = t; }, 1500); };
  if (navigator.clipboard) navigator.clipboard.writeText(a.dataset.copy).then(done, () => window.prompt('Скопируйте номер', a.dataset.copy));
  else window.prompt('Скопируйте номер', a.dataset.copy);
});

/* ---- подсказки при наведении (и по тапу на телефоне) ---- */
function tipMove(e) {
  const tip = $('#tip'); if (!tip) return;
  const el = e.target.closest && e.target.closest('[data-tip]');
  if (!el || !root.contains(el)) { tip.classList.remove('on'); return; }
  tip.innerHTML = el.getAttribute('data-tip'); tip.classList.add('on');
  const w = tip.offsetWidth, h = tip.offsetHeight;
  tip.style.left = Math.max(8, Math.min(window.innerWidth - w - 8, e.clientX + 14)) + 'px';
  tip.style.top = (e.clientY - h - 14 < 8 ? e.clientY + 18 : e.clientY - h - 14) + 'px';
}
root.addEventListener('mousemove', tipMove);
root.addEventListener('click', tipMove);
root.addEventListener('mouseleave', () => { const tip = $('#tip'); if (tip) tip.classList.remove('on'); });
window.addEventListener('scroll', () => { const tip = $('#tip'); if (tip) tip.classList.remove('on'); }, { passive: true });

/* ---- кнопка «Обновить»: запускает workflow в GitHub Actions, ждёт его и подгружает свежий data.enc.
   Токен (fine-grained, только Actions этого репозитория) лежит внутри зашифрованных данных. Без токена — открывает страницу workflow. ---- */
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function refresh() {
  const btn = $('#refresh'), m = (DATA && DATA.meta) || {}, repo = m.repo || 'Zuevap94/bonds-dashboard';
  const pw = localStorage.getItem('zd_pw');
  if (!m.trigger_token || !pw) { window.open('https://github.com/' + repo + '/actions/workflows/dashboard.yml', '_blank'); return; }
  const gh = (path, opt = {}) => fetch('https://api.github.com/repos/' + repo + path, { ...opt, cache: 'no-store',
    headers: { Authorization: 'Bearer ' + m.trigger_token, Accept: 'application/vnd.github+json', ...(opt.headers || {}) } });
  const step = t => { btn.textContent = t; };
  btn.disabled = true;
  try {
    const since = new Date(Date.now() - 60000).toISOString().slice(0, 19) + 'Z';
    step('Запускаю…');
    const r = await gh('/actions/workflows/dashboard.yml/dispatches', { method: 'POST', body: JSON.stringify({ ref: 'main' }) });
    if (r.status !== 204) throw new Error('GitHub не принял запуск (' + r.status + ')');
    let run = null;
    for (let i = 0; i < 150 && !(run && run.status === 'completed'); i++) {   // до ~12 минут
      await sleep(5000);
      const list = await (await gh('/actions/workflows/dashboard.yml/runs?event=workflow_dispatch&per_page=1&created=' + encodeURIComponent('>=' + since))).json();
      run = (list.workflow_runs || [])[0] || null;
      step(run ? 'Собираю… ' + Math.max(0, Math.round((Date.now() - Date.parse(run.created_at)) / 1000)) + ' c' : 'Жду запуска…');
    }
    if (!run || run.status !== 'completed') throw new Error('сборка идёт дольше обычного, загляните позже');
    if (run.conclusion !== 'success') throw new Error('сборка завершилась с ошибкой');
    step('Загружаю…');
    let data = null;
    for (let i = 0; i < 6; i++) {   // свежий файл прямо из репозитория, мимо кэша CDN
      const f = await gh('/contents/docs/data.enc?ref=main', { headers: { Accept: 'application/vnd.github.raw+json' } });
      if (f.ok) { data = await decrypt(await f.text(), pw); if (data.generated !== DATA.generated) break; }
      await sleep(3000);
    }
    if (!data) throw new Error('не удалось загрузить данные');
    const keep = { period, cut, sel: ['#fFunnel', '#fSource', '#fMedium', '#fMsg'].map(q => $(q).value) };
    init(data);
    ['#fFunnel', '#fSource', '#fMedium', '#fMsg'].forEach((q, i) => { $(q).value = keep.sel[i]; if ($(q).value !== keep.sel[i]) $(q).value = ''; });
    root.querySelector('#per button[data-p="' + keep.period + '"]').click();
    root.querySelector('#cuts button[data-c="' + keep.cut + '"]').click();
  } catch (e) {
    btn.disabled = false; step('↻ Обновить');
    $('#sub').insertAdjacentHTML('beforeend', ' · <span class="rerr">Не обновилось: ' + esc(e.message) + '</span>');
  }
}

/* ---- зашифрованные данные: пароль → PBKDF2-SHA256 (200 000) → AES-256-GCM; формат base64(salt16 + iv12 + ct) ---- */
async function decrypt(b64, password) {
  const raw = Uint8Array.from(atob(b64.trim()), c => c.charCodeAt(0));
  const salt = raw.slice(0, 16), iv = raw.slice(16, 28), ct = raw.slice(28);
  const km = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: 200000, hash: 'SHA-256' }, km, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
  const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct);
  return JSON.parse(new TextDecoder().decode(pt));
}
async function bootEncrypted(url) {
  const gate = () => new Promise(res => {
    root.innerHTML = '<div class="gate"><h1>Воронка «Облигации 2026»</h1><p>Введите пароль, чтобы увидеть цифры</p><input type="password" id="pw" placeholder="Пароль" autocomplete="current-password"><button id="go">Открыть</button><div class="err" id="err"></div></div>';
    const go = () => res($('#pw').value);
    $('#go').addEventListener('click', go); $('#pw').addEventListener('keydown', e => { if (e.key === 'Enter') go(); }); $('#pw').focus();
  });
  let b64;
  try { const r = await fetch(url + (url.includes('?') ? '&' : '?') + 't=' + Date.now(), { cache: 'no-store' }); if (!r.ok) throw new Error(r.status); b64 = await r.text(); }
  catch (e) { root.innerHTML = '<div class="gate"><h1>Данные ещё не опубликованы</h1><p>Файл с цифрами пока не загрузился. Первая сборка идёт в GitHub, попробуйте позже.</p></div>'; return; }
  let pw = localStorage.getItem('zd_pw') || '';
  for (;;) {
    if (!pw) pw = await gate();
    try { const data = await decrypt(b64, pw); localStorage.setItem('zd_pw', pw); init(data); return; }
    catch (e) { localStorage.removeItem('zd_pw'); pw = ''; root.innerHTML = ''; const p = gate(); setTimeout(() => { const er = $('#err'); if (er) er.textContent = 'Неверный пароль'; }, 0); pw = await p; }
  }
}
window.zdInit = init; window.zdBootEncrypted = bootEncrypted;
window.DASHBOARD_DATA_URL='https://raw.githubusercontent.com/Zuevap94/bonds-dashboard/main/docs/data.enc';bootEncrypted(window.DASHBOARD_DATA_URL);
})();
