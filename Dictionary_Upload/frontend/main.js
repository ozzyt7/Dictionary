const button = document.getElementById('searchBttn');
const urlBackend = 'http://localhost:3200/getdata';
const contentSuccess = document.getElementById('success');
const contentFail = document.getElementById('notFound');
const contentError = document.getElementById('errorInput');
const successSound = document.getElementById('searchSuccessful');
const failSound = document.getElementById('searchFail');
const audioError = document.getElementById('errorAudio');
const wordAudio = document.getElementById('displayAudio');
const audioSource = wordAudio.firstElementChild;
const audioBttn = document.getElementById('wordAudio');

button.addEventListener('click', async function() {
    const word = document.getElementById('inputWord').value.toLowerCase();
    var checkWord = checkInput(word);
    
    
    if (checkWord == true){
        const wordData = await sendData(word);
        var wordFound = isWordFound(wordData);

        if (wordFound == true){
            successSound.play();
            contentFail.classList.add('hidden');
            contentSuccess.classList.remove('hidden');
            contentError.classList.add('hidden');
            displayWord(word);
            getDefinition(wordData, word);
            getExampleSentence(wordData, word);
            getWordPhonetic(wordData, word);
            getWordType(wordData, word);
            getSynonyms(wordData, word);
            getAntonyms(wordData, word);
            getAudio(wordData);

        }
        else{
            failSound.play();
            contentFail.classList.remove('hidden');
            contentSuccess.classList.add('hidden');
            contentError.classList.add('hidden');

        }
        
    }
    else{
        failSound.play();
        contentFail.classList.add('hidden');
        contentSuccess.classList.add('hidden');
        contentError.classList.remove('hidden');
        
    }

})


function getDefinition(wordData){
    let wordDef = wordData[0].meanings[0].definitions[0].definition;
    const definition = document.getElementById('wordDefinition');

    definition.innerText = wordDef;
     
}


function getExampleSentence(wordData, word){
    let example = wordData[0].meanings[0].definitions[0].example;
    const wordExample = document.getElementById('exampleSentence');

    if (typeof example == 'undefined'){
        wordExample.innerText = "No example sentence of " + word + " found";

    }
    else{
        wordExample.innerText = example;

    }

}


function getWordPhonetic(wordData, word){
    let checkPhoneticArray = wordData[0].phonetics;
    const wordPhonetic = document.getElementById('phoneticWord');

    if (checkPhoneticArray.length != 0){
        let phonetic = checkPhoneticArray[0].text
       
        if (typeof phonetic == 'undefined' || phonetic == ''){
            wordPhonetic.innerText = "no phonetic spelling of " + word + " found";

        }
        else{
            wordPhonetic.innerText = phonetic;

        }
    }
    else{
        wordPhonetic.innerText = "no phonetic spelling of " + word + " found";

    }

}


function getAudio(wordData){
    let checkAudioArray = wordData[0].phonetics;
    
    if (checkAudioArray.length != 0){
        let audioFile = checkAudioArray[0].audio;
        if (audioFile == '' || typeof audioFile == 'undefined'){
            audioError.style.visibility = 'visible';
            audioBttn.disabled = true;
        
        
        }
        else{
            audioSource.setAttribute("src", "" + audioFile);
            audioError.style.visibility = 'hidden';
            audioBttn.disabled = false;
      
        
        }
    }
    else{
        audioError.style.visibility = 'visible';
        audioBttn.disabled = true;

    }

}


function getWordType(wordData){
    let wordType = wordData[0].meanings[0].partOfSpeech;
    const typeWord = document.getElementById('wordType');
    typeWord.innerText = wordType;

}


function playWordAudio(){
    wordAudio.load();
    wordAudio.play();

}


async function sendData(word){
    try {
        const request = await fetch(urlBackend, {
            method: "POST",
            headers: {'Content-type': 'text/plain'},
            body: word,
            
        });

        const data = await request.json();
        return data;

    } catch(error) {
        console.log("Error:" + error);

    }

}


function getSynonyms(wordData, word){
    let synonyms = wordData[0].meanings[0].synonyms;
    let synonymsLength = synonyms.length;
    const synonymsWord = document.getElementById('synonyms');

    if (synonymsLength == 0){
        synonymsWord.innerText = "No synonyms of " + word + " found";

    }
    else{
        let displaySynonyms = synonyms.join(", ");
        synonymsWord.innerText = displaySynonyms;

    }
    
}


function getAntonyms(wordData, word) {
    let antonyms = wordData[0].meanings[0].antonyms;
    let antonymsLength = antonyms.length;
    const antonymsWord = document.getElementById('antonyms');

    if (antonymsLength == 0){
        antonymsWord.innerText = "No antonyms of " + word + " found";

    }
    else{
        let displayAntonyms = antonyms.join(", ");
        antonymsWord.innerText = displayAntonyms;

    }

}


function startDictionary(){
    contentSuccess.classList.add('hidden');
    contentFail.classList.add('hidden');
    contentError.classList.add('hidden');

}


function checkInput(word) {
    var checkWord = word.split('');
    let arrayLength = (checkWord.length) - 1;
    let counter = 0;
    let notValid = 0;
    let isValidInput = false;

    while (counter <= arrayLength){
        if ('abcdefghijklmnopqrstuvwxyz'.includes(checkWord[counter]) == false){
            notValid ++;

        }

        counter ++;
    }

    if (notValid == 0){
        isValidInput = true;
        return isValidInput;

    }
    else{
        return isValidInput;

    }

}


function displayWord(word){
    const wordDisplay = document.getElementById('displayWord');
    wordDisplay.innerText = word;

}


function isWordFound(wordData) {
    let searchSuccess = false;

    if (wordData.title){
        return searchSuccess;

    }
    else{
        searchSuccess = true;
        return searchSuccess;

    }

}


//Test vitest
//export { checkInput, isWordFound }