import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-gradient-dark text-primary-foreground">
    <div className="container py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">🙏</span>
            <span className="font-heading text-2xl font-bold text-gradient-sacred">Divya Seva</span>
          </div>
          <p className="text-sm opacity-80 max-w-md leading-relaxed">
            Experience divine blessings from Shri Mahakaleshwar Jyotirlinga Temple. Book personalized pujas, offer chadhava, order prasad, and experience darshan.
          </p>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[
              { to: "/", label: "Home" },
              { to: "/pujas", label: "Pujas" },
              { to: "/chadhava", label: "Chadhava" },
              { to: "/darshan", label: "Darshan" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="text-sm opacity-70 hover:opacity-100 transition-opacity">{l.label}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-4">Services</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <span>Online Puja</span>
            <span>Chadhava Seva</span>
            <span>Prasad Delivery</span>
            <span>Live Darshan</span>
            <span>VIP Darshan Pass</span>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-12 pt-6 text-center text-xs opacity-50">
        © 2026 Divya Seva. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
