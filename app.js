// const path = require('path');
// const express = require('express');
// const app = new express();
// const expressHandlebars = require('express-handlebars');

// app.use(express.static('public')); //kullanicinin erisebilecegi klasoru belirttik

// app.engine('handlebars', expressHandlebars.engine());
// app.set('view engine', 'handlebars');

// // app.engine('hbs', handlebars({
// //     layoutsDir: __dirname + '/views/layouts',
// //     extname: 'hbs',
// //     defaultLayout: 'planB',
// //     partialsDir: __dirname + '/views/partials/'
// // }));


// app.get('/', (req, res) => {
//     res.render(path.resolve(__dirname, 'views/index'));
// });

// app.get('/about', (req, res) => {
//     res.render(path.resolve(__dirname, 'views/about'));
// });

// app.get('/addpost', (req, res) => {
//     res.render(path.resolve(__dirname, 'views/addpost'));
// });

// app.get('/post', (req, res) => {
//     res.render(path.resolve(__dirname, 'views/post'));
// });




// // const { MongoClient, ServerApiVersion } = require('mongodb');
// // const uri = "mongodb+srv://sarahalkhater:Sa.123456@cluster0.trtmf.mongodb.net/personalBlog?retryWrites=true&w=majority";
// // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// // client.connect(err => {
// //     const collection = client.db("personalBlog").collection("user");
// //     // perform actions on the collection object
// //     console.log(err); //eger database e baglanti hatasi olursa console a yazmasi icin.
// //     client.close();
// // });


// app.listen(8080, () => {
//     console.log('App listening on port 8080')
// });




const path = require('path');
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require('method-override');
// const postController = require(path.resolve(__dirname, 'controller/postsController'));
const postController = require('./controller/postsController');
// const pageController = require(path.resolve(__dirname, 'controller/pagesController'));
const pageController = require('./controller/pagesController');
const expressHandlebars = require('express-handlebars');

const app = express();
app.engine('handlebars', expressHandlebars.engine());
app.set('view engine', 'handlebars');

//connect DB
// mongoose.connect("mongodb://localhost:27017/sarah-test-db", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });

mongoose.connect(
    "mongodb://localhost:27017/sarah-test-db",
    async(err)=>{
        if(err) throw err;
        console.log("conncted to db")
    }
)

//Middlewares
app.use(express.static("public")); //kullanicinin erisebilecegi klasoru belirttik
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//Routes
app.get('/', postController.getAllPosts);
app.get('/posts/:id', postController.getPost);
app.post('/posts', postController.createPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

app.get('/posts/edit/:id', pageController.getEditPage);
app.get("/about", pageController.getAboutPage);
app.get("/addpost", pageController.getAddPage);


const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});
