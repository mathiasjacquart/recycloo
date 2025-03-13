import { Outlet } from "react-router-dom";
import AdminProvider from "../providers/AdminProvider";

const AdminLayout = () => {
  return (
    <div className="admin-container">
      <AdminProvider>
        <Outlet />
      </AdminProvider>
    </div>
  );
};

export default AdminLayout;
