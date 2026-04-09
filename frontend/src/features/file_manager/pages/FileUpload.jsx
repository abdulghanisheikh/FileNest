import { useState, useContext, useRef } from 'react'
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ThreeDots } from 'react-loader-spinner';
import { useFileManager } from '../hooks/useFileManager';
import { FileManagerContext } from '../file_manager.context';

const FileUpload = () => {
    const context = useContext(FileManagerContext);
    const {loading} = context;

    const {handleUploadFile} = useFileManager();

    const [file, setFile] = useState(null);
    const FileInputFieldRef = useRef();

    const handleUploadClick = async() => {
        const data = await handleUploadFile({file});

        const {success, message} = data;
        
        if(success) {
            toast.success(message);
        } else {
            toast.error(message);
        }

        setFile(null);
    }

    return (
        <div className='flex flex-col gap-5 relative justify-center items-center main h-screen w-full bg-zinc-100 p-10'>
            {loading && (
                <div className="flex gap-3 items-center justify-center absolute top-10 left-[50%] -translate-[50%] z-[4]">
                    <p className="text-xl font-semibold text-sky-600">Saving File</p>
                    <ThreeDots
                        visible={true}
                        height="30"
                        width="50"
                        color="blue"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            )}
            <div className='px-5 py-1 rounded-md bg-blue-500 text-white absolute top-5 right-5 cursor-pointer active:scale-[95%] duration-300 ease-in-out'>
                <Link to="/dashboard">Back to dashboard</Link>
            </div>

            <h1 className='text-3xl text-sky-950 tracking-tighter'>Upload Your File</h1>

            <div encType="multipart/form-data" className='flex border-b-4 border-r-4 border-b-black/20 border-r-black/20 flex-col duration-300 ease-linear justify-center align-center gap-2 items-center h-60 w-120 bg-white rounded-3xl p-5'>
                <label
                    className='cursor-pointer px-5 py-3 w-2/3 rounded-md outline-none border border-gray-800 truncate'
                >
                    <input
                        hidden
                        type="file"
                        name="uploaded-file"
                        ref={FileInputFieldRef}
                        onChange={() => setFile(FileInputFieldRef.current.files[0])}
                    />
                    {file ? `${file.name}` : "Choose a file"}
                </label>
                <p className="text-sm font-semibold text-black/80">Max. size 10MB</p>
                <button onClick={handleUploadClick} className="w-2/3 py-3 mt-6 duration-300 ease-in-out cursor-pointer text-blue-600 border-2 border-blue-500 rounded-xl active:scale-[95%] font-semibold hover:border-0 hover:bg-blue-600 hover:text-white">Upload</button>
            </div>

            <ToastContainer position="top-left" />
        </div>
    )
}

export default FileUpload;