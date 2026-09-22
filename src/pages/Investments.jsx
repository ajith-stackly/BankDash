import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar, faChartPie, faRepeat, faCarSide, faMobileScreenButton } from "@fortawesome/free-solid-svg-icons";
import { faApple } from "@fortawesome/free-brands-svg-icons";
const stats = [{
  label: "Total Invested Amount",
  value: "$150,000",
  bg: "#DCFAF8",
  color: "#16DBCC",
  icon: faSackDollar
}, {
  label: "Number of Investments",
  value: "1,250",
  bg: "#FFE0EB",
  color: "#FF82AC",
  icon: faChartPie
}, {
  label: "Rate of Return",
  value: "+5.80%",
  bg: "#E7EDFF",
  color: "#396AFF",
  icon: faRepeat
}];
const years = ["2016", "2017", "2018", "2019", "2020", "2021"];
const yearlyInvestment = [5000, 22000, 15000, 35000, 19000, 27000];
const monthlyRevenue = [12000, 15500, 27000, 20500, 26500, 38000];
const myInvestments = [{
  id: "i1",
  name: "Apple Store",
  category: "E-commerce, Marketplace",
  value: "$54,000",
  returnValue: "+16%",
  positive: true,
  bg: "#FFE0EB",
  color: "#FF82AC",
  icon: faApple
}, {
  id: "i2",
  name: "Samsung Mobile",
  category: "E-commerce, Marketplace",
  value: "$25,300",
  returnValue: "-4%",
  positive: false,
  bg: "#E7EDFF",
  color: "#396AFF",
  icon: faMobileScreenButton
}, {
  id: "i3",
  name: "Tesla Motors",
  category: "Electric Vehicles",
  value: "$8,200",
  returnValue: "+25%",
  positive: true,
  bg: "#FFF5D9",
  color: "#FFBB38",
  icon: faCarSide
}];
const trendingStocks = [{
  id: "01",
  name: "Trivago",
  price: "$520",
  change: "+5%",
  positive: true
}, {
  id: "02",
  name: "Canon",
  price: "$480",
  change: "+10%",
  positive: true
}, {
  id: "03",
  name: "Uber Food",
  price: "$350",
  change: "-3%",
  positive: false
}, {
  id: "04",
  name: "Nokia",
  price: "$940",
  change: "+2%",
  positive: true
}, {
  id: "05",
  name: "Tiktok",
  price: "$670",
  change: "-12%",
  positive: false
}];
function StatCard({
  item
}) {
  return <div className="h-[85px] sm:h-[90px] xl:h-[120px] rounded-[15px] sm:rounded-[20px] xl:rounded-[25px] bg-white flex items-center px-[17px] sm:px-5 xl:px-8 min-w-0">
      <div className="shrink-0 w-[45px] h-[45px] sm:w-[50px] sm:h-[50px] xl:w-[70px] xl:h-[70px] rounded-full flex items-center justify-center" style={{
      background: item.bg,
      color: item.color
    }}>
        <FontAwesomeIcon icon={item.icon} className="text-[18px] sm:text-[20px] xl:text-[28px]" />
      </div>

      <div className="ml-[14px] sm:ml-[16px] xl:ml-[24px] min-w-0">
        <p className="m-0 font-[Inter] text-[12px] leading-[15px] sm:text-[13px] xl:text-[16px] xl:leading-[19px] text-[#718EBF] truncate">
          {item.label}
        </p>
        <p className="m-0 mt-1 font-[Inter] font-semibold text-[16px] leading-[19px] sm:text-[16px] xl:text-[20px] xl:leading-[24px] text-[#232323] truncate">
          {item.value}
        </p>
      </div>
    </div>;
}
function buildSmoothPath(points) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const midX = (p0.x + p1.x) / 2;
    d += ` C ${midX} ${p0.y}, ${midX} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  return d;
}
function LineChartCard({
  title,
  data,
  color,
  dotColor
}) {
  const width = 500;
  const height = 220;
  const padTop = 10;
  const padBottom = 30;
  const padLeft = 55;
  const padRight = 15;
  const max = 40000;
  const min = 0;
  const gridValues = [40000, 30000, 20000, 10000, 0];
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;
  const points = data.map((v, i) => ({
    x: padLeft + i / (data.length - 1) * plotW,
    y: padTop + plotH - (v - min) / (max - min) * plotH
  }));
  const path = buildSmoothPath(points);
  return <section className="min-w-0">
      <h3 className="m-0 mb-[11px] xl:mb-[20px] font-[Inter] font-semibold text-[16px] leading-[19px] xl:text-[22px] xl:leading-[27px] text-[#333B69]">
        {title}
      </h3>
      <div className="bg-white rounded-[15px] xl:rounded-[25px] p-4 sm:p-5 xl:p-[30px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
          {}
          {gridValues.map(v => {
          const y = padTop + plotH - (v - min) / (max - min) * plotH;
          return <g key={v}>
                <line x1={padLeft} x2={width - padRight} y1={y} y2={y} stroke="#DFE5EE" strokeDasharray="4 4" strokeWidth="1" />
                <text x={padLeft - 8} y={y + 4} textAnchor="end" fontSize="11" fontFamily="Inter, sans-serif" fill="#718EBF">
                  {v === 0 ? "$0" : `$${v / 1000},000`}
                </text>
              </g>;
        })}

          {}
          {years.map((y, i) => <text key={y} x={points[i].x} y={height - 8} textAnchor="middle" fontSize="11" fontFamily="Inter, sans-serif" fill="#718EBF">
              {y}
            </text>)}

          {}
          <path d={path} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />

          {}
          {points.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="4" fill="#FFFFFF" stroke={dotColor} strokeWidth="2.5" />)}
        </svg>
      </div>
    </section>;
}
function InvestmentRow({
  item
}) {
  return <div className="bg-white rounded-[10px] sm:rounded-[15px] p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
      <div className="shrink-0 w-[45px] h-[45px] sm:w-[60px] sm:h-[60px] rounded-[12px] sm:rounded-[20px] flex items-center justify-center" style={{
      background: item.bg,
      color: item.color
    }}>
        <FontAwesomeIcon icon={item.icon} className="text-[18px] sm:text-[25px]" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="m-0 font-[Inter] font-medium text-[13px] leading-[16px] sm:text-[16px] sm:leading-[19px] text-[#232323] truncate">
          {item.name}
        </p>
        <p className="m-0 mt-[2px] font-[Inter] text-[11px] leading-[13px] sm:text-[15px] sm:leading-[18px] text-[#718EBF] truncate">
          {item.category}
        </p>
      </div>

      <div className="text-right shrink-0 hidden xs:block">
        <p className="m-0 font-[Inter] font-medium text-[12px] leading-[15px] sm:text-[16px] sm:leading-[19px] text-[#232323]">
          {item.value}
        </p>
        <p className="m-0 mt-[2px] font-[Inter] text-[11px] leading-[13px] sm:text-[15px] sm:leading-[18px] text-[#718EBF]">
          Investment Value
        </p>
      </div>

      <div className="text-right shrink-0 w-[55px] sm:w-[90px]">
        <p className="m-0 font-[Inter] font-medium text-[12px] leading-[15px] sm:text-[16px] sm:leading-[19px]" style={{
        color: item.positive ? "#16DBAA" : "#FE5C73"
      }}>
          {item.returnValue}
        </p>
        <p className="m-0 mt-[2px] font-[Inter] text-[11px] leading-[13px] sm:text-[15px] sm:leading-[18px] text-[#718EBF]">
          Return Value
        </p>
      </div>
    </div>;
}
function MyInvestmentSection() {
  return <section className="min-w-0">
      <h3 className="m-0 mb-[11px] xl:mb-[20px] font-[Inter] font-semibold text-[16px] leading-[19px] xl:text-[22px] xl:leading-[27px] text-[#333B69]">
        My Investment
      </h3>
      <div className="flex flex-col gap-3 sm:gap-4">
        {myInvestments.map(item => <InvestmentRow key={item.id} item={item} />)}
      </div>
    </section>;
}
function TrendingStockSection() {
  return <section className="min-w-0">
      <h3 className="m-0 mb-[11px] xl:mb-[20px] font-[Inter] font-semibold text-[16px] leading-[19px] xl:text-[22px] xl:leading-[27px] text-[#333B69]">
        Trending Stock
      </h3>
      <div className="bg-white rounded-[15px] xl:rounded-[25px] p-4 sm:p-5 xl:p-[30px]">
        <div className="grid grid-cols-[30px_1fr_60px_60px] sm:grid-cols-[40px_1fr_70px_70px] gap-2 pb-3 border-b border-[#F4F5F7] font-[Inter] text-[12px] xl:text-[16px] text-[#718EBF] font-medium">
          <span>SL No</span>
          <span>Name</span>
          <span>Price</span>
          <span className="text-right">Return</span>
        </div>

        <div className="flex flex-col">
          {trendingStocks.map(s => <div key={s.id} className="grid grid-cols-[30px_1fr_60px_60px] sm:grid-cols-[40px_1fr_70px_70px] gap-2 items-center py-3 xl:py-4">
              <span className="font-[Inter] text-[12px] xl:text-[16px] text-[#232323]">{s.id}.</span>
              <span className="font-[Inter] text-[12px] xl:text-[16px] text-[#232323] truncate">{s.name}</span>
              <span className="font-[Inter] text-[12px] xl:text-[16px] text-[#232323]">{s.price}</span>
              <span className="font-[Inter] font-medium text-[12px] xl:text-[16px] text-right" style={{
            color: s.positive ? "#16DBAA" : "#FE5C73"
          }}>
                {s.change}
              </span>
            </div>)}
        </div>
      </div>
    </section>;
}
function InvestmentsPage() {
  return <div className="w-full bg-[#F5F7FA]">
      <div className="xl:mx-4">
        {}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-[20px] xl:gap-[30px]">
          {stats.map((item, i) => <div key={item.label} className={i === 2 ? "sm:col-span-2 lg:col-span-1 flex justify-center" : "min-w-0"}>
              <div className={i === 2 ? "w-full sm:w-1/2 lg:w-full" : "w-full"}>
                <StatCard item={item} />
              </div>
            </div>)}
        </div>

        {}
        <div className="mt-[22px] xl:mt-[30px] grid grid-cols-1 gap-6 lg:grid-cols-2 xl:gap-[30px]">
          <LineChartCard title="Yearly Total Investment" data={yearlyInvestment} color="#FCAA0B" dotColor="#EDA10D" />
          <LineChartCard title="Monthly Revenue" data={monthlyRevenue} color="#16DBCC" dotColor="#16DBCC" />
        </div>

        {}
        <div className="mt-[22px] xl:mt-[30px] grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr] xl:gap-[30px]">
          <MyInvestmentSection />
          <TrendingStockSection />
        </div>
      </div>
    </div>;
}
export default InvestmentsPage;
