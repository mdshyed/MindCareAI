import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, ShieldCheck, Clock } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function Hero() {
    const { user } = useAuth()

    return (
        <section className="relative px-4 sm:px-6 lg:px-8 py-24 md:py-36 overflow-hidden">
            {/* Background blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-[120px] animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent/30 rounded-full blur-[80px]" />
            </div>

            <div className="relative max-w-5xl mx-auto text-center z-10">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-full px-5 py-2 mb-8 animate-float shadow-sm">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold gradient-text">AI-Powered Mental Wellness</span>
                </div>

                {/* Headline */}
                <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
                    Your Mind Deserves<br />
                    <span className="gradient-text">the Best Care</span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                    A safe, private space for students to talk, heal, and grow — with AI support,
                    professional counselors, and a caring community by your side.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
                    {user ? (
                        <Link to="/chatbot">
                            <Button size="lg" className="gap-2 bg-gradient-primary text-white hover:opacity-90 shadow-lg shadow-primary/30 px-8 text-base w-full sm:w-auto">
                                Start AI Chat <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>
                    ) : (
                        <Link to="/register">
                            <Button size="lg" className="gap-2 bg-gradient-primary text-white hover:opacity-90 shadow-lg shadow-primary/30 px-8 text-base w-full sm:w-auto">
                                Get Started Free <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>
                    )}
                    <Link to="/resources">
                        <Button size="lg" variant="outline" className="px-8 text-base border-primary/30 hover:bg-primary/5 w-full sm:w-auto">
                            Explore Resources
                        </Button>
                    </Link>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap justify-center gap-6 mb-16 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-primary" />
                        <span>100% Anonymous & Private</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>Available 24/7</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span>Powered by Llama AI</span>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm rounded-2xl p-6 border border-primary/15 hover:border-primary/40 transition-colors">
                        <div className="text-4xl font-bold gradient-text mb-1">50K+</div>
                        <p className="text-sm text-muted-foreground">Students Supported</p>
                    </div>
                    <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 backdrop-blur-sm rounded-2xl p-6 border border-secondary/15 hover:border-secondary/40 transition-colors">
                        <div className="text-4xl font-bold gradient-text mb-1">98%</div>
                        <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
                    </div>
                    <div className="bg-gradient-to-br from-primary/5 to-secondary/10 backdrop-blur-sm rounded-2xl p-6 border border-primary/15 hover:border-primary/40 transition-colors">
                        <div className="text-4xl font-bold gradient-text mb-1">200+</div>
                        <p className="text-sm text-muted-foreground">Certified Counselors</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
