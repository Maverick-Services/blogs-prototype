import React from 'react'
import WebsiteLayout from '@/components/website/WebsiteLayout'

function layout({ children }) {
    return (
        <WebsiteLayout>
            {children}
        </WebsiteLayout>
    )
}

export default layout;