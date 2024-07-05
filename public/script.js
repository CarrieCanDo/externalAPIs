

document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const textToTranslate = document.querySelector('#textToTranslate').value;
    const targetLanguage = document.querySelector('#targetLanguage').value;
    
    try {
        const response = await axios.post('/translate', {
            textToTranslate: textToTranslate,
            targetLanguage: targetLanguage
        });
        
        const translatedText = response.data;
        document.querySelector('#translatedText').innerContent = translatedText;
    } catch (error) {
        console.error('Error:', error);
        document.querySelector('#translatedText').innerContent = 'Translation error occurred.';
    }
});
