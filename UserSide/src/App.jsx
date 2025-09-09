import "./App.css";
import NavBar from "./context/NavBar";
import Footer from "./context/Footer/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import ForgetPasssword from "./components/ForgetPassword/ForgetPasssword";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard.jsx";
import Dashboard from "./components/AdminDashboard/Dashboard/Dashboard.jsx";
import Manage_IPO from "./components/AdminDashboard/ManageIPO/Manage_IPO.jsx";
import Registerpo from "./components/AdminDashboard/ManageIPO/register/registerpo.jsx";
import Ipo_Card from "./context/IPO_card/Ipo_Card.jsx";

// Layout wrapper to hide/show NavBar
function Layout({ children }) {
  const location = useLocation();
  const hideNavOnPaths = ["/login", "/signup", "/forgetpassword", "/dashboard"]; // add more paths to hide navbar if needed

  const shouldHideNav = hideNavOnPaths.some((path) =>
    location.pathname.toLowerCase().startsWith(path)
  );

  return (
    <>
      {!shouldHideNav && <NavBar />}
      {children}
      {!shouldHideNav && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/ipocard" element={<Ipo_Card />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/forgetpassword" element={<ForgetPasssword />} />
          <Route path="/dashboard" element={<AdminDashboard />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboarddefault" element={<Dashboard />} />
            <Route path="manageipo" element={<Manage_IPO />}>
              <Route path="registeripo" element={<Registerpo />} />
            </Route>
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
