const express = require("express");
const formidable = require("formidable");
const connection = require("nano")("http://admin:abc1234@localhost:5984");

const login = express.Router();

login.post("/getlogin", (req, res) => {
  let form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
    }
    console.log(fields);

    showdata(fields);
  });

  let showdata = (data) => {
    let schulerdb = connection.db.use("schuler");
    schulerdb
      .find({
        selector: {
          email: data.email,
        },
      })
      .then((logindata) => {
        console.log(logindata.docs[0]._id);
        if (
          logindata.docs[0].email == data.email &&
          logindata.docs[0].password == data.password
        ) {
          res.json({ success: true, id: logindata.docs[0]._id });
        } else {
          res.json({success : false})
        }
      });
  };
});

module.exports = login;
