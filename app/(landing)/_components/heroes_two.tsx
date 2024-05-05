import { cn } from "@/lib/utils";
import Image from "next/image";
import { useMediaQuery } from "usehooks-ts";

export const Heroes_two = () => {
const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
        <p className="font-bold text-[30px] mt-[1rem] flex flex-col justify-center items-center text-center">A Privacy First Journal for you and your partner</p>
        <p className="text-[18px] mt-[0.4rem]">Enjoy a safe space for you and your partner to share, connect, and reminisce, away from prying eyes.</p>
        <div className="flex flex-col items-center justify-center relative">
        <div className={cn("relative lg:w-[1200px] lg:h-[510px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]", isMobile && "h-[15rem] w-[20rem]")}>
            <Image
                src="/p_journal.png"
                fill
                className="object-contain"
                alt="Documents"
            />
            </div>
        </div>
    </>
  )
}
