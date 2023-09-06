///////////// IMPORT /////////////////
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var express = require('express')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, function () {
  console.log("app listening on port 3000!");
});
///////////// DATABASE /////////////////
let mongoUrlLocal = "mongodb://admin:password@localhost:27017";
let mongoUrlDocker = "mongodb://admin:password@mongodb";
let databaseName = "Films";
let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

///////////// DATABASE CREATION /////////////////
MongoClient.connect(mongoUrlDocker, mongoClientOptions, function (err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

MongoClient.connect(mongoUrlDocker, mongoClientOptions,function (err, db) {
  if (err) throw err;
  var dbo = db.db(databaseName);
///////////// COLLECTION CREATION /////////////////
  dbo.listCollections().toArray(function (err, collections) {
    if (collections.length === 0) {
      dbo.createCollection("Films", function (err, res) {
        if (err) throw err;
        console.log("Collection created");
        db.close();
      });
       ///////////// INSERIMENTO DEI FILM /////////////////
        var films = [ 
          { title: 'Il Padrino', director: 'Francis Ford Coppola', genere: ['Drammatico'], year: '1972', lingua: 'En', image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSVHQ8qO4kA2NsefwLDCeuYdWEjcO7X7HAuzpVdSyIQv6X-Ioi0' },
          { title: 'Lultima casa a sinistra', director: 'Wes Craven', genere: ['Horror', 'Thriller'], year: '1972', lingua: 'En', image: 'https://upload.wikimedia.org/wikipedia/it/7/70/Ultima_casa_a_sinistra%2C_L%27.JPG' },
          { title: 'Cabaret', director: 'Bob Fosse', genere: ['Musical', 'Drammatico'], year: '1972', lingua: 'En', image: 'https://upload.wikimedia.org/wikipedia/it/d/d7/Cabaret_Minnelli_York.png' },
          { title: 'Solaris', director: 'Andrei Tarkovsky', genere: ['Drammatico', 'Fantascienza'], year: '1972', lingua: 'Ru', image: 'https://upload.wikimedia.org/wikipedia/it/4/45/Solaris_scena_1.jpg' },
          { title: 'Agente 007 - Vivi e lascia morire', director: 'Guy Hamilton', genere: ['Azione', 'Avventura'], year: '1972', lingua: 'En', image: 'https://mr.comingsoon.it/imgdb/locandine/235x336/11444.jpg' },
          { title: 'Deliverance', director: 'John Boorman', genere: ['Avventura', 'Thriller'], year: '1972', lingua: 'En', image: 'https://upload.wikimedia.org/wikipedia/it/thumb/c/c8/Un_tranquillo_week-end_di_paura.png/390px-Un_tranquillo_week-end_di_paura.png' },
          { title: 'La notte dei morti viventi', director: 'George A. Romero', genere: ['Horror'], year: '1972', lingua: 'En', image: 'https://mr.comingsoon.it/imgdb/locandine/big/9431.jpg' },
          { title: 'The Pianist', director: 'Roman Polanski', genere: ['Drammatico'], year: '2002', lingua: 'En', image: 'https://m.media-amazon.com/images/M/MV5BMTQ5MDQxMzQ3M15BMl5BanBnXkFtZTcwMjYxMTIyMw@@._V1_.jpg' },
          { title: 'Road to Perdition', director: 'Sam Mendes', genere: ['Drammatico'], year: '2002', lingua: 'En', image: 'https://m.media-amazon.com/images/M/MV5BNjcxMmQ0MmItYTkzYy00MmUyLTlhOTQtMmJmNjE3MDMwYjdlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg' },
          { title: 'City of God', director: 'Fernando Meirelles', genere: ['Drammatico'], year: '2002', lingua: 'Pt', image: 'https://m.media-amazon.com/images/M/MV5BOTMwYjc5ZmItYTFjZC00ZGQ3LTlkNTMtMjZiNTZlMWQzNzI5XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg' },
          { title: 'Talk to Her', director: 'Pedro Almodóvar', genere: ['Drammatico'], year: '2002', lingua: 'Es', image: 'https://m.media-amazon.com/images/M/MV5BMzFhNmQzYWQtMDhmNC00ZGJmLWI5NjYtNmI3MjBiZDNjNjdlXkEyXkFqcGdeQXVyMTI3ODAyMzE2._V1_FMjpg_UX1000_.jpg' },
          { title: 'About Schmidt', director: 'Alexander Payne', genere: ['Drammatico'], year: '2002', lingua: 'En', image: 'https://m.media-amazon.com/images/I/71rrdXizjXL._SY445_.jpg' },
          { title: 'The Wolf of Wall Street', director: 'Martin Scorsese', genere: ['Biografico'], year: '2013', lingua: 'En', image: 'https://tse2.mm.bing.net/th?id=OIP.yoWwpRvmpIGwQoQeyMT4-QHaLH' },
          { title: 'Iron Man 3', director: 'Shane Black', genere: ['Azione'], year: '2013', lingua: 'En', image: 'https://tse2.mm.bing.net/th?id=OIP.gBrju4aEynnYhcYGFkUE5QHaLH' },
          { title: 'Fast & Furious 6', director: 'Justin Lin', genere: ['Azione'], year: '2013', lingua: 'En', image: 'https://tse3.mm.bing.net/th?id=OIP.HQVk9qkmga5HuYVW_0RbEgHaLH' },
          { title: 'Man of Steel', director: 'Zack Snyder', genere: ['Azione'], year: '2013', lingua: 'En', image: 'https://tse4.mm.bing.net/th?id=OIP.VY5IhdMrUbGt3WHNYcITuwHaKd' },
          { title: 'Oblivion', director: 'Joseph Kosinski', genere: ['Azione'], year: '2013', lingua: 'En', image: 'https://tse4.mm.bing.net/th?id=OIP.YS2_sHSr6JSx7EalmUV3ZwHaLu' },
          { title: 'White House Down', director: 'Roland Emmerich', genere: ['Azione'], year: '2013', lingua: 'En', image: 'https://tse2.mm.bing.net/th?id=OIP.wvYhgMq-VhRJ2euxU1FzCQHaLH' }
        ];
       dbo.collection("Films").insertMany(films, function (err, res) {
        if (err) throw err;
      });
    }
  });
});

/////////// SELEZIONA TUTTI I FILM DAL DB///////////

app.post('/get-films', function (req, res) {
  let response = {};

  MongoClient.connect(mongoUrlDocker, mongoClientOptions, function (err, client) {
    if (err) throw err;
    
    let db = client.db(databaseName);
    let year = req.body.year;
    let genere = req.body.genere;

    ///////// Query per selezionare i film per anno e genere///////////
    let myquery = { $and: [{ year: year }, { genere: genere }] };

    db.collection("Films").find(myquery).toArray(function (err, result) {
      if (err) throw err;
      response = result;
      client.close();

      // Send response
      res.send(response ? response : {});
    });
  });
});

/////////// SELEZIONA TUTTI GLI ANNI DAL DB///////////
app.post('/get-anno', function (req, res) {
  let response = {};

  MongoClient.connect(mongoUrlDocker, mongoClientOptions, function (err, client) {
    if (err) throw err;

    let db = client.db(databaseName);
    let year = req.body.year;
    let genere = req.body.genere;

    db.collection("Films").find({}, { projection: { year: 1, genere: 1, _id: 0 } }).toArray(function (err, result) {
      if (err) throw err;
      response = result;
      client.close();

      // Send response
      res.send(response ? response : {});
    });
  });
});
