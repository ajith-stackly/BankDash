import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillWave, faHandHoldingDollar, faReceipt, faPiggyBank, faMobileScreenButton, faUser, faGamepad, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faSpotify, faApple } from "@fortawesome/free-brands-svg-icons";
const stats = [{
  label: "My Balance",
  value: "$12,750",
  bg: "#FFF5D9",
  color: "#FFBB38",
  icon: faMoneyBillWave
}, {
  label: "Income",
  value: "$5,600",
  bg: "#E7EDFF",
  color: "#396AFF",
  icon: faHandHoldingDollar
}, {
  label: "Expense",
  value: "$3,460",
  bg: "#FFE0EB",
  color: "#FF82AC",
  icon: faReceipt
}, {
  label: "Total Saving",
  value: "$7,920",
  bg: "#DCFAF8",
  color: "#16DBCC",
  icon: faPiggyBank
}];
const transactions = [{
  name: "Spotify Subscription",
  date: "25 Jan 2021",
  card: "1234 ****",
  type: "Shopping",
  status: "Pending",
  amount: "-$150",
  color: "#FE5C73",
  bg: "#DCFAF8",
  icon: faSpotify,
  iconColor: "#16DBCC"
}, {
  name: "Mobile Service",
  date: "25 Jan 2021",
  card: "1234 ****",
  type: "Service",
  status: "Completed",
  amount: "-$340",
  color: "#FE5C73",
  bg: "#E7EDFF",
  icon: faMobileScreenButton,
  iconColor: "#396AFF"
}, {
  name: "Emilly Wilson",
  date: "25 Jan 2021",
  card: "1234 ****",
  type: "Transfer",
  status: "Completed",
  amount: "+$780",
  color: "#16DBAA",
  bg: "#FFE0EB",
  icon: faUser,
  iconColor: "#FF82AC"
}];
const invoices = [{
  name: "Apple Store",
  time: "5h ago",
  amount: "$450",
  bg: "#DCFAF8",
  color: "#16DBCC",
  icon: faApple
}, {
  name: "Michael",
  time: "2 days ago",
  amount: "$160",
  bg: "#FFF5D9",
  color: "#FFBB38",
  icon: faUser
}, {
  name: "Playstation",
  time: "5 days ago",
  amount: "$1085",
  bg: "#E7EDFF",
  color: "#396AFF",
  icon: faGamepad
}, {
  name: "William",
  time: "10 days ago",
  amount: "$90",
  bg: "#FFE0EB",
  color: "#FF82AC",
  icon: faUser
}];
const chartData = [{
  day: "Sat",
  debit: 135,
  credit: 234
}, {
  day: "Sun",
  debit: 56,
  credit: 120
}, {
  day: "Mon",
  debit: 52,
  credit: 75
}, {
  day: "Tue",
  debit: 73,
  credit: 129
}, {
  day: "Wed",
  debit: 92,
  credit: 136
}, {
  day: "Thu",
  debit: 55,
  credit: 96
}, {
  day: "Fri",
  debit: 129,
  credit: 166
}];
function StatCard({
  item
}) {
  return <div className="h-[85px] @min-[768px]:h-[90px] @min-[1400px]:h-[120px] rounded-[15px] @min-[768px]:rounded-[20px] @min-[1400px]:rounded-[25px] bg-white flex items-center px-[17px] @min-[768px]:px-5 @min-[1400px]:px-6">
      <div className="shrink-0 w-[45px] h-[45px] @min-[1400px]:w-[50px] @min-[1400px]:h-[50px] rounded-full flex items-center justify-center" style={{
      background: item.bg,
      color: item.color
    }}>
        <FontAwesomeIcon icon={item.icon} className="text-[19px] @min-[1400px]:text-[20px]" />
      </div>

      <div className="ml-[10px] @min-[768px]:ml-[12px] @min-[1400px]:ml-[14px] min-w-0">
        <p className="m-0 font-[Inter] text-[12px] leading-[15px] text-[#718EBF] truncate">
          {item.label}
        </p>
        <p className="m-0 mt-1 font-[Inter] font-semibold text-[16px] leading-[19px] @min-[1400px]:text-[25px] @min-[1400px]:leading-[30px] text-[#232323]">
          {item.value}
        </p>
      </div>
    </div>;
}
function TransactionRow({
  item
}) {
  return <div className="flex items-center min-w-0">
      <div className="shrink-0 w-[45px] h-[45px] @min-[768px]:w-10 @min-[768px]:h-10 @min-[1400px]:w-[55px] @min-[1400px]:h-[55px] rounded-[12px] @min-[1400px]:rounded-[20px] flex items-center justify-center" style={{
      background: item.bg,
      color: item.iconColor
    }}>
        <FontAwesomeIcon icon={item.icon} className="text-[17px] @min-[1400px]:text-[21px]" />
      </div>

      <div className="ml-[18px] @min-[1400px]:ml-6 min-w-0 flex-1">
        <p className="m-0 truncate font-[Inter] font-medium text-[14px] leading-[17px] @min-[768px]:text-[13px] @min-[1400px]:text-[16px] @min-[1400px]:leading-[19px] text-[#232323]">
          {item.name}
        </p>
        <p className="m-0 mt-[3px] font-[Inter] text-[12px] leading-[15px] @min-[768px]:text-[11px] @min-[1400px]:text-[15px] @min-[1400px]:leading-[18px] text-[#718EBF]">
          {item.date}
        </p>
      </div>

      <div className="hidden @min-[900px]:flex items-center justify-between w-[270px] @min-[1400px]:w-[370px] px-3 @min-[1400px]:px-5 font-[Inter] text-[13px] @min-[1400px]:text-[16px] text-[#718EBF]">
        <span>{item.type}</span>
        <span>{item.card}</span>
        <span>{item.status}</span>
      </div>

      <span className="shrink-0 ml-2 font-[Inter] font-medium text-[12px] leading-[15px] @min-[1400px]:text-[16px] @min-[1400px]:leading-[19px]" style={{
      color: item.color
    }}>
        {item.amount}
      </span>
    </div>;
}
function LastTransaction() {
  return <section>
      <h2 className="m-0 mb-[11px] @min-[1400px]:mb-[20px] font-[Inter] font-semibold text-[16px] leading-[19px] @min-[768px]:text-[18px] @min-[768px]:leading-[22px] @min-[1400px]:text-[22px] @min-[1400px]:leading-[27px] text-[#333B69]">
        Last Transaction
      </h2>

      <div className="bg-white rounded-[15px] @min-[1400px]:rounded-[25px] p-5 @min-[768px]:p-[15px] @min-[1400px]:p-[25px] flex flex-col gap-3 @min-[768px]:gap-[10px] @min-[1400px]:gap-[10px]">
        {transactions.map(item => <TransactionRow key={item.name} item={item} />)}
      </div>
    </section>;
}
function Chip() {
  return <div className="relative w-[28px] h-[28px] @min-[1400px]:w-[35px] @min-[1400px]:h-[35px] rounded-[7px] bg-white/80 overflow-hidden">
      <span className="absolute left-1/2 top-0 bottom-0 w-px bg-[#2D60FF] -translate-x-1/2" />
      <span className="absolute left-0 right-0 top-1/2 h-px bg-[#2D60FF] -translate-y-1/2" />
      <span className="absolute left-1/2 top-1/2 w-[12px] h-[18px] @min-[1400px]:w-[15px] @min-[1400px]:h-[20px] rounded-[5px] border-2 border-[#2D60FF] -translate-x-1/2 -translate-y-1/2" />
    </div>;
}
function CardBrand() {
  return <div className="flex shrink-0">
      <span className="w-[28px] h-[28px] @min-[1400px]:w-[30px] @min-[1400px]:h-[30px] rounded-full bg-white/50" />
      <span className="w-[28px] h-[28px] @min-[1400px]:w-[30px] @min-[1400px]:h-[30px] rounded-full bg-white/50 -ml-2" />
    </div>;
}
function MyCard() {
  return <section>
      <div className="flex items-center justify-between mb-[11px] @min-[1400px]:mb-[20px]">
        <h2 className="m-0 font-[Inter] font-semibold text-[16px] leading-[19px] @min-[768px]:text-[18px] @min-[768px]:leading-[22px] @min-[1400px]:text-[22px] @min-[1400px]:leading-[27px] text-[#333B69]">
          My Card
        </h2>
        <button className="cursor-pointer border-0 bg-transparent p-0 font-[Inter] font-semibold text-[14px] @min-[1400px]:text-[17px] text-[#343C6A]">
          See All
        </button>
      </div>

      <div className="relative h-[197px] @min-[768px]:h-[170px] @min-[1400px]:h-[235px] rounded-[15px] @min-[1400px]:rounded-[25px] overflow-hidden bg-gradient-to-br from-[#2D60FF] to-[#539BFF] text-white font-[Lato]">
        <div className="absolute left-[23px] top-[21px] @min-[1400px]:left-[26px] @min-[1400px]:top-6">
          <p className="m-0 text-[12px] leading-[15px] opacity-90">Balance</p>
          <p className="m-0 mt-1 font-semibold text-[18px] leading-[22px] @min-[1400px]:text-[20px] @min-[1400px]:leading-6">$5,756</p>
        </div>

        <div className="absolute right-[23px] top-[22px] @min-[1400px]:right-6 @min-[1400px]:top-[25px]">
          <Chip />
        </div>

        <div className="absolute left-[23px] top-[84px] @min-[768px]:top-[70px] @min-[1400px]:left-[26px] @min-[1400px]:top-[95px]">
          <p className="m-0 text-[11px] leading-[13px] opacity-70">CARD HOLDER</p>
          <p className="m-0 mt-1 font-semibold text-[14px] leading-[17px] @min-[1400px]:text-[15px] @min-[1400px]:leading-[18px]">Eddy Cusuma</p>
        </div>

        <div className="absolute right-[40px] top-[84px] @min-[768px]:right-[26px] @min-[768px]:top-[70px] @min-[1400px]:right-[26px] @min-[1400px]:top-[95px]">
          <p className="m-0 text-[11px] leading-[13px] opacity-70">VALID THRU</p>
          <p className="m-0 mt-1 font-semibold text-[14px] leading-[17px] @min-[1400px]:text-[15px] @min-[1400px]:leading-[18px]">12/22</p>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[61px] @min-[768px]:h-[51px] @min-[1400px]:h-[70px] bg-gradient-to-b from-white/15 to-transparent" />

        <div className="absolute left-[30px] bottom-[15px] @min-[1400px]:left-[26px] @min-[1400px]:bottom-[18px] font-semibold text-[17px] leading-[20px] @min-[1400px]:text-[22px] @min-[1400px]:leading-[26px] tracking-[1px] whitespace-nowrap">
          3778 **** **** 1234
        </div>

        <div className="absolute right-5 bottom-[15px] @min-[1400px]:right-[26px] @min-[1400px]:bottom-[18px]">
          <CardBrand />
        </div>
      </div>
    </section>;
}
function DebitCreditOverview() {
  const max = Math.max(...chartData.flatMap(item => [item.debit, item.credit]));
  return <section>
      <h2 className="m-0 mb-[11px] @min-[1400px]:mb-[20px] font-[Inter] font-semibold text-[16px] leading-[19px] @min-[768px]:text-[18px] @min-[768px]:leading-[22px] @min-[1400px]:text-[22px] @min-[1400px]:leading-[27px] text-[#333B69]">
        Debit &amp; Credit Overview
      </h2>

      <div className="relative h-[245px] @min-[768px]:h-[270px] @min-[1400px]:h-[364px] rounded-[15px] @min-[1400px]:rounded-[25px] bg-white px-5 pt-[18px] @min-[1400px]:px-[30px] @min-[1400px]:pt-[26px]">
        <div className="absolute right-5 top-[18px] @min-[1400px]:right-[30px] @min-[1400px]:top-[26px] flex gap-4 @min-[1400px]:gap-6 font-[Inter] text-[12px] @min-[1400px]:text-[16px] text-[#718EBF]">
          <span className="flex items-center gap-1.5 @min-[1400px]:gap-2">
            <i className="block w-3 h-3 @min-[1400px]:w-[15px] @min-[1400px]:h-[15px] rounded-[4px] @min-[1400px]:rounded-[5px] bg-[#4C78FF]" />
            Debit
          </span>
          <span className="flex items-center gap-1.5 @min-[1400px]:gap-2">
            <i className="block w-3 h-3 @min-[1400px]:w-[15px] @min-[1400px]:h-[15px] rounded-[4px] @min-[1400px]:rounded-[5px] bg-[#FF82AC]" />
            Credit
          </span>
        </div>

        <p className="hidden @min-[768px]:block m-0 font-[Inter] text-[13px] @min-[1400px]:text-[16px] text-[#333B69]">
          $7,560 Debited &amp; $5,420 Credited in this Week
        </p>

        <div className="absolute left-5 right-5 bottom-[30px] @min-[1400px]:left-[30px] @min-[1400px]:right-[30px] @min-[1400px]:bottom-[30px] h-[140px] @min-[768px]:h-[180px] @min-[1400px]:h-[234px] flex items-end justify-between">
          {chartData.map(item => <div key={item.day} className="h-full flex-1 flex flex-col items-center justify-end gap-1.5 @min-[1400px]:gap-2.5">
              <div className="h-full flex items-end justify-center gap-1 @min-[768px]:gap-2.5 @min-[1400px]:gap-2.5">
                <span className="w-[10px] @min-[768px]:w-[18px] @min-[1400px]:w-[30px] rounded-[4px] @min-[1400px]:rounded-[10px] bg-[#1A16F3]" style={{
              height: `${item.debit / max * 100}%`
            }} />
                <span className="w-[10px] @min-[768px]:w-[18px] @min-[1400px]:w-[30px] rounded-[4px] @min-[1400px]:rounded-[10px] bg-[#FCAA0B]" style={{
              height: `${item.credit / max * 100}%`
            }} />
              </div>
              <span className="font-[Inter] text-[11px] @min-[768px]:text-[12px] @min-[1400px]:text-[14px] text-[#718EBF]">
                {item.day}
              </span>
            </div>)}
        </div>
      </div>
    </section>;
}
function InvoicesSent() {
  return <section>
      <h2 className="m-0 mb-[11px] @min-[1400px]:mb-[20px] font-[Inter] font-semibold text-[16px] leading-[19px] @min-[768px]:text-[18px] @min-[768px]:leading-[22px] @min-[1400px]:text-[22px] @min-[1400px]:leading-[27px] text-[#333B69]">
        Invoices Sent
      </h2>

      <div className="bg-white rounded-[15px] @min-[1400px]:rounded-[25px] p-5 @min-[1400px]:p-[30px] flex flex-col gap-[15px] @min-[1400px]:gap-[20px]">
        {invoices.map(item => <div key={item.name} className="flex items-center min-w-0">
            <div className="shrink-0 w-[45px] h-[45px] @min-[1400px]:w-[55px] @min-[1400px]:h-[55px] rounded-[12px] @min-[1400px]:rounded-[15px] flex items-center justify-center" style={{
          background: item.bg,
          color: item.color
        }}>
              <FontAwesomeIcon icon={item.icon} className="text-[18px] @min-[1400px]:text-[22px]" />
            </div>

            <div className="ml-[18px] @min-[1400px]:ml-[22px] flex-1 min-w-0">
              <p className="m-0 truncate font-[Inter] font-medium text-[14px] leading-[17px] @min-[1400px]:text-[16px] @min-[1400px]:leading-[19px] text-[#333B69]">
                {item.name}
              </p>
              <p className="m-0 mt-[3px] font-[Inter] text-[12px] leading-[15px] @min-[1400px]:text-[15px] @min-[1400px]:leading-[18px] text-[#718EBF]">
                {item.time}
              </p>
            </div>

            <span className="shrink-0 font-[Inter] text-[12px] @min-[1400px]:text-[16px] text-[#718EBF]">
              {item.amount}
            </span>
          </div>)}
      </div>
    </section>;
}
function AccountsPage() {
  return <div className="@container w-full min-w-0 bg-[#F5F7FA]">
      <div className="@min-[1400px]:mx-4">
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:gap-[30px]">            {stats.map(item => <StatCard key={item.label} item={item} />)}
        </div>

        <div className="mt-[22px] @min-[768px]:mt-[28px] @min-[1400px]:mt-[23px] grid gap-5 @min-[900px]:grid-cols-[minmax(0,2.08fr)_minmax(0,1fr)] @min-[900px]:gap-[25px] @min-[1400px]:grid-cols-[730px_350px] @min-[1400px]:gap-[30px]">
          <div className="min-w-0">
            <LastTransaction />
          </div>
          <div className="min-w-0">
            <MyCard />
          </div>
        </div>

        <div className="mt-[24px] @min-[768px]:mt-[28px] @min-[1400px]:mt-[24px] grid gap-5 @min-[900px]:grid-cols-[minmax(0,2.08fr)_minmax(0,1fr)] @min-[900px]:gap-[25px] @min-[1400px]:grid-cols-[730px_350px] @min-[1400px]:gap-[30px]">
          <div className="min-w-0">
            <DebitCreditOverview />
          </div>
          <div className="min-w-0">
            <InvoicesSent />
          </div>
        </div>
      </div>

    </div>;
}
export default AccountsPage;
