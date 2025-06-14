import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import routes from "./routes/routes";
import Header from "./pages/share/Header";
import Footer from "./pages/share/Footer";

// Định nghĩa interface cho route
interface RouteConfig {
    path: string;
    element: React.ComponentType;
}

function App() {
    const location = useLocation();

    return (
        <>
            {location.pathname !== "/admin_dashboard" && <Header />}
            <Routes>
                {routes.map((route: RouteConfig, index: number) => (
                    <Route key={index} path={route.path} element={<route.element />} />
                ))}
            </Routes>
            {location.pathname !== "/admin_dashboard" && <Footer />}
        </>
    );
}

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWrapper;