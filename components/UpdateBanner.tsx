"use client"

import { BACKEND_URL } from "@/app/config";
import axios from "axios";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export const UpdateBanner = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [endTime, setEndTime] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter()

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

        return response.data.data;
    }

    const handleSave = async () => {
        const objToPush = {
            title,
            description,
            link,
            endTime,
            isVisible
        }

        const response = await axios.post(`${BACKEND_URL}/admin`, objToPush);
        console.log('response', response);
        if (response.status == 200) {
            alert("banner data updated successfully")
        }
    };

    return (
        <div className="border rounded-lg border-slate-700 w-3/6">
            <div className="p-2 flex justify-end">
                <button
                    className="bg-slate-800 p-3 px-5 rounded-lg text-white"
                    onClick={() => {
                        router.push('/')
                    }}
                >
                    go to banner page
                </button>
            </div>
            <div className="text-xl font-semibold p-4">
                Enter Banner Details
            </div>
            <div className="p-4">
                <label className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="p-4">
                <label className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div className="p-4">
                <label className="block mb-2 text-sm font-medium text-gray-900">Link</label>
                <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    required
                />
            </div>
            <div className="p-4">
                <label className="block mb-2 text-sm font-medium text-gray-900">Endtime (in seconds)</label>
                <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Endtime"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                />
            </div>
            <div className="flex items-center p-4">
                <input
                    checked={isVisible}
                    id="checked-checkbox"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    onChange={(e) => setIsVisible(e.target.checked)}
                />
                <label className="ms-2 text-sm font-medium text-gray-900">
                    Should banner be visible
                </label>
            </div>
            <div className="p-4">
                <button
                    className="bg-slate-800 p-3 px-5 rounded-lg text-white"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    );
};
