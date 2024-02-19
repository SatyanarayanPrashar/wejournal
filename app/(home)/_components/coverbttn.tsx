import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import useJournalInfo from "@/hooks/active-journal-info";
import { Button } from "@/components/ui/button";
import { Check, Image } from "lucide-react";
import { useRouter } from "next/navigation";

export const coverBttn = () => {
    const { journalInfo } = useJournalInfo();
	const router = useRouter();

    return (
        <div className="flex">
            <Button
                onClick={ ()=>{
					router.push(`/home`);
                } }
                className='w-full ml-[11px] mr-[11px] hover:bg-slate-400 border justify-start'
                variant="ghost"
            >
                <Image className="h-4 w-4 mr-2" />
                Cover
            </Button>
        </div>
        
    );
}

export default coverBttn;
