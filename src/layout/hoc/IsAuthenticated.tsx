import { Navigate } from "react-router";
import { useUserStore } from "../../hooks/useUserStore";

/**
 * IsAuthenticated HOC
 * 
 * Checks if user is authenticated using Zustand store (which is updated during login).
 * This ensures consistency with the rest of the app's authentication state.
 */
const IsAuthenticated = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement | null => {
  // Use Zustand store instead of Jotai atom for consistency
  // The Zustand store is updated during login and persists to sessionStorage
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default IsAuthenticated;
