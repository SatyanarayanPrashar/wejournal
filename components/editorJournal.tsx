import React, { useState } from 'react';
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { useEdgeStore } from "@/lib/edgestore";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { Button } from './ui/button';
import { Check } from 'lucide-react';
import useJournalInfo from '@/hooks/active-journal-info';

interface EditorProps {
  userRole?: string;
  initialContent?: string;
  editable?: boolean;
  journalUid?: string;
  dateString?: string;
};

const EditorJournal: React.FC<EditorProps> = ({ userRole, initialContent, editable, journalUid, dateString }: EditorProps) => {
  const { edgestore } = useEdgeStore();
  const [updatedContent, setUpdatedContent] = useState(initialContent);
	const { journalInfo } = useJournalInfo();


  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({ file });
    return response.url;
  }
 
  const onUpdate = async (uid: string | undefined, newContent: string) => {
    const journalCollectionRef = collection(db, "journals", journalInfo?.uid ? journalInfo?.uid : "unknown", "journal");
    const todayDocRef = doc(journalCollectionRef, dateString);
    try {
      if(userRole == "content1"){
        await updateDoc(todayDocRef, { "content1" : newContent });
        console.log(userRole);
      }
      else if(userRole == "content2"){
        await updateDoc(todayDocRef, { "content2" : newContent });
        console.log(userRole);
      } else{
        return;
      }
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
      <Button onClick={handleDoneClick} className='pl-[54px]' variant="ghost">
        <Check className="h-4 w-4 mr-2" />
        Save
      </Button>
    </div>
  )
}

export default EditorJournal;
