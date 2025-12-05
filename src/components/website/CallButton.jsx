import React from 'react'
import { Phone } from 'lucide-react'

function CallButton() {
    return (
        <a
            href="tel:7696000201"
            className="w-[95vw] sm:hidden fixed mx-auto left-3 bottom-2 bg-blue-900 text-white z-50 flex items-center justify-center py-3 rounded-full shadow-md"
        >
            <p className="text-xl font-bold flex items-center justify-center">
                <span className="inline mr-3"><Phone /></span>
                Call us now
            </p>
        </a>
    )
}

export default CallButton
