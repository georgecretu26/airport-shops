import Link from "next/link";
import { ReactNode } from "react";
import useAuth from "../hooks/use-auth";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth();

  return (
    <div>
      <nav className="bg-gray-800 p-4 text-white">
        <Link className="mr-4" href="/">
          Home
        </Link>
        <Link className="mr-4" href="/shops">
          Shops
        </Link>
        {user ? (
          <>
            {user.role === "Manager" && (
              <Link className="mr-4" href="/admin">
                Manage Shops
              </Link>
            )}
            {user.role === "Admin" && (
              <Link className="mr-4" href="/admin">
                Admin
              </Link>
            )}
            <button onClick={logout} className="mr-4">
              Logout
            </button>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </nav>
      <main className="w-full max-w-3xl container mx-auto">{children}</main>
    </div>
  );
};

export default Layout;
