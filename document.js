// async function split_document() {
//     const response = await fetch("handbook.txt");
//     const text = await response.text();
//     console.info(text);
// }
import fs from 'fs';

async function split_document () {
    fs.readFile('handbook.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.info(data);
    });
}


split_document();