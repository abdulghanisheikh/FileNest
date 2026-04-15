import ReactMarkdown from "react-markdown";
import { SiGooglegemini } from "react-icons/si";

const SummaryComponent = ({ summary, setSummary }) => {
  return (
    <div className="h-120 w-1/2 pl-5 pr-4 py-3 bg-white rounded-lg text-black absolute top-1/2 left-1/2 -translate-1/2 z-[4] flex flex-col gap-3">
      <div
        className="h-fit w-fit cursor-pointer absolute -top-8 right-3 shadow-sm shadow-black/50 hover:shadow-none duration-300 active:scale-95 ease-in-out rounded-md px-3 py-0.2 bg-sky-700 text-white"
        onClick={() =>
          setSummary({
            docName: "",
            summary: "",
          })
        }
      >
        Close
      </div>
      <div className="flex items-center gap-2 w-fit">
        <p className="text-xl font-semibold">{`Summary of ${summary.documentName}`}</p>
        <SiGooglegemini size={20} />
      </div>
      <div className="overflow-auto">
        <ReactMarkdown
          components={{
            p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
            ul: ({children}) => <p className="mb-2 list-disc pl-5">{children}</p>,
            ol: ({children}) => <p className="mb-2 list-decimal pl-5">{children}</p>,
            code: ({children}) => <code className="rounded bg-white/10 px-1 py-0.5">{children}</code>,
            pre: ({children}) => <pre className="mb-2 overflow-x-auto rounded-xl bg-black/30 p-3">{children}</pre>
          }}
          >
            {summary.summary}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default SummaryComponent;
