'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Image as ImageIcon,
    Video,
    Folder,
    FolderPlus,
    Trash2,
    Upload,
    Search,
    Grid3x3,
    List,
    Calendar,
    FileText,
    X,
    Eye,
    Download,
    Loader2,
    Music,
    FileAudio,
    FileVideo
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import { getAllMedia, deleteMedia, createFolder, deleteFolder, getAllFolders } from '@/app/actions/cloudinary'
import { uploadToCloudinary } from '@/app/actions/media'
import { useToast } from '@/hooks/use-toast'
import { CldImage } from 'next-cloudinary'
import Image from 'next/image'
import { useState as useImageState } from 'react'

type MediaAsset = {
    public_id: string
    secure_url: string
    resource_type: 'image' | 'video'
    format: string
    created_at: string
    bytes: number
    width?: number
    height?: number
    folder?: string
    asset_folder?: string
}

type FolderData = {
    name: string
    path: string
}

export default function MediaManager() {
    const { toast } = useToast()
    const [media, setMedia] = useState<MediaAsset[]>([])
    const [folders, setFolders] = useState<FolderData[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
    const [selectedMedia, setSelectedMedia] = useState<MediaAsset | null>(null)
    const [uploading, setUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [showNewFolder, setShowNewFolder] = useState(false)
    const [newFolderName, setNewFolderName] = useState('')

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        setLoading(true)
        const [mediaRes, foldersRes] = await Promise.all([
            getAllMedia(),
            getAllFolders()
        ])

        if (mediaRes.success) {
            console.log('Loaded media:', mediaRes.media.length, 'items')
            console.log('Sample media:', mediaRes.media.slice(0, 3))
            setMedia(mediaRes.media as MediaAsset[])
        } else {
            console.error('Failed to load media:', mediaRes.error)
        }

        if (foldersRes.success) {
            console.log('Loaded folders:', foldersRes.folders)
            setFolders(foldersRes.folders)
        } else {
            console.error('Failed to load folders:', foldersRes.error)
        }

        setLoading(false)
    }

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        setUploading(true)
        setUploadProgress(0)
        const targetFolder = selectedFolder || 'mydogandigroup/uploads'
        const fileList = Array.from(files)
        const totalFiles = fileList.length
        let successCount = 0
        let errors: string[] = []

        // Process in batches
        const batchSize = 2
        for (let i = 0; i < totalFiles; i += batchSize) {
            const batch = fileList.slice(i, i + batchSize)

            await Promise.all(batch.map(async (file) => {
                const formData = new FormData()
                formData.append('file', file)

                try {
                    const result = await uploadToCloudinary(formData, targetFolder)
                    if (result.success) {
                        successCount++
                    } else {
                        errors.push(`Failed to upload ${file.name}`)
                    }
                } catch (err) {
                    errors.push(`Error uploading ${file.name}`)
                }
            }))

            // Update progress
            setUploadProgress(Math.min(((i + batch.length) / totalFiles) * 100, 100))
        }

        if (successCount > 0) {
            toast({
                title: 'Upload Complete',
                description: `Successfully uploaded ${successCount} of ${totalFiles} files.`
            })
        }

        if (errors.length > 0) {
            toast({
                variant: 'destructive',
                title: 'Some uploads failed',
                description: `Failed to upload ${errors.length} files.`
            })
        }

        setUploading(false)
        setUploadProgress(0)
        loadData()
        e.target.value = ''
    }

    const handleDelete = async (asset: MediaAsset) => {
        if (!confirm(`Delete ${asset.public_id}?`)) return

        const result = await deleteMedia(asset.public_id, asset.resource_type)

        if (result.success) {
            toast({ title: 'Deleted', description: 'Media deleted successfully' })
            setMedia(prev => prev.filter(m => m.public_id !== asset.public_id))
            setSelectedMedia(null)
        } else {
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete media' })
        }
    }

    const handleCreateFolder = async () => {
        if (!newFolderName.trim()) return

        const folderPath = selectedFolder
            ? `${selectedFolder}/${newFolderName}`
            : `mydogandigroup/${newFolderName}`

        const result = await createFolder(folderPath)

        if (result.success) {
            toast({ title: 'Success', description: 'Folder created successfully' })
            setShowNewFolder(false)
            setNewFolderName('')
            loadData()
        } else {
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to create folder' })
        }
    }

    const handleDeleteFolder = async (folder: FolderData) => {
        if (!confirm(`Delete folder "${folder.name}" and all its contents?`)) return

        const result = await deleteFolder(folder.path)

        if (result.success) {
            toast({ title: 'Deleted', description: 'Folder deleted successfully' })
            setFolders(prev => prev.filter(f => f.path !== folder.path))
        } else {
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete folder' })
        }
    }

    const filteredMedia = media.filter(asset => {
        const matchesSearch = asset.public_id.toLowerCase().includes(search.toLowerCase())

        let matchesFolder = !selectedFolder
        if (selectedFolder) {
            // Cloudinary can return folder info in 'folder' or 'asset_folder', or we parse public_id
            const assetFolder = asset.asset_folder || asset.folder || ''
            // Check if it belongs exactly to the folder or is a subfolder
            if (assetFolder) {
                matchesFolder = assetFolder === selectedFolder || assetFolder.startsWith(selectedFolder + '/')
            } else {
                // Fallback to public_id parsing
                matchesFolder = asset.public_id.startsWith(selectedFolder + '/')
            }
        }

        return matchesSearch && matchesFolder
    })

    // Debug logging
    if (selectedFolder) {
        console.log('Selected folder:', selectedFolder)
        console.log('Filtered media count:', filteredMedia.length)
        if (filteredMedia.length === 0 && media.length > 0) {
            console.log('Sample asset for debugging:', media[0])
        }
    }

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                        Media <span className="text-primary">Manager</span>
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        {filteredMedia.length} items • {folders.length} folders
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                        className="rounded-xl"
                    >
                        {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid3x3 className="w-4 h-4" />}
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => setShowNewFolder(true)}
                        className="rounded-xl font-bold"
                    >
                        <FolderPlus className="w-4 h-4 mr-2" />
                        <span className="hidden md:inline">New Folder</span>
                    </Button>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl group-hover:bg-primary/30 transition-all opacity-0 group-hover:opacity-100" />
                        <Button
                            className="rounded-xl font-bold shadow-lg relative overflow-hidden"
                            disabled={uploading}
                            onClick={() => document.getElementById('media-upload-input')?.click()}
                        >
                            {uploading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    {Math.round(uploadProgress)}%
                                    <div className="absolute bottom-0 left-0 h-1 bg-white/30 transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                                </>
                            ) : (
                                <><Upload className="w-4 h-4 mr-2" /> Upload Media</>
                            )}
                        </Button>
                        <input
                            id="media-upload-input"
                            type="file"
                            className="hidden"
                            multiple
                            accept="image/*,video/*,audio/*"
                            onChange={handleUpload}
                            disabled={uploading}
                        />
                    </div>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search media..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 rounded-xl bg-white"
                    />
                </div>

                <select
                    value={selectedFolder || ''}
                    onChange={(e) => setSelectedFolder(e.target.value || null)}
                    className="px-4 py-2 rounded-xl border border-input bg-white text-sm font-medium"
                >
                    <option value="">All Folders</option>
                    {folders.map(folder => (
                        <option key={folder.path} value={folder.path}>
                            {folder.path}
                        </option>
                    ))}
                </select>
            </div>

            {/* Folders Section */}
            {folders.length > 0 && (
                <div className="bg-white rounded-3xl border border-border p-6">
                    <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                        <Folder className="w-4 h-4" /> Folders
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {folders.map(folder => (
                            <div
                                key={folder.path}
                                className="group relative bg-slate-50 p-4 rounded-2xl border border-slate-200 hover:border-primary/50 transition-all cursor-pointer"
                                onClick={() => setSelectedFolder(folder.path)}
                            >
                                <Folder className="w-8 h-8 text-primary mb-2" />
                                <p className="text-xs font-bold truncate">{folder.name}</p>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleDeleteFolder(folder)
                                    }}
                                >
                                    <Trash2 className="w-3 h-3 text-red-500" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Media Grid/List */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : filteredMedia.length === 0 ? (
                <div className="bg-white rounded-3xl border border-border p-20 text-center">
                    <ImageIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-bold mb-2">No media found</h3>
                    <p className="text-sm text-muted-foreground">Upload some files to get started</p>
                </div>
            ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredMedia.map(asset => (
                        <motion.div
                            key={asset.public_id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="group relative bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                            onClick={() => setSelectedMedia(asset)}
                        >
                            <div className="aspect-square relative bg-slate-100">
                                {asset.resource_type === 'image' ? (
                                    <>
                                        <Image
                                            src={asset.secure_url}
                                            alt={asset.public_id}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                            onError={(e) => {
                                                console.error('Failed to load image:', asset.public_id, asset.secure_url);
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <ImageIcon className="w-12 h-12 text-slate-300" />
                                        </div>
                                    </>
                                ) : asset.resource_type === 'video' && !asset.format?.match(/mp3|wav|ogg/) ? (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Video className="w-12 h-12 text-primary" />
                                    </div>
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Music className="w-12 h-12 text-pink-500" />
                                    </div>
                                )}
                            </div>
                            <div className="p-3">
                                <p className="text-xs font-bold truncate">{asset.public_id.split('/').pop()}</p>
                                <p className="text-[10px] text-muted-foreground">{formatBytes(asset.bytes)}</p>
                            </div>
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="h-8 w-8 bg-white/90 backdrop-blur"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setSelectedMedia(asset)
                                    }}
                                >
                                    <Eye className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="h-8 w-8 bg-white/90 backdrop-blur text-red-500"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleDelete(asset)
                                    }}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-3xl border border-border overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-border">
                            <tr className="text-xs uppercase font-black tracking-widest text-muted-foreground">
                                <th className="px-6 py-4 text-left">Preview</th>
                                <th className="px-6 py-4 text-left">Name</th>
                                <th className="px-6 py-4 text-left">Type</th>
                                <th className="px-6 py-4 text-left">Size</th>
                                <th className="px-6 py-4 text-left">Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredMedia.map(asset => (
                                <tr key={asset.public_id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 relative">
                                            {asset.resource_type === 'image' ? (
                                                <Image
                                                    src={asset.secure_url}
                                                    alt={asset.public_id}
                                                    fill
                                                    className="object-cover"
                                                    unoptimized
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Video className="w-6 h-6 text-primary" />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold truncate max-w-xs">{asset.public_id}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-slate-100 uppercase">
                                            {asset.format}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        {formatBytes(asset.bytes)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        {new Date(asset.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => setSelectedMedia(asset)}
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-red-500"
                                                onClick={() => handleDelete(asset)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* New Folder Dialog */}
            <Dialog open={showNewFolder} onOpenChange={setShowNewFolder}>
                <DialogContent className="max-w-md rounded-3xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black uppercase">Create Folder</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <Input
                            placeholder="Folder name"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            className="rounded-xl"
                        />
                        {selectedFolder && (
                            <p className="text-sm text-muted-foreground">
                                Will be created in: <span className="font-bold">{selectedFolder}</span>
                            </p>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowNewFolder(false)} className="rounded-xl">
                            Cancel
                        </Button>
                        <Button onClick={handleCreateFolder} className="rounded-xl font-bold">
                            Create
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Media Preview Dialog */}
            <Dialog open={!!selectedMedia} onOpenChange={(open) => !open && setSelectedMedia(null)}>
                <DialogContent className="max-w-4xl w-[95vw] rounded-3xl p-0 overflow-hidden">
                    {selectedMedia && (
                        <>
                            <div className="bg-primary p-6 text-white">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-black uppercase truncate">
                                        {selectedMedia.public_id.split('/').pop()}
                                    </DialogTitle>
                                </DialogHeader>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="bg-slate-100 rounded-2xl overflow-hidden">
                                    {selectedMedia.resource_type === 'image' ? (
                                        <Image
                                            src={selectedMedia.secure_url}
                                            alt={selectedMedia.public_id}
                                            width={selectedMedia.width || 800}
                                            height={selectedMedia.height || 600}
                                            className="w-full h-auto"
                                            unoptimized
                                        />
                                    ) : selectedMedia.resource_type === 'video' && !selectedMedia.format?.match(/mp3|wav|ogg/) ? (
                                        <video src={selectedMedia.secure_url} controls className="w-full" />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-10 bg-slate-50">
                                            <Music className="w-20 h-20 text-pink-500 mb-4" />
                                            <audio src={selectedMedia.secure_url} controls className="w-full max-w-md" />
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Public ID</p>
                                        <p className="font-bold break-all">{selectedMedia.public_id}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Format</p>
                                        <p className="font-bold uppercase">{selectedMedia.format}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Size</p>
                                        <p className="font-bold">{formatBytes(selectedMedia.bytes)}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Dimensions</p>
                                        <p className="font-bold">{selectedMedia.width} × {selectedMedia.height}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Created</p>
                                        <p className="font-bold">{new Date(selectedMedia.created_at).toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">URL</p>
                                        <a href={selectedMedia.secure_url} target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline text-xs break-all">
                                            View Full
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-slate-50 flex justify-between">
                                <Button
                                    variant="destructive"
                                    onClick={() => handleDelete(selectedMedia)}
                                    className="rounded-xl font-bold"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setSelectedMedia(null)}
                                    className="rounded-xl font-bold"
                                >
                                    Close
                                </Button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
