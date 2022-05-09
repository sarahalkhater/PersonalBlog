const path = require('path');
const express = require('express');
const app = new express();

app.use(express.static('public')); //kullanicinin erisebilecegi klasoru belirttik

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/index.html'));
});

app.get('/about.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/about.html'));
});

app.get('/contact.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
});


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sarahalkhater:Sa.123456@cluster0.trtmf.mongodb.net/personalBlog?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("personalBlog").collection("person");
    // perform actions on the collection object
    console.log(err); //eger database e baglanti hatasi olursa console a yazmasi icin.
    client.close();
});


app.listen(8080, () => {
    console.log('App listening on port 8080')
});