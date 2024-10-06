"use client"

import { BiLoaderCircle, BiSolidCloudUpload } from "react-icons/bi";
import TopNav from "../layouts/includes/TopNav";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useState } from "react";
import { UploadError } from "../types";
import Image from 'next/image'

export default function Post () {

    let [caption, setCaption] = useState<string>('');
    let [error, setError] = useState<UploadError | null> (null);
    let [uploadingToDeso, setUploadingToDeso] = useState<boolean>(false);
    let [fileDisplay, setFileDisplay] = useState<string>('');
    let [file, setFile] = useState<File | null> (null);
    
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0 ) {
            const file = files[0];
            const fileURL = URL.createObjectURL(file);
            setFileDisplay(fileURL);
            setFile(file);
        }
    }

    const discard = () => {
        setFileDisplay("")
        setFile(null)
        setCaption("")
    }

    const clearPicture = () => {
        setFileDisplay("")
        setFile(null)
    }

    const createNewPost = async () => {
        setUploadingToDeso(true)
        
        
        }


    return(
        <div className="flex flex-col items-center justify-between">
      <TopNav />
      <div className="mt-20 mb-6 items-center flex flex-col w-full">
                       
        <p className="text-lg text-sky-200 text-center mb-10">List your item to sell</p>
            
               {!fileDisplay ? (
                        <label
                            htmlFor="fileInput"
                            className="md:mx-0 mx-auto mt-4 mb-6 flex flex-col items-center w-full max-w-[600px] h-[300px] text-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-slate-500 cursor-pointer"
                            >
                                <BiSolidCloudUpload size="40" className="mt-10 text-sky-200" />
                                <p className="mt-6 text-[17px] text-sky-200">Select picture to upload</p>
                                
                                <label
                                    htmlFor="fileInput"
                                    className="mt-20 px-2 py-1.5 mt-8 text-sky-200 w-[80%] bg-slate-600 hover:bg-slate-800 rounded-md cursor-pointer"
                                    >
                                    Select file
                                </label>
                                <input
                                    type="file"
                                    id="fileInput"
                                    onChange={onChange}
                                    hidden
                                    accept="image/*"
                                />
                        </label>
                    ): (
                        <div
                            className="md:mx-0 mx-auto mt-4 mb-6 flex flex-col items-center w-full max-w-[600px] h-[310px] text-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-slate-500 cursor-pointer"
                            >
                                {uploadingToDeso ? (
                                    <div className="absolute flex items-center justify-center z-20 bg-black h-full w-full rounded-[50px] bg-opacity-50">
                                        <div className="mx-auto flex items-center justify-center gap-1">
                                            <BiLoaderCircle className="animate-spin text-sky-200" size={30} />
                                            <div className="text-sky-200 font-bold">Uploading...</div>
                                        </div>
                                    </div>
                                ) : null } 

                                <img
                                    className="flex pointer-events-none h-60"
                                    src={fileDisplay}

                                    />
            
                                
                            
                                <div className="flex items-center justify-between z-50 rounded-xl border w-full p-2 m-2 border-sky-200">
                                    <div className="flex items-center truncate">
                                        <AiOutlineCheckCircle size="16" className="min-w-[16px] text-sky-200" />
                                        <p className="text-[11px] text-sky-200 pl-1 truncate text-ellipsis">
                                            {file ? file.name : ''}
                                        </p>
                                    </div>
                                    <button onClick={() => clearPicture()} className="text-[11px] ml-2 text-sky-200 font-semibold">
                                        Change
                                    </button>
                                </div>
                        </div>
                    )}
                        <div className="flex flex-col mt-5 w-full items-center w-full">
                            <div className="flex items-center text-center justify-between w-full">
                                <div className="w-3/5 mb-1 text-[15px] text-sky-200">Description</div>
                                <div className="w-3/5 text-sky-200 text-[12px]">{caption.length}/5000</div>
                            </div>
                            <textarea
                                id="body"
                                maxLength={5000}
                                rows={3}
                                className="w-3/5 border p-2.5 rounded-md focus:outline-none text-sky-200 bg-slate-800"
                                value={caption}
                                onChange={event => setCaption(event.target.value)}
                                 />
                        </div>
                        <div className="flex gap-3">
                            <button
                                disabled={false}
                                onClick={() => discard()}
                                className="px-10 py-2.5 mt-8 border text-[16px] text-sky-200 hover:bg-slate-500 rounded-sm">
                                    Discard
                            </button>
                            <button
                                disabled={false}
                                onClick={() => createNewPost()}
                                className="px-10 py-2.5 mt-8 border text-[16px] text-sky-200 hover:bg-slate-500 rounded-sm">
                                    {uploadingToDeso ? <BiLoaderCircle className="animate-spin" color="#ffffff" size={25} /> : 'Post'}
                            </button>
                        </div>

                        {error ? (
                            <div className="text-red-600 mt-4">
                                {error.message}
                            </div>
                        ): null }
                    </div>
     
    </div>
    )
}