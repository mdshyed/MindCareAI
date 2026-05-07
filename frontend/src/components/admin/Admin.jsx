import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Users, Calendar, AlertCircle, Trash2, CheckCircle2, XCircle, Loader } from 'lucide-react'
import api from '@/lib/api'

export default function AdminComponent() {
    const [stats, setStats] = useState({ students: 0, counselors: 0, appointments: 0, pending: 0, pendingCounselors: 0 })
    const [appointments, setAppointments] = useState([])
    const [users, setUsers] = useState([])
    const [pendingCounselors, setPendingCounselors] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = useCallback(async () => {
        try {
            const [statsRes, aptRes, usersRes, pendRes] = await Promise.all([
                api.get('/admin/stats'),
                api.get('/admin/appointments'),
                api.get('/admin/users'),
                api.get('/admin/pending-counselors'),
            ])
            if (statsRes.data.success) setStats(statsRes.data.data)
            if (aptRes.data.success) setAppointments(aptRes.data.data)
            if (usersRes.data.success) setUsers(usersRes.data.data)
            if (pendRes.data.success) setPendingCounselors(pendRes.data.data)
        } catch {
            toast.error('Failed to load admin data.')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { fetchData() }, [fetchData])

    const handleDeleteUser = (id, name) => {
        toast((t) => (
            <div className="flex flex-col gap-2">
                <p className="font-medium">Delete <strong>{name}</strong>?</p>
                <p className="text-sm text-gray-500">This action cannot be undone.</p>
                <div className="flex gap-2 mt-1">
                    <button
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                        onClick={async () => {
                            toast.dismiss(t.id)
                            try {
                                const { data } = await api.delete(`/admin/user/${id}`)
                                if (data.success) {
                                    setUsers(prev => prev.filter(u => u._id !== id))
                                    fetchData()
                                    toast.success('User removed.')
                                }
                            } catch {
                                toast.error('Failed to delete user.')
                            }
                        }}
                    >Delete</button>
                    <button className="px-3 py-1 bg-gray-100 rounded text-sm" onClick={() => toast.dismiss(t.id)}>Cancel</button>
                </div>
            </div>
        ), { duration: 8000 })
    }

    const handleApproveCounselor = async (id) => {
        try {
            const { data } = await api.patch(`/admin/approve-counselor/${id}`)
            if (data.success) {
                setPendingCounselors(prev => prev.filter(c => c._id !== id))
                fetchData()
                toast.success('Counselor approved.')
            }
        } catch {
            toast.error('Failed to approve counselor.')
        }
    }

    const handleRejectCounselor = (id, name) => {
        toast((t) => (
            <div className="flex flex-col gap-2">
                <p className="font-medium">Reject <strong>{name}</strong>'s application?</p>
                <div className="flex gap-2 mt-1">
                    <button
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                        onClick={async () => {
                            toast.dismiss(t.id)
                            try {
                                const { data } = await api.delete(`/admin/reject-counselor/${id}`)
                                if (data.success) {
                                    setPendingCounselors(prev => prev.filter(c => c._id !== id))
                                    fetchData()
                                    toast.success('Application rejected.')
                                }
                            } catch {
                                toast.error('Failed to reject application.')
                            }
                        }}
                    >Reject</button>
                    <button className="px-3 py-1 bg-gray-100 rounded text-sm" onClick={() => toast.dismiss(t.id)}>Cancel</button>
                </div>
            </div>
        ), { duration: 8000 })
    }

    const getApptStatusClass = (status) => {
        if (status === 'pending') return 'bg-yellow-100 text-yellow-800'
        if (status === 'approved') return 'bg-green-100 text-green-800'
        if (status === 'rejected') return 'bg-red-100 text-red-800'
        if (status === 'completed') return 'bg-blue-100 text-blue-800'
        return ''
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center gap-2 p-16 text-muted-foreground">
                <Loader className="w-6 h-6 animate-spin" /> Loading admin dashboard...
            </div>
        )
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <Card className="p-6 border-border bg-card/50 backdrop-blur">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-muted-foreground text-sm font-medium">Total Students</p>
                            <p className="text-3xl font-bold mt-2">{stats.students}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-blue-500/10">
                            <Users className="w-6 h-6 text-blue-500" />
                        </div>
                    </div>
                </Card>

                <Card className="p-6 border-border bg-card/50 backdrop-blur">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-muted-foreground text-sm font-medium">Active Counselors</p>
                            <p className="text-3xl font-bold mt-2">{stats.counselors}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-green-500/10">
                            <Users className="w-6 h-6 text-green-500" />
                        </div>
                    </div>
                </Card>

                <Card className="p-6 border-border bg-card/50 backdrop-blur">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-muted-foreground text-sm font-medium">Total Appointments</p>
                            <p className="text-3xl font-bold mt-2">{stats.appointments}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-purple-500/10">
                            <Calendar className="w-6 h-6 text-purple-500" />
                        </div>
                    </div>
                </Card>

                <Card className="p-6 border-border bg-card/50 backdrop-blur">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-muted-foreground text-sm font-medium">Pending Requests</p>
                            <p className="text-3xl font-bold mt-2">{stats.pending}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-yellow-500/10">
                            <AlertCircle className="w-6 h-6 text-yellow-500" />
                        </div>
                    </div>
                </Card>

                <Card className="p-6 border-border bg-card/50 backdrop-blur">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-muted-foreground text-sm font-medium">Counselor Applications</p>
                            <p className="text-3xl font-bold mt-2">{stats.pendingCounselors}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-orange-500/10">
                            <Users className="w-6 h-6 text-orange-500" />
                        </div>
                    </div>
                </Card>
            </div>

            <Tabs defaultValue="appointments" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="appointments">Appointments</TabsTrigger>
                    <TabsTrigger value="requests" className="relative">
                        Counselor Requests
                        {stats.pendingCounselors > 0 && (
                            <span className="ml-2 w-5 h-5 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full">
                                {stats.pendingCounselors}
                            </span>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="users">Manage Users</TabsTrigger>
                </TabsList>

                {/* Counselor Requests */}
                <TabsContent value="requests">
                    <Card className="border-border bg-card/50 backdrop-blur overflow-hidden">
                        <div className="p-6 border-b border-border">
                            <h2 className="text-xl font-bold">Pending Counselor Approvals</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent border-border">
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Speciality</TableHead>
                                        <TableHead>Credentials</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pendingCounselors.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center text-muted-foreground h-24">
                                                No pending counselor requests.
                                            </TableCell>
                                        </TableRow>
                                    ) : pendingCounselors.map((c) => (
                                        <TableRow key={c._id} className="border-border hover:bg-muted/50">
                                            <TableCell className="font-medium">{c.name}</TableCell>
                                            <TableCell>{c.email}</TableCell>
                                            <TableCell>{c.speciality}</TableCell>
                                            <TableCell>
                                                <a href={c.credentials} target="_blank" rel="noreferrer" className="text-primary hover:underline truncate max-w-[200px] block">
                                                    {c.credentials}
                                                </a>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white"
                                                        onClick={() => handleApproveCounselor(c._id)}>
                                                        <CheckCircle2 className="w-4 h-4 mr-1" /> Approve
                                                    </Button>
                                                    <Button size="sm" variant="destructive"
                                                        onClick={() => handleRejectCounselor(c._id, c.name)}>
                                                        <XCircle className="w-4 h-4 mr-1" /> Reject
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>
                </TabsContent>

                {/* Appointments */}
                <TabsContent value="appointments">
                    <Card className="border-border bg-card/50 backdrop-blur overflow-hidden">
                        <div className="p-6 border-b border-border">
                            <h2 className="text-xl font-bold">All Appointments</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent border-border">
                                        <TableHead>Student</TableHead>
                                        <TableHead>Counselor</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Time</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {appointments.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center text-muted-foreground h-24">No appointments found.</TableCell>
                                        </TableRow>
                                    ) : appointments.map((apt) => (
                                        <TableRow key={apt._id} className="border-border hover:bg-muted/50">
                                            <TableCell>
                                                <div className="font-medium">{apt.userId?.name || 'Unknown'}</div>
                                                <div className="text-xs text-muted-foreground">{apt.userId?.email}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div>{apt.counselorId?.name || 'Unknown'}</div>
                                                <div className="text-xs text-muted-foreground">{apt.counselorId?.email}</div>
                                            </TableCell>
                                            <TableCell>{new Date(apt.date).toLocaleDateString()}</TableCell>
                                            <TableCell>{apt.time}</TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded text-xs uppercase font-bold ${getApptStatusClass(apt.status)}`}>
                                                    {apt.status}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>
                </TabsContent>

                {/* Users */}
                <TabsContent value="users">
                    <Card className="border-border bg-card/50 backdrop-blur overflow-hidden">
                        <div className="p-6 border-b border-border">
                            <h2 className="text-xl font-bold">All Users</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent border-border">
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Joined</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((u) => (
                                        <TableRow key={u._id} className="border-border hover:bg-muted/50">
                                            <TableCell className="font-medium">{u.name}</TableCell>
                                            <TableCell>{u.email}</TableCell>
                                            <TableCell className="capitalize">{u.role}</TableCell>
                                            <TableCell>{new Date(u.createdAt).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                {u.role !== 'admin' && (
                                                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-100"
                                                        onClick={() => handleDeleteUser(u._id, u.name)}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
