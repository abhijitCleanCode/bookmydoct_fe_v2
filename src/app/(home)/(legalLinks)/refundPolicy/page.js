export default function RefundPolicy() {
    return (
        <section className="w-full flex justify-center items-center">
            <div className="container mx-auto p-6 sm:p-12 max-w-4xl">
                <div className="text-center border-b border-gray-200 pb-8">
                    <h1 className="text-4xl font-bold text-primary mb-4">Refund Policy</h1>
                    <p className="text-gray-600 italic">Last updated: 06/02/2025</p>
                </div>

                <div className="space-y-5 mt-5">
                    <div className="hover:bg-blue-50 p-6 rounded-xl transition-colors duration-300">
                        <h2 className="text-2xl font-semibold text-primary mb-4">1. No Refunds</h2>
                        <p className="text-gray-700 leading-relaxed">
                            All payments made to BookMyDoct are final. We do not offer refunds for any products, services, or subscriptions once payment has been processed.
                        </p>
                    </div>

                    <div className="hover:bg-blue-50 p-6 rounded-xl transition-colors duration-300">
                        <h2 className="text-2xl font-semibold text-primary mb-4">2. Exceptions</h2>
                        <p className="text-gray-700 leading-relaxed">
                            In rare cases where there may be a billing error or technical issue, we may review the situation. However, refunds are not guaranteed and are assessed on a case-by-case basis at the sole discretion of Indian Cyber Excellence Institute.
                        </p>
                    </div>

                    <div className="hover:bg-blue-50 p-6 rounded-xl transition-colors duration-300">
                        <h2 className="text-2xl font-semibold text-primary mb-4">3. Contact Us</h2>
                        <p className="text-gray-700 leading-relaxed">
                            If you believe there has been a billing error or if you have questions about our refund policy, please contact us. We are here to assist and clarify any concerns you may have.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}