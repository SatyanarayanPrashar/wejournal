
import useJournalInfo from "@/hooks/active-journal-info";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";
import { useRouter } from "next/navigation";

export const CoverBttn = () => {
    const { journalInfo } = useJournalInfo();
	const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-center">
                <div className="ml-[11px]" >
                    {journalInfo?.uid}
                </div>
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
        </>
    );
}

export default CoverBttn;
