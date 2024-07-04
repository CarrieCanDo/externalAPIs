const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Route to serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle form submission and translate text
app.post('/translate', async (req, res, next) => {
    const textToTranslate = req.body.textToTranslate;
    const targetLanguage = req.body.targetLanguage;
    const sourceLanguage = 'en'; // Assuming the source language is English
    
    try {
        const response = await axios({
            method: 'post',
            url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'x-rapidapi-key': '652be5a739msh04db7fc5da19691p10047cjsn7226f46be02e', // Replace with your RapidAPI key
                'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
                'Accept-Encoding': 'application/gzip'
            },
            data: `q=${encodeURIComponent(textToTranslate)}&target=${encodeURIComponent(targetLanguage)}&source=${encodeURIComponent(sourceLanguage)}`
        });
        
        const translatedText = response.data.data.translations[0].translatedText;
        res.send(translatedText);
    } catch (error) {
        console.error('Error:', error.response.data);
        next(error); // Pass the error to the next middleware
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
