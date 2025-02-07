import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import Documents from "./pages/Documents/Documents";
import Expenses from "./pages/Expenses/Expenses";
import ViewInvoice from "./pages/ViewInvoice/ViewInvoice";
import AddOutputInvoice from "./pages/AddOutputInvoice/AddOutputInvoice";
import AddIncomingInvoice from "./pages/AddIncomingInvoice/AddIncomingInvoice";
import ClientsPage from "./pages/ClientsPage/ClientsPage";
import AddClients from "./pages/AddClients/AddClients";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/documents" element={<Layout />}>
        <Route index element={<Documents />} />
      </Route>
      <Route path="/expenses" element={<Layout />}>
        <Route index element={<Expenses />} />
      </Route>
      <Route path="/view-invoice" element={<Layout />}>
        <Route index element={<ViewInvoice />} />
      </Route>
      <Route path="/add-invoice" element={<Layout />}>
        <Route index element={<AddOutputInvoice />} />
      </Route>
      <Route path="/add-incoming-invoice" element={<Layout />}>
        <Route index element={<AddIncomingInvoice />} />
      </Route>
      <Route path="/clients" element={<Layout />}>
        <Route index element={<ClientsPage />} />
      </Route>
      <Route path="/add-clients" element={<Layout />}>
        <Route index element={<AddClients />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
