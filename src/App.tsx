import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import StudentDashboard from "./pages/dashboard/student";
import AdminDashboard from "./pages/dashboard/admin";
import MealPlansPage from "./pages/meal-plans";
import PaymentsPage from "./pages/payments";
import InventoryPage from "./pages/inventory";
import ReportsPage from "./pages/reports";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/meal-plans" element={<MealPlansPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
