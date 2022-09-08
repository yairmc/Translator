
// Elementos DOM 
let translateFrom = document.querySelector('#translateFrom')
let translateTo = document.querySelector('#translateTo')
let translate = document.querySelector('#translate')
let outputTranslate=document.querySelector('#outputTranslate')

// Conseguir la lista de lenguajes desde el servidor 
const get_url = 'https://text-translator2.p.rapidapi.com/getLanguages'

const OPTIONS = {
    method: 'get',
    headers: {
        'X-RapidAPI-Key': '6957054a2fmsh219625322c4b523p1f79c2jsn4dd4cb8f3f21',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
    }
}

let source_language='es';
let target_language='en';

fetch(get_url, OPTIONS)
    .then(res => res.json())
    .then(objeto => {
        let lenguages = objeto.data.languages;
        //  Codigo para los selects
        lenguages.forEach(element => {
            translateFrom.innerHTML += `<option value="${element.code}">${element.name}</option>`
            translateTo.innerHTML += `<option value="${element.code}">${element.name}</option>`

        })
        translateFrom.addEventListener('click', () => {
            source_language = translateFrom.value;
        })
        translateTo.addEventListener('click', () => {
            target_language = translateTo.value;
        })
    })
    .catch(err => console.log(err));

translate.addEventListener('click', () => {
    let inputTranslate = document.querySelector('#inputTranslate')
    let textToTranslate = inputTranslate.value;

    // ----------------------------------------------------------
    const encodedParams = new URLSearchParams();
    encodedParams.append("source_language", source_language);
    encodedParams.append("target_language", target_language);
    encodedParams.append("text", textToTranslate);

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '6957054a2fmsh219625322c4b523p1f79c2jsn4dd4cb8f3f21',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: encodedParams
    };

    fetch('https://text-translator2.p.rapidapi.com/translate', options)
        .then(response => response.json())
        .then(response => outputTranslate.value= response.data.translatedText)
        .catch(err => console.error(err));
})

