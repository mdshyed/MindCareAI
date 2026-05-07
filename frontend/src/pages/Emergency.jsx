import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EmergencyComponent from '@/components/emergency/Emergency'
import { HeartPulse } from 'lucide-react'

export default function Emergency() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />
            <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12 max-w-5xl mx-auto w-full">
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-200 mb-5">
                        <HeartPulse className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                        Crisis <span className="text-red-500">Support</span>
                    </h1>
                    <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                        Help is always available. You are not alone, and reaching out is the bravest thing you can do.
                    </p>
                </div>
                <EmergencyComponent />
            </main>
            <Footer />
        </div>
    )
}
