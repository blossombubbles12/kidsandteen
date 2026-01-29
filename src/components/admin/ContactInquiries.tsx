"use client";

import { useState, useEffect } from "react";
import { getContactSubmissions, deleteContactSubmission } from "@/app/actions/contact";
import {
    Mail,
    Trash2,
    Search,
    Calendar,
    User,
    MessageSquare,
    Clock,
    Tag,
    ChevronRight,
    SearchX
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export function ContactInquiries() {
    const { toast } = useToast();
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
    const [isDeleting, setIsDeleting] = useState<number | null>(null);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        setLoading(true);
        const res = await getContactSubmissions();
        if (res.success) {
            setInquiries(res.data || []);
        } else {
            toast({ variant: "destructive", title: "Error", description: res.error as string });
        }
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this inquiry?")) return;
        setIsDeleting(id);
        const res = await deleteContactSubmission(id);
        if (res.success) {
            setInquiries(prev => prev.filter(i => i.id !== id));
            toast({ title: "Deleted", description: "Inquiry removed successfully." });
        } else {
            toast({ variant: "destructive", title: "Error", description: res.error as string });
        }
        setIsDeleting(null);
    };

    const filteredInquiries = inquiries.filter(i =>
        i.first_name.toLowerCase().includes(search.toLowerCase()) ||
        i.last_name.toLowerCase().includes(search.toLowerCase()) ||
        i.email.toLowerCase().includes(search.toLowerCase()) ||
        i.subject.toLowerCase().includes(search.toLowerCase()) ||
        i.message.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-border shadow-sm">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search inquiries..."
                        className="pl-10 rounded-2xl bg-slate-50 border-slate-200"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium px-2">
                    <MessageSquare className="w-4 h-4" />
                    Total Inquiries: {filteredInquiries.length}
                </div>
            </div>

            {/* Inquiries List */}
            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    <div className="p-20 text-center space-y-4">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-muted-foreground font-bold italic">Loading inquiries...</p>
                    </div>
                ) : filteredInquiries.length > 0 ? (
                    filteredInquiries.map((inquiry, idx) => (
                        <motion.div
                            key={inquiry.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="group bg-white rounded-3xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
                            onClick={() => setSelectedInquiry(inquiry)}
                        >
                            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-lg leading-tight uppercase italic">{inquiry.first_name} {inquiry.last_name}</h3>
                                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1 font-bold text-slate-900 lowercase"><Mail className="w-3 h-3" /> {inquiry.email}</span>
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(inquiry.created_at).toLocaleDateString()}</span>
                                            <span className="px-2 py-0.5 bg-slate-100 rounded-full font-black text-[10px] uppercase tracking-wider">{inquiry.subject}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 self-end md:self-auto">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(inquiry.id);
                                        }}
                                        disabled={isDeleting === inquiry.id}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                    <div className="p-2 bg-slate-50 rounded-xl text-slate-400 group-hover:translate-x-1 group-hover:text-primary transition-all">
                                        <ChevronRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                            <div className="px-6 pb-6 pt-0">
                                <p className="text-sm text-slate-600 line-clamp-2 italic bg-slate-50/50 p-3 rounded-2xl border border-dashed border-slate-200">
                                    "{inquiry.message}"
                                </p>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="p-20 text-center bg-white rounded-3xl border border-dashed border-border">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                            <SearchX className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-bold italic uppercase tracking-tight">No inquiries found</h3>
                        <p className="text-muted-foreground italic">Try adjusting your search or check back later.</p>
                    </div>
                )}
            </div>

            {/* Inquiry Details Dialog */}
            <Dialog open={!!selectedInquiry} onOpenChange={(open) => !open && setSelectedInquiry(null)}>
                <DialogContent className="max-w-2xl w-[95vw] rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
                    <div className="bg-slate-900 p-6 md:p-10 text-white relative">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Mail className="w-32 h-32" />
                        </div>
                        <DialogHeader className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <Tag className="w-4 h-4 text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{selectedInquiry?.subject}</span>
                            </div>
                            <DialogTitle className="text-3xl md:text-4xl font-black uppercase italic leading-none tracking-tighter">
                                {selectedInquiry?.first_name} <br />
                                <span className="text-primary">{selectedInquiry?.last_name}</span>
                            </DialogTitle>
                        </DialogHeader>
                    </div>

                    <div className="p-8 md:p-10 space-y-10 max-h-[60vh] overflow-y-auto">
                        {/* Meta Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 italic">
                                    <User className="w-3 h-3" /> Contact Info
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 group">
                                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-muted-foreground leading-none mb-1">Email</p>
                                            <p className="text-sm font-bold lowercase">{selectedInquiry?.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 group">
                                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-muted-foreground leading-none mb-1">Date Received</p>
                                            <p className="text-sm font-bold">{selectedInquiry?.created_at ? new Date(selectedInquiry.created_at).toLocaleString() : 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 italic">
                                    <Tag className="w-3 h-3" /> Subject Line
                                </h4>
                                <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                                    <p className="text-lg font-black uppercase italic text-primary leading-tight">{selectedInquiry?.subject}</p>
                                </div>
                            </div>
                        </div>

                        {/* Message Content */}
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 italic">
                                <MessageSquare className="w-3 h-3" /> Message Content
                            </h4>
                            <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200 shadow-inner relative">
                                <div className="absolute top-4 left-4 text-slate-200">
                                    <MessageSquare className="w-8 h-8 opacity-20" />
                                </div>
                                <p className="text-slate-700 leading-relaxed italic text-lg relative z-10 whitespace-pre-wrap">
                                    {selectedInquiry?.message}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest italic">
                            <Clock className="w-4 h-4" /> Inquiry ID: #{selectedInquiry?.id}
                        </div>
                        <Button
                            className="rounded-2xl px-10 font-black uppercase tracking-widest italic shadow-lg w-full sm:w-auto"
                            onClick={() => setSelectedInquiry(null)}
                        >
                            Close Entry
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
