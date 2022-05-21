'use strict';
let mCode = 'worker1';
let link = "http://vnsh.ga/api/cpanel/andon/signal/defectget/" + mCode;

var n0 = 0;
var n1 = 0;
var n2 = 0;
const R = require('ramda');
const { EtherPortClient } = require('etherport-client');
const finnhub = require('finnhub');
const five = require('johnny-five');


var ports = [
    {
        id: "AMD",
        port: new EtherPortClient({
            host: '192.168.137.99',
            port: 3030
        })
    },
    {
        id: "KO",
        port: new EtherPortClient({
            host: '192.168.137.98',
            port: 3031
        })
    }
];

var boards = new five.Boards(ports);

//const board = new five.Board({
//    port: new EtherPortClient({
//        host: '192.168.137.99',
//        port: 3030
//    }),
//    repl: false
//});


const D0 = 16;
const D1 = 5;
const D2 = 4;
const D3 = 0;
const D4 = 2;
const D5 = 14;
const D6 = 12;
const D7 = 13;
const D8 = 15;
boards.on('ready', () => {
    console.log("connected");
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = "ca4aleqad3if57m3ggjg";
    const finnhubClient = new finnhub.DefaultApi();

    var digitsAMD = new five.Led.Digits({
        pins: {
            data: D1,
            clock: D2,
            cs: D0
        },
        board: boards.byId("AMD")
    });

    var digitsKO = new five.Led.Digits({
        pins: {
            data: D1,
            clock: D2,
            cs: D0
        },
        board: boards.byId("KO")
    });

    setInterval(() => {
        console.log("start interval");

        finnhubClient.quote("AMD", (error, data, response) => {
            const currentPriceAmd = R.path(['c'], data);
            console.log("Print AMD stock price");
            console.log(currentPriceAmd);
            //digits.print(currentPriceAmd);
            digitsAMD.print(currentPriceAmd);

        });

        finnhubClient.quote("KO", (error, data, response) => {
            const currentPriceKO = R.path(['c'], data);
            console.log("Print Cocacola stock price");
            console.log(currentPriceKO);
            digitsKO.print(currentPriceKO);

        });




    }, 1500);


});


//board.on('ready', () => {


//    var digits = new five.Led.Digits({
//        pins: {
//            data: D1,
//            clock: D2,
//            cs: D0
//        }
//    });
//    console.log("connected");
//    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
//    api_key.apiKey = "ca4aleqad3if57m3ggjg";
//    const finnhubClient = new finnhub.DefaultApi();



//    //let testNumber = 20;


//    //get data
//    setInterval(() => {
//        console.log("start interval");

//        finnhubClient.quote("AMD", (error, data, response) => {
//            const currentPriceAmd = R.path(['c'], data);
//            console.log(currentPriceAmd);
//            //digits.print(currentPriceAmd);
//            digits.print(90);

//        });




//    }, 1500);
//});
