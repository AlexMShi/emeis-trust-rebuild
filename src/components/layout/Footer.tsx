import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Linkedin, Twitter } from 'lucide-react';

const footerLinks = {
  company: [
    { label: 'About Emeis', href: '/about-transformation' },
    { label: 'Our Transformation', href: '/#transformation' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
  ],
  families: [
    { label: 'Book a Visit', href: '/transparency#book-visit' },
    { label: 'Family Portal', href: '/family-portal' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Admission Guide', href: '/admission' },
  ],
  support: [
    { label: 'FAQ', href: '/#faq' },
    { label: 'Contact Us', href: '#' },
    { label: 'Complaints', href: '#' },
    { label: 'Accessibility', href: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'GDPR', href: '#' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container-wide section-padding">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-xl font-display font-semibold text-foreground mb-4"
            >
              <Heart className="h-6 w-6 text-primary" fill="currentColor" />
              <span>Emeis</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Trust, transparently earned. Quality elderly care with complete visibility for families.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-lg bg-background hover:bg-primary/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-muted-foreground hover:text-primary" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Families Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">For Families</h3>
            <ul className="space-y-2">
              {footerLinks.families.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mt-0.5 text-primary" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mt-0.5 text-primary" />
                <span>families@emeis.care</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span>200+ locations across Europe</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Emeis. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
