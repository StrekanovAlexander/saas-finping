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
        <div>
            <section className="bg-gray-50 py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
                        How It Works
                    </h1>
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
            <section className="bg-gray-50">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12">
                        Recommended Tools
                    </h2>
                    <div className="flex flex-col md:flex-row justify-center gap-8">

                        {/* PhotoSweep */}
                        <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center max-w-md hover:shadow-lg transition">
                            <img src="https://www.next-step.expert/images/svg/widgets.svg" alt="PhotoSweep icon" className="w-16 h-16 mb-4" />
                            
                            <h3 className="text-xl font-semibold mt-2 mb-2">
                                PhotoSweep — Image Organizer for Windows
                            </h3>
                            
                            <p className="text-gray-600 mb-6">
                                Organize large image libraries, detect duplicate images, and manage files safely with fast filtering and preview tools.
                            </p>
                            
                            <a 
                                href="https://www.next-step.expert/tools/photosweep" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
                            >
                                Get PhotoSweep
                            </a>
                        </div>

                        {/* AI File Analyzer */}
                        <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center max-w-md hover:shadow-lg transition">
                            <img src="https://www.next-step.expert/images/svg/hub.svg" alt="AI File Analyzer icon" className="w-16 h-16 mb-4" />
                            
                            <h3 className="text-xl font-semibold mt-2 mb-2">
                                AI File Analyzer — Local Document Intelligence Tool
                            </h3>
                            
                            <p className="text-gray-600 mb-6">
                                Analyze entire folders of documents using a local AI model. Extract topics, summaries, keywords, and key insights from files completely offline with full privacy.
                            </p>
                            
                            <a 
                                href="https://www.next-step.expert/tools/ai-file-analyzer" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                            >
                                Get AI File Analyzer
                            </a>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}

export default HowItWorksPage;