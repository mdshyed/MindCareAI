import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '@/lib/api'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User, Shield, GraduationCap, Loader } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function Login() {
    const [role, setRole] = useState('student')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { data } = await api.post('/auth/login', { email, password })

            if (data.success) {
                login({ ...data, token: data.token })
                toast.success(`Welcome back, ${data.name}!`)

                if (data.role === 'student') {
                    navigate('/student-dashboard')
                } else if (data.role === 'counselor') {
                    navigate('/counselor-dashboard')
                } else if (data.role === 'admin') {
                    navigate('/admin')
                } else {
                    navigate('/')
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.')
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
                    <CardTitle className="text-2xl font-bold gradient-text">Welcome Back</CardTitle>
                    <CardDescription>Sign in to access your dashboard</CardDescription>
                </CardHeader>

                <CardContent>
                    <Tabs defaultValue="student" className="w-full" onValueChange={(val) => setRole(val)}>
                        <TabsList className="grid w-full grid-cols-3 mb-6">
                            <TabsTrigger value="student" className="flex items-center gap-2">
                                <GraduationCap className="w-4 h-4" /> Student
                            </TabsTrigger>
                            <TabsTrigger value="counselor" className="flex items-center gap-2">
                                <User className="w-4 h-4" /> Counselor
                            </TabsTrigger>
                            <TabsTrigger value="admin" className="flex items-center gap-2">
                                <Shield className="w-4 h-4" /> Admin
                            </TabsTrigger>
                        </TabsList>

                        <form onSubmit={handleLogin} className="space-y-4">
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={loading}
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-primary text-white shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                {loading
                                    ? <><Loader className="w-4 h-4 animate-spin mr-2" /> Signing in...</>
                                    : `Sign In as ${role.charAt(0).toUpperCase() + role.slice(1)}`
                                }
                            </Button>
                        </form>
                    </Tabs>
                </CardContent>

                <CardFooter className="text-center text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary hover:underline font-medium ml-1">
                        Sign up
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}
