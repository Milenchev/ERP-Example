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
            </Routes>
        </BrowserRouter>
    );
}

export default App;
