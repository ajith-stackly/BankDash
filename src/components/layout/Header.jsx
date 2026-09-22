import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBell, faGear, faBars } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../context/UserContext";
import { transactions } from "../../pages/Transactions";
const pageTitles = {
  "/": "Overview",
  "/transactions": "Transactions",
  "/accounts": "Accounts",
  "/investments": "Investments",
  "/credit-cards": "Credit Cards",
  "/loans": "Loans",
  "/services": "Services",
  "/privileges": "My Privileges",
  "/settings": "Settings"
};
function useClickOutside(ref, onOutside) {
  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) onOutside();
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [ref, onOutside]);
}
function Header({
  onMenuClick = () => {}
}) {
  const {
    pathname
  } = useLocation();
  const navigate = useNavigate();
  const {
    profile,
    preferences,
    defaultAvatar
  } = useUser();
  const title = pageTitles[pathname] || "Overview";
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);
  useClickOutside(searchRef, () => setSearchOpen(false));
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return transactions.filter(t => t.name.toLowerCase().includes(q) || t.type.toLowerCase().includes(q) || t.id.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);
  function handleSearchSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;
    navigate("/transactions");
    setSearchOpen(false);
  }
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);
  useClickOutside(notifRef, () => setNotifOpen(false));
  const notifications = useMemo(() => {
    const list = [];
    if (preferences.notifyDigitalCurrency) {
      list.push({
        id: "n1",
        text: "You sent $2,500 in digital currency."
      });
    }
    if (preferences.notifyMerchantOrder) {
      list.push({
        id: "n2",
        text: "Your merchant order has shipped."
      });
    }
    if (preferences.notifyRecommendations) {
      list.push({
        id: "n3",
        text: "New recommendations are available for your account."
      });
    }
    return list;
  }, [preferences]);
  function handleAvatarError(e) {
    if (e.target.src !== defaultAvatar) e.target.src = defaultAvatar;
  }
  return <header className="relative bg-white border-b border-[#E6EFF5]
        flex flex-wrap items-center justify-between gap-y-5
        px-[25px] pt-[25px] pb-5
        min-[768px]:flex-nowrap min-[768px]:gap-y-0 min-[768px]:h-[86px] min-[768px]:py-0 min-[768px]:pl-[25px] min-[768px]:pr-[30px]
        min-[1025px]:h-[101px] min-[1025px]:px-10">
      {}
      <button type="button" onClick={onMenuClick} aria-label="Open menu" className="cursor-pointer min-[768px]:hidden w-[35px] h-[35px] flex items-center justify-start text-[#343C6A] text-[18px]">
        <FontAwesomeIcon icon={faBars} />
      </button>

      {}
      <h1 className="absolute left-1/2 top-[31px] -translate-x-1/2 whitespace-nowrap
          font-[Inter] font-semibold text-[20px] leading-6 text-[#343C6A]
          min-[768px]:static min-[768px]:shrink-0 min-[768px]:translate-x-0 min-[768px]:text-[25px] min-[768px]:leading-[30px]
          min-[1025px]:text-[28px] min-[1025px]:leading-[34px]">
        {title}
      </h1>

      {}
      <Link to="/settings" className="cursor-pointer min-[768px]:hidden shrink-0">
        <img src={profile.avatarUrl || defaultAvatar} onError={handleAvatarError} alt={profile.yourName || "Profile"} className="w-[35px] h-[35px] rounded-full object-cover" />
      </Link>

      {}
      <div className="w-full min-[768px]:flex-1 min-[768px]:min-w-0 min-[768px]:justify-end min-[768px]:ml-5 flex items-center gap-5 min-[1025px]:gap-[30px]">
        <div ref={searchRef} className="relative w-full min-w-0 min-[768px]:flex-1 min-[768px]:max-w-[255px]">
          <form onSubmit={handleSearchSubmit} className="w-full min-w-0 h-10 min-[1025px]:h-[50px]
              rounded-full bg-[#F5F7FA] flex items-center gap-2.5 min-[1025px]:gap-[15px]
              px-[19px] min-[768px]:px-5 min-[1025px]:px-[25px]">
            <button type="submit" aria-label="Search" className="cursor-pointer shrink-0">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[16px] min-[1025px]:text-[20px] text-[#718EBF]" />
            </button>
            <input type="text" value={query} onChange={e => {
            setQuery(e.target.value);
            setSearchOpen(true);
          }} onFocus={() => query && setSearchOpen(true)} placeholder="Search for something" className="w-full min-w-0 bg-transparent outline-none border-none font-[Inter] font-normal
                text-[13px] min-[768px]:text-[12px] min-[1025px]:text-[15px]
                text-[#343C6A] placeholder:text-[#8BA3CB]" />
          </form>

          {}
          {searchOpen && query.trim() && <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 rounded-[15px] bg-white shadow-lg border border-[#E6EFF5] overflow-hidden">
              {results.length === 0 ? <p className="m-0 px-5 py-4 font-[Inter] text-[13px] text-[#718EBF]">
                  No transactions match "{query}".
                </p> : <ul className="max-h-[280px] overflow-y-auto">
                  {results.map(t => <li key={`${t.id}-${t.name}`}>
                      <button type="button" onClick={() => {
                navigate("/transactions");
                setSearchOpen(false);
              }} className="cursor-pointer w-full text-left px-5 py-3 flex items-center justify-between gap-3 hover:bg-[#F5F7FA] transition-colors">
                        <span className="min-w-0">
                          <span className="block font-[Inter] text-[13px] text-[#343C6A] truncate">
                            {t.name}
                          </span>
                          <span className="block font-[Inter] text-[11px] text-[#718EBF]">
                            {t.type} · {t.date}
                          </span>
                        </span>
                        <span className={`shrink-0 font-[Inter] text-[13px] font-medium ${t.amount.startsWith("-") ? "text-[#FE5C73]" : "text-[#16DBAA]"}`}>
                          {t.amount}
                        </span>
                      </button>
                    </li>)}
                </ul>}
            </div>}
        </div>

        <button type="button" aria-label="Settings" onClick={() => navigate("/settings")} className="cursor-pointer hidden min-[768px]:flex shrink-0 w-10 h-10 min-[1025px]:w-[50px] min-[1025px]:h-[50px]
            rounded-full bg-[#F5F7FA] items-center justify-center text-[#718EBF] hover:text-[#2D60FF] hover:bg-[#E7EDFF] transition-colors">
          <FontAwesomeIcon icon={faGear} className="text-[18px] min-[1025px]:text-[25px]" />
        </button>

        <div ref={notifRef} className="relative hidden min-[768px]:block shrink-0">
          <button type="button" aria-label="Notifications" onClick={() => setNotifOpen(v => !v)} className="cursor-pointer relative flex w-10 h-10 min-[1025px]:w-[50px] min-[1025px]:h-[50px]
              rounded-full bg-[#F5F7FA] items-center justify-center text-[#FE5C73] hover:bg-[#FFE0EB] transition-colors">
            <FontAwesomeIcon icon={faBell} className="text-[18px] min-[1025px]:text-[25px]" />
            {notifications.length > 0 && <span className="absolute top-2 right-2 w-[8px] h-[8px] rounded-full bg-[#FE5C73] ring-2 ring-white" />}
          </button>

          {notifOpen && <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-[280px] rounded-[15px] bg-white shadow-lg border border-[#E6EFF5] overflow-hidden">
              <p className="m-0 px-5 pt-4 pb-2 font-[Inter] font-semibold text-[13px] text-[#343C6A]">
                Notifications
              </p>
              {notifications.length === 0 ? <p className="m-0 px-5 pb-4 font-[Inter] text-[12px] text-[#718EBF]">
                  You're all caught up. Enable more alerts in Settings → Preferences.
                </p> : <ul className="pb-2">
                  {notifications.map(n => <li key={n.id} className="px-5 py-2.5 font-[Inter] text-[12px] text-[#232323] hover:bg-[#F5F7FA]">
                      {n.text}
                    </li>)}
                </ul>}
            </div>}
        </div>

        <Link to="/settings" aria-label="Open profile settings" className="cursor-pointer hidden min-[768px]:block shrink-0 ml-[5px]">
          <img src={profile.avatarUrl || defaultAvatar} onError={handleAvatarError} alt={profile.yourName || "Profile"} className="w-[45px] h-[45px] min-[1025px]:w-[60px] min-[1025px]:h-[60px] rounded-full object-cover" />
        </Link>
      </div>
    </header>;
}
export default Header;
