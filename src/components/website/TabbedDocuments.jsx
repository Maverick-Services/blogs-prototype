"use client"
import { useState } from 'react';

const TabbedDocuments = () => {
    const tabs = [
        {
            title: "Private Limited Company",
            documents: [
                "Certificate of Incorporation",
                "PAN card of Company",
                "Articles of Association (AOA)",
                "Memorandum of Association (MOA)",
                "Resolution signed by board members",
            ],
        },
        {
            title: "Limited Liability Partnership (LLP)",
            documents: [
                "LLP Agreement",
                "PAN Card of LLP",
                "Certificate of Incorporation",
                "Partners' address and ID proof",
                "Digital Signature",
            ],
        },
        {
            title: "Sole Proprietorship",
            documents: [
                "PAN Card",
                "Aadhar Card",
                "Bank Account Proof",
                "Utility Bill or Rent Agreement",
            ],
        },
        {
            title: "One Person Company (OPC)",
            documents: [
                "Certificate of Incorporation",
                "PAN Card of Company",
                "MOA and AOA",
                "Nominee's consent form",
                "Director's ID and address proof",
                "Digital Signature",
            ],
        },
    ];

    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="w-full bg-gradient-to-br from-white to-[#f0f7ff] rounded-md overflow-hidden border border-[#00336620]">
            <div className="flex flex-col md:flex-row">
                {/* Tabs Column - Beautiful vertical tabs */}
                <div className="bg-[#f5f9ff] w-full md:w-64 border-r border-[#00336610] p-4">
                    <div className="text-[#003366] font-bold text-lg mb-4 pl-2">Services</div>
                    <div className="space-y-2">
                        {tabs.map((tab, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveTab(index)}
                                className={`
                                    w-full text-left px-4 py-3 rounded-xl transition-all duration-300
                                    flex items-center
                                    ${activeTab === index
                                        ? 'bg-[#003366] text-white shadow-lg transform -translate-x-1'
                                        : 'bg-white text-[#003366] hover:bg-[#e6f0ff] border border-[#00336620]'
                                    }
                                `}
                            >
                                <div className={`w-2 h-2 rounded-full mr-3 ${activeTab === index ? 'bg-white' : 'bg-[#003366]'}`}></div>
                                {tab.title}
                            </button>
                        ))}
                    </div>

                    {/* <div className="mt-6 bg-gradient-to-r from-[#003366] to-[#0055aa] rounded-xl p-4 text-white">
                        <div className="font-bold text-sm mb-1">Need Assistance?</div>
                        <div className="text-xs opacity-90 mb-2">We can help you gather all required documents</div>
                        <button className="bg-white text-[#003366] text-sm font-medium py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all mt-1">
                            Contact Support
                        </button>
                    </div> */}
                </div>

                {/* Documents Content */}
                <div className="flex-1 p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
                        <div>
                            <h2 className="text-2xl font-bold text-[#003366]">
                                Required Documents
                            </h2>
                            <div className="text-[#0055aa] mt-1">{tabs[activeTab].title}</div>
                        </div>
                        <div className="bg-[#e6f0ff] text-[#003366] px-3 py-1 rounded-full text-sm font-medium">
                            {tabs[activeTab].documents.length} documents
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {tabs[activeTab].documents.map((doc, i) => (
                            <div
                                key={i}
                                className="flex items-center p-4 bg-white rounded-xl border border-[#00336610] hover:border-[#00336650] transition-all shadow-sm hover:shadow-md"
                            >
                                <div className="bg-[#e6f0ff] text-[#003366] p-2 rounded-lg mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium text-gray-800">{doc}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-[#00336610] pt-5">
                        <div className="text-sm text-gray-500">
                            Get any service in just one click...
                        </div>
                        <button className="bg-[#003366] hover:bg-[#002244] text-white font-medium py-2 px-6 rounded-lg transition-all flex items-center">
                            Get Service
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TabbedDocuments;