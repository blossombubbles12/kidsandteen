'use client'

import { useState } from 'react'
import { register } from '@/app/actions/auth'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Dog, Loader2, Lock, Mail, User } from 'lucide-react'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'

export default function RegisterPage() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const role = formData.get('role') as string

        const res = await register({ name, email, password, role })

        if (res.success) {
            toast({ title: "Registration Successful!", description: "You can now log in." })
            router.push('/admin/login')
        } else {
            toast({
                variant: "destructive",
                title: "Registration Failed",
                description: res.error || "Please try again later"
            })
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50 px-4">
            <Card className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl border-none">
                <CardHeader className="text-center space-y-1">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                        <Dog className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-3xl font-black uppercase tracking-tight">Admin <span className="text-primary">Register</span></CardTitle>
                    <CardDescription>Create an account to access the dashboard.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    name="name"
                                    type="text"
                                    placeholder="Jackie Idimogu"
                                    className="pl-10 rounded-xl bg-white border-slate-200"
                                    required
                                />
                            </div>
                        </div>
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
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground ml-1">Role Type</label>
                            <select
                                name="role"
                                className="w-full h-10 px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                                required
                            >
                                <option value="user">Standard User</option>
                                <option value="admin">Administrator</option>
                            </select>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button type="submit" className="w-full py-6 rounded-xl font-bold text-lg shadow-lg" disabled={loading}>
                            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Registering...</> : 'Create Account'}
                        </Button>
                        <p className="text-sm text-center text-muted-foreground">
                            Already have an account? <Link href="/admin/login" className="text-primary font-bold hover:underline">Sign in</Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
