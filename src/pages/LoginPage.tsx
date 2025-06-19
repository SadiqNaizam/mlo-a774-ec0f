import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthFormCard from '@/components/AuthFormCard';
import SocialLoginButton from '@/components/SocialLoginButton';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Can be replaced by FormLabel from Form component
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { ShieldCheck, Mail, Lock, LogIn, AlertTriangle, Chrome } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log('Login form submitted:', data);
    setLoginError(null); // Clear previous errors

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (data.email === 'user@example.com' && data.password === 'password123') {
      toast.success('Login successful!', {
        description: 'Redirecting to your dashboard...',
      });
      // In a real app, you would set auth tokens here
      navigate('/dashboard'); // Navigate to dashboard on success (path from App.tsx)
    } else {
      const errorMsg = "Invalid email or password. Please try again.";
      setLoginError(errorMsg);
      toast.error('Login Failed', {
        description: errorMsg,
      });
      form.resetField("password"); // Clear password field on error
    }
  };

  console.log('LoginPage loaded');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 md:p-8">
        <AuthFormCard
          title="Sign In to Your Account"
          description="Enter your credentials to access SecureApp."
          logo={<ShieldCheck className="h-10 w-10 text-primary" />}
          className="w-full max-w-md"
          footerContent={
            <div className="text-sm text-center text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/registration" className="font-medium text-primary hover:underline">
                Sign Up
              </Link>
            </div>
          }
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          className="pl-10"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Link
                        to="/password-reset" // Path from App.tsx
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {loginError && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Login Failed</AlertTitle>
                  <AlertDescription>{loginError}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <>
                    <LogIn className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <SocialLoginButton
              providerName="Google"
              icon={<Chrome className="h-4 w-4" />}
              fullWidth
              variant="outline"
              onClick={() => {
                toast.info("Social Login Clicked", { description: "Google login functionality not implemented." });
                console.log('Google login clicked (placeholder)');
              }}
            />
            {/* Add other social login buttons here if needed */}
          </div>
        </AuthFormCard>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;