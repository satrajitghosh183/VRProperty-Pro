const express = require("express");
const app = express();
const cors = require('cors');
// const router = require("./route");

const { MongoClient } = require('mongodb');

// require('./connect.js');
const port = 8000;
app.use(express.json());
app.use(cors({origin:"http://localhost:3000"}));



const url = "mongodb+srv://Subhramoy:" +
       encodeURIComponent("S2ub@2002") +
       "@cluster1.qmlbqqf.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB Atlas cluster
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB Atlas');
    const db = client.db('Hack_unicorn');

app.get('/data/:search/:location', (req, res) => {
    const collection = db.collection('Property_Details');
    const limit =parseInt(req.query.limit);
    const page = req.query.page;
    req.params.location===''?collection.find({City:req.params.search}).skip((page-1)*limit).limit(limit).toArray()
      .then(docs => {
        res.json(docs);
      })
      .catch(error => {
        res.status(500).send('Error retrieving data');
      }):collection.find({Location:req.params.location}).skip((page-1)*limit).limit(limit).toArray()
      .then(docs => {
        res.json(docs);
      })
      .catch(error => {
        res.status(500).send('Error retrieving data');
      })
///////////////////
     });
     



     app.get('/allData', (req, res) => {
      const collection = db.collection('Property_Details');
      
      collection.find().toArray()
        .then(docs => {
          res.json(docs);
        })
        .catch(error => {
          res.status(500).send('Error retrieving data');
        })
        
  ///////////////////
       });



       app.post('/putData',(req,res)=>{
        const document = {
          "Price": parseInt(req.body.price),
          "Area":parseInt(req.body.area),
          "Location":req.body.location,
          "MaintenanceStaff":parseInt(req.body.maintenanceStaff),
          "PowerBackup":parseInt(req.body.powerBackup),
          "CarParking":parseInt(req.body.carParking),
          "StaffQuarter":parseInt(req.body.staffQuarter),
          "City":req.body.city
        }
        const collection = db.collection('Property_Details');
        collection.insertOne(document,(err,result)=>{
          if(err) throw err;
          console.log('Document inserted successfully');
        })
       })

  
          })
  .catch(error => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });







app.get('/',(req,res)=>{
    res.send("hello world");
})



// app.use('/routes',router); 
 app.listen(port,()=>{
     console.log(`Running in port ${port}`);
 })




