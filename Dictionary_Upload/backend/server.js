const express = require('express');
const app = express();
const port = 3200;
const urlDictionary = "https://api.dictionaryapi.dev/api/v2/entries/en/";
var searchWord;
const cors = require('cors');

app.use(express.text());
app.use(cors());


app.listen(port, () => {
    console.log('Listening at http://localhost:' + port);
})


app.post('/getdata', async (req,res) => {
    try {
        searchWord = req.body;
        const request = await fetch(urlDictionary + searchWord);
        const data = await request.json();
        res.send(data);

    } catch(error){
        console.log("Error:" + error);
    }

})
