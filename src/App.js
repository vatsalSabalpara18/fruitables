import { Route, Routes } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route element={<PrivateRoutes />} >
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Route>
      </Routes>

    </>
  );
}

export default App;
