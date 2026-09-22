import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faWallet, faDollarSign, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import ceoPhoto from "../assets/images/Ceo.png";
import directorPhoto from "../assets/images/Director.png";
import designerPhoto from "../assets/images/Designer.png";
const cx = (...c) => c.filter(Boolean).join(" ");
const CARD_RADIUS = "rounded-[15px] min-[768px]:rounded-[20px] min-[1400px]:rounded-[25px]";
function Section({
  title,
  right,
  children,
  className = ""
}) {
  return <section className={cx("min-w-0", className)}>
      <div className="flex items-center justify-between mb-3 min-[768px]:mb-4 min-[1400px]:mb-5">
        <h2 className="font-[Inter] font-semibold text-[#343C6A] text-base leading-[19px] min-[768px]:text-[18px] min-[768px]:leading-[22px] min-[1400px]:text-[22px] min-[1400px]:leading-[27px]">
          {title}
        </h2>
        {right}
      </div>
      {children}
    </section>;
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
function CreditCard({
  variant,
  balance,
  holder,
  valid,
  number
}) {
  const blue = variant === "blue";
  return <div className={cx("relative overflow-hidden font-[Lato] h-[170px] min-[1400px]:h-[235px]", CARD_RADIUS, blue ? "text-white" : "bg-white text-[#343C6A] border border-[#DFEAF2]")} style={blue ? {
    background: "linear-gradient(107.38deg, #4C49ED 2.61%, #0A06F4 101.2%)"
  } : undefined}>
      {}
      <div className="absolute left-5 top-[17px] min-[1400px]:left-[26px] min-[1400px]:top-6">
        <p className={cx("text-[11px] leading-[13px] min-[1400px]:text-xs min-[1400px]:leading-[14px]", !blue && "text-[#718EBF]")}>
          Balance
        </p>
        <p className="font-semibold text-base leading-[19px] min-[1400px]:text-xl min-[1400px]:leading-6">
          {balance}
        </p>
      </div>

      {}
      <Chip cut={blue ? "#3A37F0" : "#FFFFFF"} className={cx("absolute w-[29px] h-[29px] right-5 top-[17px] min-[1400px]:w-[35px] min-[1400px]:h-[35px] min-[1400px]:right-6 min-[1400px]:top-[25px]", blue ? "text-white" : "text-[#4F4F4F]")} />

      {}
      <div className="absolute left-5 top-[73px] min-[1400px]:left-[26px] min-[1400px]:top-[95px] flex">
        <div className="w-[135px] min-[768px]:w-[110px] min-[1400px]:w-[157px]">
          <p className={cx("text-[10px] leading-3 min-[1400px]:text-xs min-[1400px]:leading-[14px]", blue ? "text-white/70" : "text-[#718EBF]")}>
            CARD HOLDER
          </p>
          <p className="font-semibold text-[13px] leading-4 min-[1400px]:text-[15px] min-[1400px]:leading-[18px]">
            {holder}
          </p>
        </div>
        <div>
          <p className={cx("text-[10px] leading-3 min-[1400px]:text-xs min-[1400px]:leading-[14px]", blue ? "text-white/70" : "text-[#718EBF]")}>
            VALID THRU
          </p>
          <p className="font-semibold text-[13px] leading-4 min-[1400px]:text-[15px] min-[1400px]:leading-[18px]">
            {valid}
          </p>
        </div>
      </div>

      {}
      <div className={cx("absolute inset-x-0 bottom-0 flex items-center justify-between h-[51px] px-5 min-[1400px]:h-[70px] min-[1400px]:px-[26px]", !blue && "border-t border-[#DFEAF2]")} style={blue ? {
      background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)"
    } : undefined}>
        <p className="font-semibold text-[15px] leading-[18px] min-[1400px]:text-[22px] min-[1400px]:leading-[26px] whitespace-nowrap">
          {number}
        </p>
        <span className="flex shrink-0">
          {[0, 1].map(i => <i key={i} className={cx("block rounded-full w-[18px] h-[18px] min-[1400px]:w-[30px] min-[1400px]:h-[30px]", i === 1 && "-ml-[9px] min-[1400px]:-ml-4", blue ? "bg-white/50" : "bg-[#9199AF]/50")} />)}
        </span>
      </div>
    </div>;
}
function MyCards() {
  return <Section title="My Cards" right={<button className="cursor-pointer font-[Inter] font-semibold text-[#343C6A] text-sm min-[768px]:text-[15px] min-[1400px]:text-[17px]">
          See All
        </button>}>
      <div className="flex gap-5 overflow-x-auto snap-x scroll-pl-[25px] -mx-[25px] px-[25px] [scrollbar-width:none]
          min-[768px]:grid min-[768px]:grid-cols-2 min-[768px]:gap-[25px] min-[768px]:overflow-visible min-[768px]:mx-0 min-[768px]:px-0
          min-[1400px]:gap-[30px]">
        {[{
        variant: "blue"
      }, {
        variant: "white"
      }].map(({
        variant
      }) => <div key={variant} className="w-[265px] shrink-0 snap-start min-[768px]:w-auto min-[768px]:min-w-0">
            <CreditCard variant={variant} balance="$5,756" holder="Eddy Cusuma" valid="12/22" number="3778 **** **** 1234" />
          </div>)}
      </div>
    </Section>;
}
const transactions = [{
  title: "Deposit from my Card",
  date: "28 January 2021",
  amount: "-$850",
  negative: true,
  icon: faCreditCard,
  iconColor: "#FFBB38",
  bg: "#FFF5D9"
}, {
  title: "Deposit Paypal",
  date: "25 January 2021",
  amount: "+$2,500",
  icon: faWallet,
  iconColor: "#396AFF",
  bg: "#E7EDFF"
}, {
  title: "Jemi Wilson",
  date: "21 January 2021",
  amount: "+$5,400",
  icon: faDollarSign,
  iconColor: "#16DBCC",
  bg: "#DCFAF8"
}];
function RecentTransaction() {
  return <Section title="Recent Transaction">
      <div className={cx("bg-white flex flex-col justify-between gap-3 p-[18px] min-[768px]:gap-2.5 min-[768px]:px-[15px] min-[768px]:py-[15px] min-[1400px]:gap-2.5 min-[1400px]:p-[25px]", CARD_RADIUS)}>
        {transactions.map(t => <div key={t.title} className="flex items-center">
            <span className="shrink-0 mr-[15px] min-[768px]:mr-2 min-[1400px]:mr-[17px] rounded-full flex items-center justify-center w-[50px] h-[50px] text-[20px] min-[768px]:w-10 min-[768px]:h-10 min-[768px]:text-base min-[1400px]:w-[55px] min-[1400px]:h-[55px] min-[1400px]:text-[24px]" style={{
          background: t.bg,
          color: t.iconColor
        }}>
              <FontAwesomeIcon icon={t.icon} />
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate font-[Inter] font-medium text-[#232323] text-sm leading-[17px] min-[768px]:text-[13px] min-[768px]:leading-4 min-[1400px]:text-base min-[1400px]:leading-[19px]">
                {t.title}
              </p>
              <p className="truncate mt-[3px] min-[1400px]:mt-[7px] font-[Inter] text-[#718EBF] text-xs leading-[15px] min-[1400px]:text-[15px] min-[1400px]:leading-[18px]">
                {t.date}
              </p>
            </div>

            <span className={cx("shrink-0 pl-2 font-[Inter] font-medium text-[11px] leading-[13px] min-[1400px]:text-base min-[1400px]:leading-[19px]", t.negative ? "text-[#FF4B4A]" : "text-[#41D4A8]")}>
              {t.amount}
            </span>
          </div>)}
      </div>
    </Section>;
}
const DEPOSIT_COLOR = "#1814F3";
const WITHDRAW_COLOR = "#16DBCC";
const weekly = [{
  day: "Sat",
  a: 480,
  b: 245
}, {
  day: "Sun",
  a: 350,
  b: 130
}, {
  day: "Mon",
  a: 330,
  b: 265
}, {
  day: "Tue",
  a: 480,
  b: 370
}, {
  day: "Wed",
  a: 155,
  b: 245
}, {
  day: "Thu",
  a: 390,
  b: 245
}, {
  day: "Fri",
  a: 395,
  b: 340
}];
const weeklyTicks = [500, 400, 300, 200, 100, 0];
function WeeklyActivity() {
  return <Section title="Weekly Activity">
      <div className={cx("bg-white h-[254px] min-[768px]:h-[261px] min-[1400px]:h-[322px] px-[18px] pt-[17px] min-[768px]:px-[22px] min-[1400px]:pl-[33px] min-[1400px]:pr-[30px] min-[1400px]:pt-7", CARD_RADIUS)}>
        {}
        <div className="flex justify-end gap-[18px] min-[1400px]:gap-[30px] font-[Inter] text-[#718EBF] text-xs leading-[15px] min-[768px]:text-[13px] min-[768px]:leading-4 min-[1400px]:text-[15px] min-[1400px]:leading-[18px]">
          {[["Diposit", DEPOSIT_COLOR], ["Withdraw", WITHDRAW_COLOR]].map(([label, color]) => <span key={label} className="flex items-center gap-2.5">
              <i className="block rounded-full w-3 h-3 min-[1400px]:w-[15px] min-[1400px]:h-[15px]" style={{
            background: color
          }} />
              {label}
            </span>)}
        </div>

        <div className="flex mt-3 min-[768px]:mt-[17px] min-[1400px]:mt-[30px]">
          {}
          <div className="relative shrink-0 w-[30px] min-[768px]:w-8 min-[1400px]:w-[36px] h-[165px] min-[1400px]:h-[185px] font-[Inter] text-[#718EBF] text-xs min-[1400px]:text-[13px]">
            {weeklyTicks.map((t, i) => <span key={t} className="absolute left-0 w-[23px] min-[1400px]:w-[25px] text-right leading-none -translate-y-1/2" style={{
            top: `${i * 20}%`
          }}>
                {t}
              </span>)}
          </div>

          <div className="flex-1 min-w-0">
            {}
            <div className="relative h-[165px] min-[1400px]:h-[185px]">
              {weeklyTicks.map((t, i) => <div key={t} className="absolute inset-x-0 h-px bg-[#F3F3F5]" style={{
              top: i === 5 ? "calc(100% - 1px)" : `${i * 20}%`
            }} />)}
              <div className="absolute inset-0 flex">
                {weekly.map(d => <div key={d.day} className="flex-1 flex items-end justify-center gap-[5px] min-[768px]:gap-2 min-[1400px]:gap-3">
                    <span className="w-[7px] min-[768px]:w-2.5 min-[1400px]:w-[15px] rounded-full" style={{
                  height: `${d.a / 500 * 100}%`,
                  background: DEPOSIT_COLOR
                }} />
                    <span className="w-[7px] min-[768px]:w-2.5 min-[1400px]:w-[15px] rounded-full" style={{
                  height: `${d.b / 500 * 100}%`,
                  background: WITHDRAW_COLOR
                }} />
                  </div>)}
              </div>
            </div>

            {}
            <div className="flex mt-[13px] min-[1400px]:mt-[17px] font-[Inter] text-[#718EBF] text-xs leading-[15px] min-[1400px]:text-[13px] min-[1400px]:leading-4">
              {weekly.map(d => <span key={d.day} className="flex-1 text-center">
                  {d.day}
                </span>)}
            </div>
          </div>
        </div>
      </div>
    </Section>;
}
const expenses = [{
  pct: 30,
  name: "Entertainment",
  color: "#343C6A",
  from: -54,
  to: 54
}, {
  pct: 15,
  name: "Bill Expense",
  color: "#FC7900",
  from: 54,
  to: 108
}, {
  pct: 35,
  name: "Others",
  color: "#1814F3",
  from: 108,
  to: 234
}, {
  pct: 20,
  name: "Investment",
  color: "#FA00FF",
  from: 234,
  to: 306
}];
const polar = (cx0, cy0, r, deg) => {
  const a = deg * Math.PI / 180;
  return [cx0 + r * Math.sin(a), cy0 - r * Math.cos(a)];
};
function ExpenseStatistics() {
  const C = 150;
  const R = 128;
  const EXPLODE = 7;
  return <Section title="Expense Statistics">
      <div className={cx("bg-white flex items-center justify-center h-[240px] min-[768px]:h-[261px] min-[1400px]:h-[322px] p-[22px] min-[768px]:p-[25px] min-[1400px]:p-[26px]", CARD_RADIUS)}>
        <svg viewBox="0 0 300 300" className="w-full max-w-[202px] min-[768px]:max-w-[181px] min-[1400px]:max-w-[270px] h-auto" role="img" aria-label="Expense statistics pie chart">
          {expenses.map(e => {
          const mid = (e.from + e.to) / 2;
          const [ox, oy] = polar(0, 0, EXPLODE, mid);
          const [x0, y0] = polar(C, C, R, e.from);
          const [x1, y1] = polar(C, C, R, e.to);
          const large = e.to - e.from > 180 ? 1 : 0;
          const [lx, ly] = polar(C, C, R * 0.62, mid);
          return <g key={e.name} transform={`translate(${ox} ${oy})`}>
                <path d={`M${C} ${C} L${x0} ${y0} A${R} ${R} 0 ${large} 1 ${x1} ${y1} Z`} fill={e.color} />
                <text x={lx} y={ly} textAnchor="middle" fill="#fff" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="15">
                  <tspan x={lx} dy="-2">
                    {e.pct}%
                  </tspan>
                  <tspan x={lx} dy="16">
                    {e.name}
                  </tspan>
                </text>
              </g>;
        })}
        </svg>
      </div>
    </Section>;
}
function Avatar({
  name,
  src,
  from,
  to,
  className
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2);
  return src && !imgFailed ? <img src={src} alt={name} onError={() => setImgFailed(true)} className={cx("rounded-full object-cover", className)} /> : <span className={cx("rounded-full flex items-center justify-center text-white font-[Inter] font-semibold", className)} style={{
    background: `linear-gradient(135deg, ${from}, ${to})`
  }}>
      {initials}
    </span>;
}
const people = [{
  name: "Livia Bator",
  role: "CEO",
  src: ceoPhoto,
  from: "#FFB199",
  to: "#FF0844"
}, {
  name: "Randy Press",
  role: "Director",
  src: directorPhoto,
  from: "#4FACFE",
  to: "#00C6FB"
}, {
  name: "Workman",
  role: "Designer",
  src: designerPhoto,
  from: "#43E97B",
  to: "#38A3A5"
}];
function QuickTransfer() {
  const [selected, setSelected] = useState(0);
  const [amount, setAmount] = useState("525.50");
  return <Section title="Quick Transfer">
      <div className={cx("bg-white flex flex-col justify-between h-[195px] min-[768px]:h-[220px] min-[1400px]:h-[276px] p-[18px] min-[768px]:px-[15px] min-[768px]:py-[30px] min-[1400px]:px-[25px] min-[1400px]:py-[35px]", CARD_RADIUS)}>
        {}
        <div className="flex items-start justify-between gap-2">
          {people.map((p, i) => <button key={p.name} type="button" onClick={() => setSelected(i)} className="cursor-pointer flex flex-col items-center min-w-0">
              <Avatar {...p} className="w-[50px] h-[50px] text-base min-[1400px]:w-[70px] min-[1400px]:h-[70px] min-[1400px]:text-xl" />
              <span className={cx("mt-3 min-[1400px]:mt-[15px] font-[Inter] text-xs leading-[15px] min-[1400px]:text-base min-[1400px]:leading-[19px] whitespace-nowrap", i === selected ? "font-bold text-black" : "text-[#232323]")}>
                {p.name}
              </span>
              <span className={cx("font-[Inter] text-xs leading-[15px] min-[1400px]:text-[15px] min-[1400px]:leading-[18px] text-[#718EBF]", i === selected && "font-bold")}>
                {p.role}
              </span>
            </button>)}

          <button type="button" aria-label="Next" className="cursor-pointer shrink-0 mt-6 min-[1400px]:mt-[41px] rounded-full bg-white flex items-center justify-center text-[#718EBF] text-xs w-10 h-10 min-[1400px]:w-[50px] min-[1400px]:h-[50px]" style={{
          boxShadow: "4px 4px 18px -2px rgba(231,228,232,0.8)"
        }}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>

        {}
        <div className="flex items-center gap-[25px] min-[768px]:gap-5 min-[1400px]:gap-[27px]">
          <span className="shrink-0 font-[Inter] text-xs leading-[15px] min-[1400px]:text-base min-[1400px]:leading-[19px] text-[#718EBF]">
            Write Amount
          </span>

          <div className="relative flex-1 min-w-0 h-10 min-[1400px]:h-[50px] rounded-full bg-[#EDF1F7]">
            <input value={amount} onChange={e => setAmount(e.target.value)} className="w-full h-full bg-transparent outline-none rounded-full font-[Inter] text-xs min-[1400px]:text-base text-[#718EBF] pl-[15px] pr-[105px] min-[1400px]:pl-[30px] min-[1400px]:pr-[130px]" />
            <button type="button" className="cursor-pointer absolute right-0 top-0 h-full w-[100px] min-[1400px]:w-[125px] rounded-full bg-[#1814F3] text-white font-[Inter] font-medium text-[13px] min-[1400px]:text-base flex items-center justify-center gap-2.5" style={{
            boxShadow: "4px 4px 18px -2px rgba(231,228,232,0.8)"
          }}>
              Send
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 min-[1400px]:w-6 min-[1400px]:h-6">
                <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Section>;
}
const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];
const balanceTicks = [800, 600, 400, 200, 0];
const balancePoints = [[0, 104], [0.6, 330], [1.3, 245], [1.75, 500], [2.15, 440], [3, 800], [4.1, 208], [4.85, 584], [5.6, 245], [6.55, 660], [7, 615]];
const VB_W = 547;
const VB_H = 177;
function smoothPath(pts) {
  const n = pts.length;
  const x = pts.map(p => p[0]);
  const y = pts.map(p => p[1]);
  const dx = [];
  const m = [];
  for (let i = 0; i < n - 1; i++) {
    dx[i] = x[i + 1] - x[i];
    m[i] = (y[i + 1] - y[i]) / dx[i];
  }
  const t = new Array(n);
  t[0] = m[0];
  t[n - 1] = m[n - 2];
  for (let i = 1; i < n - 1; i++) {
    t[i] = m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2;
  }
  for (let i = 0; i < n - 1; i++) {
    if (m[i] === 0) {
      t[i] = 0;
      t[i + 1] = 0;
    } else {
      const a = t[i] / m[i];
      const b = t[i + 1] / m[i];
      const s = a * a + b * b;
      if (s > 9) {
        const tau = 3 / Math.sqrt(s);
        t[i] = tau * a * m[i];
        t[i + 1] = tau * b * m[i];
      }
    }
  }
  let d = `M${x[0]} ${y[0]}`;
  for (let i = 0; i < n - 1; i++) {
    const h = dx[i] / 3;
    d += ` C${x[i] + h} ${y[i] + t[i] * h} ${x[i + 1] - h} ${y[i + 1] - t[i + 1] * h} ${x[i + 1]} ${y[i + 1]}`;
  }
  return d;
}
const scaled = balancePoints.map(([mx, v]) => [mx / 7 * VB_W, VB_H - v / 800 * VB_H]);
const LINE_PATH = smoothPath(scaled);
const AREA_PATH = `${LINE_PATH} L${VB_W} ${VB_H} L0 ${VB_H} Z`;
function BalanceHistory() {
  return <Section title="Balance History">
      <div className={cx("bg-white h-[223px] min-[768px]:h-[220px] min-[1400px]:h-[276px] pt-[35px] pl-[18px] pr-[18px] min-[768px]:pt-[33px] min-[768px]:pr-5 min-[1400px]:pt-10 min-[1400px]:pl-5 min-[1400px]:pr-[25px]", CARD_RADIUS)}>
        <div className="flex">
          {}
          <div className="relative shrink-0 w-[34px] min-[768px]:w-[38px] min-[1400px]:w-[43px] h-[147px] min-[1400px]:h-[177px] font-[Inter] text-[#718EBF] text-xs min-[1400px]:text-[13px]">
            {balanceTicks.map((t, i) => <span key={t} className="absolute inset-x-0 flex items-center justify-between -translate-y-1/2 leading-none" style={{
            top: `${i * 25}%`
          }}>
                <span className="w-full text-left">{t}</span>
                <i className="block h-px w-1.5 bg-[#718EBF]" />
              </span>)}
          </div>

          <div className="flex-1 min-w-0">
            {}
            <div className="relative h-[147px] min-[1400px]:h-[177px]">
              {}
              {balanceTicks.map((t, i) => <div key={t} className="absolute inset-x-0 border-t border-dashed border-[#DFE5EE]" style={{
              top: i === 4 ? "calc(100% - 1px)" : `${i * 25}%`
            }} />)}
              {}
              {Array.from({
              length: 8
            }).map((_, i) => <div key={i} className={cx("absolute inset-y-0 border-l", i === 7 ? "border-solid border-[#EFF3F9]" : "border-dashed border-[#DFE5EE]")} style={{
              left: i === 7 ? "calc(100% - 1px)" : `${i / 7 * 100}%`
            }} />)}

              <svg viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="balanceFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2D60FF" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#2D60FF" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={AREA_PATH} fill="url(#balanceFill)" />
                <path d={LINE_PATH} fill="none" stroke="#1814F3" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>

            {}
            <div className="relative mt-2 h-[17px] font-[Inter] text-[#718EBF] text-xs min-[1400px]:text-sm">
              {months.map((m, i) => <span key={m} className="absolute -translate-x-1/2 leading-[17px]" style={{
              left: `${(i + 0.15) / 7 * 100}%`
            }}>
                  {m}
                </span>)}
            </div>
          </div>
        </div>
      </div>
    </Section>;
}
export default function Dashboard() {
  return <div className="flex flex-col gap-5 min-[1400px]:gap-6">
      {}
      <div className="grid gap-5 min-[900px]:grid-cols-[487fr_231fr] min-[900px]:gap-x-[25px] min-[1400px]:grid-cols-[730fr_350fr] min-[1400px]:gap-x-[30px]">
        <MyCards />
        <RecentTransaction />
      </div>

      {}
      <div className="grid gap-5 min-[900px]:grid-cols-[487fr_231fr] min-[900px]:gap-x-[25px] min-[1400px]:grid-cols-[730fr_350fr] min-[1400px]:gap-x-[30px]">
        <WeeklyActivity />
        <ExpenseStatistics />
      </div>

      {}
      <div className="grid gap-5 min-[900px]:grid-cols-[295fr_423fr] min-[900px]:gap-x-[25px] min-[1400px]:grid-cols-[445fr_635fr] min-[1400px]:gap-x-[30px]">
        <QuickTransfer />
        <BalanceHistory />
      </div>
    </div>;
}
