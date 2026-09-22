import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHeart, faBagShopping, faShield, faHandHoldingDollar, faBriefcase, faChartLine, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
const topServices = [{
  label: "Life Insurance",
  sub: "Unlimited protection",
  bg: "#E7EDFF",
  color: "#396AFF",
  icon: faShieldHeart
}, {
  label: "Shopping",
  sub: "Buy. Think. Grow.",
  bg: "#FFF5D9",
  color: "#FFBB38",
  icon: faBagShopping
}, {
  label: "Safety",
  sub: "We are your allies",
  bg: "#DCFAF8",
  color: "#16DBCC",
  icon: faShield
}];
const services = [{
  id: "s1",
  title: "Business Loans",
  subtitle: "Grow your business with ease",
  bg: "#FFE0EB",
  color: "#FF82AC",
  icon: faHandHoldingDollar,
  features: ["Fast approval", "Flexible tenure", "Low documentation"],
  details: "Business loans up to $500,000 with quick approval, flexible repayment tenure of up to 36 months, and minimal paperwork so you can focus on running your business."
}, {
  id: "s2",
  title: "Checking Accounts",
  subtitle: "Everyday banking made simple",
  bg: "#FFF5D9",
  color: "#FFBB38",
  icon: faBriefcase,
  features: ["No minimum balance", "Free debit card", "24/7 online access"],
  details: "A fee-free checking account with no minimum balance requirement, a complimentary debit card, and full access to online and mobile banking around the clock."
}, {
  id: "s3",
  title: "Savings Accounts",
  subtitle: "Grow your money safely",
  bg: "#FFE0EB",
  color: "#FF82AC",
  icon: faChartLine,
  features: ["Competitive interest", "No lock-in period", "Auto-save tools"],
  details: "Earn competitive interest on your balance with no lock-in period. Set up auto-save rules to build your savings automatically every month."
}, {
  id: "s4",
  title: "Debit & Credit Cards",
  subtitle: "Spend smart, earn rewards",
  bg: "#E7EDFF",
  color: "#396AFF",
  icon: faUser,
  features: ["Cashback rewards", "Zero annual fee", "Global acceptance"],
  details: "Get cashback on every purchase, enjoy zero annual fees for the first year, and use your card anywhere in the world with our global acceptance network."
}, {
  id: "s5",
  title: "Life Insurance",
  subtitle: "Protection for your loved ones",
  bg: "#DCFAF8",
  color: "#16DBCC",
  icon: faShield,
  features: ["Flexible coverage", "Affordable premiums", "Fast claims"],
  details: "Choose a coverage plan that fits your family's needs, pay affordable monthly premiums, and rely on our fast, hassle-free claims process when it matters most."
}, {
  id: "s6",
  title: "Mortgage Loans",
  subtitle: "Own your dream home",
  bg: "#FFE0EB",
  color: "#FF82AC",
  icon: faHandHoldingDollar,
  features: ["Low interest rates", "Up to 30-year term", "Free consultation"],
  details: "Finance your home with low interest rates and repayment terms of up to 30 years. Book a free consultation with our advisors to find the right plan for you."
}];
function TopServiceCard({
  item
}) {
  return <div className="h-[72px] sm:h-[85px] lg:h-[90px] xl:h-[120px] rounded-[12px] sm:rounded-[15px] lg:rounded-[20px] xl:rounded-[25px] bg-white flex items-center px-[14px] sm:px-[17px] lg:px-6 xl:px-8 min-w-0">
      <div className="shrink-0 w-[38px] h-[38px] sm:w-[45px] sm:h-[45px] lg:w-[50px] lg:h-[50px] xl:w-[70px] xl:h-[70px] rounded-full flex items-center justify-center" style={{
      background: item.bg,
      color: item.color
    }}>
        <FontAwesomeIcon icon={item.icon} className="text-[15px] sm:text-[18px] lg:text-[20px] xl:text-[28px]" />
      </div>

      <div className="ml-[12px] sm:ml-[16px] lg:ml-[20px] min-w-0">
        <p className="m-0 font-[Inter] font-semibold text-[14px] leading-[17px] sm:text-[16px] sm:leading-[19px] xl:text-[20px] xl:leading-[24px] text-[#232323] truncate">
          {item.label}
        </p>
        <p className="m-0 mt-[2px] font-[Inter] text-[11px] leading-[13px] sm:text-[12px] sm:leading-[15px] xl:text-[16px] xl:leading-[19px] text-[#718EBF] truncate">
          {item.sub}
        </p>
      </div>
    </div>;
}
function DetailsModal({
  service,
  onClose
}) {
  if (!service) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[400px] rounded-[20px] bg-white p-6 relative font-[Inter]">
        <button onClick={onClose} className="cursor-pointer absolute right-4 top-4 text-[#718EBF] hover:text-[#232323]" aria-label="Close">
          <FontAwesomeIcon icon={faXmark} className="text-[18px]" />
        </button>

        <div className="w-[50px] h-[50px] rounded-[14px] flex items-center justify-center mb-4" style={{
        background: service.bg,
        color: service.color
      }}>
          <FontAwesomeIcon icon={service.icon} className="text-[20px]" />
        </div>

        <h3 className="m-0 mb-1 font-semibold text-[18px] text-[#333B69]">
          {service.title}
        </h3>
        <p className="m-0 mb-4 text-[13px] text-[#718EBF]">{service.subtitle}</p>

        <p className="m-0 mb-4 text-[13px] leading-[20px] text-[#232323]">
          {service.details}
        </p>

        <div className="flex flex-col gap-2 mb-5">
          {service.features.map(f => <div key={f} className="flex items-center gap-2 text-[13px] text-[#232323]">
              <span className="w-[6px] h-[6px] rounded-full bg-[#1814F3] shrink-0" />
              {f}
            </div>)}
        </div>

        <button onClick={onClose} className="cursor-pointer w-full rounded-full bg-[#1814F3] py-2.5 text-[14px] font-medium text-white">
          Got it
        </button>
      </div>
    </div>;
}
function ViewDetailsButton({
  onClick,
  size = "normal"
}) {
  const sizing = size === "sm" ? "px-4 py-1.5 text-[12px]" : size === "md" ? "w-[120px] py-[7px] text-[12px]" : "w-[150px] py-2 text-[15px]";
  return <button onClick={onClick} className={`cursor-pointer rounded-full border border-[#1814F3] text-[#1814F3] font-medium transition-colors hover:bg-[#1814F3] hover:text-white ${sizing}`}>
      View Details
    </button>;
}
function MobileServiceRow({
  service,
  onViewDetails
}) {
  return <div className="bg-white rounded-[10px] p-3 flex items-center gap-3">
      <div className="shrink-0 w-[45px] h-[45px] rounded-[12px] flex items-center justify-center" style={{
      background: service.bg,
      color: service.color
    }}>
        <FontAwesomeIcon icon={service.icon} className="text-[18px]" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="m-0 font-[Inter] font-medium text-[14px] leading-[17px] text-[#232323] truncate">
          {service.title}
        </p>
        <p className="m-0 mt-[2px] font-[Inter] text-[12px] leading-[15px] text-[#718EBF] truncate">
          {service.subtitle}
        </p>
      </div>

      <button onClick={() => onViewDetails(service)} className="cursor-pointer shrink-0 font-[Inter] text-[12px] font-medium text-[#1814F3] hover:text-[#0D0AA8] transition-colors">
        View Details
      </button>
    </div>;
}
function MobileServicesList({
  services,
  onViewDetails
}) {
  return <div className="flex flex-col gap-3">
      {services.map(s => <MobileServiceRow key={s.id} service={s} onViewDetails={onViewDetails} />)}
    </div>;
}
function FullServiceRow({
  service,
  onViewDetails
}) {
  return <div className="bg-white rounded-[15px] lg:rounded-[20px] p-4 lg:px-[30px] lg:py-[20px] xl:px-[35px] xl:py-[25px] flex items-center gap-4 lg:gap-0">
      <div className="shrink-0 w-[45px] h-[45px] lg:w-[50px] lg:h-[50px] xl:w-[60px] xl:h-[60px] rounded-[12px] lg:rounded-[15px] xl:rounded-[20px] flex items-center justify-center" style={{
      background: service.bg,
      color: service.color
    }}>
        <FontAwesomeIcon icon={service.icon} className="text-[18px] lg:text-[20px] xl:text-[25px]" />
      </div>

      <div className="ml-0 lg:ml-[20px] xl:ml-[25px] min-w-0 w-[150px] lg:w-[160px] xl:w-[175px] shrink-0">
        <p className="m-0 font-[Inter] font-medium text-[13px] leading-[16px] lg:text-[16px] lg:leading-[19px] text-[#232323] truncate">
          {service.title}
        </p>
        <p className="m-0 mt-[3px] font-[Inter] text-[12px] leading-[15px] lg:text-[15px] lg:leading-[18px] text-[#718EBF] truncate">
          {service.subtitle}
        </p>
      </div>

      <div className="hidden lg:flex flex-1 min-w-0 justify-between px-4">
        {service.features.map(f => <div key={f} className="w-[110px] xl:w-[116px] min-w-0">
            <p className="m-0 font-[Inter] font-medium text-[13px] leading-[16px] lg:text-[16px] lg:leading-[19px] text-[#232323] truncate">
              {f}
            </p>
            <p className="m-0 mt-[3px] font-[Inter] text-[12px] leading-[15px] lg:text-[15px] lg:leading-[18px] text-[#718EBF] truncate">
              Included
            </p>
          </div>)}
      </div>

      <div className="ml-auto shrink-0">
        <ViewDetailsButton onClick={() => onViewDetails(service)} size="normal" />
      </div>
    </div>;
}
function FullServicesList({
  services,
  onViewDetails
}) {
  return <div className="flex flex-col gap-4 lg:gap-5">
      {services.map(s => <FullServiceRow key={s.id} service={s} onViewDetails={onViewDetails} />)}
    </div>;
}
function ServicesPage() {
  const [selectedService, setSelectedService] = useState(null);
  return <div className="w-full bg-[#F5F7FA]">
      <div className="xl:mx-4">
        {}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-[20px] xl:gap-[30px]">
          {topServices.map(item => <TopServiceCard key={item.label} item={item} />)}
        </div>

        <div className="mt-[22px] lg:mt-[28px] xl:mt-[30px]">
          <h2 className="m-0 mb-[11px] lg:mb-[20px] font-[Inter] font-semibold text-[16px] leading-[19px] lg:text-[18px] lg:leading-[22px] xl:text-[22px] xl:leading-[27px] text-[#343C6A]">
            Bank Services List
          </h2>

          {}
          <div className="block lg:hidden">
            <MobileServicesList services={services} onViewDetails={setSelectedService} />
          </div>

          {}
          <div className="hidden lg:block">
            <FullServicesList services={services} onViewDetails={setSelectedService} />
          </div>
        </div>
      </div>

      <DetailsModal service={selectedService} onClose={() => setSelectedService(null)} />
    </div>;
}
export default ServicesPage;
