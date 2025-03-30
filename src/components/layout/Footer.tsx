
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              AI-powered medical scan analysis and doctor consultation platform.
              Transforming healthcare with artificial intelligence.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/scan-analysis" className="text-muted-foreground hover:text-foreground transition-colors">
                  Scan Analysis
                </Link>
              </li>
              <li>
                <Link to="/consultation" className="text-muted-foreground hover:text-foreground transition-colors">
                  Doctor Consultation
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Patient Dashboard
                </Link>
              </li>
              <li>
                <Link to="/doctor-dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Doctor Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-muted-foreground hover:text-foreground transition-colors">
                  Press
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Health.AI. All rights reserved.
          </p>
          <div className="flex items-center text-sm text-muted-foreground mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="h-4 w-4 mx-1 text-primary" />
            <span>by Health.AI Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
