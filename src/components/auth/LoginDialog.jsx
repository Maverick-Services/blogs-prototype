// components/auth/LoginDialog.jsx
import React from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog";

function LoginDialog({ open, onOpenChange }) {
    return (
        <div>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            Login
                        </DialogTitle>
                    </DialogHeader>

                    <div>
                        {/* Email/Password Form */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                signIn("credentials", {
                                    email: formData.get("email"),
                                    password: formData.get("password"),
                                    callbackUrl: "/admin"
                                });
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <Label>Email</Label>
                                <Input name="email" type="email" required />
                            </div>
                            <div>
                                <Label>Password</Label>
                                <Input name="password" type="password" required />
                            </div>
                            <Button type="submit" className="w-full">
                                Sign In
                            </Button>
                        </form>

                        {/* OR Divider */}
                        <div className="my-6 relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">OR</span>
                            </div>
                        </div>

                        {/* Google Login */}
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => signIn("google", { callbackUrl: "/" })}
                        >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
                            </svg>
                            Continue with Google
                        </Button>

                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default LoginDialog
