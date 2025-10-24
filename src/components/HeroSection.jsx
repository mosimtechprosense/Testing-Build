import { useState, useEffect } from "react";
import bookmybanquetsLogo from "../assets/bookmybanquet.png";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate, useLocation  } from "react-router-dom";

const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [venuesOpen, setVenuesOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  const links = [
    { id: "home", label: "Home", path: "/" },
    { id: "venues", label: "Venues", path: null },
    { id: "services", label: "Services", path: "/services" },
    { id: "about", label: "About", path: "/about" },
    { id: "why-us", label: "Why Us?", path: "/why-us" },
    { id: "blog", label: "Blog", path: "/blog" },
    { id: "contact", label: "Contact Us", path: "/contact" },
  ];

  const venuesDropdown = [
    { id: "banquet", label: "Banquet Halls", path: "/venues/banquet-halls" },
    { id: "wedding", label: "Wedding Venues", path: "/venues/wedding-venues" },
    { id: "conference", label: "Conference Halls", path: "/venues/conference-halls" },
  ];


  // 🧩 Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const handleLogo = () => {
    navigate("/");
    setMenuOpen(false);
  };

  const handleNavClick = (id, path) => {
    
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <div className="w-full bg-[#dc2626] px-4 sm:px-6 md:px-6 lg:px-14 xl:px-20 flex items-center justify-between gap-6 relative z-50">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src={bookmybanquetsLogo}
          alt="bookmybanquetsLogo"
          className="h-9 sm:h-10 md:h-11 lg:h-12 w-auto cursor-pointer"
          onClick={handleLogo}
        />
      </div>

      {/* Mobile Menu Button */}
      <div
        className="md:hidden text-white text-3xl cursor-pointer select-none z-50"
        onClick={(e) => {
          e.stopPropagation();
          setMenuOpen(!menuOpen);
        }}
      >
        {menuOpen ? "✕" : "☰"}
      </div>

      {/* Navigation Menu */}
      <div
        className={`
          md:flex flex-col md:flex-row md:items-center gap-3 sm:gap-6 md:gap-8 lg:gap-10
          absolute md:static top-full left-0 w-full md:w-auto
          bg-[#dc2626] md:bg-transparent px-6 md:px-0 py-4 md:py-0
          shadow-md md:shadow-none whitespace-nowrap z-40
          transform transition-all duration-500 ease-in-out
          ${menuOpen ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0 md:opacity-100 md:translate-y-0"}
          ${menuOpen ? "flex" : "hidden md:flex"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {links.map((link) => (
          <div
            key={link.id}
            className="relative"
            onMouseEnter={() =>
              window.innerWidth >= 768 && link.id === "venues" && setVenuesOpen(true)
            }
            onMouseLeave={() =>
              window.innerWidth >= 768 && link.id === "venues" && setVenuesOpen(false)
            }
          >
            <button
              onClick={() => {
                if (link.id === "venues") {
                  if (window.innerWidth < 768) setVenuesOpen(!venuesOpen);
                  else handleNavClick(link.id, link.path);
                } else {
                  handleNavClick(link.id, link.path);
                }
              }}
             className={`relative flex items-center gap-1 text-base font-semibold py-3 md:py-4
                         transition-all duration-300 ease-in-out cursor-pointer
                       ${location.pathname === link.path || (link.id === "venues" && location.pathname.startsWith("/venues"))
                        ? "text-[#000000] after:scale-x-100 after:origin-left"
                        : "text-white hover:text-[#09122C]"
                         }
                         after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full
                       after:bg-[#09122C] after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-left
                        after:transition-transform after:duration-300
                        `}
              >
                
              {link.label}
              {link.id === "venues" && (
                <IoMdArrowDropdown
                  className={`text-lg transition-transform duration-300 ${
                    venuesOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              )}
            </button>

            {/* Dropdown Menu */}
            {link.id === "venues" && (
              <div
                className={`${
                  venuesOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden transition-all duration-300 ease-in-out 
                flex flex-col md:absolute md:top-full md:left-0 md:bg-white 
                md:shadow-lg md:rounded-lg md:overflow-hidden md:z-50`}
              >
                {venuesDropdown.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    className="text-white md:text-[#09122C] text-sm py-2 px-4 md:px-6 hover:bg-[#f3f3f3] hover:text-[#dc2626] transition-all duration-300"
                    onClick={() => {
                      setMenuOpen(false);
                      setVenuesOpen(false);
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Transparent Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-transparent md:hidden z-30 transition-opacity duration-500 ease-in-out opacity-100"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default HeroSection;
