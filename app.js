const express = require('express');
const app = express();

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(express.json())

const axios =require( 'axios');

const options = {
  method: 'GET',
  url: 'https://yahoo-weather5.p.rapidapi.com/weather',
  params: {
    location: 'sunnyvale',
    format: 'json',
    u: 'f'
  },
  headers: {
    'x-rapidapi-key': '652be5a739msh04db7fc5da19691p10047cjsn7226f46be02e',
    'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
  }
};



app.get('/:city', async (req, res) => {
  try {
    options.params.location=req.params.city;
    const response = await axios.request(options);
    console.log(response.data);
    res.json(response.data)
  } catch (error) {
    console.error(error);
  }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

