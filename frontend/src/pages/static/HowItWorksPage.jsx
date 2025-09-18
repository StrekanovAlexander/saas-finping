import { UserPlus, BarChart2, Mail } from "lucide-react";

function HowItWorksPage() {
    const steps = [
        {
            icon: <UserPlus className="h-10 w-10 text-teal-600" />,
            title: "Sign Up",
            text: "Enter any email you prefer — no extra data required. We care about your privacy and keep it simple.",
        },
        {
            icon: <BarChart2 className="h-10 w-10 text-teal-600" />,
            title: "Set Your Tracking",
            text: "Pick an asset, define your price threshold, and let the system monitor the market for you.",
        },
        {
            icon: <Mail className="h-10 w-10 text-teal-600" />,
            title: "Get Notified",
            text: "Once the price crosses your set level, you’ll instantly receive an alert right in your inbox.",
        },
    ];

    return (
        <section className="bg-gray-50 py-20">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
                    How It Works
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition"
                        >
                            {step.icon}
                            <h3 className="text-xl font-semibold mt-4 mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HowItWorksPage;