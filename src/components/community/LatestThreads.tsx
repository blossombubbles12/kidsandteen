"use client";

import { MessageSquare, ThumbsUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const threads = [
    {
        title: "Best study tips for the KTU leadership exam?",
        author: "AspiringLeader",
        replies: 24,
        likes: 15,
        time: "2h ago",
        tag: "Study",
        color: "bg-red-100 text-red-700"
    },
    {
        title: "Review: The KTU pitch competition was amazing!",
        author: "YoungCEO",
        replies: 56,
        likes: 189,
        time: "5h ago",
        tag: "Reviews",
        color: "bg-green-100 text-green-700"
    },
    {
        title: "How do I start my first business? Need tips!",
        author: "FutureFounder",
        replies: 12,
        likes: 8,
        time: "1d ago",
        tag: "Business",
        color: "bg-orange-100 text-orange-700"
    },
    {
        title: "Anyone preparing for the KTU Shark Tank? Let's practice!",
        author: "PitchMaster",
        replies: 145,
        likes: 342,
        time: "1d ago",
        tag: "Events",
        color: "bg-blue-100 text-blue-700"
    },
];

export function LatestThreads() {
    return (
        <section className="py-16 container px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Trending Discussions</h2>
                    <p className="text-muted-foreground">See what the community is talking about today.</p>
                </div>
                <Button>Start a New Discussion</Button>
            </div>

            <div className="grid gap-4">
                {threads.map((thread, index) => (
                    <div key={index} className="flex gap-4 p-4 border rounded-xl hover:bg-secondary/10 transition-colors cursor-pointer bg-card">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${thread.color}`}>
                                    {thread.tag}
                                </span>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {thread.time}
                                </span>
                            </div>
                            <h3 className="font-bold text-lg mb-1">{thread.title}</h3>
                            <p className="text-sm text-muted-foreground">Posted by <span className="font-medium text-foreground">{thread.author}</span></p>
                        </div>

                        <div className="flex flex-col items-end justify-center gap-2 text-muted-foreground">
                            <div className="flex items-center gap-1 text-sm bg-secondary/30 px-2 py-1 rounded-md">
                                <MessageSquare className="w-4 h-4" /> {thread.replies}
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                                <ThumbsUp className="w-4 h-4" /> {thread.likes}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
