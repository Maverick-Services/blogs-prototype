import React from 'react'

export const ContactForm = () => {
    return (
        <div className="w-full bg-primary rounded-3xl p-6 py-4 shadow-lg">
            <h3 className="text-3xl italic font-bold text-white mb-4">Contact Us</h3>
            <form className="space-y-3">
                <input
                    type="text"
                    placeholder="Name"
                    className="w-full py-3 px-4 rounded-lg focus:outline-none bg-[#F1F3F5]"
                />
                <input
                    type="tel"
                    placeholder="Phone No"
                    className="w-full py-3 px-4 rounded-lg focus:outline-none bg-[#F1F3F5]"
                />
                <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full py-3 px-4 rounded-lg focus:outline-none bg-[#F1F3F5]"
                />
                <textarea
                    rows={4}
                    placeholder="Description"
                    className="w-full py-3 px-4 rounded-lg focus:outline-none bg-[#F1F3F5]"
                />
                <button
                    type="submit"
                    className="mt-2 w-full bg-accent text-white py-3 rounded-lg font-bold hover:opacity-90 transition"
                >
                    Send Message
                </button>
            </form>
        </div>
    )
}
