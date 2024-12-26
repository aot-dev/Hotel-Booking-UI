import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav>
      <ul style={{ display: "flex", listStyleType: "none", padding: 0 }}>
        {location.pathname !== "/hotels" && (
          <li style={{ margin: "0 10px" }}>
            <Link to="/hotels">Hotel List</Link>
          </li>
        )}

        {location.pathname !== "/my-bookings" && (
          <li style={{ margin: "0 10px" }}>
            <Link to="/my-bookings">My Bookings</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
