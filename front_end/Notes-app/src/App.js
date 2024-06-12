import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import { UserContextProvider } from "./UserContext";
import SidebarNav from "./components/Sidebar";
import NotesPage from "./pages/NotesPage";
import AccountPage from "./pages/AccountPage";
function App() {
  return (
    <>
      <UserContextProvider>
        <div className="layout">
          <Navbar />
        </div>
        <div className="containter">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<AccountPage></AccountPage>}></Route>
          </Routes>
        </div>
      </UserContextProvider>
    </>
  );
}

export default App;
