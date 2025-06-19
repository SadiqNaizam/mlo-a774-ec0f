import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header'; // Custom component
import Footer from '@/components/layout/Footer'; // Custom component
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // shadcn/ui
import { Button } from '@/components/ui/button'; // shadcn/ui
import { LogOut } from 'lucide-react'; // Icon

const DashboardPage = () => {
  console.log('DashboardPage loaded');
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you'd also clear tokens/session state here
    console.log('User logging out');
    navigate('/'); // Navigate to LoginPage, path from App.tsx
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <Card className="w-full max-w-lg text-center shadow-xl">
          <CardHeader className="p-6">
            <CardTitle className="text-3xl font-bold text-gray-800">Welcome to Your Dashboard!</CardTitle>
            <CardDescription className="mt-2 text-gray-600">
              You have successfully logged in. This is your personalized space.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">
              Explore the features and manage your account. More content and functionalities will be available here soon.
            </p>
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFzaGJvYXJkfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" 
              alt="Abstract dashboard graphic" 
              className="mt-4 rounded-lg shadow-md mx-auto"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center p-6 border-t">
            <Button 
              onClick={handleLogout} 
              className="w-full max-w-xs bg-red-600 hover:bg-red-700 text-white"
              variant="destructive"
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;