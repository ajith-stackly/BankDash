import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
const cx = (...c) => c.filter(Boolean).join(" ");
const CARD_RADIUS = "rounded-[15px] min-[768px]:rounded-[20px] min-[1400px]:rounded-[25px]";
const TABS = ["All Transactions", "Income", "Expense"];
const PER_PAGE = 5;
export const transactions = [{
  name: "Spotify Subscription",
  id: "#12548796",
  type: "Shopping",
  date: "28 Jan, 12.30 AM",
  amount: "-$2,500",
  accent: "#123288"
}, {
  name: "Freepik Sales",
  id: "#12548796",
  type: "Transfer",
  date: "25 Jan, 10.40 PM",
  amount: "+$750",
  accent: "#123288"
}, {
  name: "Mobile Service",
  id: "#12548796",
  type: "Service",
  date: "20 Jan, 10.40 PM",
  amount: "-$150",
  accent: "#1814F3"
}, {
  name: "Wilson",
  id: "#12548796",
  type: "Transfer",
  date: "15 Jan, 03.29 PM",
  amount: "-$1050",
  accent: "#123288"
}, {
  name: "Emilly",
  id: "#12548796",
  type: "Transfer",
  date: "14 Jan, 10.40 PM",
  amount: "+$840",
  accent: "#123288"
}, {
  name: "Netflix Subscription",
  id: "#12548801",
  type: "Shopping",
  date: "12 Jan, 08.15 AM",
  amount: "-$650",
  accent: "#123288"
}, {
  name: "Jemi Wilson",
  id: "#12548802",
  type: "Transfer",
  date: "10 Jan, 05.10 PM",
  amount: "+$5,400",
  accent: "#123288"
}, {
  name: "Deposit Paypal",
  id: "#12548803",
  type: "Deposit",
  date: "05 Jan, 09.00 AM",
  amount: "+$2,500",
  accent: "#123288"
}, {
  name: "Apple Store",
  id: "#12548804",
  type: "Shopping",
  date: "03 Jan, 11.20 AM",
  amount: "-$1,085",
  accent: "#123288"
}, {
  name: "Michael",
  id: "#12548805",
  type: "Transfer",
  date: "02 Jan, 07.45 PM",
  amount: "+$160",
  accent: "#123288"
}, {
  name: "Electricity Bill",
  id: "#12548811",
  type: "Service",
  date: "30 Dec, 09.30 AM",
  amount: "-$240",
  accent: "#123288"
}, {
  name: "William",
  id: "#12548812",
  type: "Transfer",
  date: "28 Dec, 04.15 PM",
  amount: "+$90",
  accent: "#123288"
}, {
  name: "Playstation Store",
  id: "#12548813",
  type: "Shopping",
  date: "26 Dec, 08.00 PM",
  amount: "-$450",
  accent: "#123288"
}, {
  name: "Salary Credit",
  id: "#12548814",
  type: "Deposit",
  date: "24 Dec, 10.00 AM",
  amount: "+$4,200",
  accent: "#123288"
}, {
  name: "Water Bill",
  id: "#12548815",
  type: "Service",
  date: "20 Dec, 02.40 PM",
  amount: "-$85",
  accent: "#123288"
}, {
  name: "Amazon Order",
  id: "#12548821",
  type: "Shopping",
  date: "18 Dec, 06.25 PM",
  amount: "-$320",
  accent: "#123288"
}, {
  name: "Freelance Payment",
  id: "#12548822",
  type: "Deposit",
  date: "15 Dec, 01.10 PM",
  amount: "+$1,300",
  accent: "#123288"
}, {
  name: "Internet Bill",
  id: "#12548823",
  type: "Service",
  date: "12 Dec, 10.50 AM",
  amount: "-$60",
  accent: "#123288"
}, {
  name: "Sarah",
  id: "#12548824",
  type: "Transfer",
  date: "09 Dec, 03.35 PM",
  amount: "+$500",
  accent: "#123288"
}, {
  name: "Uber Ride",
  id: "#12548825",
  type: "Shopping",
  date: "05 Dec, 09.15 PM",
  amount: "-$35",
  accent: "#123288"
}];
const expenseBars = [{
  month: "Aug",
  value: 9000
}, {
  month: "Sep",
  value: 13750
}, {
  month: "Oct",
  value: 9300
}, {
  month: "Nov",
  value: 4750
}, {
  month: "Dec",
  value: 12500
}, {
  month: "Jan",
  value: 8500
}];
const EXPENSE_MAX = 13750;
const isDebit = t => t.amount.startsWith("-");
function downloadReceipt(t) {
  const text = ["BankDash Receipt", "", `Description : ${t.name}`, `Transaction : ${t.id}`, `Type        : ${t.type}`, "Card        : 1234 ****", `Date        : ${t.date}`, `Amount      : ${t.amount}`].join("\n");
  const url = URL.createObjectURL(new Blob([text], {
    type: "text/plain"
  }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `receipt-${t.id.replace("#", "")}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}
function Heading({
  children,
  className = ""
}) {
  return <h2 className={cx("font-[Inter] font-semibold text-[#343C6A] text-base leading-[19px] min-[768px]:text-[18px] min-[768px]:leading-[22px] min-[1400px]:text-[22px] min-[1400px]:leading-[27px]", className)}>
      {children}
    </h2>;
}
function Chip({
  cut,
  className
}) {
  return <svg viewBox="0 0 35 35" fill="none" className={className}>
      <rect x="1.5" y="3.5" width="32" height="28" rx="8" fill="currentColor" />
      <g stroke={cut} strokeWidth="2" strokeLinecap="round">
        <path d="M1.5 13h9M24.5 13h9M1.5 22h9M24.5 22h9" />
        <rect x="10.5" y="8" width="14" height="19" rx="4" />
      </g>
    </svg>;
}
function BankCard({
  blue
}) {
  const label = blue ? "text-white/70" : "text-[#718EBF]";
  return <div className={cx("relative overflow-hidden font-[Lato] w-full h-[170px] min-[1400px]:h-[225px]", CARD_RADIUS, blue ? "text-white" : "bg-white text-[#343C6A] border border-[#DFEAF2]")} style={blue ? {
    background: "linear-gradient(107.38deg, #4C49ED 2.61%, #0A06F4 101.2%)"
  } : undefined}>
      <div className="absolute left-5 top-[17px] min-[1400px]:left-[26px] min-[1400px]:top-6">
        <p className={cx("text-[11px] leading-[13px] min-[1400px]:text-xs min-[1400px]:leading-[14px]", !blue && "text-[#718EBF]")}>
          Balance
        </p>
        <p className="font-semibold text-base leading-[19px] min-[1400px]:text-xl min-[1400px]:leading-6">
          $5,756
        </p>
      </div>

      <Chip cut={blue ? "#3A37F0" : "#FFFFFF"} className={cx("absolute right-5 top-[18px] w-[29px] h-[29px] min-[1400px]:right-6 min-[1400px]:top-[25px] min-[1400px]:w-[35px] min-[1400px]:h-[35px]", blue ? "text-white" : "text-[#C5CBD8]")} />

      <div className="absolute left-5 top-[73px] min-[1400px]:left-[26px] min-[1400px]:top-[91px] flex">
        <div className="w-[135px] min-[768px]:w-[110px] min-[1000px]:w-[119px] min-[1400px]:w-[157px]">
          <p className={cx("text-[10px] leading-3 min-[1400px]:text-xs min-[1400px]:leading-[14px]", label)}>
            CARD HOLDER
          </p>
          <p className="font-semibold text-[13px] leading-4 min-[1400px]:text-[15px] min-[1400px]:leading-[18px]">
            Eddy Cusuma
          </p>
        </div>
        <div>
          <p className={cx("text-[10px] leading-3 min-[1400px]:text-xs min-[1400px]:leading-[14px]", label)}>
            VALID THRU
          </p>
          <p className="font-semibold text-[13px] leading-4 min-[1400px]:text-[15px] min-[1400px]:leading-[18px]">
            12/22
          </p>
        </div>
      </div>

      <div className={cx("absolute inset-x-0 bottom-0 flex items-center justify-between h-[51px] px-5 min-[1400px]:h-[70px] min-[1400px]:px-[26px]", !blue && "border-t border-[#DFEAF2]")} style={{
      background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)"
    }}>
        <p className="font-semibold text-[15px] leading-[18px] min-[1400px]:text-[22px] min-[1400px]:leading-[26px] whitespace-nowrap">
          3778 **** **** 1234
        </p>
        <span className="flex shrink-0">
          {[0, 1].map(i => <i key={i} className={cx("block rounded-full w-[18px] h-[18px] min-[1400px]:w-[30px] min-[1400px]:h-[30px]", i === 1 && "-ml-[9px] min-[1400px]:-ml-4", blue ? "bg-white/50" : "bg-[#9199AF]/50")} />)}
        </span>
      </div>
    </div>;
}
function MyCards() {
  return <section className="min-w-0">
      <div className="flex items-center justify-between mb-3 min-[768px]:mb-4 min-[1400px]:mb-5">
        <Heading>My Cards</Heading>
        <Link to="/credit-cards" className="font-[Inter] font-semibold text-[#343C6A] text-sm leading-[17px] min-[768px]:text-[15px] min-[768px]:leading-[18px] min-[1400px]:text-[17px] min-[1400px]:leading-[21px]">
          + Add Card
        </Link>
      </div>

      <div className="flex gap-5 overflow-x-auto snap-x scroll-pl-[25px] -mx-[25px] px-[25px] [scrollbar-width:none]
          min-[768px]:grid min-[768px]:grid-cols-2 min-[768px]:gap-[25px] min-[768px]:overflow-visible min-[768px]:mx-0 min-[768px]:px-0
          min-[1400px]:gap-[30px]">
        {[true, false].map(blue => <div key={String(blue)} className="w-[265px] shrink-0 snap-start min-[768px]:w-auto min-[768px]:min-w-0">
            <BankCard blue={blue} />
          </div>)}
      </div>
    </section>;
}
function MyExpense() {
  const [active, setActive] = useState(4);
  return <section className="min-w-0">
      <div className="flex items-center mb-3 min-[768px]:mb-4 min-[1400px]:mb-5">
        <Heading>My Expense</Heading>
      </div>

      <div className={cx("bg-white flex flex-col justify-end h-[214px] min-[768px]:h-[170px] min-[1400px]:h-[225px] px-5 pb-5 min-[768px]:px-[19px] min-[768px]:pb-[15px] min-[1400px]:px-[25px] min-[1400px]:pb-[25px]", CARD_RADIUS)}>
        <div className="flex items-end justify-between min-[1400px]:justify-start min-[1400px]:gap-[15px] h-[142px] min-[768px]:h-[111px] min-[1400px]:h-[142px]">
          {expenseBars.map((b, i) => {
          const on = i === active;
          const h = b.value / EXPENSE_MAX * 100;
          return <button key={b.month} type="button" onClick={() => setActive(i)} onMouseEnter={() => setActive(i)} aria-label={`${b.month} $${b.value.toLocaleString("en-US")}`} className="cursor-pointer relative flex flex-col justify-end h-full w-[35px] min-[768px]:w-[22px] min-[1400px]:w-[37px]">
                {on && <span className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-[Inter] font-medium text-[13px] leading-4 min-[768px]:text-xs min-[768px]:leading-[15px] min-[768px]:font-semibold min-[1400px]:text-sm min-[1400px]:leading-[17px] min-[1400px]:font-medium text-[#343C6A]" style={{
              bottom: `calc(${h}% + 7px)`
            }}>
                    ${b.value.toLocaleString("en-US")}
                  </span>}
                <span className={cx("block w-full rounded-[10px] min-[768px]:rounded-[7px] min-[1400px]:rounded-[10px] transition-colors duration-200", on ? "bg-[#16DBCC]" : "bg-[#EDF0F7]")} style={{
              height: `${h}%`,
              boxShadow: on ? "0px 0px 35px rgba(18, 136, 126, 0.2)" : "none"
            }} />
              </button>;
        })}
        </div>

        <div className="flex justify-between min-[1400px]:justify-start min-[1400px]:gap-[15px] mt-[9px] min-[768px]:mt-1.5 min-[1400px]:mt-[9px]">
          {expenseBars.map(b => <span key={b.month} className="text-center font-[Inter] text-[#718EBF] text-xs leading-[15px] min-[1400px]:text-[13px] min-[1400px]:leading-4 w-[35px] min-[768px]:w-[22px] min-[1400px]:w-[37px]">
              {b.month}
            </span>)}
        </div>
      </div>
    </section>;
}
function ArrowCircle({
  debit,
  className
}) {
  return <svg viewBox="0 0 30 30" fill="none" stroke="#718EBF" strokeLinecap="round" strokeLinejoin="round" className={cx("shrink-0", className)}>
      <circle cx="15" cy="15" r="14" strokeWidth="2" />
      <g strokeWidth="1.6" transform={debit ? undefined : "rotate(180 15 15)"}>
        <path d="M15 21.5V9" />
        <path d="M10.5 13.5 15 9l4.5 4.5" />
      </g>
    </svg>;
}
const COLS = "grid items-center grid-cols-[165fr_104fr_76fr_83fr_125fr_70fr_80px] min-[1400px]:grid-cols-[229fr_154fr_125fr_134fr_198fr_110fr_100px]";
function TransactionsTable({
  rows
}) {
  return <div className="hidden min-[900px]:block">
      <div className={cx(COLS, "pb-[7px] min-[1400px]:pb-[11px] border-b border-[#E6EFF5] font-[Inter] font-medium text-xs leading-[15px] min-[1400px]:text-base min-[1400px]:leading-[19px] text-[#718EBF]")}>
        <span>Description</span>
        <span>Transaction ID</span>
        <span>Type</span>
        <span>Card</span>
        <span>Date</span>
        <span>Amount</span>
        <span>Receipt</span>
      </div>

      {rows.map(t => <div key={t.id + t.name} className={cx(COLS, "h-[46px] min-[1400px]:h-[66px] border-b border-[#E6EFF5] min-[1400px]:border-[#F2F4F7] last:border-b-0 font-[Inter] text-xs leading-[15px] min-[1400px]:text-base min-[1400px]:leading-[19px] text-[#232323]")}>
          <span className="flex items-center gap-2.5 min-[1400px]:gap-3.5 min-w-0 pr-2">
            <ArrowCircle debit={isDebit(t)} className="w-5 h-5 min-[1400px]:w-[30px] min-[1400px]:h-[30px]" />
            <span className="truncate">{t.name}</span>
          </span>
          <span className="truncate pr-2">{t.id}</span>
          <span className="truncate pr-2">{t.type}</span>
          <span className="truncate pr-2">1234 ****</span>
          <span className="truncate pr-2">{t.date}</span>
          <span className={cx("font-medium", isDebit(t) ? "text-[#FE5C73]" : "text-[#16DBAA]")}>
            {t.amount}
          </span>
          <button type="button" onClick={() => downloadReceipt(t)} className="cursor-pointer w-[80px] h-[30px] min-[1400px]:w-[100px] min-[1400px]:h-[35px] rounded-full border text-xs leading-[15px] min-[1400px]:text-[15px] min-[1400px]:leading-[18px] transition-colors hover:bg-[#F5F7FA]" style={{
        color: t.accent,
        borderColor: t.accent
      }}>
            Download
          </button>
        </div>)}
    </div>;
}
function TransactionsList({
  rows
}) {
  return <div className="min-[900px]:hidden">
      {rows.map(t => <div key={t.id + t.name} className="flex items-center gap-3 h-[56px] border-b border-[#E6EFF5] last:border-b-0">
          <ArrowCircle debit={isDebit(t)} className="w-[35px] h-[35px]" />
          <div className="min-w-0 flex-1 font-[Inter]">
            <p className="truncate font-medium text-[13px] leading-4 text-[#232323]">
              {t.name}
            </p>
            <p className="mt-[5px] truncate text-xs leading-[15px] text-[#718EBF]">
              {t.date}
            </p>
          </div>
          <span className={cx("shrink-0 font-[Inter] font-medium text-[13px] leading-4", isDebit(t) ? "text-[#FE5C73]" : "text-[#16DBAA]")}>
            {t.amount}
          </span>
        </div>)}
    </div>;
}
function Tabs({
  value,
  onChange
}) {
  return <div className="flex gap-[33px] min-[768px]:gap-10 min-[1400px]:gap-[60px] border-b border-[#EBEEF2] pt-px min-[768px]:pt-0.5 min-[1400px]:pt-[7px]">
      {TABS.map(t => {
      const on = t === value;
      return <button key={t} type="button" onClick={() => onChange(t)} className={cx("cursor-pointer relative px-2.5 min-[1400px]:px-[11px] pb-2 min-[1400px]:pb-2.5 font-[Inter] font-medium text-[13px] leading-4 min-[1400px]:text-base min-[1400px]:leading-[19px] whitespace-nowrap transition-colors", on ? "text-[#1814F3]" : "text-[#718EBF] hover:text-[#343C6A]")}>
            {t}
            {on && <span className="absolute inset-x-0 -bottom-px h-0.5 min-[768px]:h-[3px] rounded-t-[10px] bg-[#1814F3]" />}
          </button>;
    })}
    </div>;
}
function Chevron({
  flip
}) {
  return <svg viewBox="0 0 7 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cx("w-[6px] h-[10px] min-[1400px]:w-[7px] min-[1400px]:h-3", flip && "rotate-180")}>
      <path d="M6 1 1.5 6 6 11" />
    </svg>;
}
function Pagination({
  page,
  pages,
  onChange
}) {
  const btn = "cursor-pointer flex items-center gap-2.5 min-[1400px]:gap-[7px] font-[Inter] font-medium text-xs leading-[15px] min-[1400px]:text-[15px] min-[1400px]:leading-[18px] text-[#1814F3] disabled:cursor-not-allowed disabled:opacity-40";
  return <nav aria-label="Pagination" className="flex items-center justify-end gap-2.5 min-[1400px]:gap-3 mt-4 min-[768px]:mt-5 min-[1400px]:mt-[30px]">
      <button type="button" disabled={page === 1} onClick={() => onChange(page - 1)} className={btn}>
        <Chevron />
        Previous
      </button>

      <div className="flex">
        {Array.from({
        length: pages
      }).map((_, i) => {
        const n = i + 1;
        const on = n === page;
        return <button key={n} type="button" onClick={() => onChange(n)} aria-current={on ? "page" : undefined} className={cx("cursor-pointer w-[30px] h-[30px] min-[1400px]:w-10 min-[1400px]:h-10 rounded-[7px] min-[1400px]:rounded-[10px] font-[Inter] font-medium text-xs min-[1400px]:text-[15px] transition-colors", i > 0 && "min-[1400px]:-ml-[3px]", on ? "bg-[#1814F3] text-white" : "text-[#1814F3] hover:bg-[#E7EDFF]")}>
              {n}
            </button>;
      })}
      </div>

      <button type="button" disabled={page === pages} onClick={() => onChange(page + 1)} className={btn}>
        Next
        <Chevron flip />
      </button>
    </nav>;
}
export default function Transactions() {
  const [tab, setTab] = useState(TABS[0]);
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => transactions.filter(t => tab === "Income" ? !isDebit(t) : tab === "Expense" ? isDebit(t) : true), [tab]);
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const rows = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const changeTab = t => {
    setTab(t);
    setPage(1);
  };
  return <div className="flex flex-col gap-[22px] pt-px min-[768px]:pt-0 min-[768px]:gap-5 min-[1400px]:gap-6">
      <div className="grid gap-[22px] min-[768px]:gap-5 min-[900px]:grid-cols-[487fr_231fr] min-[900px]:gap-x-[25px] min-[1400px]:grid-cols-[730fr_350fr] min-[1400px]:gap-x-[30px]">
        <MyCards />
        <MyExpense />
      </div>

      <section className="min-w-0">
        <Heading className="mb-3 min-[768px]:mb-4 min-[1400px]:mb-5">
          Recent Transactions
        </Heading>

        <Tabs value={tab} onChange={changeTab} />

        <div className={cx("bg-white mt-4 min-[768px]:mt-5 min-[1400px]:mt-[25px] px-5 pt-2 pb-[11px] min-[900px]:pt-[17px] min-[900px]:pb-[7px] min-[1400px]:px-[30px] min-[1400px]:pt-[22px] min-[1400px]:pb-3.5", CARD_RADIUS)}>
          <TransactionsTable rows={rows} />
          <TransactionsList rows={rows} />
        </div>

        <Pagination page={page} pages={pages} onChange={setPage} />
      </section>
    </div>;
}
