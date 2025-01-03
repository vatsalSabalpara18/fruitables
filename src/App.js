import { Route, Routes } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { Provider } from "react-redux";
import { createStore } from "./redux/store";

function App() {
  const store = createStore();
  return (
    <>
    <Provider store={store}>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route element={<PrivateRoutes />} >
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Route>
      </Routes>
    </Provider>
    </>
  );
}

export default App;
