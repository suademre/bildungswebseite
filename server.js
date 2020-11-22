
const express = require('express');

const path = require("path"); // iki tane farkli dosya yolunu birlestiriyor. 

let server = express();

const router = require('./router/index');

server.use("/",router); //
server.set('client', path.join(__dirname, 'client'));  //_dirname = server.js in dosya yolunu veriyor. sonra onu clientle birlestiriyoruz.
// server.engine('html', cons.swig)

console.log(__dirname);

server.set('view engine', 'pug');

server.use(express.json()); // request icerisinden gelen JSON verilerini okumak icin kullanilir

server.use(express.static('client',{
	extensions:['html'] // bu sayfa sonlarinda cikan uzantilari gizler(yusuf ole dedi).


}))
server.use("/panel/panel", express.static('views'))










server.listen(80, err => console.log(err || 'Server laeuft')); // server okumak icin kullanilir





