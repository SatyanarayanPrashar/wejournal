import Image from "next/image";

export const Heroes_one = () => {

  return (
    <>
      <p className="font-bold text-[30px] mt-[5rem]">Personalize Your Journal, Your Way</p>
      <p className="w-[1000px] text-[18px] mt-[0.4rem]">Craft your journal with personal touches – from images to font styles and colors. Customize every detail to reflect your unique journey, making each entry a cherished memory.</p>
      <div className="flex flex-col items-center justify-center relative">
        <div className="relative w-[1200px] h-[510px] mt-[2rem]">
          <Image
            src="/p_cover.png"
            fill
            className="object-contain"
            alt="Documents"
          />
        </div>
      </div>
      <div className="h-[100px] w-full z-10 p-10">
      </div>
    </>
  )
}
