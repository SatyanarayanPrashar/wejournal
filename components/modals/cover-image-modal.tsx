"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import { Dialog, DialogContent,DialogHeader } from "@/components/ui/dialog";
import { useCoverImage } from "@/hooks/use-cover-image";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { db } from "@/app/firebase/config";
import { doc, collection, updateDoc } from "firebase/firestore";

interface CoverImageProps {
    journalUid?: string;
}

export const CoverImageModal = ({ journalUid }: CoverImageProps) => {
  const params = useParams();
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();
  
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  }

  const onChange = async (file?: File) => {
    if (file) {
        setIsSubmitting(true);
        setFile(file);

        const res = await edgestore.publicFiles.upload({
            file,
            options: {
            replaceTargetUrl: coverImage.url
            }
        });

        try {
            const journalDocRef = doc(collection(db, "journals"), journalUid);
            await updateDoc(journalDocRef, { cover: res.url });
            } catch (error) {
                console.error("Error updating document:", error);
        }

        onClose();
    }
  }

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">
            Cover Image
          </h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
};