'use client'

import { useState } from 'react'
import { login } from '@/app/actions/auth'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Loader2, Lock, Mail } from 'lucide-react'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'
import { Logo } from '@/components/Logo'

export default function LoginPage() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const res = await login({ email, password })

        if (res.success) {
            toast({ title: "Welcome back!", description: "Logging you in..." })
            router.push('/admin')
            router.refresh()
        } else {
            toast({
                variant: "destructive",
                title: "Login Failed",
                description: res.error || "Please check your credentials"
            })
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50 px-4">
            <Card className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl border-none">
                <CardHeader className="text-center space-y-4">
                    <div className="flex justify-center mb-2">
                        <Logo />
                    </div>
                    <CardTitle className="text-3xl font-black uppercase tracking-tight">Admin <span className="text-primary">Login</span></CardTitle>
                    <CardDescription>Enter your credentials to manage the carnival.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground ml-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="admin@example.com"
                                    className="pl-10 rounded-xl bg-white border-slate-200"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10 rounded-xl bg-white border-slate-200"
                                    required
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button type="submit" className="w-full py-6 rounded-xl font-bold text-lg shadow-lg" disabled={loading}>
                            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Authenticating...</> : 'Sign In'}
                        </Button>
                        <p className="text-sm text-center text-muted-foreground">
                            Don't have an account? <Link href="/admin/register" className="text-primary font-bold hover:underline">Register here</Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
