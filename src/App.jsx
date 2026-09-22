import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Accounts from "./pages/Accounts";
import Investments from "./pages/Investments";
import CreditCards from "./pages/CreditCards";
import Loans from "./pages/Loans";
import Services from "./pages/Services";
import Settings from "./pages/Settings";
import Privileges from "./pages/Privileges";
function App() {
  return <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/credit-cards" element={<CreditCards />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/privileges" element={<Privileges />} />
          <Route path="/services" element={<Services />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>;
}
export default App;
