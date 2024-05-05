import Image from "next/image";

export const Heroes_two = () => {

  return (
    <>
        <p className="font-bold text-[30px] mt-[1rem]">A Privacy First Journal for you and your partner</p>
        <p className="text-[18px] mt-[0.4rem]">Enjoy a safe space for you and your partner to share, connect, and reminisce, away from prying eyes.</p>
        <div className="flex flex-col items-center justify-center relative">
            <div className="relative w-[1200px] h-[510px] mt-[2rem]">
            <Image
                src="/p_journal.png"
                fill
                className="object-contain"
                alt="Documents"
            />
            </div>
        </div>
        <div className="h-[100px] w-full z-10 p-10"></div>
    </>
  )
}
