import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Package from "./pages/Package";
import Guests from "./pages/Guests";
import PageNotFound from "./pages/PageNotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyles from "./styles/GlobalStyles";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";
import Feedback from "./pages/Feedback";
import Home from "./pages/Home";
import UserLayout from "./ui/UserLayout";
import DisplayCabin from "./features/cabins/DisplayCabin";
import UserHome from "./ui/UserHome";
import DisplayCabinDetails from "./features/cabins/DisplayCabinDetails";
import UserBookCabin from "./features/cabins/UserBookCabin";
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000 } },
});
export default function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={<Navigate replace to="/admin/dashboard" />}
              />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/bookings" element={<Bookings />} />
              <Route path="/admin/bookings/:bookingId" element={<Booking />} />
              <Route path="/admin/checkin/:bookingId" element={<Checkin />} />
              <Route path="/admin/checkout/:bookingId" element={<Feedback />} />
              <Route path="/admin/cabins" element={<Cabins />} />
              <Route path="/admin/guests" element={<Guests />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/package" element={<Package />} />
              <Route path="/admin/account" element={<Account />} />
            </Route>
            <Route path="/admin/login" element={<Login />} />
            <Route path="/users" element={<UserLayout />}>
              <Route index element={<Navigate replace to="/users/home" />} />
              <Route path="/users/home" element={<UserHome />} />
              <Route path="/users/cabins" element={<DisplayCabin />} />
              <Route
                path="/users/cabins/:cabinId"
                element={<DisplayCabinDetails />}
              />
              <Route
                path="/users/cabins/:cabinId/book"
                element={<UserBookCabin />}
              />
            </Route>
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}
