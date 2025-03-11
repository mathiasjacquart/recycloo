import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import UserProvider from "./providers/UserProvider";
function App() {
  return (
    <div>
      <UserProvider>
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
      </UserProvider>
    </div>
  );
}

export default App;
