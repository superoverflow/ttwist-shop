"use client"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { Photo, PhotoCancel, Upload } from "tabler-icons-react"
import { cva } from "class-variance-authority"
import axios from "axios"

// s3 url functions
// upload api

const buttonStyle = cva([
  "px-4",
  "py-2",
  "bg-teal-600",
  "border-teal-600",
  "rounded-l",
  "font-semibold",
  "text-sm",
  "whitespace-nowrap",
  "text-white",
  "tracking-widest",
  "cursor-pointer",
  "hover:bg-teal-500",
  "focus:ring",
  "focus:outline-none",
  "focus:border-teal-900",
  "focus:ring-teal-300",
  "active:bg-teal-900",
  "disabled:opacity-25",
  "transition",
])

const statusBarStyle = cva([
  "flex",
  "flex-row",
  "",
  "basis-full",
  "px-4",
  "py-2",
  "border",
  "border-teal-600",
  "rounded-r",
  "text-sm",
])

async function generateS3PresignedUrl(file: File): Promise<string> {
  const { data } = await axios.post("/api/presignedUrl", {
    name: file.name,
    type: file.type,
  })
  return data.url
}

async function uploadFileToS3(file: File, url: string) {
  axios.put(url, file, {
    headers: {
      "Content-type": file.type,
      "Access-Control-Allow-Origin": "*",
    },
  })
}

const iconButtonStyle = cva(["cursor-pointer", "px-1", "rounded"])

const IconButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick: (e: any) => void
}) => {
  return (
    <div className={iconButtonStyle()} onClick={onClick}>
      {children}
    </div>
  )
}

const INITIAL_STATUS_TEXT = "choose photos to upload"

export const UploadFilesPanel = ({
  setPhotoUrls,
}: {
  setPhotoUrls: Dispatch<SetStateAction<string[]>>
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<FileList | null>(null)
  const [statusText, setStatusText] = useState<string>(INITIAL_STATUS_TEXT)

  useEffect(() => {
    if ((files?.length || 0) > 0) {
      setStatusText(`selected ${files?.length} files to upload`)
    }
  }, [files])

  return (
    <div className="shadow">
      {/* invisible multiple file input */}
      <input
        type="file"
        multiple
        className="hidden"
        ref={inputRef}
        onChange={(e) => setFiles(e.target.files)}
      />
      {/* visible file input control */}
      <div className="flex flex-row">
        <div
          className={buttonStyle()}
          onClick={() => inputRef?.current?.click()}
        >
          <Photo />
        </div>

        <div className={statusBarStyle()}>
          <span className="grow">{statusText}</span>

          <div className="flex flex-row">
            <IconButton
              onClick={() => {
                setFiles(null)
                setStatusText(INITIAL_STATUS_TEXT)
              }}
            >
              <PhotoCancel className="stroke-red-600 hover:bg-red-300 rounded" />
            </IconButton>
            <IconButton
              onClick={async () => {
                if (!files) {
                  return
                }
                const photoUrls = await Promise.all(
                  Array.from(files).map(async (file) => {
                    const presignedUrl = await generateS3PresignedUrl(file)
                    await uploadFileToS3(file, presignedUrl)
                    const photoUrl = presignedUrl.split("?")[0]
                    return photoUrl
                  })
                )
                setPhotoUrls(photoUrls)
                setStatusText(`uploaded ${files.length} photos`)
              }}
            >
              <Upload className="stroke-teal-600 hover:bg-teal-300 rounded" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  )
}
