import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Mail, AlertTriangle, CheckCircle2 } from 'lucide-react';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthFormCard from '@/components/AuthFormCard';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const passwordResetSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type PasswordResetFormValues = z.infer<typeof passwordResetSchema>;

const PasswordResetPage: React.FC = () => {
  console.log('PasswordResetPage loaded');
  const navigate = useNavigate();
  const [submissionStatus, setSubmissionStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PasswordResetFormValues>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: PasswordResetFormValues) => {
    setIsLoading(true);
    setSubmissionStatus(null);
    console.log('Password reset requested for email:', data.email);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate success or error
    // In a real app, you'd handle API response here.
    // For this example, we'll assume success.
    setSubmissionStatus({
      type: 'success',
      message: `If an account exists for ${data.email}, you will receive an email with password reset instructions.`,
    });
    form.reset(); // Reset form on successful submission message
    setIsLoading(false);
    // navigate('/'); // Optionally redirect or just show message
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <AuthFormCard
          title="Reset Your Password"
          description="Enter your email address below. If an account is associated with it, we'll send you a link to reset your password."
          logo={<Mail className="h-12 w-12 text-primary" />}
          footerContent={
            <div className="text-center text-sm">
              Remember your password?{' '}
              <Link to="/" className="font-medium text-primary hover:underline"> {/* Path from App.tsx */}
                Sign In
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
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {submissionStatus && (
                <Alert variant={submissionStatus.type === 'error' ? 'destructive' : 'default'} className={submissionStatus.type === 'success' ? 'border-green-500 text-green-700' : ''}>
                  {submissionStatus.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                  <AlertTitle>{submissionStatus.type === 'success' ? 'Instructions Sent' : 'Error'}</AlertTitle>
                  <AlertDescription>{submissionStatus.message}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Reset Instructions'}
              </Button>
            </form>
          </Form>
        </AuthFormCard>
      </main>
      <Footer />
    </div>
  );
};

export default PasswordResetPage;