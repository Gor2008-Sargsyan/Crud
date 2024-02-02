var express = require("express");
var path = require("path");
const bodyParser = require('body-parser');
var app = express();
const { ObjectId } = require('mongoose').Types;

const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://gorsargsyan8:Gor.2008@cluster0.uvlgzqu.mongodb.net/Tumo_User';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// const { Schema } = mongoose;
// mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;

// const SchemaProduct = new Schema({
//     productName: String,
//     price: Number,
//     image: String
// });
// const Products = mongoose.model('Users', SchemaProduct);
// db.on('error', console.error.bind(console, 'Connection error:'));
// db.once('open', async () => {
//     console.log('Connected to MongoDB!');
//     try {
//         const accProgm = await Users.createCollection();

//     } catch (error) {
//         console.error('Error retrieving data:', error);
//     } finally {
//         mongoose.connection.close();
//     }
// });

app.use(express.static('public'));

app.get("/", function (req, res) {
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        try {
            let result = await mongoose.connection.db.collection('Users').find().toArray()
            res.render('../public/form.ejs', {
                obj: result
            });
        } catch (error) {
            console.error('Error retrieving movies:', error);
        } finally {
            mongoose.connection.close();
        }
    })
});

app.post('/addName', async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const date = req.body.date;
    const number = req.body.number;

    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        console.log('Connected to MongoDB!');
        try {
            let result = await mongoose.connection.db.collection('Users').insertOne({
                name: name,
                email: email,
                password: password,
                date: date,
                number: number
            })
            res.redirect("/");
        } catch (error) {
            console.error('Error retrieving movies:', error);
        } finally {
            mongoose.connection.close();
        }
    })
});

app.get("/delete/:id", function (req, res) {
    var id = req.params.id;
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        try {
            let result = await mongoose.connection.db.collection('Users').deleteOne({_id: new ObjectId(id)});
            res.redirect("/");
        } catch (error) {
            console.error('Error retrieving movies:', error);
        } finally {
            mongoose.connection.close();
        }
    })
});

app.get("/update/:id", function (req, res) {
    var id = req.params.id;
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        try {
            let result = await mongoose.connection.db.collection('Users').findOne({_id: new ObjectId(id)});
            res.render('../public/update.ejs', {
                obj: result
            });
        } catch (error) {
            console.error('Error retrieving movies:', error);
        } finally {
            mongoose.connection.close();
        }
    })
});

app.post("/updateData/", function (req, res) {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const date = req.body.date;
    const number = req.body.number;
    const id = req.body.id;

    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        console.log('Connected to MongoDB!');
        try {
            let result = await mongoose.connection.db.collection('Users').updateOne(
                { _id: new ObjectId(id) },
                { $set: { name: name, password: password, email: email, date: date, number: number } }
            );

            res.redirect("/");
        } catch (error) {
            console.error('Error updating product:', error);
        } finally {
            mongoose.connection.close();
        }
    });
});




app.listen(3000, function () {
    console.log("Example is running on port 3000");
});
