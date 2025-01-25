import { Route, Routes } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { createStore } from "./redux/store";

function App() {
  const { store, persistor } = createStore();
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path="/*" element={<UserRoutes />} />
            <Route element={<PrivateRoutes />} >
              <Route path="/admin/*" element={<AdminRoutes />} />
            </Route>
          </Routes>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
