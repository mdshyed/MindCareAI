import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CommunityComponent from '@/components/community/Community'
import { Users } from 'lucide-react'

export default function Community() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />
            <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12 max-w-2xl mx-auto w-full">
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-200 mb-5">
                        <Users className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                        Community <span className="gradient-text">Wall</span>
                    </h1>
                    <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                        A safe space to share your journey, celebrate wins, and support others — always anonymous.
                    </p>
                </div>
                <CommunityComponent />
            </main>
            <Footer />
        </div>
    )
}
