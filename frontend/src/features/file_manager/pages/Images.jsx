import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../shared/components/Navbar";
import Doc from "../../../app/components/Doc";
import Sidepanel from "../../../app/components/Sidepanel";
import { FileManagerContext } from '../file_manager.context';
import { useFileManager } from '../hooks/useFileManager';
import DeleteConfirmation from '../components/DeleteConfirmation';

const Images = () => {
    const [query, setQuery] = useState("");
    const [fileToDelete, setFileToDelete] = useState(null);

    const context = useContext(FileManagerContext);
    const {imageFiles, loading} = context;

    const {handleFetchImages, handleFileDelete} = useFileManager();

    const handleConfirmDelete = async(doc) => {
		const data = await handleFileDelete(doc.path);

		const {success, message} = data;

		if(success) {
			toast.success(message);
			setFileToDelete(null);

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
        <div className='flex w-full min-h-screen bg-zinc-100 relative'>
            {fileToDelete && (
				<div
				onClick={() => setFileToDelete(null)}
				className="absolute inset-0 w-full h-full bg-black/10 z-[3] backdrop-blur-xs"
				>
				</div>
			)}

            <Sidepanel />

            <div className='flex flex-col min-h-screen w-[80%] rounded-md gap-1'>
                <Navbar query={query} setQuery={setQuery} />

                <div className='main flex flex-col p-5 gap-5 rounded-md min-h-screen justify-around'>
                    <h1 className="text-4xl">Images</h1>

                    {fileToDelete && (
                        <div className="absolute top-1/2 left-1/2 -translate-1/2 z-[5]">
                            <DeleteConfirmation 
                                isOpen={Boolean(fileToDelete)}
                                loading={loading}
                                onConfirm={() => handleConfirmDelete(fileToDelete)}
                                onCancel={() => setFileToDelete(null)}
                                filename={fileToDelete?.originalname}
                            />
                        </div>
					)}

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
                                    deleteFile={() => setFileToDelete(item)}
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