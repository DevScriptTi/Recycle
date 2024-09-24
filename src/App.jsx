import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Welcom } from "./Layouts/Welcom";
import { Login } from "./Layouts/Auth/Login/Login";
import { Register } from "./Layouts/Auth/Register/Register";
import { VendorJoin } from "./Layouts/Auth/JoinUs/Vendor/Vendor";
import { ShipperJoin } from "./Layouts/Auth/JoinUs/Shipper/Shipper";
import { JoinUsContent } from "./Layouts/Auth/JoinUs/JoinUsContent";
import { JoinUs } from "./Layouts/Auth/JoinUs/JoinUs";
import { Provider } from "react-redux";
import { store } from "./StateManagement/Stores/Store";
import { Framwork } from "./DevScript/Index/Framwork";
import "./Http/axiosClient";
import { AuthMiddleware } from "./Layouts/AuthMiddleware";
import { Client } from "./Layouts/Client";
import { GuestMiddleware } from "./Layouts/GuestMiddleware";
import { Dashboard } from "./Layouts/Dashboard/Dashboard";
import { VendorsJoinRequestsIndex } from "./Layouts/Dashboard/VendorJoinReques/index/Index";
import { Error } from "./Layouts/Error";
import { Vendors } from "./Layouts/Dashboard/Vendors/Index/Vendors";
import { ShippersJoinRequestIndex } from "./Layouts/Dashboard/SheppingJoinReques/index/Index";
import { Shippers } from "./Layouts/Dashboard/Shippers/Index/Shippers";
import Notification from "./Notifications/Notification";
import { Admins } from "./Layouts/Dashboard/Admins/Index/Admins";
import { Quantities } from "./Layouts/Client/Elements/Demands/Quantity";
import { Demands } from "./Layouts/Dashboard/Demands/Index/Demands";
import { SparePartsCategories } from "./Layouts/Dashboard/sparePartsCategories/index/sparePartsCategories";
import { PrimaryMatersCategories } from "./Layouts/Dashboard/sparePartsCategories copy/index/primaryMatersCategories";
import { SpareParts } from "./Layouts/Dashboard/spareParts/index/SpareParts";

function App() {
  darkMode();
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                  <Client />
              }
            >
              <Route
                index
                element={
                    <Welcom />
                }
              />
              <Route
                path="primary"
                element={
                    <Quantities />
                }
              />
              <Route
                path="login"
                element={
                  <GuestMiddleware>
                    <Login />
                  </GuestMiddleware>
                }
              />
              <Route
                path="register"
                element={
                  <GuestMiddleware>
                    <Register />
                  </GuestMiddleware>
                }
              />
              <Route
                path="joinUs"
                element={
                  <GuestMiddleware>
                    <JoinUs />
                  </GuestMiddleware>
                }
              >
                <Route
                  index
                  element={
                    <GuestMiddleware>
                      <JoinUsContent />
                    </GuestMiddleware>
                  }
                />
                <Route
                  path="vendor-join"
                  element={
                    <GuestMiddleware>
                      <VendorJoin />
                    </GuestMiddleware>
                  }
                />
                <Route
                  path="shipper-join"
                  element={
                    <GuestMiddleware>
                      <ShipperJoin />
                    </GuestMiddleware>
                  }
                />
              </Route>
            </Route>
            <Route
              path="/dashboard"
              element={
                <AuthMiddleware>
                  <Dashboard />
                </AuthMiddleware>
              }
            >
              <Route
                index
                element={<AuthMiddleware>'statistice'</AuthMiddleware>}
              />
              <Route
                path="coll-companies"
                element={
                  <AuthMiddleware>
                    <Vendors />
                  </AuthMiddleware>
                }
              />
              <Route
                path="coll-companies-join-requests"
                element={
                  <AuthMiddleware>
                    <VendorsJoinRequestsIndex />
                  </AuthMiddleware>
                }
              />
              <Route
                path="recy-companies"
                element={
                  <AuthMiddleware>
                    <Shippers />
                  </AuthMiddleware>
                }
              />
              <Route
                path="recy-companies-join-requests"
                element={
                  <AuthMiddleware>
                    <ShippersJoinRequestIndex />
                  </AuthMiddleware>
                }
              />
              <Route path="users" element={"users"} />
              <Route
                path="admins"
                element={
                  <AuthMiddleware>
                    <Admins />
                  </AuthMiddleware>
                }
              />
             
              <Route
                path="demands"
                element={
                  <AuthMiddleware>
                    <Demands/>
                  </AuthMiddleware>
                }
              />
              <Route
                path="spare-parts"
                element={
                  <AuthMiddleware>
                    <SpareParts/>
                  </AuthMiddleware>
                }
              />
              <Route
                path="spare-parts-categories"
                element={
                  <AuthMiddleware>
                    <SparePartsCategories/>
                  </AuthMiddleware>
                }
              />
              <Route
                path="primary-maters"
                element={
                  <AuthMiddleware>
                    'primary-maters'
                  </AuthMiddleware>
                }
              />
              <Route
                path="primary-maters-categories"
                element={
                  <AuthMiddleware>
                    <PrimaryMatersCategories/>
                  </AuthMiddleware>
                }
              />
             
            </Route>
            <Route path="framework" element={<Framwork />} />
            <Route path="/error" element={<Error />} />
            <Route path="/notification" element={<Notification />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

function darkMode() {
  const modeDark = localStorage.getItem("mode");
  if (modeDark == null) {
    localStorage.setItem("mode", "light");
  }
  const content = document.getElementsByTagName("html")[0];
  content.classList.add(localStorage.getItem("mode"));
}

export default App;
