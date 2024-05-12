import "./App.css";
import Index from "./pages/Index.jsx";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import Layout from "./layout/Layout.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import axios from "axios";
import { UserContextProvider } from "./UserContext.jsx";
// import AccountPage from "./pages/AccountPage.jsx";
import ProfilePage from "./pages/account/ProfilePage.jsx";
import PlacesPage from "./pages/account/PlacesPage.jsx";
import PlacesFormPage from "./pages/account/PlacesFormPage.jsx";
// import PlacesFormPageEdit from "./pages/account/PlacesFormPageEdit.jsx";
import PlacePage from "./pages/PlacePage.jsx";
import BookingsPage from "./pages/account/BookingsPage.jsx";
import BookingPage from "./pages/account/BookingPage.jsx";

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;



function App() {
  
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<PlacePage/>}  />
          <Route path="/account/bookings" element={<BookingsPage/>}  />
          <Route path="/account/bookings/:id" element={<BookingPage/>}  />

        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
