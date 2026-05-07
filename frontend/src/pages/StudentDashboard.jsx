import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, BookOpen, Clock, AlertCircle, Loader } from 'lucide-react'
import { Link } from 'react-router-dom'
import api from '@/lib/api'
import { useAuth } from '@/context/AuthContext'

export default function StudentDashboard() {
    const { user } = useAuth()
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/appointment/my')
            .then(({ data }) => {
                if (data.success) setAppointments(data.data)
            })
            .catch(() => toast.error('Failed to load appointments.'))
            .finally(() => setLoading(false))
    }, [])

    const getStatusStyle = (status) => {
        if (status === 'approved') return 'text-green-600 bg-green-100'
        if (status === 'rejected') return 'text-red-600 bg-red-100'
        if (status === 'completed') return 'text-blue-600 bg-blue-100'
        return 'text-yellow-600 bg-yellow-100'
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />
            <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto w-full">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground">
                        Welcome back, <span className="gradient-text">{user?.name}</span>
                    </h1>
                    <p className="text-muted-foreground mt-2">Here is an overview of your wellness journey.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <Link to="/counseling">
                        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-primary/20 bg-card/50 backdrop-blur h-full">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-lg font-medium">Book Counseling</CardTitle>
                                <Calendar className="w-5 h-5 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Schedule a session with our professionals.</p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link to="/resources">
                        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-primary/20 bg-card/50 backdrop-blur h-full">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-lg font-medium">Resources</CardTitle>
                                <BookOpen className="w-5 h-5 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Access articles, videos, and self-help guides.</p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link to="/assessment">
                        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-primary/20 bg-card/50 backdrop-blur h-full">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-lg font-medium">Self Assessment</CardTitle>
                                <Clock className="w-5 h-5 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Take a quick check-in on your mental health.</p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-foreground">My Appointments</h2>

                    {loading ? (
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Loader className="w-5 h-5 animate-spin" /> Loading appointments...
                        </div>
                    ) : appointments.length === 0 ? (
                        <Card className="p-8 text-center text-muted-foreground">
                            <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p>No appointments booked yet.</p>
                            <Button asChild className="mt-4" variant="outline">
                                <Link to="/counseling">Book Now</Link>
                            </Button>
                        </Card>
                    ) : (
                        <div className="grid gap-4">
                            {appointments.map((apt) => (
                                <Card key={apt._id} className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                    <div className="flex gap-4 items-start">
                                        <div className="p-3 rounded-full bg-primary/10">
                                            <Calendar className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">{apt.counselorId?.name || 'Counselor'}</h4>
                                            <p className="text-sm text-muted-foreground">{apt.counselorId?.speciality || 'Mental Health Counselor'}</p>
                                            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                                <span>{new Date(apt.date).toLocaleDateString()}</span>
                                                <span>•</span>
                                                <span>{apt.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getStatusStyle(apt.status)}`}>
                                        {apt.status}
                                    </span>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

            </main>
            <Footer />
        </div>
    )
}
