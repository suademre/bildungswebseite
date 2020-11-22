const express = require('express');
const formidable = require('formidable');
const connection = require('nano')('http://admin:abc1234@localhost:5984');
const anmelden = express.Router(); //Router lari olusturmak icin fons seklinde kullaniyoruz
const nodemailer = require('nodemailer');


//ROTEN
anmelden.post('/getanmelden', (req, res) => {

    let form = new formidable.IncomingForm();
    
    //parse : formdan gelen datayi JSON verisi haline getiriyor
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
        }
        let data = {
            ...fields,
            photo: files.photo.name,
            user: fields.vname + "@bildungsforum.com",
            password: (Math.floor(Math.random() * 10000000000) + 1000000000).toString(),
        }
        //console.log(data);
        //res.json({...data}); //JSON suslu parantez icerisinde olur

        console.log(fields);

        let schulerdb = connection.db.use("schuler");
        schulerdb.insert(data);



        sendmail(fields,data);

        res.json({
            success: true
        })
    });
     //bunu bitti diye yaziyoruz.
})


//async islemleri gitmio, islemin bitmesini bekliyor, siradaki islemi ondan sonra aliyor
sendmail = async (user,data) => {
    console.log(user);
    const transporter = nodemailer.createTransport({
       host:"smtp.gmail.com",
       port:"465",
       auth: {
          user: "...", 
          pass: "..."
        }, 
        tls: {
            rejectUnauthorized: false
        }
      
    });


    //await: islemin bitmesini bekliyor
    let info = await transporter.sendMail({
        from: '....', // sender address
        to: user.email, // list of receivers
        subject: "password for user", // Subject line
        html: `<p>username:${data.user}</p><p>userpassword:${data.password}</p>` // html body
    });

    console.log(info);
}










module.exports = anmelden;