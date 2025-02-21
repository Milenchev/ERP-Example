import logo from "./logo.svg";
import "./App.css";
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
import Offers from "./pages/Offers/Offers";
import PrintOffer from "./pages/PrintOffer/PrintOffer";
import AddOffer from "./pages/AddOffer/AddOffer";
import StoreHouse from "./pages/StoreHouse/StoreHouse";
import StoreHouseParts from "./pages/StoreHouseParts/StoreHouseParts";
import AddStoreHouseParts from "./pages/AddStoreHouseParts/AddStoreHouseParts";
import Repairs from "./pages/Repairs/Repairs";
import AddRepairs from "./pages/AddRepairs/AddRepairs";
import WorkRepair from "./pages/WorkRepair/WorkRepair";
import Orders from "./pages/Orders/Orders";
import AddOrder from "./pages/AddOrder/AddOrder";
import AutoInvoices from "./pages/AutoInvoices/AutoInvoices";
import AutoInvoiceAdd from "./pages/AutoInvoiceAdd/AutoInvoiceAdd";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path='/documents' element={<Layout />}>
                    <Route index element={<Documents />} />
                </Route>
                <Route path='/expenses' element={<Layout />}>
                    <Route index element={<Expenses />} />
                </Route>
                <Route path='/view-invoice' element={<Layout />}>
                    <Route index element={<ViewInvoice />} />
                </Route>
                <Route path='/add-invoice' element={<Layout />}>
                    <Route index element={<AddOutputInvoice />} />
                </Route>
                <Route path='/add-incoming-invoice' element={<Layout />}>
                    <Route index element={<AddIncomingInvoice />} />
                </Route>
                <Route path='/clients' element={<Layout />}>
                    <Route index element={<ClientsPage />} />
                </Route>
                <Route path='/add-clients' element={<Layout />}>
                    <Route index element={<AddClients />} />
                </Route>
                <Route path='/offers' element={<Layout />}>
                    <Route index element={<Offers />} />
                </Route>
                <Route path='/print-offers' element={<Layout />}>
                    <Route index element={<PrintOffer />} />
                </Route>
                <Route path='/add-offer' element={<Layout />}>
                    <Route index element={<AddOffer />} />
                </Route>
                <Route path='/storeHouse' element={<Layout />}>
                    <Route index element={<StoreHouse />} />
                </Route>
                <Route path='/storeHouseParts' element={<Layout />}>
                    <Route index element={<StoreHouseParts />} />
                </Route>
                <Route path='/Add-items' element={<Layout />}>
                    <Route index element={<AddStoreHouseParts />} />
                </Route>
                <Route path='/Repairs' element={<Layout />}>
                    <Route index element={<Repairs />} />
                </Route>
                <Route path='/add-repair' element={<Layout />}>
                    <Route index element={<AddRepairs />} />
                </Route>
                <Route path='/work-repair' element={<Layout />}>
                    <Route index element={<WorkRepair />} />
                </Route>
                <Route path='/orders' element={<Layout />}>
                    <Route index element={<Orders />} />
                </Route>
                <Route path='/add-order' element={<Layout />}>
                    <Route index element={<AddOrder />} />
                </Route>
                <Route path='/auto-invoice' element={<Layout />}>
                    <Route index element={<AutoInvoices />} />
                </Route>
                <Route path='/auto-invoice-add' element={<Layout />}>
                    <Route index element={<AutoInvoiceAdd />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
