'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onUpload: (file: File) => Promise<void>;
  accept?: Record<string, string[]>;
  maxSize?: number;
  className?: string;
}

export function FileUpload({
  onUpload,
  accept = {
    'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  },
  maxSize = 5 * 1024 * 1024, // 5MB
  className,
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      setError(null);
      setIsUploading(true);
      setProgress(0);

      try {
        // Simulate upload progress
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 90) {
              clearInterval(interval);
              return 90;
            }
            return prev + 10;
          });
        }, 500);

        await onUpload(file);
        clearInterval(interval);
        setProgress(100);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Upload failed');
      } finally {
        setIsUploading(false);
      }
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
  });

  return (
    <div className={cn('w-full', className)}>
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
          'hover:border-primary/50 hover:bg-accent/50',
          isDragActive && 'border-primary bg-accent/50',
          error && 'border-destructive',
          className
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <div className="text-sm text-muted-foreground">
            {isDragActive ? (
              <p>Drop the file here</p>
            ) : (
              <p>
                Drag and drop a file here, or click to select
                <br />
                <span className="text-xs">
                  Max size: {maxSize / 1024 / 1024}MB
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      {isUploading && (
        <div className="mt-4 space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground text-center">
            Uploading... {progress}%
          </p>
        </div>
      )}

      {error && (
        <div className="mt-4 text-sm text-destructive text-center">
          {error}
        </div>
      )}

      {!isUploading && !error && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => document.querySelector('input[type="file"]')?.click()}
          >
            Select File
          </Button>
        </div>
      )}
    </div>
  );
} 