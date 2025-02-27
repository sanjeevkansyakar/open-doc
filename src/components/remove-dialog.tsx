'use client'

import { useState } from "react"
import { toast } from "sonner"
import { useMutation } from "convex/react"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { api } from "../../convex/_generated/api"
import { Id } from "../../convex/_generated/dataModel"
import { useRouter } from "next/navigation"

interface RemoveDialogProps {
    documentId: Id<'documents'>
    children: React.ReactNode
}


export const RemoveDialog = ({ documentId, children }: RemoveDialogProps) => {
    const router = useRouter();
    const [isRemoving, setIsRemoving] = useState(false);
    const remove = useMutation(api.documents.removeById);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your document.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isRemoving}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsRemoving(true);
                            remove({ id: documentId })
                                .then(() => { toast.success("Document removed"); router.push("/") })
                                .catch(() => toast.error("Failed to remove document"))
                                .finally(() => setIsRemoving(false));
                        }}
                    >Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
