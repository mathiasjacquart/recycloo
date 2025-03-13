import { Outlet } from "react-router-dom";
import UserProvider from "../providers/UserProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PublicLayout = () => {
  return (
    <div>
      <UserProvider>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </UserProvider>
    </div>
  );
};

export default PublicLayout;
