import React, { useState } from 'react';
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { useEdgeStore } from "@/lib/edgestore";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { Button } from './ui/button';
import { Check } from 'lucide-react';

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
  journalUid?: string;
};

const EditorJournal: React.FC<EditorProps> = ({ onChange, initialContent, editable, journalUid }: EditorProps) => {
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
      <BlockNoteView className='z-[999999]'
        editor={editor}
        theme="light"
      />
      <Button onClick={handleDoneClick} className='pl-[54px]' variant="ghost">
        <Check className="h-4 w-4 mr-2" />
        Save
      </Button>
    </div>
  )
}

export default EditorJournal;
