import { Link } from 'react-router-dom'
import { Heart, Mail, Shield } from 'lucide-react'

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="bg-gradient-to-b from-muted/20 to-muted/40 border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 rounded-xl bg-gradient-primary shadow-md">
                                <Heart className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-bold text-lg gradient-text">MindCareAI</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            Supporting student mental wellness with AI, professional counselors, and a caring community.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Shield className="w-3.5 h-3.5 text-primary" />
                            <span>100% Private & Secure</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-5 text-foreground">Platform</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/chatbot" className="text-muted-foreground hover:text-primary transition-colors">AI Chat</Link></li>
                            <li><Link to="/assessment" className="text-muted-foreground hover:text-primary transition-colors">Self-Assessment</Link></li>
                            <li><Link to="/resources" className="text-muted-foreground hover:text-primary transition-colors">Resources</Link></li>
                            <li><Link to="/community" className="text-muted-foreground hover:text-primary transition-colors">Community</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-semibold mb-5 text-foreground">Support</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/counseling" className="text-muted-foreground hover:text-primary transition-colors">Book Counseling</Link></li>
                            <li><Link to="/emergency" className="text-muted-foreground hover:text-primary transition-colors">Emergency Help</Link></li>
                            <li>
                                <a href="mailto:help@mindcareai.com" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                                    <Mail className="w-3.5 h-3.5" /> Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Account */}
                    <div>
                        <h3 className="font-semibold mb-5 text-foreground">Account</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/register" className="text-muted-foreground hover:text-primary transition-colors">Create Account</Link></li>
                            <li><Link to="/login" className="text-muted-foreground hover:text-primary transition-colors">Sign In</Link></li>
                            <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <p>© {year} MindCareAI. All rights reserved.</p>
                    <p className="flex items-center gap-1.5">
                        Made with <Heart className="w-3.5 h-3.5 text-primary fill-primary" /> for student wellbeing
                    </p>
                </div>
            </div>
        </footer>
    )
}
