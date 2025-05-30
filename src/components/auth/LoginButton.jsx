"use client"
// components/auth/loginButton.jsx
import React, { useState } from 'react'
import AuthDialog from './LoginDialog';
import { Button } from '../ui/button';

function LoginButton() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <div>
            <Button onClick={() => setIsDialogOpen(true)}>Login</Button>
            <AuthDialog
                onOpenChange={setIsDialogOpen}
                open={isDialogOpen}
            />

        </div>
    )
}

export default LoginButton
