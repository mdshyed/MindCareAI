import { Card } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'

const testimonials = [
    {
        name: 'Priya S.',
        role: 'Computer Science, 3rd Year',
        content: "MindCareAI's resources helped me get through exam season without breaking down. The AI chat is surprisingly warm and helpful.",
        rating: 5,
        color: 'from-purple-400 to-violet-500',
    },
    {
        name: 'Arjun M.',
        role: 'Medical Student',
        content: "I was skeptical at first but this platform genuinely listens. The community made me feel less alone during a really hard semester.",
        rating: 5,
        color: 'from-pink-400 to-rose-500',
    },
    {
        name: 'Sana K.',
        role: 'Engineering Graduate',
        content: 'The AI chatbot is incredibly helpful for processing my thoughts at 2am when I cannot sleep. It never judges.',
        rating: 5,
        color: 'from-blue-400 to-cyan-500',
    },
    {
        name: 'Rahul T.',
        role: 'Design Student',
        content: 'Booking a counseling session was so seamless. I finally took the step I needed. Highly recommend to every student.',
        rating: 5,
        color: 'from-emerald-400 to-teal-500',
    },
    {
        name: 'Nisha D.',
        role: 'MBA Student',
        content: 'The self-assessment helped me understand my anxiety triggers. The daily breathing exercises have become a ritual I look forward to.',
        rating: 5,
        color: 'from-orange-400 to-amber-500',
    },
    {
        name: 'Dev R.',
        role: 'Psychology Honours',
        content: 'Even as a psychology student, I find this platform valuable. The resources are evidence-based and the counselors are professional.',
        rating: 5,
        color: 'from-indigo-400 to-purple-500',
    },
]

export default function Testimonials() {
    return (
        <section className="px-4 sm:px-6 lg:px-8 py-24 relative overflow-hidden bg-gradient-to-b from-muted/30 to-white">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/4 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-block text-sm font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4">
                        Real Stories
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                        Students Love <span className="gradient-text">MindCareAI</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">Thousands of students on their wellness journey</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((t, index) => (
                        <Card key={index} className="p-6 border-border bg-white hover:border-primary/30 hover:shadow-xl hover:shadow-primary/8 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                            {/* Subtle top gradient bar */}
                            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${t.color}`} />

                            <Quote className="w-8 h-8 text-primary/20 mb-3" />

                            <div className="flex gap-1 mb-4">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                ))}
                            </div>

                            <p className="text-foreground mb-6 leading-relaxed text-sm">"{t.content}"</p>

                            <div className="flex items-center gap-3 pt-4 border-t border-border">
                                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground text-sm">{t.name}</p>
                                    <p className="text-xs text-muted-foreground">{t.role}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
