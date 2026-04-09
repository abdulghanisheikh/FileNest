import React, { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../shared/components/Navbar";
import Sidepanel from "../../../components/Sidepanel";
import Doc from "../../../components/Doc";
import { FileManagerContext } from '../file_manager.context';
import { useFileManager } from '../hooks/useFileManager';

const Media = () => {
	const [query, setQuery] = useState("");

	const context = useContext(FileManagerContext);
	const {mediaFiles} = context;

	const {handleFetchMedia, handleFileDelete} = useFileManager();

	const deleteFile = async(filepath) => {
		const data = await handleFileDelete({filepath});

		const {success, message} = data;

		if(success) {
			toast.success(message);
			await handleFetchMedia();
		} else {
			toast.error(message);
		}
	}

	useEffect(() => {
		handleFetchMedia();
	}, []);

	//No need of state as it is derived from query and media files
	const filteredMedia = mediaFiles.filter((media) => {
		return media.originalname.toLowerCase().includes(query.toLowerCase());
	});

	return (
		<div className='flex w-full min-h-screen bg-zinc-100'>
			<Sidepanel />
			<div className='flex flex-col min-h-screen w-[80%] rounded-md gap-1'>
				<Navbar query={query} setQuery={setQuery} />
				<div className='main flex flex-col p-5 gap-5 rounded-md min-h-screen justify-around'>
					<h1 className="text-4xl">Multimedia</h1>
					<div className='flex gap-2 flex-wrap justify-start h-full w-full'>
						{filteredMedia.length === 0 ? <p className='text-sm'>No file uploaded yet.</p> :
							filteredMedia.map((item, id) => {
								return <Doc
									key={id}
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
	);
}

export default Media;