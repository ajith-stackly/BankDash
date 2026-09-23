import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBriefcase, faChartLine, faScrewdriverWrench, faXmark, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
const loanTypes = [{
  label: "Personal Loans",
  value: "$50,000",
  bg: "#E7EDFF",
  color: "#396AFF",
  icon: faUser
}, {
  label: "Corporate Loans",
  value: "$100,000",
  bg: "#FFF5D9",
  color: "#FFBB38",
  icon: faBriefcase
}, {
  label: "Business Loans",
  value: "$500,000",
  bg: "#FFE0EB",
  color: "#FF82AC",
  icon: faChartLine
}, {
  label: "Custom Loans",
  value: "Choose Money",
  bg: "#DCFAF8",
  color: "#16DBCC",
  icon: faScrewdriverWrench
}];
const initialLoans = [{
  id: "01",
  money: "$100,000",
  left: "$40,500",
  duration: "8 Months",
  rate: "12%",
  installment: "$2,000 / month"
}, {
  id: "02",
  money: "$500,000",
  left: "$250,000",
  duration: "36 Months",
  rate: "10%",
  installment: "$8,000 / month"
}, {
  id: "03",
  money: "$900,000",
  left: "$40,500",
  duration: "12 Months",
  rate: "12%",
  installment: "$5,000 / month"
}, {
  id: "04",
  money: "$50,000",
  left: "$40,500",
  duration: "25 Months",
  rate: "5%",
  installment: "$2,000 / month"
}, {
  id: "05",
  money: "$50,000",
  left: "$40,500",
  duration: "5 Months",
  rate: "16%",
  installment: "$10,000 / month"
}, {
  id: "06",
  money: "$80,000",
  left: "$25,500",
  duration: "14 Months",
  rate: "8%",
  installment: "$2,000 / month"
}, {
  id: "07",
  money: "$12,000",
  left: "$5,500",
  duration: "9 Months",
  rate: "13%",
  installment: "$500 / month"
}, {
  id: "08",
  money: "$160,000",
  left: "$100,800",
  duration: "3 Months",
  rate: "12%",
  installment: "$900 / month"
}];
const totals = {
  money: "$1,250,000",
  left: "$750,000",
  installment: "$50,000 / month"
};
const LOANS_STORAGE_KEY = "bankdash.loans";
function loadLoans() {
  if (typeof window === "undefined") return initialLoans;
  try {
    const raw = window.localStorage.getItem(LOANS_STORAGE_KEY);
    if (!raw) return initialLoans;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return initialLoans;
    return parsed;
  } catch {
    return initialLoans;
  }
}
function LoanTypeCard({
  item
}) {
  return <div className="h-[72px] sm:h-[85px] lg:h-[90px] xl:h-[110px] w-full rounded-[12px] sm:rounded-[15px] lg:rounded-[18px] xl:rounded-[22px] bg-white flex items-center px-[10px] sm:px-[17px] lg:px-3 xl:px-5 min-w-0 transition-shadow hover:shadow-[0_4px_20px_rgba(20,20,50,0.08)]">
      <div className="shrink-0 w-[34px] h-[34px] sm:w-[45px] sm:h-[45px] lg:w-[38px] lg:h-[38px] xl:w-[56px] xl:h-[56px] rounded-full flex items-center justify-center" style={{
      background: item.bg,
      color: item.color
    }}>
        <FontAwesomeIcon icon={item.icon} className="text-[14px] sm:text-[18px] lg:text-[15px] xl:text-[22px]" />
      </div>

      <div className="ml-[8px] sm:ml-[14px] lg:ml-[8px] xl:ml-[14px] min-w-0 flex-1">
        <p className="m-0 font-[Inter] text-[10px] leading-[12px] whitespace-nowrap overflow-hidden text-ellipsis sm:text-[12px] sm:leading-[15px] lg:text-[10px] lg:leading-[12px] xl:text-[13px] xl:leading-[16px] text-[#718EBF]">
          {item.label}
        </p>
        <p className="m-0 mt-[2px] sm:mt-1 font-[Inter] font-semibold text-[13px] leading-[16px] whitespace-nowrap overflow-hidden text-ellipsis sm:text-[16px] sm:leading-[19px] lg:text-[13px] lg:leading-[16px] xl:text-[16px] xl:leading-[20px] text-[#232323]">
          {item.value}
        </p>
      </div>
    </div>;
}
function RepayModal({
  loan,
  onClose,
  onConfirm
}) {
  if (!loan) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[380px] rounded-[20px] bg-white p-6 relative font-[Inter]">
        <button onClick={onClose} className="cursor-pointer absolute right-4 top-4 text-[#718EBF] hover:text-[#232323] transition-colors" aria-label="Close">
          <FontAwesomeIcon icon={faXmark} className="text-[18px]" />
        </button>

        <h3 className="m-0 mb-1 font-semibold text-[18px] text-[#333B69]">
          Repay Loan #{loan.id}
        </h3>
        <p className="m-0 mb-5 text-[13px] text-[#718EBF]">
          Confirm your monthly repayment for this loan.
        </p>

        <div className="rounded-[15px] bg-[#F5F7FA] p-4 mb-5 flex flex-col gap-2">
          <div className="flex justify-between text-[13px]">
            <span className="text-[#718EBF]">Loan Money</span>
            <span className="text-[#232323] font-medium">{loan.money}</span>
          </div>
          <div className="flex justify-between text-[13px]">
            <span className="text-[#718EBF]">Left to repay</span>
            <span className="text-[#232323] font-medium">{loan.left}</span>
          </div>
          <div className="flex justify-between text-[13px]">
            <span className="text-[#718EBF]">Installment</span>
            <span className="text-[#1814F3] font-semibold">{loan.installment}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="cursor-pointer flex-1 rounded-full border border-[#DFEAF2] py-2.5 text-[14px] font-medium text-[#718EBF] hover:bg-[#F5F7FA] transition-colors">
            Cancel
          </button>
          <button onClick={() => onConfirm(loan)} className="cursor-pointer flex-1 rounded-full bg-[#1814F3] py-2.5 text-[14px] font-medium text-white hover:bg-[#1210c9] transition-colors">
            Confirm Repay
          </button>
        </div>
      </div>
    </div>;
}
function SuccessToast({
  loan,
  onClose
}) {
  if (!loan) return null;
  return <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-full bg-white shadow-lg px-5 py-3 font-[Inter] max-w-[90vw]">
      <FontAwesomeIcon icon={faCircleCheck} className="text-[#16DBAA] text-[20px] shrink-0" />
      <span className="text-[12px] md:text-[13px] text-[#232323] truncate">
        Payment of <strong>{loan.installment}</strong> for loan #{loan.id} submitted.
      </span>
      <button onClick={onClose} className="cursor-pointer text-[#718EBF] ml-2 shrink-0 hover:text-[#232323] transition-colors">
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>;
}
function RepayButton({
  loan,
  i,
  onClick,
  size = "normal"
}) {
  const isFirst = i === 0;
  const isPaidOff = loan.left === "$0";
  const sizing = size === "sm" ? "px-4 py-1.5 text-[12px]" : size === "md" ? "w-20 py-[7px] text-[12px]" : "w-[100px] py-2 text-[15px]";
  if (isPaidOff) {
    return <button disabled className={`cursor-not-allowed rounded-full border border-[#DFEAF2] text-[#B1B1B1] font-medium ${sizing}`}>
        Repaid
      </button>;
  }
  return <button onClick={() => onClick(loan)} className={`cursor-pointer rounded-full border font-medium transition-colors ${sizing} ${isFirst ? "border-[#1814F3] text-[#1814F3] hover:bg-[#1814F3] hover:text-white" : "border-[#232323] text-[#232323] hover:bg-[#232323] hover:text-white"}`}>
      Repay
    </button>;
}
function MobileLoansTable({
  loans,
  onRepayClick
}) {
  return <div className="bg-white rounded-[15px] p-5">
      <div className="grid grid-cols-[1fr_1fr_70px] gap-2 pb-3 border-b border-[#E6EFF5] font-[Inter] text-[12px] text-[#718EBF] font-medium">
        <span>Loan Money</span>
        <span>Left to repay</span>
        <span>Repay</span>
      </div>

      <div className="flex flex-col">
        {loans.map((loan, i) => <div key={loan.id} className={`grid grid-cols-[1fr_1fr_70px] gap-2 items-center py-[13px] ${i !== loans.length - 1 ? "border-b border-[#F2F4F7]" : ""}`}>
            <span className="font-[Inter] text-[12px] text-[#232323]">{loan.money}</span>
            <span className="font-[Inter] text-[12px] text-[#232323]">{loan.left}</span>
            <RepayButton loan={loan} i={i} onClick={onRepayClick} size="md" />
          </div>)}
      </div>

      <div className="grid grid-cols-[1fr_1fr_70px] gap-2 items-center pt-4 mt-2 border-t border-[#E6EFF5] font-[Inter] text-[12px] font-medium text-[#FE5C73]">
        <span>{totals.money}</span>
        <span>{totals.left}</span>
        <span></span>
      </div>
      <div className="mt-1 font-[Inter] text-[12px] font-medium text-[#FE5C73]">Total</div>
    </div>;
}
function FullLoansTable({
  loans,
  onRepayClick
}) {
  const headers = ["SL No", "Loan Money", "Left to repay", "Duration", "Interest rate", "Installment", "Repay"];
  return <div className="bg-white rounded-[20px] xl:rounded-[25px] p-[22px] xl:p-[30px]">
      <div className="grid grid-cols-[35px_1fr_1fr_1fr_1fr_1fr_80px] xl:grid-cols-[46px_1fr_1fr_1fr_1fr_1fr_100px] gap-2 pb-3 border-b border-[#E6EFF5] font-[Inter] text-[12px] xl:text-[16px] text-[#718EBF] font-medium">
        {headers.map(h => <span key={h}>{h}</span>)}
      </div>

      <div className="flex flex-col">
        {loans.map((loan, i) => <div key={loan.id} className={`grid grid-cols-[35px_1fr_1fr_1fr_1fr_1fr_80px] xl:grid-cols-[46px_1fr_1fr_1fr_1fr_1fr_100px] gap-2 items-center py-3 xl:py-4 ${i !== loans.length - 1 ? "border-b border-[#F2F4F7]" : ""}`}>
            <span className="font-[Inter] text-[12px] xl:text-[16px] text-[#232323]">{loan.id}.</span>
            <span className="font-[Inter] text-[12px] xl:text-[16px] text-[#232323]">{loan.money}</span>
            <span className="font-[Inter] text-[12px] xl:text-[16px] text-[#232323]">{loan.left}</span>
            <span className="font-[Inter] text-[12px] xl:text-[16px] text-[#232323]">{loan.duration}</span>
            <span className="font-[Inter] text-[12px] xl:text-[16px] text-[#232323]">{loan.rate}</span>
            <span className="font-[Inter] text-[12px] xl:text-[16px] text-[#232323]">{loan.installment}</span>
            <RepayButton loan={loan} i={i} onClick={onRepayClick} size="normal" />
          </div>)}
      </div>

      <div className="grid grid-cols-[35px_1fr_1fr_1fr_1fr_1fr_80px] xl:grid-cols-[46px_1fr_1fr_1fr_1fr_1fr_100px] gap-2 items-center pt-4 mt-2 border-t border-[#E6EFF5] font-[Inter] text-[12px] xl:text-[16px] font-medium text-[#FE5C73]">
        <span></span>
        <span>Total</span>
        <span>{totals.money}</span>
        <span>{totals.left}</span>
        <span></span>
        <span></span>
        <span>{totals.installment}</span>
      </div>
    </div>;
}
function LoansPage() {
  const [loans, setLoans] = useState(loadLoans);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [successLoan, setSuccessLoan] = useState(null);
  useEffect(() => {
    try {
      window.localStorage.setItem(LOANS_STORAGE_KEY, JSON.stringify(loans));
    } catch (err) {
      console.warn("Could not persist loans to localStorage:", err);
    }
  }, [loans]);
  function handleRepayClick(loan) {
    setSelectedLoan(loan);
  }
  function handleConfirmRepay(loan) {
    setLoans(prev => prev.map(l => l.id === loan.id ? {
      ...l,
      left: "$0"
    } : l));
    setSelectedLoan(null);
    setSuccessLoan(loan);
    setTimeout(() => setSuccessLoan(null), 3500);
  }
  return <div className="w-full bg-[#F5F7FA]">
      <div className="xl:mx-4">
        {}
        <div className="flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:gap-4 lg:grid lg:grid-cols-4 lg:gap-3 lg:overflow-visible xl:gap-[20px]">
          {loanTypes.map(item => <div key={item.label} className="w-[210px] shrink-0 snap-start sm:w-[240px] lg:w-auto"><LoanTypeCard item={item} /></div>)}
        </div>

        <div className="mt-[22px] lg:mt-[28px] xl:mt-[30px]">
          <h2 className="m-0 mb-[11px] lg:mb-[20px] xl:mb-[20px] font-[Inter] font-semibold text-[16px] leading-[19px] lg:text-[18px] lg:leading-[22px] xl:text-[22px] xl:leading-[27px] text-[#333B69]">
            Active Loans Overview
          </h2>

          {}
          <div className="block lg:hidden">
            <MobileLoansTable loans={loans} onRepayClick={handleRepayClick} />
          </div>

          {}
          <div className="hidden lg:block">
            <FullLoansTable loans={loans} onRepayClick={handleRepayClick} />
          </div>
        </div>
      </div>

      <RepayModal loan={selectedLoan} onClose={() => setSelectedLoan(null)} onConfirm={handleConfirmRepay} />
      <SuccessToast loan={successLoan} onClose={() => setSuccessLoan(null)} />
    </div>;
}
export default LoansPage;
