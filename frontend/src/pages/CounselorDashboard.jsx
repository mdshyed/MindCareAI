import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, User, Clock, CheckCircle2, XCircle, Loader } from 'lucide-react'
import api from '@/lib/api'
import { useAuth } from '@/context/AuthContext'

export default function CounselorDashboard() {
    const { user } = useAuth()
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/appointment/counselor')
            .then(({ data }) => {
                if (data.success) setAppointments(data.data)
            })
            .catch(() => toast.error('Failed to load appointments.'))
            .finally(() => setLoading(false))
    }, [])

    const handleStatusUpdate = async (id, status) => {
        try {
            const { data } = await api.patch(`/appointment/${id}/status`, { status })
            if (data.success) {
                setAppointments(appointments.map(apt => apt._id === id ? { ...apt, status } : apt))
                toast.success(`Appointment marked as ${status}.`)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update status.')
        }
    }

    const getStatusStyle = (status) => {
        if (status === 'approved') return 'bg-green-100 text-green-700'
        if (status === 'rejected') return 'bg-red-100 text-red-700'
        if (status === 'completed') return 'bg-blue-100 text-blue-700'
        return 'bg-yellow-100 text-yellow-700'
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />
            <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto w-full">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground">
                        Counselor <span className="gradient-text">Dashboard</span>
                    </h1>
                    <p className="text-muted-foreground mt-2">Welcome back, {user?.name}. Manage your appointments below.</p>
                </div>

                {user?.role === 'counselor' && !user?.isApproved && (
                    <Card className="border-yellow-500/50 bg-yellow-500/10 mb-6">
                        <CardContent className="flex items-center gap-4 p-4">
                            <div className="p-2 rounded-full bg-yellow-500/20 text-yellow-600">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-yellow-700">Account Pending Approval</h3>
                                <p className="text-yellow-600/90 text-sm">
                                    Your account is under review. You will not receive appointment requests until an admin approves your credentials.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <Card className="border-primary/20 bg-card/50 backdrop-blur">
                    <CardHeader>
                        <CardTitle>Appointment Requests</CardTitle>
                        <CardDescription>Review and manage upcoming sessions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="flex items-center justify-center gap-2 py-12 text-muted-foreground">
                                <Loader className="w-5 h-5 animate-spin" /> Loading appointments...
                            </div>
                        ) : appointments.length === 0 ? (
                            <p className="text-muted-foreground text-center py-12">No appointments assigned yet.</p>
                        ) : (
                            <div className="space-y-4">
                                {appointments.map((apt) => (
                                    <div key={apt._id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors gap-4">
                                        <div className="flex gap-4 items-start">
                                            <div className="p-3 rounded-full bg-primary/10 mt-1">
                                                <User className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-lg">{apt.userId?.name || 'Student'}</h4>
                                                <p className="text-sm text-muted-foreground">{apt.userId?.email}</p>
                                                <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {new Date(apt.date).toLocaleDateString()}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4" /> {apt.time}
                                                    </span>
                                                </div>
                                                <div className="mt-2 text-sm bg-muted/50 p-2 rounded">
                                                    <span className="font-medium">Concern: </span>{apt.concern}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-3 min-w-[140px]">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getStatusStyle(apt.status)}`}>
                                                {apt.status}
                                            </span>

                                            {apt.status === 'pending' && (
                                                <div className="flex gap-2">
                                                    <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50"
                                                        onClick={() => handleStatusUpdate(apt._id, 'approved')}>
                                                        <CheckCircle2 className="w-4 h-4 mr-1" /> Approve
                                                    </Button>
                                                    <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50"
                                                        onClick={() => handleStatusUpdate(apt._id, 'rejected')}>
                                                        <XCircle className="w-4 h-4 mr-1" /> Reject
                                                    </Button>
                                                </div>
                                            )}

                                            {apt.status === 'approved' && (
                                                <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50"
                                                    onClick={() => handleStatusUpdate(apt._id, 'completed')}>
                                                    <CheckCircle2 className="w-4 h-4 mr-1" /> Mark Complete
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

            </main>
            <Footer />
        </div>
    )
}
