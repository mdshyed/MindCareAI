import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '@/lib/api'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User, GraduationCap, Loader } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function Register() {
    const [role, setRole] = useState('student')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [speciality, setSpeciality] = useState('')
    const [credentials, setCredentials] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters.')
            return
        }

        setLoading(true)

        try {
            const payload = { name, email, password, role }
            if (role === 'counselor') {
                payload.speciality = speciality
                payload.credentials = credentials
            }

            const { data } = await api.post('/auth/register', payload)

            if (data.success) {
                if (role === 'counselor') {
                    toast.success('Account created! Awaiting admin approval before you can log in.')
                    navigate('/login')
                } else {
                    login({ ...data, token: data.token })
                    toast.success(`Welcome to MindCareAI, ${data.name}!`)
                    navigate('/student-dashboard')
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none -z-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-[100px] animate-pulse delay-1000" />
            </div>

            <Card className="w-full max-w-md border-border bg-card/80 backdrop-blur-md shadow-xl">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-2xl font-bold gradient-text">Create Account</CardTitle>
                    <CardDescription>Join MindCareAI to start your journey</CardDescription>
                </CardHeader>

                <CardContent>
                    <Tabs defaultValue="student" className="w-full" onValueChange={(val) => setRole(val)}>
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="student" className="flex items-center gap-2">
                                <GraduationCap className="w-4 h-4" /> Student
                            </TabsTrigger>
                            <TabsTrigger value="counselor" className="flex items-center gap-2">
                                <User className="w-4 h-4" /> Counselor
                            </TabsTrigger>
                        </TabsList>

                        <form onSubmit={handleRegister} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium" htmlFor="name">Full Name</label>
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={loading}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium" htmlFor="email">Email</label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium" htmlFor="password">Password</label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    minLength={6}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={loading}
                                />
                                <p className="text-xs text-muted-foreground">Minimum 6 characters</p>
                            </div>

                            {role === 'counselor' && (
                                <>
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-300">
                                        <label className="text-sm font-medium" htmlFor="speciality">Speciality</label>
                                        <Input
                                            id="speciality"
                                            placeholder="e.g. Anxiety, Depression, Academic Stress"
                                            required
                                            value={speciality}
                                            onChange={(e) => setSpeciality(e.target.value)}
                                            disabled={loading}
                                        />
                                    </div>
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-300">
                                        <label className="text-sm font-medium" htmlFor="credentials">Proof of Credibility</label>
                                        <Input
                                            id="credentials"
                                            placeholder="License No. or LinkedIn URL"
                                            required
                                            value={credentials}
                                            onChange={(e) => setCredentials(e.target.value)}
                                            disabled={loading}
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Your account will be reviewed by an administrator before activation.
                                        </p>
                                    </div>
                                </>
                            )}

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-primary text-white shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                {loading
                                    ? <><Loader className="w-4 h-4 animate-spin mr-2" /> Creating account...</>
                                    : `Sign Up as ${role.charAt(0).toUpperCase() + role.slice(1)}`
                                }
                            </Button>
                        </form>
                    </Tabs>
                </CardContent>

                <CardFooter className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary hover:underline font-medium ml-1">
                        Sign in
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}
