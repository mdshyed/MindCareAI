import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CounselingComponent from '@/components/counseling/Counseling'
import { UserCheck } from 'lucide-react'

export default function Counseling() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />
            <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12 max-w-3xl mx-auto w-full">
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-200 mb-5">
                        <UserCheck className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                        Book a <span className="gradient-text">Counseling Session</span>
                    </h1>
                    <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                        Connect with a verified professional mental health counselor for personalized one-on-one support.
                    </p>
                </div>
                <CounselingComponent />
            </main>
            <Footer />
        </div>
    )
}
