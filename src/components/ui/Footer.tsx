import Link from "next/link";
import { Leaf } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/input", label: "Assessment" },
    { path: "/results", label: "Results" },
    { path: "/about", label: "About" },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-green-100 rounded-lg mt-1">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Dhatuchakra</h2>
              <p className="text-sm text-gray-600">
                AI based Circular Assessments Tool
              </p>
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Navigate
              </h3>
              <ul className="space-y-2 text-sm">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className="text-gray-600 hover:text-green-600"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Resources
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="mailto:contact@lnbg.in"
                    className="text-gray-600 hover:text-green-600"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 cursor-not-allowed"
                    aria-disabled
                    title="Coming soon"
                  >
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                About
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 hover:text-green-600"
                  >
                    Our Mission
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
          <p>© {year} Dhatuchakra. All rights reserved.</p>
          <div className="space-x-6 mt-2 sm:mt-0">
            <span className="text-gray-400">v1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
