// components/auth/AuthDialog.jsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const AuthDialog = ({ open, onOpenChange }) => {
    const [activeTab, setActiveTab] = useState('login');
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCredentialsSignIn = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg('');

        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
            callbackUrl: '/'
        });

        if (result.error) {
            setErrorMsg(result.error);
        } else {
            onOpenChange(false);
        }
        setIsLoading(false);
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setErrorMsg('');

        const result = await signIn('google', {
            redirect: false,
            callbackUrl: '/'
        });

        if (result.error) {
            setErrorMsg(result.error);
        } else {
            onOpenChange(false);
        }
        setIsLoading(false);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg('');

        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const email = form.get('email');
        const password = form.get('password');
        const confirmPassword = form.get('confirmPassword');

        if (password !== confirmPassword) {
            setErrorMsg("Passwords don't match");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            // After successful signup, log the user in
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
                callbackUrl: '/'
            });

            if (result.error) {
                setErrorMsg(result.error);
            } else {
                onOpenChange(false);
            }
        } catch (error) {
            setErrorMsg(error.message || 'Failed to create account');
        }
        setIsLoading(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md p-0 border-0 overflow-hidden bg-gradient-to-br from-[#f0f7ff] to-[#e6f2ff]">
                <div className="relative">
                    {/* <button
                        onClick={() => onOpenChange(false)}
                        className="absolute top-4 right-4 p-1 rounded-full bg-white/20 hover:bg-white/30 text-gray-600"
                    >
                        <X size={20} />
                    </button> */}

                    <div className="p-8">
                        <DialogHeader>
                            <DialogTitle className="text-center text-3xl font-bold text-[#003366] mb-2">
                                Login
                            </DialogTitle>
                            <p className="text-center text-gray-600 mb-8">
                                {activeTab === 'login'
                                    ? 'Sign in to access your account'
                                    : 'Create a new account to get started'}
                            </p>
                        </DialogHeader>

                        {/* Tabs */}
                        <div className="flex mb-8 bg-white/50 rounded-lg p-1 border border-gray-200">
                            <button
                                onClick={() => setActiveTab('login')}
                                className={`flex-1 py-3 rounded-lg text-center font-medium transition-all ${activeTab === 'login'
                                    ? 'bg-[#003366] text-white shadow-md'
                                    : 'text-gray-600 hover:text-[#003366]'
                                    }`}
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => setActiveTab('signup')}
                                className={`flex-1 py-3 rounded-lg text-center font-medium transition-all ${activeTab === 'signup'
                                    ? 'bg-[#003366] text-white shadow-md'
                                    : 'text-gray-600 hover:text-[#003366]'
                                    }`}
                            >
                                Sign Up
                            </button>
                        </div>

                        {/* Form Content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-6"
                            >
                                {activeTab === 'login' ? (
                                    <LoginForm
                                        handleCredentialsSignIn={handleCredentialsSignIn}
                                        isLoading={isLoading}
                                    />
                                ) : (
                                    <SignupForm
                                        handleSignUp={handleSignUp}
                                        isLoading={isLoading}
                                    />
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* OR Divider */}
                        <div className="my-6 relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-transparent text-gray-500">OR</span>
                            </div>
                        </div>

                        {/* Google Login */}
                        <Button
                            variant="outline"
                            className="w-full py-6 bg-white border-gray-300 hover:bg-gray-50"
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                        >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
                            </svg>
                            Continue with Google
                        </Button>

                        {errorMsg && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg"
                            >
                                {errorMsg}
                            </motion.p>
                        )}

                        <div className="mt-6 text-center text-sm text-gray-600">
                            {activeTab === 'login' ? (
                                <p>
                                    Don't have an account?{' '}
                                    <button
                                        onClick={() => setActiveTab('signup')}
                                        className="text-[#003366] font-medium hover:underline"
                                    >
                                        Sign up
                                    </button>
                                </p>
                            ) : (
                                <p>
                                    Already have an account?{' '}
                                    <button
                                        onClick={() => setActiveTab('login')}
                                        className="text-[#003366] font-medium hover:underline"
                                    >
                                        Sign in
                                    </button>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const LoginForm = ({ handleCredentialsSignIn, isLoading }) => (
    <form onSubmit={handleCredentialsSignIn} className="space-y-6">
        <div className="space-y-2">
            <Label className="text-gray-700 font-medium">Email</Label>
            <Input
                name="email"
                type="email"
                required
                className="py-5 px-4 bg-white border-gray-300 focus:border-[#003366]"
                placeholder="you@example.com"
            />
        </div>

        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <Label className="text-gray-700 font-medium">Password</Label>
                <a href="#" className="text-sm text-[#003366] hover:underline">Forgot password?</a>
            </div>
            <Input
                name="password"
                type="password"
                required
                className="py-5 px-4 bg-white border-gray-300 focus:border-[#003366]"
                placeholder="••••••••"
            />
        </div>

        <Button
            type="submit"
            className="w-full py-5 bg-[#003366] hover:bg-[#002244] text-white"
            disabled={isLoading}
        >
            {isLoading ? (
                <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                </div>
            ) : (
                "Sign In"
            )}
        </Button>
    </form>
);

const SignupForm = ({ handleSignUp, isLoading }) => (
    <form onSubmit={handleSignUp} className="space-y-6">
        <div className="space-y-2">
            <Label className="text-gray-700 font-medium">Full Name</Label>
            <Input
                name="name"
                type="text"
                required
                className="py-5 px-4 bg-white border-gray-300 focus:border-[#003366]"
                placeholder="John Doe"
            />
        </div>

        <div className="space-y-2">
            <Label className="text-gray-700 font-medium">Email</Label>
            <Input
                name="email"
                type="email"
                required
                className="py-5 px-4 bg-white border-gray-300 focus:border-[#003366]"
                placeholder="you@example.com"
            />
        </div>

        <div className="space-y-2">
            <Label className="text-gray-700 font-medium">Password</Label>
            <Input
                name="password"
                type="password"
                required
                className="py-5 px-4 bg-white border-gray-300 focus:border-[#003366]"
                placeholder="••••••••"
            />
            <p className="text-xs text-gray-500 mt-1">Minimum 8 characters with at least one number</p>
        </div>

        <div className="space-y-2">
            <Label className="text-gray-700 font-medium">Confirm Password</Label>
            <Input
                name="confirmPassword"
                type="password"
                required
                className="py-5 px-4 bg-white border-gray-300 focus:border-[#003366]"
                placeholder="••••••••"
            />
        </div>

        <Button
            type="submit"
            className="w-full py-5 bg-[#003366] hover:bg-[#002244] text-white"
            disabled={isLoading}
        >
            {isLoading ? (
                <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                </div>
            ) : (
                "Create Account"
            )}
        </Button>
    </form>
);

export default AuthDialog;