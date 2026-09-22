import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faLock, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faApple, faGoogle } from "@fortawesome/free-brands-svg-icons";

const cards = [{
  type: "blue",
  balance: "$5,756",
  holder: "Eddy Cusuma",
  valid: "12/22"
}, {
  type: "purple",
  balance: "$5,756",
  holder: "Eddy Cusuma",
  valid: "12/22"
}, {
  type: "white",
  balance: "$5,756",
  holder: "Eddy Cusuma",
  valid: "12/22"
}];
const initialCardList = [{
  bank: "DBL Bank",
  number: "**** **** 5600",
  name: "William",
  bg: "#E7EDFF",
  color: "#396AFF"
}, {
  bank: "BRC Bank",
  number: "**** **** 4300",
  name: "Michel",
  bg: "#FFE0EB",
  color: "#FF82AC"
}, {
  bank: "ABM Bank",
  number: "**** **** 7560",
  name: "Edward",
  bg: "#FFF5D9",
  color: "#FFBB38"
}];
const settings = [{
  title: "Block Card",
  subtitle: "Instantly block your card",
  type: "card",
  bg: "#FFF5D9",
  color: "#FFBB38"
}, {
  title: "Change Pin Code",
  subtitle: "Choose another pin code",
  type: "lock",
  bg: "#E7EDFF",
  color: "#396AFF"
}, {
  title: "Add to Google Pay",
  subtitle: "Withdraw without any card",
  type: "google",
  bg: "#FFE0EB",
  color: "#FF82AC"
}, {
  title: "Add to Apple Pay",
  subtitle: "Withdraw without any card",
  type: "apple",
  bg: "#DCFAF8",
  color: "#16DBCC"
}, {
  title: "Add to Apple Store",
  subtitle: "Withdraw without any card",
  type: "apple",
  bg: "#DCFAF8",
  color: "#16DBCC"
}];
const emptyForm = {
  type: "",
  name: "",
  number: "",
  expiration: ""
};
function Chip({
  light = false
}) {
  return <svg viewBox="0 0 35 35" className="h-[29px] w-[29px] @min-[1400px]:h-[35px] @min-[1400px]:w-[35px]" fill="none">
      <rect x="1" y="4" width="33" height="27" rx="8" fill={light ? "#666666" : "white"} />
      <path d="M11 4V31M24 4V31M1 13H34M1 22H34" stroke={light ? "white" : "#4B4B4B"} strokeWidth="2" />
      <rect x="11" y="9" width="13" height="17" rx="4" stroke={light ? "white" : "#4B4B4B"} strokeWidth="2" />
    </svg>;
}
function Mastercard({
  light = false
}) {
  return <span className="relative block h-[20px] w-[30px] @min-[1400px]:h-[30px] @min-[1400px]:w-[44px]">
      <span className={`absolute left-0 top-0 h-[20px] w-[20px] rounded-full @min-[1400px]:h-[30px] @min-[1400px]:w-[30px] ${light ? "bg-[#9199AF]/50" : "bg-white/50"}`} />
      <span className={`absolute left-[9px] top-0 h-[20px] w-[20px] rounded-full @min-[1400px]:left-[14px] @min-[1400px]:h-[30px] @min-[1400px]:w-[30px] ${light ? "bg-[#9199AF]/50" : "bg-white/50"}`} />
    </span>;
}
function BankCard({
  card
}) {
  const white = card.type === "white";
  const background = card.type === "blue" ? "linear-gradient(107.38deg,#2D60FF 2.61%,#539BFF 101.2%)" : card.type === "purple" ? "linear-gradient(107.38deg,#4C49ED 2.61%,#0A06F4 101.2%)" : "#FFFFFF";
  return <div className={`relative h-[170px] w-[265px] shrink-0 overflow-hidden rounded-[15px] font-[Lato] @min-[768px]:h-[170px] @min-[768px]:w-[231px] @min-[768px]:rounded-[20px] @min-[1400px]:h-[225px] @min-[1400px]:w-[350px] @min-[1400px]:rounded-[25px] ${white ? "border border-[#DFEAF2] text-[#343C6A]" : "text-white"}`} style={{
    background
  }}>
      <div className="absolute left-5 top-[17px] @min-[768px]:left-5 @min-[768px]:top-[17px] @min-[1400px]:left-[30px] @min-[1400px]:top-[24px]">
        <p className={`text-[11px] leading-[13px] @min-[1400px]:text-[12px] @min-[1400px]:leading-[14px] ${white ? "text-[#718EBF]" : "text-white"}`}>Balance</p>
        <p className="text-[16px] font-semibold leading-[19px] @min-[1400px]:text-[20px] @min-[1400px]:leading-6">{card.balance}</p>
      </div>
      <div className="absolute right-5 top-[18px] @min-[1400px]:right-[30px] @min-[1400px]:top-[25px]"><Chip light={white} /></div>
      <div className="absolute left-5 top-[73px] @min-[1400px]:left-[30px] @min-[1400px]:top-[95px]">
        <p className={`text-[10px] leading-3 @min-[1400px]:text-[12px] @min-[1400px]:leading-[14px] ${white ? "text-[#718EBF]" : "text-white/70"}`}>CARD HOLDER</p>
        <p className="mt-[2px] text-[13px] font-semibold leading-4 @min-[1400px]:text-[15px] @min-[1400px]:leading-[18px]">{card.holder}</p>
      </div>
      <div className="absolute left-[180px] top-[73px] @min-[768px]:left-[145px] @min-[1400px]:left-[187px] @min-[1400px]:top-[95px]">
        <p className={`text-[10px] leading-3 @min-[1400px]:text-[12px] @min-[1400px]:leading-[14px] ${white ? "text-[#718EBF]" : "text-white/70"}`}>VALID THRU</p>
        <p className="mt-[2px] text-[13px] font-semibold leading-4 @min-[1400px]:text-[15px] @min-[1400px]:leading-[18px]">{card.valid}</p>
      </div>
      <div className={`absolute bottom-0 left-0 right-0 flex h-[51px] items-center justify-between px-5 @min-[1400px]:h-[70px] @min-[1400px]:px-[30px] ${white ? "border-t border-[#DFEAF2]" : ""}`} style={white ? undefined : {
      background: "linear-gradient(180deg,rgba(255,255,255,.15) 0%,rgba(255,255,255,0) 100%)"
    }}>
        <p className="text-[15px] font-semibold leading-[18px] @min-[1400px]:text-[22px] @min-[1400px]:leading-[26px]">3778 **** **** 1234</p>
        <Mastercard light={white} />
      </div>
    </div>;
}
function ExpenseChart() {
  return <div className="h-[300px] w-full rounded-[15px] bg-white px-0 pt-5 @min-[768px]:h-[231px] @min-[768px]:rounded-[20px] @min-[768px]:pt-[15px] @min-[1400px]:h-[310px] @min-[1400px]:rounded-[25px] @min-[1400px]:pt-[30px]">
      <div className="mx-auto h-[198px] w-[200px] @min-[768px]:h-[140px] @min-[768px]:w-[141px] @min-[1400px]:h-[186px] @min-[1400px]:w-[188px]">
        <svg viewBox="0 0 188 186" className="h-full w-full overflow-visible">
          <defs>
            <filter id="expenseShadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.18" /></filter>
          </defs>
          <path d="M94 0 A94 94 0 0 1 188 93 H94Z" fill="#16DBCC" filter="url(#expenseShadow)" />
          <path d="M188 93 A94 94 0 0 1 94 186 V93Z" fill="#FF82AC" filter="url(#expenseShadow)" />
          <path d="M94 186 A94 94 0 0 1 0 93 H94Z" fill="#FFBB38" filter="url(#expenseShadow)" />
          <path d="M0 93 A94 94 0 0 1 94 0 V93Z" fill="#4C78FF" filter="url(#expenseShadow)" />
          <circle cx="94" cy="93" r="47" fill="white" />
        </svg>
      </div>
      <div className="mx-auto mt-1 grid w-[235px] grid-cols-2 gap-y-[10px] @min-[768px]:mt-[5px] @min-[768px]:w-[179px] @min-[768px]:gap-y-[7px] @min-[1400px]:mt-[8px] @min-[1400px]:w-[300px] @min-[1400px]:gap-y-[14px]">
        {[["DBL Bank", "#4C78FF"], ["BRC Bank", "#FF82AC"], ["ABM Bank", "#16DBCC"], ["MCP Bank", "#FFBB38"]].map(([name, color]) => <div key={name} className="flex items-center gap-2.5 text-[12px] leading-[15px] text-[#718EBF] @min-[1400px]:text-[15px] @min-[1400px]:leading-[18px]">
            <span className="h-3 w-3 shrink-0 rounded-full @min-[1400px]:h-[15px] @min-[1400px]:w-[15px]" style={{
          background: color
        }} />{name}
          </div>)}
      </div>
    </div>;
}
function CardIcon({
  color
}) {
  return <svg viewBox="0 0 26 26" className="h-5 w-5 @min-[1400px]:h-[26px] @min-[1400px]:w-[26px]" fill="none">
      <path d="M3 7.5h20M3 10.5h20M4.5 5h17A1.5 1.5 0 0 1 23 6.5v13A1.5 1.5 0 0 1 21.5 21h-17A1.5 1.5 0 0 1 3 19.5v-13A1.5 1.5 0 0 1 4.5 5Z" stroke={color} strokeWidth="2" />
      <path d="M7 16h4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>;
}
function CardList({
  items,
  onView
}) {
  return <div className="flex flex-col gap-[10px] @min-[1400px]:gap-5">
      {items.map((item, index) => <div key={`${item.bank}-${index}`} className="flex h-[69px] w-full items-center rounded-[10px] bg-white px-3 @min-[768px]:rounded-[15px] @min-[1400px]:h-[90px] @min-[1400px]:rounded-[20px] @min-[1400px]:px-[15px]">
          <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-[12px] @min-[1400px]:h-[60px] @min-[1400px]:w-[60px] @min-[1400px]:rounded-[20px]" style={{
        background: item.bg
      }}><CardIcon color={item.color} /></div>
          <div className="ml-3 w-[70px] @min-[768px]:w-[62px] @min-[1400px]:ml-[15px] @min-[1400px]:w-[107px]">
            <p className="text-[14px] font-medium leading-[17px] text-[#232323] @min-[768px]:text-[12px] @min-[768px]:leading-[15px] @min-[1400px]:text-[16px] @min-[1400px]:leading-[19px]">Card Type</p>
            <p className="mt-1 text-[12px] leading-[15px] text-[#718EBF] @min-[1400px]:text-[15px] @min-[1400px]:leading-[18px]">Secondary</p>
          </div>
          <div className="ml-3 w-[62px] @min-[768px]:ml-[15px] @min-[768px]:w-[55px] @min-[1400px]:w-[98px]">
            <p className="text-[14px] font-medium leading-[17px] text-[#232323] @min-[768px]:text-[12px] @min-[768px]:leading-[15px] @min-[1400px]:text-[16px] @min-[1400px]:leading-[19px]">Bank</p>
            <p className="mt-1 text-[12px] leading-[15px] text-[#718EBF] @min-[1400px]:text-[15px] @min-[1400px]:leading-[18px]">{item.bank}</p>
          </div>
          <div className="hidden @min-[900px]:block @min-[1400px]:ml-[15px] @min-[1400px]:w-[138px]">
            <p className="text-[16px] font-medium leading-[19px] text-[#232323]">Card Number</p>
            <p className="mt-1 text-[15px] leading-[18px] text-[#718EBF]">{item.number}</p>
          </div>
          <div className="hidden @min-[900px]:block @min-[1400px]:ml-[15px] @min-[1400px]:w-[118px]">
            <p className="whitespace-nowrap text-[16px] font-medium leading-[19px] text-[#232323]">Main Card</p>
            <p className="mt-1 text-[15px] leading-[18px] text-[#718EBF]">{item.name}</p>
          </div>
          <button type="button" onClick={() => onView(item)} className="cursor-pointer ml-auto shrink-0 whitespace-nowrap text-[11px] font-medium leading-[13px] text-[#1814F3] transition-all duration-200 hover:scale-105 hover:text-[#0D0AA8] focus:outline-none focus:ring-2 focus:ring-[#1814F3]/20 @min-[1400px]:text-[15px] @min-[1400px]:leading-[18px]">View Details</button>
        </div>)}
    </div>;
}
function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  inputMode,
  maxLength
}) {
  return <label className="block text-[13px] leading-4 text-[#232323] @min-[1400px]:text-[16px] @min-[1400px]:leading-[19px]">
      {label}
      <span className={`mt-[6px] flex h-10 items-center rounded-[10px] border px-[14px] @min-[1400px]:mt-[10px] @min-[1400px]:h-[50px] @min-[1400px]:rounded-[15px] @min-[1400px]:px-5 ${error ? "border-[#FF4B4A]" : "border-[#DFEAF2]"}`}>
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} inputMode={inputMode} maxLength={maxLength} className="w-full bg-transparent text-[12px] leading-[15px] text-[#718EBF] outline-none placeholder:text-[#9BB0D0] @min-[1400px]:text-[15px] @min-[1400px]:leading-[18px]" />
      </span>
      <span className={`mt-1 block min-h-[14px] text-[10px] leading-[13px] ${error ? "text-[#FF4B4A]" : "text-transparent"}`}>{error || ""}</span>
    </label>;
}
function AddNewCard({
  form,
  errors,
  setForm,
  onAdd
}) {
  const update = (key, value) => setForm(current => ({
    ...current,
    [key]: value
  }));
  const formatNumber = value => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };
  return <div className="h-auto min-h-[527px] w-full rounded-[15px] bg-white px-5 py-[14px] @min-[768px]:min-h-[320px] @min-[768px]:rounded-[20px] @min-[768px]:px-5 @min-[768px]:py-[22px] @min-[1400px]:h-[440px] @min-[1400px]:min-h-0 @min-[1400px]:rounded-[25px] @min-[1400px]:px-[30px] @min-[1400px]:py-[27px]">
      <p className="w-full text-[12px] leading-[22px] text-[#718EBF] @min-[1400px]:w-[633px] @min-[1400px]:text-[16px] @min-[1400px]:leading-7">
        Credit Card generally means a plastic card issued by Scheduled Commercial Banks assigned to a Cardholder, with a credit limit, that can be used to purchase goods and services on credit or obtain cash advances.
      </p>
      <div className="mt-[15px] grid grid-cols-1 gap-[5px] @min-[768px]:mt-[18px] @min-[768px]:grid-cols-2 @min-[768px]:gap-[8px_20px] @min-[1400px]:mt-[29px] @min-[1400px]:gap-[4px_30px]">
        <Field label="Card Type" value={form.type} onChange={e => update("type", e.target.value)} placeholder="Classic" error={errors.type} />
        <Field label="Name On Card" value={form.name} onChange={e => update("name", e.target.value)} placeholder="Eddy Cusuma" error={errors.name} />
        <Field label="Card Number" value={form.number} onChange={e => update("number", formatNumber(e.target.value))} placeholder="1234 5678 9012 3456" inputMode="numeric" maxLength={19} error={errors.number} />
        <Field label="Expiration Date" value={form.expiration} onChange={e => update("expiration", e.target.value)} placeholder="25 January 2027" error={errors.expiration} />
      </div>
      <button type="button" onClick={onAdd} className="cursor-pointer mt-[3px] h-10 w-full rounded-[8px] bg-[#1814F3] text-[14px] font-medium text-white transition-all duration-200 hover:bg-[#0D0AA8] hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#1814F3]/30 @min-[768px]:mt-[8px] @min-[768px]:w-[140px] @min-[1400px]:mt-[10px] @min-[1400px]:h-[50px] @min-[1400px]:w-[160px] @min-[1400px]:rounded-[9px] @min-[1400px]:text-[18px]">Add Card</button>
    </div>;
}
function SettingIcon({
  type,
  color
}) {
  if (type === "lock") return <FontAwesomeIcon icon={faLock} className="text-[20px] @min-[1400px]:text-[25px]" />;
  if (type === "google") return <FontAwesomeIcon icon={faGoogle} className="text-[21px] @min-[1400px]:text-[25px]" />;
  if (type === "apple") return <FontAwesomeIcon icon={faApple} className="text-[23px] @min-[1400px]:text-[28px]" />;
  return <CardIcon color={color} />;
}
function CardSettings() {
  return <div className="h-[325px] w-full rounded-[15px] bg-white p-5 @min-[768px]:h-[320px] @min-[768px]:rounded-[20px] @min-[1400px]:h-[440px] @min-[1400px]:rounded-[25px] @min-[1400px]:px-[30px] @min-[1400px]:py-[30px]">
      <div className="flex h-full flex-col justify-between @min-[1400px]:gap-5 @min-[1400px]:justify-start">
        {settings.map(item => <div key={item.title} className="flex min-h-[45px] items-center gap-[15px] @min-[1400px]:h-[60px] @min-[1400px]:gap-5">
            <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-[12px] @min-[1400px]:h-[60px] @min-[1400px]:w-[60px] @min-[1400px]:rounded-[20px]" style={{
          background: item.bg,
          color: item.color
        }}><SettingIcon type={item.type} color={item.color} /></div>
            <div>
              <p className="text-[14px] font-medium leading-[17px] text-[#232323] @min-[1400px]:text-[16px] @min-[1400px]:leading-[19px]">{item.title}</p>
              <p className="mt-[3px] whitespace-nowrap text-[11px] leading-[13px] text-[#718EBF] @min-[1400px]:text-[15px] @min-[1400px]:leading-[18px]">{item.subtitle}</p>
            </div>
          </div>)}
      </div>
    </div>;
}
function Toast({
  toast,
  onClose
}) {
  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(onClose, 3200);
    return () => clearTimeout(timer);
  }, [toast, onClose]);
  if (!toast) return null;
  const success = toast.type === "success";
  return <div className="fixed right-4 top-4 z-[300] w-[calc(100%-32px)] max-w-[360px] rounded-[14px] bg-white p-4 shadow-2xl ring-1 ring-black/5 sm:right-6 sm:top-6">
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white ${success ? "bg-[#16DBCC]" : "bg-[#FF4B4A]"}`}>{success ? "✓" : "!"}</div>
        <div className="min-w-0 flex-1"><p className="text-[14px] font-semibold text-[#343C6A]">{success ? "Success" : "Check your details"}</p><p className="mt-1 text-[12px] leading-5 text-[#718EBF]">{toast.message}</p></div>
        <button type="button" onClick={onClose} className="cursor-pointer text-[#718EBF] transition-colors hover:text-[#343C6A]"><FontAwesomeIcon icon={faXmark} /></button>
      </div>
    </div>;
}
function DetailsModal({
  card,
  onClose
}) {
  if (!card) return null;
  return <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0B1739]/50 px-4 py-6" onClick={onClose}>
      <div className="max-h-[90vh] w-full max-w-[480px] overflow-y-auto rounded-[20px] bg-white p-5 shadow-2xl sm:p-7" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="text-[20px] font-semibold text-[#333B69] sm:text-[22px]">Card Details</h3>
          <button type="button" onClick={onClose} className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F7FA] text-[#718EBF] transition-all hover:bg-[#E7EDFF] hover:text-[#1814F3]"><FontAwesomeIcon icon={faXmark} /></button>
        </div>
        <div className="mt-5 rounded-[18px] bg-[#F5F7FA] p-4 sm:p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            <div><p className="text-[11px] text-[#718EBF]">Card Type</p><p className="mt-1 text-[14px] font-medium text-[#232323]">Secondary</p></div>
            <div><p className="text-[11px] text-[#718EBF]">Bank</p><p className="mt-1 text-[14px] font-medium text-[#232323]">{card.bank}</p></div>
            <div><p className="text-[11px] text-[#718EBF]">Card Number</p><p className="mt-1 break-all text-[14px] font-medium text-[#232323]">{card.number}</p></div>
            <div><p className="text-[11px] text-[#718EBF]">Name On Card</p><p className="mt-1 text-[14px] font-medium text-[#232323]">{card.name}</p></div>
          </div>
        </div>
        <button type="button" onClick={onClose} className="cursor-pointer mt-5 h-11 w-full rounded-[9px] bg-[#1814F3] text-[15px] font-medium text-white transition-all hover:bg-[#0D0AA8] hover:shadow-lg">Close</button>
      </div>
    </div>;
}
export default function CreditCards() {
  const [items, setItems] = useState(initialCardList);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [toast, setToast] = useState(null);
  const validate = () => {
    const next = {};
    const type = form.type.trim();
    const name = form.name.trim();
    const digits = form.number.replace(/\D/g, "");
    const expiration = form.expiration.trim();
    if (!type) next.type = "Card type is required.";else if (!/^[A-Za-z ]{3,30}$/.test(type)) next.type = "Use letters only.";
    if (!name) next.name = "Name is required.";else if (!/^[A-Za-z ]{3,40}$/.test(name)) next.name = "Use letters and spaces only.";
    if (!digits) next.number = "Card number is required.";else if (digits.length !== 16) next.number = "Enter a valid 16-digit card number.";
    if (!expiration) next.expiration = "Expiration date is required.";else if (!/^\d{1,2}\s[A-Za-z]+\s\d{4}$/.test(expiration)) next.expiration = "Use format: 25 January 2027.";else {
      const parsed = new Date(expiration);
      if (Number.isNaN(parsed.getTime())) next.expiration = "Enter a valid date.";else if (parsed <= new Date()) next.expiration = "Expiration date must be in the future.";
    }
    setErrors(next);
    return {
      valid: Object.keys(next).length === 0,
      digits,
      type,
      name,
      expiration
    };
  };
  const addCard = () => {
    const result = validate();
    if (!result.valid) {
      setToast({
        type: "error",
        message: "Please correct the highlighted fields before adding the card."
      });
      return;
    }
    const lastFour = result.digits.slice(-4);
    setItems(current => [...current, {
      bank: "New Bank",
      number: `**** **** ${lastFour}`,
      name: result.name,
      bg: "#E7EDFF",
      color: "#396AFF"
    }]);
    setForm(emptyForm);
    setErrors({});
    setToast({
      type: "success",
      message: "New card added successfully."
    });
  };
  return <div className="@container w-full min-w-0 bg-[#F5F7FA] font-[Inter] text-[#343C6A]">
      <div className="mx-auto w-full max-w-[1110px]">
        <section>
          <h2 className="text-[16px] font-semibold leading-[19px] text-[#343C6A] @min-[768px]:text-[18px] @min-[768px]:leading-[22px] @min-[1400px]:text-[22px] @min-[1400px]:leading-[27px]">My Cards</h2>
          <div className="mt-[12px] flex gap-5 overflow-x-auto pb-1 [scrollbar-width:none] @min-[768px]:mt-4 @min-[768px]:grid @min-[768px]:grid-cols-3 @min-[768px]:gap-[25px] @min-[768px]:overflow-visible @min-[1400px]:mt-5 @min-[1400px]:gap-[30px]">
            {cards.map(card => <BankCard key={card.type} card={card} />)}
          </div>
        </section>

        <section className="mt-[18px] @min-[768px]:mt-[20px] @min-[1400px]:mt-6">
          <div className="grid gap-[17px] @min-[768px]:grid-cols-[231px_minmax(0,1fr)] @min-[768px]:gap-[25px] @min-[1400px]:grid-cols-[350px_730px] @min-[1400px]:gap-[30px]">
            <div>
              <h2 className="text-[16px] font-semibold leading-[19px] text-[#333B69] @min-[768px]:text-[18px] @min-[768px]:leading-[22px] @min-[1400px]:text-[22px] @min-[1400px]:leading-[27px]">Card Expense Statistics</h2>
              <div className="mt-[12px] @min-[768px]:mt-4 @min-[1400px]:mt-5"><ExpenseChart /></div>
            </div>
            <div>
              <h2 className="text-[16px] font-semibold leading-[19px] text-[#333B69] @min-[768px]:text-[18px] @min-[768px]:leading-[22px] @min-[1400px]:text-[22px] @min-[1400px]:leading-[27px]">Card List</h2>
              <div className="mt-[12px] @min-[768px]:mt-4 @min-[1400px]:mt-5"><CardList items={items} onView={setSelectedCard} /></div>
            </div>
          </div>
        </section>

        <section className="mt-8 pb-8 @min-[768px]:mt-8 @min-[1400px]:mt-6">
          <div className="grid gap-8 @min-[768px]:grid-cols-2 @min-[768px]:gap-[25px] @min-[1400px]:grid-cols-[730px_350px] @min-[1400px]:gap-[30px]">
            <div>
              <h2 className="text-[16px] font-semibold leading-[19px] text-[#333B69] @min-[768px]:text-[18px] @min-[768px]:leading-[22px] @min-[1400px]:text-[22px] @min-[1400px]:leading-[27px]">Add New Card</h2>
              <div className="mt-[12px] @min-[768px]:mt-4 @min-[1400px]:mt-5"><AddNewCard form={form} errors={errors} setForm={setForm} onAdd={addCard} /></div>
            </div>
            <div>
              <h2 className="text-[16px] font-semibold leading-[19px] text-[#333B69] @min-[768px]:text-[18px] @min-[768px]:leading-[22px] @min-[1400px]:text-[22px] @min-[1400px]:leading-[27px]">Card Setting</h2>
              <div className="mt-[12px] @min-[768px]:mt-4 @min-[1400px]:mt-5"><CardSettings /></div>
            </div>
          </div>
        </section>
      </div>

      <Toast toast={toast} onClose={() => setToast(null)} />
      <DetailsModal card={selectedCard} onClose={() => setSelectedCard(null)} />
    </div>;
}
