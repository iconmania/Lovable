
import { useIsMobile } from "@/hooks/use-mobile";
import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Use isMobile directly without useMediaQuery
  const showSidebar = !isMobile || sidebarOpen;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const navItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Messages", path: "/admin/messages" },
    { name: "Content Editor", path: "/admin/editor" },
    { name: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Mobile header with menu button */}
      <header className="md:hidden bg-white border-b p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          "w-full md:w-64 bg-white border-r transition-all duration-300 ease-in-out",
          {
            "fixed inset-0 z-50": isMobile,
            "translate-x-0": showSidebar,
            "-translate-x-full": isMobile && !sidebarOpen,
            "hidden": !showSidebar && !isMobile,
          }
        )}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "block px-4 py-2 rounded-md transition-colors",
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-gray-100"
                )}
                onClick={closeSidebar}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-6 border-t">
          <Link
            to="/"
            className="block w-full px-4 py-2 text-center rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Back to Site
          </Link>
          <Link
            to="/admin/logout"
            className="block w-full px-4 py-2 text-center rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors mt-2"
          >
            Logout
          </Link>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
