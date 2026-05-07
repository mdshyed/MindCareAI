import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ResourcesComponent from '@/components/resources/Resources'
import { BookOpen } from 'lucide-react'

export default function Resources() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />
            <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12 max-w-5xl mx-auto w-full">
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-200 mb-5">
                        <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                        Wellness <span className="gradient-text">Resources</span>
                    </h1>
                    <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                        Curated meditation guides, breathing exercises, and coping strategies — all in one place.
                    </p>
                </div>
                <ResourcesComponent />
            </main>
            <Footer />
        </div>
    )
}
