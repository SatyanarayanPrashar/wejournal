import React, { useState } from 'react';
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { useEdgeStore } from "@/lib/edgestore";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface EditorProps {
  initialContent?: string;
  editable?: boolean;
  journalUid?: string;
};

const Editor: React.FC<EditorProps> = ({ initialContent, editable, journalUid }: EditorProps) => {
  const { edgestore } = useEdgeStore();
  const [updatedContent, setUpdatedContent] = useState(initialContent);

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({ file });
    return response.url;
  }

  const onUpdate = async (uid: string | undefined, newContent: string) => {
    try {
      const journalDocRef = doc(collection(db, "journals"), uid);
      await updateDoc(journalDocRef, { about: newContent });
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleDoneClick = () => {
    if (journalUid && updatedContent) {
      onUpdate(journalUid, updatedContent);
    } else {
      console.error("journalUid or updatedContent is undefined");
    }
  };

  type BSchema = {};
  type I = {};
  type S = {};
  

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent 
      ? JSON.parse(initialContent) as PartialBlock<BSchema, I, S>[]
      : undefined,

    onEditorContentChange: (editor: { topLevelBlocks: any; }) => {
      setUpdatedContent(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload
  })

  return (
    <div className='z-[999999]'>
      <BlockNoteView
        editor={editor}
        theme="light"
      />
      <Button onClick={handleDoneClick} className='ml-[54px] hover:bg-slate-400 border' variant="ghost">
        <Check className="h-4 w-4 mr-2" />
        Save
      </Button>
    </div>
  )
}

export default Editor;
