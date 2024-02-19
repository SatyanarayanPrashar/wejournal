"use client";

import { useState } from "react";
import { Dialog, DialogContent,DialogHeader } from "@/components/ui/dialog";
import { useCoverImage } from "@/hooks/use-cover-image";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { db } from "@/app/firebase/config";
import { doc, collection, updateDoc } from "firebase/firestore";
import useJournalInfo from "@/hooks/active-journal-info";

export const CoverImageModal = () => {
  const coverImage = useCoverImage();

  const { journalInfo } = useJournalInfo();
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
            const journalDocRef = doc(collection(db, "journals"), journalInfo?.uid);
            await updateDoc(journalDocRef, { cover: res.url });
            } catch (error) {
                console.error("Error updating document:", error);
        }

        onClose();
    }
    window.location.reload();
  }

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">
            TODO: Cover Image
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