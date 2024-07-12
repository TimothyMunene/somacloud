import logo from "./logo.svg";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
//import DashboardLayout from './layouts/dashboard/DashboardLayout';
import ProtectedRoute from "./ProtectedRoute";
import Login from "./auth/Login";
import MarkTabs from "./pages/marks/MarkTabs";
import BasicTabs from "./pages/admin/BasicTabs";
import AddFunds from "./pages/wallet/AddFunds";
import NewWallet from "./pages/wallet/NewWallet";
import Wallet from "./pages/wallet/Wallet";
import PrivateRoute from "./PrivateRoute";
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<DashboardLayout />}>
        <Route path="" element={<Dashboard />}>
          <Route
            element={<ProtectedRoute roles={["ROLE_USER", "ROLE_ADMIN"]} />}
          >
            <Route index element={<Dashboard />} />
          </Route>
        </Route>
        <Route path="marks" element={<PrivateRoute />}>
          <Route
            element={<ProtectedRoute roles={["ROLE_USER", "ROLE_ADMIN"]} />}
          >
            <Route index element={<MarkTabs/>} />
          </Route>
        </Route>
        <Route path="sms" element={<PrivateRoute />}>
          <Route
            element={<ProtectedRoute roles={["ROLE_USER", "ROLE_ADMIN"]} />}
          >
            <Route index element={<Wallet />} />
          </Route>
          <Route
            element={<ProtectedRoute roles={["ROLE_USER", "ROLE_ADMIN"]} />}
          >
            <Route path="new" element={<NewWallet />} />
          </Route>
          <Route
            element={<ProtectedRoute roles={["ROLE_USER", "ROLE_ADMIN"]} />}
          >
            <Route path="addFunds" element={<AddFunds />} />
          </Route>
        </Route>

        <Route path="admin" element={<PrivateRoute />}>
          <Route
            element={<ProtectedRoute roles={["ROLE_USER", "ROLE_ADMIN"]} />}
          >
            <Route index element={<BasicTabs />} />
          </Route>
        </Route>


      </Route>
    </Routes>
  );
}

export default App;
