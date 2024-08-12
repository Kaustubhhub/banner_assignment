"use client"
import { BACKEND_URL } from "@/app/config";
import axios from "axios";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import CountdownTimer from "./CountdownTimer";
export const Banner = () => {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [endTime, setEndTime] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const fetchBannerData = async () => {
            const bannerData = await getBanner();
            setTitle(bannerData?.title ?? '')
            setDescription(bannerData?.description ?? '')
            setLink(bannerData?.link ?? '')
            setEndTime(bannerData?.endTime ?? '')
            setIsVisible(bannerData?.isVisible ?? false)
        };

        fetchBannerData();
    }, [])

    const getBanner = async () => {
        const response = await axios.get(`${BACKEND_URL}/admin`)
        console.log('response', response);
        return response.data.data;
    }

    return <div>
        <div className="p-2 flex justify-end">
            <button
                className="bg-slate-800 p-3 px-5 rounded-lg text-white "
                onClick={() => {
                    router.push('/internal_dashboard')
                }}
            >
                Internal Dashboard
            </button>
        </div>
        {isVisible &&
            <div className="flex justify-center">

                <div className="flex justify-around border border-black w-3/4 h-[200px] rounded-lg bg-[#DC2626]">
                    <div className=" w-6/12 p-10">
                        <div className="text-3xl font-bold flex justify-center text-white">
                            {title}
                        </div>
                        <div className="flex justify-center text-2xl font-bold text-white">

                            {description}
                        </div>
                        <div className="p-2 flex justify-center">
                            <button
                                className="bg-slate-800 p-3 px-5 rounded-lg text-white"
                                onClick={() => {
                                    window.open(link, '_blank');
                                }}
                            >
                                link
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="flex items-center justify-center bg-red-800 p-4 rounded-lg">
                            <CountdownTimer initialEndTime={endTime} setIsVisible={setIsVisible} />
                        </div>
                    </div>
                </div>
            </div>
        }

    </div>
}