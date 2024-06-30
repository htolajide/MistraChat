import MistralClient from "@mistralai/mistralai";
import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';

dotenv.config()

const mistralClient = new MistralClient(process.env.Mistral_API_KEY);
const supabase = createClient(process.env.Supabase_URL, process.env.Supabase_KEY);

// 1. Getting the user input
const input = "In earlier versions of Android, there were already a couple of broadcast that were off limits from the manifest, what are they?"
// 2. Creating an embedding of the input
const embedding = await createEmbedding(input);

// 3. Retrieving similar embeddings / text chunks (aka "context")
const context = await retrieveMatches(embedding);
//console.log(context);

// 4. Combining the input and the context in a prompt 
// and using the chat API to generate a response 
const response = await generateChatResponse(context, input);
console.log(response)

async function createEmbedding(input) {
  const embeddingResponse = await mistralClient.embeddings({
      model: 'mistral-embed',
      input: [input]
  });
  return embeddingResponse.data[0].embedding;
}

async function retrieveMatches(embedding) {
    const { data } = await supabase.rpc('match_handbook_docs', {
        query_embedding: embedding,
        match_threshold: 0.78,
        match_count: 5
    });
    // Challenge 1: Return the text from 5 matches instead of 1
    return data.map(chunk => chunk.content).join(" ");
}


async function generateChatResponse(context, query) {
    const response = await mistralClient.chat(
        {
            model: "mistral-tiny",
            messages: [
                {
                    role: "user",
                    content: `Handbook context: ${context} - Question: ${query}`
                }
            ]
        }
    );
    // Challenge 2:
    // Generate a reply to the user by combining both their 
    // question and the context into a prompt. Send the prompt
    // to Mistral's API, deciding for yourself what model
    // and settings you'd like to use.
    return response.choices[0].message.content
}