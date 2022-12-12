import React from "react";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
// import FooterAdmin from "components/Footers/FooterAdmin.js";
import Footer from "components/Footers/Footer.js";

export default function Admin({ children }) {
  return (
    <>
        <HeaderStats />
        <div>
          {children}
          <Footer />
      </div>
    </>
  );
}
