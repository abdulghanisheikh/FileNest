const supabase=require("../config/supabase.config");
const fileModel=require("../models/file.model.js");
const llm=require("../config/llm.config.js");
const { PDFLoader }=require("@langchain/community/document_loaders/fs/pdf");
const {Document}=require("@langchain/core/documents");
const mammoth=require("mammoth");
const { CharacterTextSplitter }=require("@langchain/textsplitters");

async function generateSummary(fileContent){
    const systemPrompt=`You are a helpful and expert document summarization assistant.

Your task is to summarize the given document text in a **concise, well-structured, well-indented Markdown format**.

Strict rules:
- The summary MUST be significantly shorter than the original content.
- Use ONLY the information present in the document.
- Do NOT add assumptions, interpretations, or external knowledge.
- Be precise, factual, and concise.
- If something is unclear or missing, state “Not specified in the document.”

Formatting rules:
- Make the section's title bold and large
- Use Markdown headings and bullet points.
- Keep sections minimal.
- There must be two new lines after every section.
- Avoid long paragraphs.
- Prefer short bullet points.

Use the following structure ONLY:

## Overview
- Purpose and type of the document (if identifiable) \n\n

## Key Points
- Main ideas, arguments, or findings
- Important facts or details (only if relevant)  \n\n

## Conclusion
- Final outcome, conclusion, or takeaway (if any)

If the document is very short, keep the summary proportionally short.`;
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