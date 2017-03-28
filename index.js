const express = require('express');
const bodyParser = require('body-parser');

const app = express();
//tell the app to look for static files in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));

//tell the app to parse http body messages
app.use(bodyParser.urlencoded({ extended: false }));

//routes
const authRoutes = require('./server/routes/auth');
app.use('/auth', authRoutes);

app.get("/*", function(req, res) {
res.sendFile(__dirname + '/server/static/index.html')
})

//start the server
app.listen(3000, ()=> {
    console.log('Server is running on localhost:3000')
})
