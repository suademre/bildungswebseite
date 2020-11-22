const express = require("express");

const connection = require("nano")("http://admin:abc1234@localhost:5984");

const panel = express.Router();

panel.get("/panel/:id", (req, res) => {
  
  const database = connection.db.use("schuler");
  database.get(req.params.id).then((response) => {
    database
      .find({
        selector: {
          klasse: response.klasse, // sinif arkadaslarna gore listeleyebilmek icin ver itabani sorgusu
        },
      })
      .then((data) => {
        res.render("panel",{data:data.docs}); // burda render(okuyup ekrana getirmek) ettik. Cunku veiw engien i kullanabilmek icin yani goruntu motorunu kullanabilmek icin.
      });
  });
});

module.exports = panel;
