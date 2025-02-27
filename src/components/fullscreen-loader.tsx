import { LoaderIcon } from "lucide-react"

interface FullscreenLoaderProps {
    label?: string
}

export const FullscreenLoader = ({ label }: FullscreenLoaderProps) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-2">
            <LoaderIcon className="size-6 animate-spin text-muted-foreground" />
            {label && <p className="text-sm text-muted-foreground">{label}</p>}
        </div>
    )
}
