"use client";

import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    Image as ImageIcon,
    LogOut,
    Dog,
    Menu,
    X,
    FolderOpen,
    User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { logout } from "@/app/actions/auth";

type NavItem = {
    id: string;
    label: string;
    icon: any;
};

const navItems: NavItem[] = [
    { id: 'registrations', label: 'Registrations', icon: Users },
    { id: 'media', label: 'Media Manager', icon: FolderOpen },
    { id: 'profile', label: 'Profile Settings', icon: User },
];

export function AdminSidebar({
    activeTab,
    onTabChange,
    user
}: {
    activeTab: string;
    onTabChange: (id: any) => void;
    user: any;
}) {
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        window.location.reload();
    };

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Mobile Toggle */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <Button variant="outline" size="icon" onClick={toggleSidebar} className="rounded-full shadow-lg bg-white">
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
            </div>

            {/* Sidebar Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Content */}
            <div className={cn(
                "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-border transform transition-transform duration-300 lg:translate-x-0 flex flex-col",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Logo Section */}
                <div className="p-6 border-b border-border flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Dog className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="font-black uppercase tracking-tighter leading-tight">Admin<span className="text-primary block text-xs">Panel</span></h2>
                    </div>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 p-4 space-y-2 mt-4">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                onTabChange(item.id);
                                setIsOpen(false);
                            }}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                                activeTab === item.id
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "text-muted-foreground hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-white" : "text-slate-400")} />
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* Footer / User Profile */}
                <div className="p-4 border-t border-border bg-slate-50/50">
                    <div className="px-4 py-3 mb-4 rounded-xl bg-white border border-border shadow-sm">
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-black">Current User</p>
                        <p className="text-sm font-bold truncate">{user?.name}</p>
                        <p className="text-[10px] text-muted-foreground italic truncate">{user?.email}</p>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="w-full justify-start gap-3 rounded-xl font-bold text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout Session
                    </Button>
                </div>
            </div>
        </>
    );
}
