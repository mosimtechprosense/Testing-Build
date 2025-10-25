import { Link } from "react-router-dom";

const venuesDropdownData = [
  { id: "banquet", label: "Banquet Halls", path: "/venues/banquet-halls" },
  {
    id: "marriage-gardens",
    label: "Marriage Gardens",
    path: "/venues/marriage-gardens",
  },
  {
    id: "wedding-farmhouse",
    label: "Wedding Farmhouse",
    path: "/venues/wedding-farmhouse",
  },
  { id: "party-halls", label: "Party Halls", path: "/venues/party-halls" },
  {
    id: "five-star-hotels",
    label: "5 Star Wedding Hotels",
    path: "/venues/5-star-wedding-hotels",
  },
  {
    id: "destination-weddings",
    label: "Destination Weddings",
    path: "/venues/destination-weddings",
  },
  {
    id: "makeup-artists",
    label: "Makeup Artists",
    path: "/vendors/makeup-artists",
  },
  {
    id: "mehandi-artists",
    label: "Mehandi Artists",
    path: "/vendors/mehandi-artists",
  },
  { id: "decorators", label: "Decorators", path: "/vendors/decorators" },
  {
    id: "invitation-cards",
    label: "Invitation Cards",
    path: "/vendors/invitation-cards",
  },
  {
    id: "choreographers",
    label: "Choreographers / Dancers",
    path: "/vendors/choreographers-dancers",
  },
  {
    id: "photographers",
    label: "Photographers / Videography",
    path: "/vendors/photographers-videography",
  },
  {
    id: "wedding-bands",
    label: "Wedding Bands",
    path: "/vendors/wedding-bands",
  },
  {
    id: "transportation",
    label: "Wedding Transportation",
    path: "/vendors/transportation-vintage-cars",
  },
  { id: "bridal-wear", label: "Bridal Wear", path: "/vendors/bridal-wear" },
  { id: "groom-wear", label: "Groom Wear", path: "/vendors/groom-wear" },
];

const VenuesDropdown = ({ isOpen, onSelect }) => {
  return (
    <div
      className={`
        flex flex-col md:flex-row md:flex-wrap
        transition-all duration-300 ease-in-out
        ${
          isOpen
            ? "opacity-100 max-h-[2000px] visible"
            : "opacity-0 max-h-0 invisible"
        }
        overflow-y-auto
      `}
      style={{
        minWidth: "420px",
        maxHeight: "400px", // Scrollable height for mobile
      }}
    >
      {venuesDropdownData.map((item) => (
        <Link
          key={item.id}
          to={item.path}
          onClick={onSelect}
          className="text-[#09122C] text-sm py-2 px-2 hover:bg-[#f3f3f3] hover:text-[#dc2626] transition-all duration-300 rounded w-full md:w-1/2"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default VenuesDropdown;
