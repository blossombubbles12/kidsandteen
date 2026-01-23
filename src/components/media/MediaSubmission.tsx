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
import { useRouter } from "next/navigation";
import { AlbumData } from "@/app/actions/media";


interface MediaSubmissionProps {
    albums?: AlbumData[];
    defaultFolder?: string;
}

export function MediaSubmission({ albums = [], defaultFolder = "" }: MediaSubmissionProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<{ url: string; type: string; name: string }[]>([]);
    const [folderName, setFolderName] = useState(defaultFolder);
    const [currentFileName, setCurrentFileName] = useState("");
    const [errors, setErrors] = useState<string[]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            setSelectedFiles(prev => [...prev, ...files]);
            const newPreviews = files.map(file => ({
                url: URL.createObjectURL(file),
                type: file.type,
                name: file.name
            }));
            setPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeFile = (index: number) => {
        const newFiles = [...selectedFiles];
        newFiles.splice(index, 1);
        setSelectedFiles(newFiles);

        const newPreviews = [...previews];
        URL.revokeObjectURL(newPreviews[index].url);
        newPreviews.splice(index, 1);
        setPreviews(newPreviews);

        if (newFiles.length === 0 && fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const clearSelection = () => {
        previews.forEach(p => URL.revokeObjectURL(p.url));
        setSelectedFiles([]);
        setPreviews([]);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedFiles.length === 0) return;

        setIsUploading(true);
        setUploadProgress(0);
        setErrors([]);

        try {
            const targetFolder = folderName.trim()
                ? folderName.trim().replace(/\s+/g, '_').toLowerCase()
                : "mydogandigroup/community_submissions";

            let successCount = 0;
            const newErrors: string[] = [];

            // Upload 2 by 2 to balance speed and reliability
            const batchSize = 2;
            for (let i = 0; i < selectedFiles.length; i += batchSize) {
                const batch = selectedFiles.slice(i, i + batchSize);

                const batchResults = await Promise.all(batch.map(async (file, batchIdx) => {
                    const globalIdx = i + batchIdx;
                    setCurrentFileName(file.name);

                    const formData = new FormData();
                    formData.append("file", file);

                    try {
                        const response = await uploadToCloudinary(formData, targetFolder);
                        if (response.success) {
                            return { success: true };
                        } else {
                            return { success: false, error: typeof response.error === 'string' ? response.error : 'Cloudinary error' };
                        }
                    } catch (err: any) {
                        return { success: false, error: err.message || 'Network or server error' };
                    }
                }));

                batchResults.forEach((res, idx) => {
                    if (res.success) {
                        successCount++;
                    } else if (res.error) {
                        newErrors.push(`${selectedFiles[i + idx].name}: ${res.error}`);
                    }
                });

                setUploadProgress(Math.min(((i + batch.length) / selectedFiles.length) * 100, 100));
            }

            setErrors(newErrors);

            if (successCount === selectedFiles.length) {
                toast({
                    title: "Success!",
                    description: `All ${successCount} stories have been shared with the community.`,
                    variant: "default",
                });
                setIsDialogOpen(false);
                clearSelection();
                setFolderName("");
                router.refresh();
            } else if (successCount > 0) {
                toast({
                    title: "Partial Success",
                    description: `${successCount} uploaded, ${newErrors.length} failed.`,
                    variant: "default",
                });
                router.refresh();
            } else {
                throw new Error(newErrors.length > 0 ? newErrors[0] : "All uploads failed");
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
            setCurrentFileName("");
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

                        <Dialog open={isDialogOpen} onOpenChange={(open) => {
                            setIsDialogOpen(open);
                            if (!open) clearSelection();
                        }}>
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
                                            Upload multiple images or videos. You can also specify a folder to organize your memories.
                                        </DialogDescription>
                                    </DialogHeader>

                                    <div className="py-6 px-1 space-y-6 max-h-[60vh] overflow-y-auto no-scrollbar">
                                        {/* File Input */}
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className="border-2 border-dashed border-muted-foreground/20 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-primary/5 hover:border-primary/40 transition-all group"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Upload className="w-5 h-5 text-primary" />
                                            </div>
                                            <div className="text-center">
                                                <p className="font-semibold text-sm">Click to add files</p>
                                                <p className="text-xs text-muted-foreground">JPG, PNG, GIF or MP4 (Max 10MB per file)</p>
                                            </div>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                className="hidden"
                                                multiple
                                                accept="image/*,video/*"
                                                onChange={handleFileSelect}
                                            />
                                        </div>

                                        {/* Previews Grid */}
                                        <AnimatePresence>
                                            {previews.length > 0 && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="grid grid-cols-3 gap-3 p-1"
                                                >
                                                    {previews.map((preview, index) => (
                                                        <motion.div
                                                            key={preview.url}
                                                            initial={{ scale: 0.8, opacity: 0 }}
                                                            animate={{ scale: 1, opacity: 1 }}
                                                            className="relative aspect-square rounded-xl overflow-hidden border bg-muted group"
                                                        >
                                                            {preview.type.startsWith('video') ? (
                                                                <div className="w-full h-full flex flex-col items-center justify-center gap-1 p-2">
                                                                    <FileVideo className="w-6 h-6 text-primary" />
                                                                    <span className="text-[10px] line-clamp-1 break-all text-center">{preview.name}</span>
                                                                </div>
                                                            ) : (
                                                                <img src={preview.url} alt="Preview" className="w-full h-full object-cover" />
                                                            )}
                                                            <button
                                                                type="button"
                                                                onClick={() => removeFile(index)}
                                                                className="absolute top-1 right-1 p-1 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                                                            >
                                                                <X className="w-3 h-3" />
                                                            </button>
                                                        </motion.div>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Folder Configuration */}
                                        <div className="space-y-2">
                                            <Label htmlFor="folder" className="text-sm font-bold flex items-center gap-2">
                                                <FolderPlus className="w-4 h-4" /> Destination Folder (Optional)
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="folder"
                                                    placeholder="e.g. mydogandigroup/sunday_walk or just events"
                                                    className="rounded-xl"
                                                    value={folderName}
                                                    onChange={(e) => setFolderName(e.target.value)}
                                                    disabled={isUploading}
                                                    list="folders-list"
                                                />
                                                <datalist id="folders-list">
                                                    {albums.map((a) => (
                                                        <option key={a.path} value={a.path} />
                                                    ))}
                                                </datalist>
                                            </div>
                                            <p className="text-[11px] text-muted-foreground ml-1">
                                                Select existing or type new path (e.g. 'mydogandigroup/new_album'). Leave empty for general view.
                                            </p>
                                        </div>
                                    </div>

                                    <DialogFooter className="flex-col gap-4 sm:gap-0 border-t pt-4">
                                        {/* Status messages */}
                                        <div className="w-full space-y-2">
                                            {isUploading && currentFileName && (
                                                <div className="flex items-center gap-2 text-xs text-primary animate-pulse">
                                                    <Loader2 className="w-3 h-3 animate-spin" />
                                                    Uploading: {currentFileName}
                                                </div>
                                            )}
                                            {errors.length > 0 && (
                                                <div className="bg-destructive/10 text-destructive text-[10px] p-2 rounded-lg max-h-20 overflow-y-auto">
                                                    <p className="font-bold flex items-center gap-1 mb-1">
                                                        <AlertCircle className="w-3 h-3" /> Some files failed:
                                                    </p>
                                                    <ul className="list-disc list-inside">
                                                        {errors.map((err, i) => (
                                                            <li key={i}>{err}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex w-full items-center justify-between">
                                            <div className="flex-1">
                                                {selectedFiles.length > 0 && !isUploading && (
                                                    <span className="text-sm text-muted-foreground font-medium">
                                                        {selectedFiles.length} {selectedFiles.length === 1 ? 'file' : 'files'} selected
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex gap-2">
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
                                                    disabled={selectedFiles.length === 0 || isUploading}
                                                >
                                                    {isUploading ? (
                                                        <>
                                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                            {Math.round(uploadProgress)}%
                                                        </>
                                                    ) : `Post ${selectedFiles.length > 1 ? `(${selectedFiles.length})` : ""} Stories`}

                                                    {isUploading && (
                                                        <motion.div
                                                            className="absolute bottom-0 left-0 h-1 bg-white/30"
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${uploadProgress}%` }}
                                                        />
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
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
