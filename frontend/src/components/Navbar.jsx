import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Heart } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import ProfileDropdown from './ProfileDropdown'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const { user } = useAuth()
    const location = useLocation()

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/'
        return location.pathname.startsWith(path)
    }

    const linkClass = (path) =>
        `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            isActive(path)
                ? 'bg-gradient-primary text-white'
                : 'text-foreground hover:bg-gradient-primary hover:text-white'
        }`

    const mobileLinkClass = (path) =>
        `block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            isActive(path)
                ? 'bg-gradient-primary text-white'
                : 'text-foreground hover:bg-gradient-primary hover:text-white'
        }`

    return (
        <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    <Link to="/" className="flex items-center gap-2 font-bold text-xl" onClick={() => setIsOpen(false)}>
                        <div className="p-2 rounded-lg bg-gradient-primary">
                            <Heart className="w-5 h-5 text-white" />
                        </div>
                        <span className="gradient-text">MindCareAI</span>
                    </Link>

                    {/* Desktop */}
                    <div className="hidden md:flex gap-1 items-center">
                        <Link to="/" className={linkClass('/')}>Home</Link>
                        <Link to="/resources" className={linkClass('/resources')}>Resources</Link>
                        <Link to="/community" className={linkClass('/community')}>Community</Link>
                        <Link to="/emergency" className={linkClass('/emergency')}>Emergency</Link>

                        {user && (
                            <>
                                <Link to="/chatbot" className={linkClass('/chatbot')}>AI Chat</Link>
                                <Link to="/assessment" className={linkClass('/assessment')}>Assessment</Link>
                            </>
                        )}

                        {user?.role === 'student' && (
                            <>
                                <Link to="/counseling" className={linkClass('/counseling')}>Counseling</Link>
                                <Link to="/student-dashboard" className={linkClass('/student-dashboard')}>Dashboard</Link>
                            </>
                        )}

                        {user?.role === 'counselor' && (
                            <Link to="/counselor-dashboard" className={linkClass('/counselor-dashboard')}>Dashboard</Link>
                        )}

                        {user?.role === 'admin' && (
                            <Link to="/admin" className={linkClass('/admin')}>Admin</Link>
                        )}

                        {user ? (
                            <ProfileDropdown />
                        ) : (
                            <Link to="/login" className="ml-2 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-primary text-white hover:opacity-90 transition-opacity">
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile toggle */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile menu */}
                {isOpen && (
                    <div className="md:hidden pb-4 pt-2 space-y-1 border-t border-border">
                        <Link to="/" className={mobileLinkClass('/')} onClick={() => setIsOpen(false)}>Home</Link>
                        <Link to="/resources" className={mobileLinkClass('/resources')} onClick={() => setIsOpen(false)}>Resources</Link>
                        <Link to="/community" className={mobileLinkClass('/community')} onClick={() => setIsOpen(false)}>Community</Link>
                        <Link to="/emergency" className={mobileLinkClass('/emergency')} onClick={() => setIsOpen(false)}>Emergency</Link>

                        {user && (
                            <>
                                <Link to="/chatbot" className={mobileLinkClass('/chatbot')} onClick={() => setIsOpen(false)}>AI Chat</Link>
                                <Link to="/assessment" className={mobileLinkClass('/assessment')} onClick={() => setIsOpen(false)}>Assessment</Link>
                            </>
                        )}

                        {user?.role === 'student' && (
                            <>
                                <Link to="/counseling" className={mobileLinkClass('/counseling')} onClick={() => setIsOpen(false)}>Counseling</Link>
                                <Link to="/student-dashboard" className={mobileLinkClass('/student-dashboard')} onClick={() => setIsOpen(false)}>Dashboard</Link>
                            </>
                        )}

                        {user?.role === 'counselor' && (
                            <Link to="/counselor-dashboard" className={mobileLinkClass('/counselor-dashboard')} onClick={() => setIsOpen(false)}>Dashboard</Link>
                        )}

                        {user?.role === 'admin' && (
                            <Link to="/admin" className={mobileLinkClass('/admin')} onClick={() => setIsOpen(false)}>Admin</Link>
                        )}

                        {user ? (
                            <div className="px-4 py-2">
                                <ProfileDropdown />
                            </div>
                        ) : (
                            <Link to="/login" className="block px-4 py-2 rounded-lg text-sm font-medium bg-gradient-primary text-white" onClick={() => setIsOpen(false)}>
                                Login
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </nav>
    )
}
