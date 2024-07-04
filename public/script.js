document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const textToTranslate = document.querySelector('#textToTranslate').value;
    const targetLanguage = document.querySelector('#targetLanguage').value;
    
    try {
        const response = await fetch('/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `textToTranslate=${encodeURIComponent(textToTranslate)}&targetLanguage=${encodeURIComponent(targetLanguage)}`
        });
        
        const translatedText = await response.text();
        document.querySelector('#translatedText').innerText = translatedText;
    } catch (error) {
        console.error('Error:', error);
        document.querySelector('#translatedText').innerText = 'Translation error occurred.';
    }
});