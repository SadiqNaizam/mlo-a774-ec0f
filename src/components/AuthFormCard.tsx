import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AuthFormCardProps {
  title: string;
  description?: string;
  logo?: React.ReactNode;
  children: React.ReactNode;
  footerContent?: React.ReactNode;
  className?: string;
}

const AuthFormCard: React.FC<AuthFormCardProps> = ({
  title,
  description,
  logo,
  children,
  footerContent,
  className,
}) => {
  console.log('AuthFormCard loaded, title:', title);

  return (
    <Card className={cn("w-full max-w-md shadow-lg", className)}>
      <CardHeader className="text-center p-6">
        {logo && <div className="mb-4 flex justify-center">{logo}</div>}
        <CardTitle className="text-2xl font-bold tracking-tight">{title}</CardTitle>
        {description && <CardDescription className="mt-2">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-6 pt-0">
        {children}
      </CardContent>
      {footerContent && (
        <CardFooter className="p-6 pt-4 border-t">
          {/* Consumer should provide layout for footerContent, e.g., using flex for links */}
          {footerContent}
        </CardFooter>
      )}
    </Card>
  );
};

export default AuthFormCard;