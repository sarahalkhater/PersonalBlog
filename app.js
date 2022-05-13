const express = require("express");
const moment = require("moment");
const mongoose = require("mongoose");
const expressHandlebars = require('express-handlebars');
const methodOverride = require('method-override');
const postController = require('./controller/postsController');
const pageController = require('./controller/pagesController');

var hbs = expressHandlebars.create({
    helpers: {
        trimString: function (passedString) {
            if (passedString != undefined) {
                return passedString.substring(0, 150);
            }
            else {
                return passedString;
            }
        },

        dateFormat: (date, format) => {
            return moment(date).format(format)
        }
    }
});

const app = express();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//connect DB
mongoose.connect(
    //"mongodb://localhost:27017/sarah-test-db",
    "mongodb+srv://sarahalkhater:Sa.123456@cluster0.trtmf.mongodb.net/personalBlog?retryWrites=true&w=majority",
    async (err) => {
        if (err) throw err;
        console.log("connected to db");
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
app.post('/createPost', postController.createPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

app.get('/posts/edit/:id', pageController.getEditPage);
app.get("/about", pageController.getAboutPage);
app.get("/addpost", pageController.getAddPage);


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});
