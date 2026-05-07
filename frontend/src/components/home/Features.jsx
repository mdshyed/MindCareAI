import { Link } from 'react-router-dom'
import { MessageCircle, Brain, Users, FileText, Phone, HeartPulse } from 'lucide-react'

const features = [
    {
        icon: MessageCircle,
        title: 'AI Chatbot',
        description: 'Talk to our empathetic AI anytime. Get instant support, coping strategies, and a safe space to express yourself.',
        to: '/chatbot',
        gradient: 'from-purple-500 to-violet-600',
        bg: 'bg-purple-50',
    },
    {
        icon: Brain,
        title: 'Self-Assessment',
        description: 'Understand your mental health with our guided wellness questionnaire and personalized insights.',
        to: '/assessment',
        gradient: 'from-pink-500 to-rose-500',
        bg: 'bg-pink-50',
    },
    {
        icon: FileText,
        title: 'Resources Library',
        description: 'Access meditation guides, breathing exercises, coping strategies and self-help content.',
        to: '/resources',
        gradient: 'from-blue-500 to-cyan-500',
        bg: 'bg-blue-50',
    },
    {
        icon: Users,
        title: 'Community Wall',
        description: 'Connect with peers anonymously, share your journey and give or receive peer support.',
        to: '/community',
        gradient: 'from-emerald-500 to-teal-500',
        bg: 'bg-emerald-50',
    },
    {
        icon: Phone,
        title: 'Book Counseling',
        description: 'Request one-on-one sessions with verified, professional mental health counselors.',
        to: '/counseling',
        gradient: 'from-orange-500 to-amber-500',
        bg: 'bg-orange-50',
    },
    {
        icon: HeartPulse,
        title: 'Emergency Help',
        description: 'Immediate access to crisis hotlines and grounding techniques when you need them most.',
        to: '/emergency',
        gradient: 'from-red-500 to-pink-600',
        bg: 'bg-red-50',
    },
]

export default function Features() {
    return (
        <section className="px-4 sm:px-6 lg:px-8 py-24 bg-gradient-to-b from-white to-muted/30">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="inline-block text-sm font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4">
                        Everything You Need
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                        Comprehensive <span className="gradient-text">Mental Health Support</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        All the tools for your wellness journey, thoughtfully designed and always available.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature) => {
                        const Icon = feature.icon
                        return (
                            <Link key={feature.title} to={feature.to} className="group block">
                                <div className="h-full p-6 rounded-2xl border border-border bg-white hover:border-primary/30 hover:shadow-xl hover:shadow-primary/8 hover:-translate-y-1 transition-all duration-300">
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                                    <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                        Explore <span aria-hidden>→</span>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
