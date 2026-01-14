import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Users", path: "/admin/users" },
  { name: "Listings", path: "/admin/listings" },
  { name: "Leads", path: "/admin/leads" },
  { name: "Bookings", path: "/admin/bookings" },
  { name: "Locations", path: "/admin/locations" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white">
      <div className="p-4 font-bold text-xl">Admin Panel</div>
      {menu.map((m) => (
        <NavLink
          key={m.path}
          to={m.path}
          className="block px-4 py-2 hover:bg-gray-700"
        >
          {m.name}
        </NavLink>
      ))}
    </aside>
  );
}
