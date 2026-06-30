import { PawPrint, Twitter, Instagram, Youtube, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200/60 px-6 py-12 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Col 1 */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <PawPrint className="w-6 h-6 text-coral fill-coral/20" />
            <span className="font-serif text-2xl font-bold">Dofo</span>
          </div>
          <p className="text-sm text-slate-600 max-w-xs leading-relaxed">
            Connecting loving homes with adorable pets. Your journey to finding a perfect companion starts here.
          </p>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><a href="#" className="hover:text-coral transition">Browse Pets</a></li>
            <li><a href="#" className="hover:text-coral transition">How it works</a></li>
            <li><a href="#" className="hover:text-coral transition">Adoption tips</a></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><a href="#" className="hover:text-coral transition">Help Center</a></li>
            <li><a href="#" className="hover:text-coral transition">Safety</a></li>
            <li><a href="#" className="hover:text-coral transition">Contact us</a></li>
          </ul>
        </div>

        {/* Col 4 */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-4">Follow us</h4>
          <div className="flex gap-3">
            <a href="#" className="p-2 bg-slate-100 rounded-full hover:bg-coral-light transition group">
              <Twitter className="w-4 h-4 text-slate-700 group-hover:text-coral" />
            </a>
            <a href="#" className="p-2 bg-slate-100 rounded-full hover:bg-coral-light transition group">
              <Instagram className="w-4 h-4 text-slate-700 group-hover:text-coral" />
            </a>
            <a href="#" className="p-2 bg-slate-100 rounded-full hover:bg-coral-light transition group">
              <Youtube className="w-4 h-4 text-slate-700 group-hover:text-coral" />
            </a>
            <a href="#" className="p-2 bg-slate-100 rounded-full hover:bg-coral-light transition group">
              <Mail className="w-4 h-4 text-slate-700 group-hover:text-coral" />
            </a>
          </div>
          <p className="text-xs text-slate-400 mt-4">© 2026 Dofo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
