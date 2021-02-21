const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const app = express();

const admin = require('firebase-admin')
const serviceAccount = require('./firebase/serviceAccountKey.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let books = [];

app.get('/home', function(req, res) {
  console.log('Inside Home Login');
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  console.log('Books : ', JSON.stringify(books));
  res.end(JSON.stringify(books));
});

app.post('/create', function(req, res) {
  const newBook = {
    BookID: req.body.bookID,
    Title: req.body.bookTitle,
    Author: req.body.bookAuthor,
  };

  books.push(newBook);
  console.log(books);
});

app.post('/getUserDetailsUID', function(req, res) {
    const user = {
        UID : req.body.uid
    }
    admin
    .auth()
    .getUser(user.UID)
    .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        details = userRecord.toJSON()
        res.send(JSON.stringify(userRecord))
        console.log(`Successfully fetched user data: ${JSON.stringify(userRecord)}`);
    })
    .catch((error) => {
        console.log('Error fetching user data:', error);
    });
});


app.post('/getUserDetailsEmail', function(req, res) {
    const user = {
        Email : req.body.email
    }
    admin
    .auth()
    .getUserByEmail(user.Email)
    .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        details = userRecord.toJSON()
        res.send(JSON.stringify(userRecord))
        console.log(`Successfully fetched user data: ${JSON.stringify(userRecord)}`);
    })
    .catch((error) => {
        console.log('Error fetching user data:', error);
    });
});


app.post('/createUser', function(req, res) {
    const User_Details = {
        email : req.body.email,
        password : req.body.password,
        emailVerified : req.body.emailVerified,
        disabled : req.body.disabled,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        phoneNumber : req.body.phoneNumber
    }
    admin
    .auth()
    .createUser(User_Details)
    .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully created new user:', userRecord.uid);
    })
    .catch((error) => {
        console.log('Error creating new user:', error);
    });
});
//start your server on port 3001
app.listen(3001, () => {
  console.log('Server Listening on port 3001');
});