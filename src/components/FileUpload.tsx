import { useState, useRef } from "react"
import { Upload, X, FileText, Image } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { useToast } from "../hooks/use-toast"

interface FileInfo {
  id: string
  name: string
  size: number
  type: string
  url: string
}

interface FileUploadProps {
  onUpload: (file: FileInfo) => void
}

export function FileUpload({ onUpload }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<FileInfo | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const processFile = (file: File) => {
    // Check file type - accept only image files and PDFs for now
    if (!file.type.includes("image/") && file.type !== "application/pdf") {
      toast({
        title: "Invalid file type",
        description: "Please upload an image or PDF file.",
        variant: "destructive",
      })
      return
    }

    // Process the file
    const fileInfo: FileInfo = {
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
    }

    setFile(fileInfo)
    onUpload(fileInfo)
    
    toast({
      title: "File uploaded",
      description: `${file.name} has been uploaded successfully.`,
    })
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0])
    }
  }

  const removeFile = () => {
    if (file) {
      URL.revokeObjectURL(file.url)
      setFile(null)
    }
  }

  const FileIcon = () => {
    if (file?.type.includes("image/")) {
      return <Image className="h-6 w-6 text-primary" />
    }
    return <FileText className="h-6 w-6 text-primary" />
  }

  return (
    <div className="space-y-4">
      <div
        className={`flex h-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-secondary/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*,application/pdf"
        />
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <Upload className="h-10 w-10 text-muted-foreground" />
          <h3 className="text-lg font-medium">
            Drag & drop your drawing here
          </h3>
          <p className="text-sm text-muted-foreground">
            Upload structural engineering drawings (PNG, JPG, PDF)
          </p>
          <Button variant="secondary" size="sm" className="mt-2">
            Browse Files
          </Button>
        </div>
      </div>

      {file && (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center justify-between border-b p-3">
              <div className="flex items-center gap-2">
                <FileIcon />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile()
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {file.type.includes("image/") && (
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <img
                  src={file.url}
                  alt={file.name}
                  className="h-full w-full object-contain"
                />
              </div>
            )}
            {file.type === "application/pdf" && (
              <div className="flex h-48 items-center justify-center bg-secondary/30">
                <p className="text-sm text-muted-foreground">
                  PDF Preview Not Available
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
