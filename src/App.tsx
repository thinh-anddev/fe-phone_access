import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import routes from "./routes/routes";
import Header from "./pages/share/Header";
import Footer from "./pages/share/Footer";

function App() {
  const location = window.location;

  return (
    <>
      <Router>
        {location.pathname !== "/admin_dashboard" && <Header />}
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={<route.element />} />
          ))}
        </Routes>
        {location.pathname !== "/admin_dashboard" && <Footer />}
      </Router>
    </>
  );
}

export default App;
