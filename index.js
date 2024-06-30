import MistralClient from '@mistralai/mistralai';
import dotenv from 'dotenv';

dotenv.config();

//console.info(process.env.Mistral_API_KEY);
const client = new MistralClient(process.env.Mistral_API_KEY);

const chatResponse = await client.chat(
    {
        model: "mistral-tiny",
        messages : [
            {role: "system", content: "Consider yourself a friendly teacher, answer question in glomarous manner. reply with JSON"},
            {role: "user", content: "What is java"}
        ],
        temperature: 0.5,
        responseFormat: {
            type: 'json_object'
        }
    }
);

console.log(chatResponse.choices[0].message.content);
// for await (const token of chatResponse) {
//     console.log(token.choices[0].delta.content)
// }

