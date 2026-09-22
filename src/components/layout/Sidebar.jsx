import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import dashboardIcon from "../../assets/images/dashboard.svg";
import transactionsIcon from "../../assets/images/transactions.svg";
import accountsIcon from "../../assets/images/accounts.svg";
import investmentIcon from "../../assets/images/investment.svg";
import creditCardsIcon from "../../assets/images/creditcards.svg";
import loansIcon from "../../assets/images/loans.svg";
import servicesIcon from "../../assets/images/services.svg";
import privilegesIcon from "../../assets/images/privileges.svg";
import settingsIcon from "../../assets/images/settings.svg";
const navItems = [{
  to: "/",
  label: "Dashboard",
  icon: dashboardIcon,
  end: true
}, {
  to: "/transactions",
  label: "Transactions",
  icon: transactionsIcon
}, {
  to: "/accounts",
  label: "Accounts",
  icon: accountsIcon
}, {
  to: "/investments",
  label: "Investments",
  icon: investmentIcon
}, {
  to: "/credit-cards",
  label: "Credit Cards",
  icon: creditCardsIcon
}, {
  to: "/loans",
  label: "Loans",
  icon: loansIcon
}, {
  to: "/services",
  label: "Services",
  icon: servicesIcon
}, {
  to: "/privileges",
  label: "My Privileges",
  icon: privilegesIcon
}, {
  to: "/settings",
  label: "Setting",
  icon: settingsIcon
}];
function NavIcon({
  src
}) {
  const mask = `url("${src}")`;
  return <span aria-hidden="true" className="block shrink-0 bg-current w-5 h-5 min-[1025px]:w-[25px] min-[1025px]:h-[25px]" style={{
    WebkitMaskImage: mask,
    maskImage: mask,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain"
  }} />;
}
function Sidebar({
  open = false,
  onClose = () => {}
}) {
  return <>
      {}
      <div onClick={onClose} className={`fixed inset-0 z-30 bg-black/40 transition-opacity duration-300 min-[768px]:hidden ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`} />

      <aside className={`fixed left-0 top-0 z-40 h-screen w-[230px] bg-white border-r border-[#E6EFF5] overflow-y-auto
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          min-[768px]:translate-x-0
          min-[1025px]:w-[250px]`}>
        {}
        <div className="h-[85px] min-[1025px]:h-[100px] flex items-center gap-[9px] px-[27px] min-[1025px]:px-[38px]">
          <img src={logo} alt="BankDash logo" className="w-9 h-9 object-contain" />
          <span className="font-[Inter] font-black text-[25px] leading-8 text-[#343C6A]">
            BankDash.
          </span>
        </div>

        {}
        <nav className="pt-[11px] min-[1025px]:pt-[14px] flex flex-col gap-[5px] min-[1025px]:gap-1">
          {navItems.map(({
          to,
          label,
          icon,
          end
        }) => <NavLink key={to} to={to} end={end} onClick={onClose} className={({
          isActive
        }) => `relative flex items-center gap-5 min-[1025px]:gap-[26px]
                 h-[50px] min-[1025px]:h-[60px]
                 pl-[30px] min-[1025px]:pl-11
                 font-[Inter] font-medium text-base min-[1025px]:text-[18px]
                 transition-colors cursor-pointer
                 ${isActive ? "text-[#2D60FF]" : "text-[#B1B1B1] hover:text-[#2D60FF]"}`}>
              {({
            isActive
          }) => <>
                  {isActive && <span className="absolute left-0 top-0 h-full w-[5px] min-[1025px]:w-[6px] rounded-r-[10px] bg-[#2D60FF]" />}
                  <NavIcon src={icon} />
                  <span className="whitespace-nowrap">{label}</span>
                </>}
            </NavLink>)}
        </nav>
      </aside>
    </>;
}
export default Sidebar;
