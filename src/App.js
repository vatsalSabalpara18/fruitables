import { Route, Routes } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { Provider } from "react-redux";
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { PersistGate } from "redux-persist/integration/react";
import { createStore } from "./redux/store";
import Alert from "./component/Alert/Alert";

function App() {
  const { store, persistor } = createStore();
  return (
    <>
      <SnackbarProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Alert />
            <Routes>
              <Route path="/*" element={<UserRoutes />} />
              <Route element={<PrivateRoutes />} >
                <Route path="/admin/*" element={<AdminRoutes />} />
              </Route>
            </Routes>
          </PersistGate>
        </Provider>
      </SnackbarProvider>
    </>
  );
}

export default App;
