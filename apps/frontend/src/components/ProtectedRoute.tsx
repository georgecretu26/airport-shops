import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import useAuth from "../hooks/use-auth";

const Loading = dynamic(() => import("./Loading"));

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
