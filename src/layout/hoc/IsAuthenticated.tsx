import { Navigate } from "react-router";

import { useSessionStorage } from "../../hooks/useCustomSession";

// const IsAuthenticated = ({ children }: { children: React.ReactNode }) => {
//   const { user } = useSessionStorage();
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }
//   return children;
// };
const IsAuthenticated = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement | null => {
  const { user } = useSessionStorage();

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default IsAuthenticated;
