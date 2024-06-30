// async function split_document() {
//     const response = await fetch("handbook.txt");
//     const text = await response.text();
//     console.info(text);
// }
import fs from 'fs';
import { RecursiveCharacterTextSplitter} from 'langchain/text_splitter';
import MistralClient from '@mistralai/mistralai';
import dotenv from 'dotenv';

dotenv.config();

const client = new MistralClient(process.env.Mistral_API_KEY);

 async function split_document (path) {
    //const content = [];
    try {
        const data = fs.readFileSync(path, 'utf8');
        const spliter = new RecursiveCharacterTextSplitter({
            chunkSize: 250,
            chunkOverlap: 40
        })
        const output = await spliter.createDocuments([data]);
        const content = output.map((item) => item.pageContent);
        //console.info(output);
        return content;
        //console.log(data);
      } catch (err) {
        console.error(err);
      }
}

const result = await split_document('handbook.txt');
//console.log(result);
const exampleChunk = 'Android makes a distinction between implicit and explicit broadcast actions. It defines' +
    ' an explicit broadcast as something that target just one application, no matter how many ' +
  'other apps are listening for it';
const embeddingResponse = await client.embeddings({
    model: "mistral-embed",
    input: exampleChunk
})
console.info(embeddingResponse)