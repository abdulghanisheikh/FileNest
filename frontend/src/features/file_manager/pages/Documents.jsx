import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Doc from "../../../components/Doc";
import Navbar from "../../../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import Sidepanel from "../../../components/Sidepanel";
import SummaryComponent from "../../../components/SummaryComponent";
import { ThreeDots } from "react-loader-spinner";
import { useFileManager } from "../hooks/useFileManager";
import { FileManagerContext } from "../file_manager.context";

function Documents() {
  const [query, setQuery] = useState("");
  const [summary, setSummary] = useState({
    docName: "",
    summary: "",
  });

  const {handleFetchDocs, handleFileDelete} = useFileManager();

  const context = useContext(FileManagerContext);
  const {loading, docs} = context;

  const deleteFile = async(filepath) => {
	const data = await handleFileDelete({filepath});
	const {success, message} = data;

	if(success) {
		toast.success(message);
	} else {
		toast.error(message);
	}
  }

  async function getDocumentSummary(filepath, filename) {
    try {
      setLoading(true);
      const {data} = await axios.get(`${baseUrl}/summarize?filepath=${filepath}`, {
        withCredentials: true,
      });

      const { success, message, summary } = data;

      if (success) {
        setSummary({
          documentName: filename,
          summary,
        });
      } else toast.error(message);
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleFetchDocs();
  }, []);

  const filteredDocs = docs.filter((doc) => {
    return doc.originalname.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="flex w-full relative min-h-screen bg-zinc-100">
      {summary.summary && (
        <div onClick={() => setSummary({
          docName: "",
          summary: ""
        })} className="absolute inset-0 w-full h-full bg-black/50 z-[3] backdrop-blur-sm"></div>
      )}

      <Sidepanel />
      <div className="flex flex-col w-[80%] rounded-md gap-1">

        <Navbar query={query} setQuery={setQuery} />

        <div className="main flex flex-col p-5 gap-5 rounded-md justify-start">
          <h1 className="text-4xl">Documents</h1>
          <div className="flex gap-2 flex-wrap justify-start w-full">

            {loading ? (
              <div className="flex gap-3 items-center justify-center absolute top-1/2 left-1/2 -translate-1/2 z-[4] bg-white text-black py-0.5 px-3 rounded-md shadow-md shadow-black/30">
                <p className="text-lg">Generating</p>
                <ThreeDots
                  visible={true}
                  height="20"
                  width="40"
                  color="black"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            ) : (
              summary.summary && (
                <SummaryComponent summary={summary} setSummary={setSummary} />
              )
            )}

            {filteredDocs.length === 0 ? (
              <p className="text-sm">No documents uploaded yet.</p>
            ) : (
              filteredDocs.map((doc, index) => {
                return (
                  <Doc
                    key={index}
                    getSummary={() =>
                      getDocumentSummary(doc.path, doc.originalname)
                    }
                    filename={doc.originalname}
                    filesize={doc.fileSize}
                    filetype={doc.fileType}
                    addedOn={doc.addedOn}
                    publicUrl={doc.publicUrl}
                    deleteFile={() => deleteFile(doc.filepath)}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
      <ToastContainer position="top-left" />
    </div>
  );
}

export default Documents;