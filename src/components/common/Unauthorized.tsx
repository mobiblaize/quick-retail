import { Button } from "@mantine/core";
import { ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

interface UnauthorizedProps {
  message?: string;
  showBackButton?: boolean;
}

/**
 * Unauthorized Access View Component
 * Displayed when users try to access pages they don't have permissions for
 */
const Unauthorized = ({
  message = "You don't have permission to access this page",
  showBackButton = true,
}: UnauthorizedProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-50 p-6 rounded-full">
            <ShieldAlert className="w-16 h-16 text-red-500" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Access Denied
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-8 text-lg">
          {message}
        </p>

        {/* Additional Info */}
        <p className="text-sm text-gray-500 mb-8">
          If you believe this is an error, please contact your administrator to
          request the necessary permissions.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showBackButton && (
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate(-1)}
              className="min-w-[150px]"
            >
              Go Back
            </Button>
          )}
          <Button
            size="md"
            onClick={() => navigate(ROUTES.dashboard)}
            className="min-w-[150px]"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;

