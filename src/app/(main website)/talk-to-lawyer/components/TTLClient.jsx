import WebsiteLayout from '@/components/website/WebsiteLayout';
import React from 'react';
import TTLHeader from './TTLHeader';
import TTLExpertise from './TTLExpertise';
import TTLPlansMain from './TTLPlansMain';

export default function TTLClient({ services, categories, callPlans }) {

    const plans = callPlans ? callPlans : []

    return (
        <WebsiteLayout services={services} categories={categories}>
            <div className="min-h-screen bg-gradient-to-b from-[#f0f7ff] to-[#e6f2ff] scroll-smooth">
                <TTLHeader />
                <TTLExpertise />
                {/* Consultation Plans */}
                <TTLPlansMain plans={plans} />
            </div>
        </WebsiteLayout>
    );
}
