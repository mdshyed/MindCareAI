import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ChatbotComponent from '@/components/chatbot/Chatbot'
import { Bot, Shield } from 'lucide-react'

export default function Chatbot() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />
            <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12 max-w-3xl mx-auto w-full">
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary shadow-lg shadow-primary/30 mb-5">
                        <Bot className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                        AI <span className="gradient-text">Mental Health Chat</span>
                    </h1>
                    <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                        A safe, private space to share what's on your mind. Our AI listens without judgment and offers supportive guidance.
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                        <Shield className="w-3.5 h-3.5 text-primary" />
                        <span>Conversations are private and not stored</span>
                    </div>
                </div>
                <ChatbotComponent />
            </main>
            <Footer />
        </div>
    )
}
