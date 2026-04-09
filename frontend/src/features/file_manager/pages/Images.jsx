import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../../components/Navbar";
import Doc from "../../../components/Doc";
import Sidepanel from "../../../components/Sidepanel";
import { FileManagerContext } from '../file_manager.context';
import { useFileManager } from '../hooks/useFileManager';

const Images = () => {
    const [query, setQuery] = useState("");

    const context = useContext(FileManagerContext);
    const {imageFiles} = context;

    const {handleFetchImages, handleFileDelete} = useFileManager();

    const deleteFile = async(filepath) => {
		const data = await handleFileDelete({filepath});
		const {success, message} = data;

		if(success) {
			toast.success(message);
            await handleFetchImages();
		} else {
			toast.error(message);
		}
	}

    useEffect(() => {
        handleFetchImages();
    }, []);

    const filteredImages = imageFiles.filter((image) => {
        return image.originalname.toLowerCase().includes(query.toLowerCase());
    });
    return (
        <div className='flex w-full min-h-screen bg-zinc-100'>
            <Sidepanel />
            <div className='flex flex-col min-h-screen w-[80%] rounded-md gap-1'>
                <Navbar query={query} setQuery={setQuery} />
                <div className='main flex flex-col p-5 gap-5 rounded-md min-h-screen justify-around'>
                    <h1 className="text-4xl">Images</h1>
                    <div className='flex gap-2 flex-wrap justify-start h-full w-full'>
                        {filteredImages.length === 0 ? <p className='text-sm'>No image uploaded yet.</p> :
                            filteredImages.map((item, idx) => {
                                return <Doc
                                    key={idx}
                                    filename={item.originalname}
                                    filesize={item.fileSize}
                                    filetype={item.fileType}
                                    addedOn={item.addedOn}
                                    publicUrl={item.publicUrl}
                                    deleteFile={() => deleteFile(item.path)}
                                />
                            })}
                    </div>
                </div>
            </div>
            <ToastContainer position="top-left" />
        </div>
    )
}

export default Images;