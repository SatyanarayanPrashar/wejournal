"use client"

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { generateDate, months } from "@/lib/calender";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { cn } from "@/lib/utils";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { db } from "@/app/firebase/config";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import useJournalInfo from "@/hooks/active-journal-info";

export default function Calender() {
    const days =["S", "M", "T", "W", "T", "F", "S"];
	const { journalInfo } = useJournalInfo();
    const currentDate = dayjs();
    const [today, setToday] = useState(currentDate);
    const [selectDate, setSelectDate] = useState(currentDate);
	const router = useRouter();
	
	const handleDateSelect = (date: dayjs.Dayjs) => {
		setSelectDate(date);
	};
	
	useEffect(() => {
		onSelect();
	}, [selectDate]); 

	const onSelect = async () => {
		if(journalInfo?.uid){
			const selectDateComponents = {
				day: selectDate.date(),
				month: selectDate.month(),
				year: selectDate.year()
			};
			const todayComponents = {
				day: today.date(),
				month: today.month(),
				year: today.year()
			};
			if (
				selectDateComponents.day === todayComponents.day &&
				selectDateComponents.month === todayComponents.month &&
				selectDateComponents.year === todayComponents.year
			) {
				create();
			} else if (selectDate > today) {
				toast.info("One day we will :)");
			} else {
				check(selectDate);
			}
		} else{
			return
		}
	};

	const check = async (selectedDate: dayjs.Dayjs | undefined) => {
		if(journalInfo?.uid){
			if (!selectedDate) return;
	
			const year = selectedDate.year();
			const month = String(selectedDate.month() + 1).padStart(2, '0');
			const day = String(selectedDate.date()).padStart(2, '0');
			const dateString = `${day}-${month}-${year}`;
	
			const journalCollectionRef = collection(db, "journals", journalInfo?.uid ? journalInfo?.uid : "unknown", "journal");
		
			const journalDocRef = doc(
				journalCollectionRef, 
				dateString
			);
		
			try {
				const docSnap = await getDoc(journalDocRef);
				if (docSnap.exists()) {
					router.push(`/home/${dateString}`);
				} else {
					toast.error("We were not here :(");
				}
			} catch (error) {
				toast.error("Error checking document:");
			}
		} else{
			return
		}
	}

	const create = async () => {
		const journalCollectionRef = collection(db, "journals", journalInfo?.uid ? journalInfo?.uid : "unknown", "journal");
		const year = today.year();
		const month = String(today.month() + 1).padStart(2, '0');
		const day = String(today.date()).padStart(2, '0');
		const dateString = `${day}-${month}-${year}`;
	
		const todayDocRef = doc(journalCollectionRef, dateString);
		
		try {
			const docSnap = await getDoc(todayDocRef);
			if (docSnap.exists()) {
				router.push(`/home/${dateString}`);
			} else {
				await setDoc(todayDocRef, {
					content1: "",
					content2: "",
					entrydate: dateString,
				});
				router.push(`/home/${dateString}`);
			}
		} catch (error) {
			toast.error("An error occured");
		}
	}

	const OpenToday = async () => {
		if(journalInfo?.uid) {
			const journalCollectionRef = collection(db, "journals", journalInfo?.uid ? journalInfo?.uid : "unknown", "journal");
			const year = today.year();
			const month = String(today.month() + 1).padStart(2, '0');
			const day = String(today.date()).padStart(2, '0');
			const dateString = `${day}-${month}-${year}`;
			const todayDocRef = doc(journalCollectionRef, dateString);
			
			try {
				const docSnap = await getDoc(todayDocRef);
				if (docSnap.exists()) {
					router.push(`/home/${dateString}`);
				} else {
					await setDoc(todayDocRef, {
						content1: "",
						content2: "",
						entrydate: dateString,
					});
					router.push(`/home/${dateString}`);
				}
			} catch (error) {
				toast.error("An error occured");
			}
		} else{
			return
		}
	}

    return (
		<div className="flex gap-11 sm:divide-x justify-center sm:w-1 mx-auto items-center sm:flex-row flex-col">
            <div className="mt-4">
                <div className="flex justify-between items-center">
                    <GrFormPrevious
                        className="w-5 h-5 cursor-pointer hover:scale-105 transition-all ml-[-20px]"
						onClick={() => {
							console.log("trigger1");
							setToday(today.month(today.month() - 1));
						}}
					/>
                    <h1 className="select-none ml-[-20px]">
						{months[today.month()].substring(0, 3)}, {today.year()}
                    </h1>
					<GrFormNext
						className="w-5 h-5 cursor-pointer hover:scale-105 transition-all ml-[-20px]"
						onClick={() => {
							console.log("trigger3");
							setToday(today.month(today.month() + 1));
						}}
					/>
                    <div className="flex items-center">
                        <h1
							className="cursor-pointer hover:scale-105 transition-all font-semibold"
							onClick={() => {
								setToday(currentDate);
								OpenToday();
							}}
						>
							Open Today
						</h1>
                    </div>
                </div>
                <div className="gap-x-10 grid grid-cols-7 ">
					{days.map((day, index) => {
						return (
							<h1
								key={index}
								className="text-sm text-center h-14 grid place-content-center text-gray-500 select-none"
							>
								{day}
							</h1>
						);
					})}
				</div>

                <div className="gap-x-10  grid grid-cols-7 ">
					{generateDate(today.month(), today.year()).map(
						({ date, currentMonth, today }, index) => {
							return (
								<div
									key={index}
									className="p-2 text-center h-14 grid place-content-center text-sm border-t"
								>
									<h1
										className={cn(
											currentMonth ? "" : "text-gray-400",
											// today
											// 	? "bg-blue-400 text-white"
											// 	: "",
											selectDate.toDate().toDateString() === date.toDate().toDateString()
												? "bg-violet-400 text-white"
												: "",
											"h-10 w-10 rounded-full grid place-content-center hover:bg-gray-400 hover:text-white transition-all cursor-pointer select-none"
										)}
										onClick={ () => {
											handleDateSelect(date);
										}}										
									>
										{date.date()}
									</h1>
								</div>
							);
						}
					)}
				</div>
            </div>
        </div>
    )
}