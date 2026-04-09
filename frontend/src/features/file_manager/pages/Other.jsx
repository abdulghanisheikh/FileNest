import { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../shared/components/Navbar";
import Sidepanel from "../../../components/Sidepanel";
import Doc from "../../../components/Doc";
import {FileManagerContext} from "../file_manager.context.jsx";
import { useFileManager } from '../hooks/useFileManager';

const Other = () => {
    const [query, setQuery] = useState("");

    const context = useContext(FileManagerContext);
    const {otherFiles} = context;

    const {handleFetchOtherFiles, handleFileDelete} = useFileManager();

    const deleteFile = async(filepath) => {
        const data = await handleFileDelete({filepath});
        const {success, message} = data;

        if(success) {
            toast.success(message);
            await handleFetchOtherFiles();
        } else {
            toast.error(message);
        }
    }

    useEffect(() => {
        handleFetchOtherFiles();
    }, []);

    const filteredFiles = otherFiles.filter((file) => {
        return file.originalname.toLowerCase().includes(query.toLowerCase());
    });

    return (
        <div className='flex w-full min-h-screen bg-zinc-100'>
            <Sidepanel />
            <div className='flex flex-col min-h-screen w-[80%] rounded-md gap-1'>
                <Navbar query={query} setQuery={setQuery} />
                <div className='main flex flex-col p-5 gap-5 rounded-md min-h-screen justify-around'>
                    <h1 className="text-4xl">Others</h1>
                    <div className='flex gap-2 flex-wrap justify-start h-full w-full'>
                        {filteredFiles.length === 0 ? <p className='text-sm'>No file uploaded yet.</p> :
                            filteredFiles.map((item, id) => {
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

export default Other;