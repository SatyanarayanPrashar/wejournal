import { cn } from "@/lib/utils";
import Image from "next/image";
import { useMediaQuery } from "usehooks-ts";

export const Heroes_one = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <p className="font-bold text-[30px] mt-[5rem]">Personalize Your Journal, Your Way</p>
      {/* <p className="w-[1000px] text-[18px] mt-[0.4rem]">Craft your journal with personal touches – from images to font styles and colors. Customize every detail to reflect your unique journey, making each entry a cherished memory.</p> */}
      <p className="text-[18px] mt-[0.4rem] lg:w-[1200px] sm:w-[350px] md:w-[400px]">Craft your journal with personal touches – from images to font styles and colors. Customize every detail to reflect your unique journey, making each entry a cherished memory.</p>
      <div className="flex flex-col items-center justify-center relative">
        <div className={cn("relative lg:w-[1200px] lg:h-[510px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]", isMobile && "h-[15rem] w-[20rem]")}>
          <Image
            src="/p_cover.png"
            fill
            className="object-contain"
            alt="Documents"
          />
        </div>
      </div>
    </>
  )
}
