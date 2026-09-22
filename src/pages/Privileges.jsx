import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faGem, faMedal, faPlaneDeparture, faTicket, faHeadset, faPercent, faUmbrella, faCircleCheck, faLock } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../context/UserContext";
const tiers = [{
  id: "silver",
  name: "Silver",
  icon: faMedal,
  bg: "#E7EDFF",
  color: "#396AFF",
  minSpend: "$0",
  perks: ["Fee-free debit card", "Standard customer support", "1% cashback on bills"]
}, {
  id: "gold",
  name: "Gold",
  icon: faCrown,
  bg: "#FFF5D9",
  color: "#FFBB38",
  minSpend: "$10,000 / yr",
  perks: ["Priority customer support", "2% cashback on shopping", "2 free airport lounge visits"]
}, {
  id: "platinum",
  name: "Platinum",
  icon: faGem,
  bg: "#DCFAF8",
  color: "#16DBCC",
  minSpend: "$50,000 / yr",
  perks: ["Dedicated relationship manager", "4% cashback on travel", "Unlimited airport lounge access"]
}];
const benefits = [{
  id: "b1",
  title: "Airport Lounge Access",
  sub: "Relax before every flight",
  bg: "#FFE0EB",
  color: "#FF82AC",
  icon: faPlaneDeparture
}, {
  id: "b2",
  title: "Exclusive Event Tickets",
  sub: "Early access & discounts",
  bg: "#E7EDFF",
  color: "#396AFF",
  icon: faTicket
}, {
  id: "b3",
  title: "24/7 Priority Support",
  sub: "A dedicated support line",
  bg: "#FFF5D9",
  color: "#FFBB38",
  icon: faHeadset
}, {
  id: "b4",
  title: "Fee Waivers",
  sub: "No annual or transfer fees",
  bg: "#DCFAF8",
  color: "#16DBCC",
  icon: faPercent
}, {
  id: "b5",
  title: "Purchase Protection",
  sub: "Extended warranty & cover",
  bg: "#E7EDFF",
  color: "#396AFF",
  icon: faUmbrella
}];
function tierRank(id) {
  return tiers.findIndex(t => t.id === id);
}
function TierCard({
  tier,
  isCurrent,
  isUnlocked,
  onSelect
}) {
  return <button type="button" onClick={() => onSelect(tier.id)} className={`cursor-pointer text-left rounded-[15px] sm:rounded-[20px] xl:rounded-[25px] bg-white p-5 sm:p-6 xl:p-8 min-w-0 border-2 transition-all hover:shadow-[0_4px_20px_rgba(20,20,50,0.08)] ${isCurrent ? "border-[#1814F3]" : "border-transparent"}`}>
      <div className="flex items-center justify-between">
        <div className="w-[45px] h-[45px] sm:w-[55px] sm:h-[55px] xl:w-[70px] xl:h-[70px] rounded-full flex items-center justify-center" style={{
        background: tier.bg,
        color: tier.color
      }}>
          <FontAwesomeIcon icon={tier.icon} className="text-[18px] sm:text-[22px] xl:text-[28px]" />
        </div>
        {isCurrent && <span className="flex items-center gap-1.5 rounded-full bg-[#E7EDFF] text-[#396AFF] text-[11px] xl:text-[13px] font-[Inter] font-medium px-3 py-1">
            <FontAwesomeIcon icon={faCircleCheck} className="text-[12px]" />
            Current
          </span>}
        {!isUnlocked && !isCurrent && <span className="flex items-center gap-1.5 rounded-full bg-[#F5F7FA] text-[#B1B1B1] text-[11px] xl:text-[13px] font-[Inter] font-medium px-3 py-1">
            <FontAwesomeIcon icon={faLock} className="text-[10px]" />
            Locked
          </span>}
      </div>

      <h3 className="m-0 mt-4 xl:mt-6 font-[Inter] font-semibold text-[18px] sm:text-[20px] xl:text-[24px] text-[#343C6A]">
        {tier.name}
      </h3>
      <p className="m-0 mt-1 font-[Inter] text-[12px] xl:text-[14px] text-[#718EBF]">
        Requires {tier.minSpend} annual spend
      </p>

      <ul className="mt-4 xl:mt-6 flex flex-col gap-2 xl:gap-3">
        {tier.perks.map(perk => <li key={perk} className="flex items-start gap-2 font-[Inter] text-[12px] sm:text-[13px] xl:text-[15px] text-[#232323]">
            <FontAwesomeIcon icon={faCircleCheck} className="text-[#16DBAA] text-[13px] mt-0.5 shrink-0" />
            <span>{perk}</span>
          </li>)}
      </ul>
    </button>;
}
function BenefitCard({
  benefit
}) {
  return <div className="rounded-[15px] xl:rounded-[20px] bg-white p-5 xl:p-6 flex items-center gap-4 min-w-0 transition-shadow hover:shadow-[0_4px_20px_rgba(20,20,50,0.08)]">
      <div className="shrink-0 w-[45px] h-[45px] xl:w-[55px] xl:h-[55px] rounded-full flex items-center justify-center" style={{
      background: benefit.bg,
      color: benefit.color
    }}>
        <FontAwesomeIcon icon={benefit.icon} className="text-[18px] xl:text-[22px]" />
      </div>
      <div className="min-w-0">
        <p className="m-0 font-[Inter] font-semibold text-[14px] xl:text-[16px] text-[#343C6A] truncate">
          {benefit.title}
        </p>
        <p className="m-0 mt-0.5 font-[Inter] text-[12px] xl:text-[13px] text-[#718EBF] truncate">
          {benefit.sub}
        </p>
      </div>
    </div>;
}
function PrivilegesPage() {
  const {
    profile
  } = useUser();
  const [currentTierId, setCurrentTierId] = useState("gold");
  const currentIndex = tierRank(currentTierId);
  return <div className="w-full bg-[#F5F7FA]">
      <div className="xl:mx-4">
        <div className="rounded-[15px] sm:rounded-[20px] xl:rounded-[25px] bg-white p-5 sm:p-8 xl:p-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
          <div className="w-[55px] h-[55px] sm:w-[70px] sm:h-[70px] rounded-full flex items-center justify-center shrink-0" style={{
          background: "#FFF5D9",
          color: "#FFBB38"
        }}>
            <FontAwesomeIcon icon={faCrown} className="text-[24px] sm:text-[30px]" />
          </div>
          <div className="min-w-0">
            <p className="m-0 font-[Inter] text-[12px] xl:text-[14px] text-[#718EBF]">
              Welcome back,
            </p>
            <h2 className="m-0 mt-1 font-[Inter] font-semibold text-[18px] sm:text-[22px] xl:text-[26px] text-[#343C6A] truncate">
              {profile.yourName}, you're a {tiers[currentIndex]?.name ?? "Silver"} member
            </h2>
          </div>
        </div>

        <div className="mt-[22px] lg:mt-[28px] xl:mt-[30px]">
          <h2 className="m-0 mb-[11px] lg:mb-[20px] xl:mb-[20px] font-[Inter] font-semibold text-[16px] leading-[19px] lg:text-[18px] lg:leading-[22px] xl:text-[22px] xl:leading-[27px] text-[#333B69]">
            Membership Tiers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 xl:gap-[25px]">
            {tiers.map((tier, i) => <TierCard key={tier.id} tier={tier} isCurrent={tier.id === currentTierId} isUnlocked={i <= currentIndex} onSelect={setCurrentTierId} />)}
          </div>
        </div>

        <div className="mt-[22px] lg:mt-[28px] xl:mt-[30px]">
          <h2 className="m-0 mb-[11px] lg:mb-[20px] xl:mb-[20px] font-[Inter] font-semibold text-[16px] leading-[19px] lg:text-[18px] lg:leading-[22px] xl:text-[22px] xl:leading-[27px] text-[#333B69]">
            Your Benefits
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-[25px]">
            {benefits.map(b => <BenefitCard key={b.id} benefit={b} />)}
          </div>
        </div>
      </div>
    </div>;
}
export default PrivilegesPage;
