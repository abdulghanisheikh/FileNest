const supabase = require("../config/supabase.config");
const fileModel=require("../models/file.model.js");
const {ChatGroq}=require("@langchain/groq");

async function generateSummary(fileContent){
    const systemPrompt=`You are helpful AI Assistant who summarize the following document's content using the EXACT structure below:
    ## 📝 Short Summary
    - 4-6 sentences summarizing the entire document.
    ## 🔑 Key Points / Insights
    - 5-10 bullet points
    - Each bullet should be clear and concise
    ## 🎯 Overall Purpose
    - 2-3 sentences describing the document's main purpose
    Do NOT add any introduction or phrases like "Here is the summary".
    Do NOT wrap the output in backticks or markdown code blocks.

    Document content: ${fileContent}`;
    try{
        const llm=new ChatGroq({
            apiKey:process.env.GROQ_API_KEY,
            model:"openai/gpt-oss-120b",
            temperature:0,
            maxRetries:2
        });
        const aiMsg=await llm.invoke({
            role:"assistant",
            content:systemPrompt
        },{
            role:"user",
            content:fileContent
        });
        console.log(aiMsg);
    }
    catch(err){
        return err.message;
    }
}

async function extractContent(blob,fileType){
    try{
        let buffer;
        if(blob instanceof Uint8Array){
            buffer=Buffer.from(blob);
        }
        else{
            const bufferArray=await blob.arrayBuffer();
            buffer=Buffer.from(bufferArray);
        }
        if(fileType==="application/pdf"){
            const pdf=require("pdf-parse");
            const pdfData=await pdf(buffer);
            return pdfData.text||"";
        }
        if(fileType==="text/plain"||fileType==="application/json"||fileType==="text/markdown"){
            return buffer.toString("utf8");
        }
        if(fileType==="application/msword"||fileType==="application/vnd.ms-powerpoint"){
            const textract=require("textract");
            return await new Promise((resolve,reject)=>{
                textract.fromBufferWithMime(fileType,buffer,(error,text)=>{
                    if(error) return reject(error);
                    resolve(text||"");
                });
            });
        }
        if(fileType==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"){ //docx
            const mammoth=require("mammoth");
            const data=await mammoth.extractRawText({buffer});
            return data.value;
        }
        if(fileType.includes("presentationml")){ //pptx
            const officeParser=require("officeparser");
            return await new Promise((resolve,reject)=>{
                officeParser.parseOfficeAsync(buffer,(error,text)=>{
                    if(error) return reject(error);
                    resolve(text||"");
                });
            });
        }
        return "Unsupported file format";
    }
    catch(err){
        console.error("Extraction Error");
        return err;
    }
}

async function getSummary(req,res){
    try{
        const {filePath}=req.body;
        if(!filePath){
            return res.status(400).json({
                success:false,
                message:"Filepath is required."
            });
        }
        const file=await fileModel.findOne({
            path:filePath
        });
        if(!file){
            return res.status(400).json({
                success:false,
                message:"File does not exist."
            });
        }
        const {data,error}=await supabase.storage.from("UserFiles").download(file.path);
        if(error){
            return res.status(400).json({
                success:false,
                message:"failed to download file from supabase."
            });
        }
        const fileContent=await extractContent(data,file.fileType);
        if(!fileContent||fileContent==="Unsupported file format"){
            return res.status(400).json({
                success:false,
                message:"No content in file."
            });
        }
        const summary=await generateSummary(`${fileContent}`);
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