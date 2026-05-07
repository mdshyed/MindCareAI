import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AssessmentComponent from '@/components/assessment/Assessment'
import { Brain } from 'lucide-react'

export default function Assessment() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />
            <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12 max-w-2xl mx-auto w-full">
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg shadow-pink-200 mb-5">
                        <Brain className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                        Wellness <span className="gradient-text">Assessment</span>
                    </h1>
                    <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                        8 quick questions to help you understand your current mental health. Honest answers give you the most helpful results.
                    </p>
                </div>
                <AssessmentComponent />
            </main>
            <Footer />
        </div>
    )
}
