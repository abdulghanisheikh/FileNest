const supabase=require("../config/supabase.config");
const fileModel=require("../models/file.model.js");
const llm=require("../config/llm.config.js");
const { PDFLoader }=require("@langchain/community/document_loaders/fs/pdf");
const {Document}=require("@langchain/core/documents");
const mammoth=require("mammoth");
const { CharacterTextSplitter }=require("@langchain/textsplitters");

async function generateSummary(fileContent){
    const systemPrompt=`You are an expert document analysis and summarization agent.
    Your task is to read the provided document content and produce a clear, accurate, and structured summary.
    You must rely strictly on the given content and must not introduce external knowledge, assumptions, or opinions.

    Follow these rules carefully:
    - Do NOT hallucinate or infer information that is not explicitly present.
    - If information is missing or unclear, state that it is not specified in the document.
    - Preserve factual accuracy, terminology, and intent.
    - Be concise.
    - Use clear headings and bullet points.
    - Do not include unnecessary commentary, disclaimers, or explanations.

    Output the summary using the following structure exactly:

    1. Document Overview
    - Purpose of the document
    - Type of document (e.g., research paper, legal document, report, article, manual, etc.)
    - Intended audience (if identifiable)

    2. Key Topics and Sections
    - List the major topics or sections covered in 4-5 points.

    3. One-Paragraph Executive Summary
    - A concise paragraph summarizing the entire document for quick understanding

    Formatting rules:
    - Use markdown headings and bullet points.
    - Do not exceed necessary length; avoid repetition.
    - Do not quote large blocks of text unless essential.
    - Keep language neutral, professional, and precise.

    If the document is very long, prioritize the most important and representative information.`;
    try{
        const aiMsg=await llm.invoke([
            {role:"system",content:systemPrompt},
            {role:"user",content:fileContent}
        ]);
        return aiMsg.content;
    }
    catch(err){
        return err;
    }
}

async function extractContent(blob){
    const documentType=blob.type;
    switch(documentType){
        case "application/pdf":{
            const loader=new PDFLoader(blob,{
                splitPages:true
            });
            return await loader.load();
        }
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":{
            const buffer=Buffer.from(await blob.arrayBuffer());
            const result=await mammoth.extractRawText({buffer});
            return [
                new Document({
                    pageContent:result.value,
                    metadata:{type:"text"},
                })
            ];
        }
        case "text/plain":{
            const text=await blob.text();
            return [
                new Document({
                    pageContent:text,
                    metadata:{type:"text"},
                })
            ];
        }
        default:
            throw new Error("Unsupported file type.");
    }
}

function doChunks(docs){
    const splitter=new CharacterTextSplitter({
        chunkSize:1000,
        chunkOverlap:200
    });
    return splitter.splitDocuments(docs);
}

async function getSummary(req,res){
    try{
        const {filepath}=req.query;
        if(!filepath){
            return res.status(400).json({
                success:false,
                message:"file path is required."
            });
        }
        const metaData=await fileModel.findOne({
            path:filepath
        });
        if(!metaData){
            return res.status(400).json({
                success:false,
                message:"File does not exist."
            });
        }
        const {data:blob,error}=await supabase
        .storage
        .from("UserFiles")
        .download(metaData.path);
        if(error){
            return res.status(400).json({
                success:false,
                message:"Error in fetching file from supabase",
                error:error.toArray()
            });
        }
        const docs=await extractContent(blob);
        if(!docs||!docs[0].pageContent.trim()){
            return res.status(400).json({
                success:false,
                message:"Document contains no extractable text."
            });
        }
        const chunks=await doChunks(docs);
        let content="";
        chunks.forEach((chunk)=>{
            content+=chunk.pageContent+"\n";
        });
        const summary=await generateSummary(content);
        return res.status(200).json({
            success:true,
            message:"Summary generated successfully",
            summary
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Server error",
            error:err.message
        });
    }
}

module.exports=getSummary;