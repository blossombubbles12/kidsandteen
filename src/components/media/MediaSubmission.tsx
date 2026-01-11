"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, FolderPlus, X, FileImage, FileVideo, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadToCloudinary } from "@/app/actions/media";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

export function MediaSubmission() {
    const { toast } = useToast();
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [folderName, setFolderName] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const clearSelection = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) return;

        setIsUploading(true);
        setUploadProgress(10); // Start progress

        try {
            const formData = new FormData();
            formData.append("file", selectedFile);

            // Normalize folder path: ensure it starts with 'mydog/' or keep it root if empty
            const targetFolder = folderName
                ? `mydog/${folderName.trim().replace(/\s+/g, '_').toLowerCase()}`
                : "mydog/community_submissions";

            setUploadProgress(30);

            const response = await uploadToCloudinary(formData, targetFolder);

            setUploadProgress(90);

            if (response.success) {
                toast({
                    title: "Success!",
                    description: "Your story has been shared with the community.",
                    variant: "default",
                });
                setIsDialogOpen(false);
                clearSelection();
                setFolderName("");
            } else {
                throw new Error(typeof response.error === 'string' ? response.error : "Upload failed");
            }
        } catch (error: any) {
            toast({
                title: "Upload Failed",
                description: error.message || "An unexpected error occurred. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    return (
        <section className="py-24 bg-primary/5 border-t border-primary/10">
            <div className="container px-4 text-center max-w-3xl mx-auto">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-3xl p-10 md:p-16 shadow-xl border border-border/50 relative overflow-hidden"
                >
                    {/* Decorative Elements */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-50" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-400/10 rounded-full blur-3xl opacity-50" />

                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                            <Camera className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Share Your Dog's Story</h2>
                        <p className="text-lg text-muted-foreground mb-10">
                            Did you capture a special moment at our last event? Or just a cute photo of your pup?
                            We'd love to feature it in our community gallery!
                        </p>

                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button size="lg" className="rounded-full px-10 py-7 text-lg gap-3 shadow-xl hover:shadow-primary/20 transition-all active:scale-95">
                                    <Upload className="w-6 h-6" /> Submit Media
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px] overflow-hidden">
                                <form onSubmit={handleUpload}>
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl">Upload to Community Gallery</DialogTitle>
                                        <DialogDescription>
                                            Upload an image or video. You can also specify a folder to organize your memories.
                                        </DialogDescription>
                                    </DialogHeader>

                                    <div className="py-6 space-y-6">
                                        {/* File Input / Dropzone Placeholder */}
                                        {!previewUrl ? (
                                            <div
                                                onClick={() => fileInputRef.current?.click()}
                                                className="border-2 border-dashed border-muted-foreground/20 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-primary/5 hover:border-primary/40 transition-all group"
                                            >
                                                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <Upload className="w-6 h-6 text-primary" />
                                                </div>
                                                <div className="text-center">
                                                    <p className="font-semibold">Click to select file</p>
                                                    <p className="text-sm text-muted-foreground">JPG, PNG, GIF or MP4 (Max 10MB)</p>
                                                </div>
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    className="hidden"
                                                    accept="image/*,video/*"
                                                    onChange={handleFileSelect}
                                                />
                                            </div>
                                        ) : (
                                            <div className="relative rounded-2xl overflow-hidden aspect-video bg-black/5 flex items-center justify-center border">
                                                {selectedFile?.type.startsWith('video') ? (
                                                    <div className="flex flex-col items-center gap-2">
                                                        <FileVideo className="w-12 h-12 text-primary" />
                                                        <span className="text-sm font-medium">{selectedFile.name}</span>
                                                    </div>
                                                ) : (
                                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={clearSelection}
                                                    className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full hover:bg-black/80 transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}

                                        {/* Folder Configuration */}
                                        <div className="space-y-2">
                                            <Label htmlFor="folder" className="text-sm font-bold flex items-center gap-2">
                                                <FolderPlus className="w-4 h-4" /> Destination Folder (Optional)
                                            </Label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-mono">mydog/</span>
                                                <Input
                                                    id="folder"
                                                    placeholder="e.g. sunday_walk_2025"
                                                    className="pl-20 rounded-xl"
                                                    value={folderName}
                                                    onChange={(e) => setFolderName(e.target.value)}
                                                    disabled={isUploading}
                                                />
                                            </div>
                                            <p className="text-[11px] text-muted-foreground ml-1">
                                                Leave empty to upload to community submissions.
                                            </p>
                                        </div>
                                    </div>

                                    <DialogFooter className="gap-2 sm:gap-0">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setIsDialogOpen(false)}
                                            disabled={isUploading}
                                            className="rounded-xl"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="rounded-xl px-8 relative overflow-hidden"
                                            disabled={!selectedFile || isUploading}
                                        >
                                            {isUploading ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                    Uploading...
                                                </>
                                            ) : "Post Story"}

                                            {/* Progress Bar Overlay */}
                                            {isUploading && (
                                                <motion.div
                                                    className="absolute bottom-0 left-0 h-1 bg-white/30"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${uploadProgress}%` }}
                                                />
                                            )}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
