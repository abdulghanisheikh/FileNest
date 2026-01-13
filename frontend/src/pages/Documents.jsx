import { useEffect,useState,useContext } from "react";
import axios from "axios";
import Doc from "../components/Doc";
import Navbar from "../components/Navbar";
import { ToastContainer,toast } from "react-toastify";
import {UpdateContext} from "../context/Update";
import Sidepanel from "../components/Sidepanel";
import ReactMarkdown from "react-markdown";

function Documents(){ 
	const [docs,setDocs]=useState([]);
	const [query,setQuery]=useState("");
	const [loading,setLoading]=useState(false);
	const [summary,setSummary]=useState("");
	const {setRefresh}=useContext(UpdateContext);
	const baseUrl=import.meta.env.VITE_BASE_URL;

	async function fetchFiles(){
		try{
			const {data}=await axios.get(`${baseUrl}/file/get-docs`,{
				withCredentials:true
			});
			const {success,message,files}=data;
			if(success){
				setDocs(files);
			}
			else{
				toast.error(message);
			}
		}
		catch(err){
			toast.error(err.message);
		}
	}

	async function deleteFile(filepath){
		try{
			const {data}=await axios.delete(`${baseUrl}/file/delete`,{
				data:{filepath},
				withCredentials:true
			});
			const {success,message}=data;
			if(success){
				setRefresh(true);
				fetchFiles();
			}
			else{
				toast.error(message);
			}
		}
		catch(err){
			toast.error(err.message);
		}
	}

	async function getDocumentSummary(filepath){
		try{
			setLoading(true);
			const res=await axios.get(`${baseUrl}/summarize?filepath=${filepath}`,{
				withCredentials:true
			});
			const {success,message,summary}=res.data;
			if(success){
				setSummary(summary);
			}
			else toast.error(message);
		}
		catch(err){
			toast.error(err.response?.data?.message);
		}
		finally{
			setLoading(false);
		}
	}

	useEffect(()=>{
		fetchFiles();
	},[]);
	 
	const filteredDocs=docs.filter((doc)=>{
		return doc.originalname.toLowerCase().includes(query.toLowerCase());
	});
	return(
		<div className='flex w-full gap-5 bg-zinc-100'>
			<Sidepanel />
			<div className='flex flex-col w-[80%] rounded-md gap-1'>
				<Navbar query={query} setQuery={setQuery}/>
				<div className='main flex flex-col p-5 gap-5 bg-blue-100 min-h-screen rounded-md justify-start'>
					<h1 className="text-4xl">Documents</h1>
					<div className='relative flex gap-2 flex-wrap justify-start w-full'>
						{summary&&(
							<div className="h-100 w-1/2 py-5 px-10 bg-blue-950 rounded-lg text-white absolute top-1/2 left-1/2 -translate-1/2 z-[5] overflow-auto">
								<ReactMarkdown>{summary}</ReactMarkdown>
							</div>
						)}
						{filteredDocs.length===0?<p className="text-sm">No documents uploaded yet.</p>:
						filteredDocs.map((doc,id)=>{
							return <Doc
							key={id}
							getSummary={()=>getDocumentSummary(doc.path)}
							filename={doc.originalname}
							filesize={doc.fileSize}
							filetype={doc.fileType}
							addedOn={doc.addedOn}
							publicUrl={doc.publicUrl}
							deleteFile={()=>deleteFile(doc.path)}
							/>
						})}
					</div>
				</div>
			</div>
			<ToastContainer position="top-left"/>
		</div>
	);
}

export default Documents;