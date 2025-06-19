import React from 'react';
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Assuming cn utility is available

interface SocialLoginButtonProps extends ButtonProps {
  providerName: string;
  icon?: React.ReactNode; // Icon can be any React node, e.g., an SVG or a lucide-react icon
  fullWidth?: boolean;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  providerName,
  icon,
  onClick,
  className,
  fullWidth = false,
  variant = "outline",
  ...props
}) => {
  console.log(`SocialLoginButton loaded for: ${providerName}`);

  return (
    <Button
      variant={variant}
      onClick={onClick}
      className={cn(
        "flex items-center justify-center gap-2 py-2 px-4 border rounded-md transition-colors duration-150 ease-in-out",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        {
          "w-full": fullWidth,
          // Specific provider styling can be added here or via className prop
          // Example: providerName.toLowerCase() === 'google' ? 'border-red-500 hover:bg-red-50 text-red-600' : 'border-gray-300 hover:bg-gray-50 text-gray-700',
        },
        className
      )}
      {...props}
    >
      {icon && <span className="h-5 w-5">{icon}</span>}
      <span>Continue with {providerName}</span>
    </Button>
  );
};

export default SocialLoginButton;