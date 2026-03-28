import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl"
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🙏</span>
          <span className="font-heading text-xl font-bold text-gradient-sacred">
            Divya Seva
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {[
            { path: "/", label: "Home" },
            { path: "/pujas", label: "Pujas" },
            { path: "/temples", label: "Temples" },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(link.path) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Admin
          </Link>
          <Link
            to="/pujas"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-sacred px-4 py-2 text-sm font-semibold text-primary-foreground shadow-warm transition-transform hover:scale-105"
          >
            Book Puja
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
