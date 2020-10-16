const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const ContactModel = require('./models/Contact');
const port = 3002;
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));



const sequelize = new Sequelize('contacts-db', 'root', 'root', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: './database.sqlite3'
});

const Contact = ContactModel(sequelize, Sequelize);



app.get('/', (req, res) => {
  res.status(200).send('Contacts API');
});

app.get('/contacts', (req, res) => {
  Contact.findAll()
    .then(contacts => {
      console.log('Successfully retrieved all contacts');
      res.status(200).json(contacts);
    })
    .catch((err) => {
      console.log('There was an error retrieving all contacts', err);
      res.status(500).send(err);
    });
});

app.get('/contacts/:id', (req, res) => {
  const id = req.params.id;
  Contact.findOne({ where: { id } })
    .then(contact => {
      console.log('Successfully retrieved contact by Id');
      res.status(200).json(contact);
    })
    .catch((err) => {
      console.log('There was an error retrieving contact by Id', err);
      res.status(500).send(err);
    });
});

app.post('/contacts', (req, res) => {
  Contact.create(req.body)
    .then(contact => {
      console.log('Successfully created contact');
      res.status(201).send(contact);
    })
    .catch((err) => {
      console.log('There was an error creating the contact', err);
      res.status(500).send(err);
    });
});

app.put('/contacts/:id', (req, res) => {
  const id = req.params.id;
  Contact.findOne({ where: { id } })
    .then(contact => {
      contact.update(req.body)
        .then(updatedContact => {
          console.log('Successfully updated contact by Id');
          res.status(200).json(updatedContact);
        })
        .catch((err) => {
          console.log('There was an error updating contact by Id', err);
          res.status(500).send(err);
        });
    });
});

app.patch('/contacts/:id', (req, res) => {
  const id = req.params.id;
  Contact.findOne({ where: { id } })
    .then(contact => {
      contact.update(req.body, { fields: Object.keys(req.body) })
        .then(updatedContact => {
          console.log('Successfully updated contact by Id');
          res.status(200).json(updatedContact);
        })
        .catch((err) => {
          console.log('There was an error updating contact by Id', err);
          res.status(500).send(err);
        });
    });
});


app.delete('/contacts/:id', (req, res) => {
  const id = req.params.id;
  Contact.findOne({ where: { id } })
    .then(contact => {
      contact.destroy()
        .then(() => {
          console.log('Successfully deleted contact by Id');
          res.status(200).send(contact);
        })
        .catch((err) => {
          console.log('There was an error retrieving contact by Id', err);
          res.status(500).send(err);
        });
    });
});




sequelize
  .sync()
  .then(() => {
    app.listen(port, (error) => {
      if (error) return console.log(`Error: ${error}`);
    
      console.log(`contacts-api running on http://localhost:${port}`);
    });
  }).catch((e) => {
    throw new Error(e);
  });
