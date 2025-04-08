import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { title: "Home", path: "#home" },
  { title: "About", path: "#about" },
  { title: "How to buy", path: "#how-to-buy" },
  { title: "Tokenomics", path: "#tokenomics" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <nav className="pt-[40px] z-50 relative">
      {/* Desktop Navbar */}
      <div className="lg:flex hidden items-center justify-center w-full px-6">
        <ul className="flex items-center gap-6">
          {navLinks.map((link) => (
            <li className="navlink cursor-pointer" key={link.title}>
              <a
                className="font-Rainball text-[19px] text-white tracking-[-1%]"
                href={link.path}
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden block absolute top-10 right-10 z-[9000]">
        <button
          onClick={toggleNavbar}
          className="text-white focus:outline-none"
        >
          {isOpen ? (
            <X size={30} className="text-orange-500" />
          ) : (
            <Menu size={30} />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-full bg-white bg-opacity-95 flex flex-col items-center justify-center transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ zIndex: 8000 }}
      >
        <button
          onClick={toggleNavbar}
          className="absolute top-10 right-10 text-white"
        >
          <X size={30} className="text-orange-500" />
        </button>

        <ul className="flex flex-col items-center gap-6">
          {navLinks.map((link) => (
            <li className="navlink cursor-pointer" key={link.title}>
              <a
                className="font-Rainball text-[19px] text-white tracking-[-1%] hover:text-orange-500 transition-colors duration-200"
                href={link.path}
                onClick={() => setIsOpen(false)}
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
