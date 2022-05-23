# StockPrice

## Overview
Low-cost wifi microchip like esp8266 is an ideal ingredient for low power IoT system in smarthouse. However, in the industrial field, where hundred copies of those
system is require. The challenge come when the integrated code insise of these microchip need to be updated or modified due to the change of requirements. The process of
connecting the system with computer wirely to push the new code is not practical. This project is aiming to solve that problem by provide a way to update the controller
code for those device without the need to actually connect them to any other device wirely. Moreover, this project also mention a way for web and backend/frontend developer,
to programm those microchip using javascript.

## Devices
### 2 x Kit RF Wifi ESP8266 NodeMCU Lua CP2102
https://www.dmca.com/Protection/Status.aspx?ID=a20a682c-dec4-498f-8b39-2da77042ce24&refurl=https://hshop.vn/products/kit-rf-thu-phat-wifi-esp8266-nodemcu
![image](https://user-images.githubusercontent.com/90603689/169732840-971f0482-fe4b-4c19-9b2b-7ca5015c1e4a.png)
This is a custom kit base on Wifi SoC ESP8266 , NodeMCU and CP2102 USB to UART chip. This board can can be uploaded code using Arduino IDE through COM port.

As can be seen from the GPIO scheme, we can connect more than 1 MAX 7219 8-digit led to this kit, using 2 devices is just for demonstrating the ability to mass update
code for multiple devices.
### MAX7219 8-Digit Red LED Display Module 7 Segment
Connect to the boards to showing the real time price of specified stock.

### Any device that cannect to internet and execute javascript( computer, raspberry pi, etc.)
 
### Tool, Libraries and API in this project

### Some breadboard and wires.

### Tools
Visual Studio,
Arduino IDE,
Firmata Builder
### Libraries
* Firmata: For control the GPIO remotely (throught serial connection)
ESP8266Wifi: Configurate the network on the esp9266 micro-chip,
Jonhnny-Five: Control the SoC devices using javascript,
ramda: utilities for java-cript,
etherport-client: config connection properties,
finnhub: libarary to call the API finnhub for stock data.

### API
Finnhub API 

## Setup
### Prerequisites
Install firmware of esp8266 https://www.instructables.com/Programming-ESP8266-ESP-12E-NodeMCU-Using-Arduino-/
### Set up esp8266 kit
Change some line of code in `ledAMD.ino` and `ledCoca.ino` to match the actual properties of your network.

`#define NETWORK_PORT 3031`
`char ssid[] = "{your_SSID}";`
`char wpa_passphrase[] = "{your_password}";`

`IPAddress local_ip({your_prefered_static_ip_for_the_board});`
`IPAddress subnet(255, 255, 252, 0);`
`IPAddress gateway({your_ip_gateway});`

* the local_ip for 2 board need to be different and don't match any other device's ip in your network.
** the static_ip need to match the structure of your gateway
*** should you different port for 2 board




Connects 2 boards to the computer and use arduinoIDE to upload `ledAMD.ino` and `ledCoca.ino` in the Esp8266 folder to them respecively.

After upload is finished. the board can be connected and change behavior using javascript.

### Set up javascript.

#### First you will need to register the GPIO of the board
const D0 = 16;
const D1 = 5;
const D2 = 4;
const D3 = 0;
const D4 = 2;
const D5 = 14;
const D6 = 12;
const D7 = 13;
const D8 = 15;
* these number is the number of the GPIO, for example, from the scheme, the D1 of the board is GPIO0.

#### Modify the variables `ports` in the code to match your actual properties.


`var ports = [
    {
        id: "{your_prefered_id_for_board_1}",
        port: new EtherPortClient({
            host: '{your_prefered_static_ip_for_board_1}',
            port: {your_port_number_for_board1}
        })
    },
    {
        id: "our_prefered_id_for_board_2",
        port: new EtherPortClient({
            host: '{your_prefered_static_ip_for_board_2}',
            port: {your_port_number}
        })
    }
];`
* if you have more than 2 boards, simply follow the pattern to add more.

#### Register the 7segment led digit
var digitsKO = new five.Led.Digits({
        pins: {
            data: D1,
            clock: D2,
            cs: D0
        },
        board: boards.byId("KO")
    });
* Remember to connect pin data --> D1, clock --> D2, cs --> D3 using some wire 

#### Modify the prefered stock. 
Modify the stock code to change the stock we prefer to get the price from the API
`finnhubClient.quote("{your_prefered_stock}", (error, data, response)`

* if you prefer to use another API which doesn't provide a library. Simply use axios to send the
HTTP request to that API in traditinal way https://www.npmjs.com/package/axios 

## Limitations
The GPIO device that we can connect to the board and control( in a convinience way) depend
on the support devices listed in johnny-five library. Of course we can control other unsupported devices
by calling and controlling the GPIO pin directly. However it require the knowledge of bit-shift register,
trigger, pointer and C++. (ex : the 7 segment digital led using shift register 74HC595 can't be use just by calling the five.digits)
The wifi connection also need to be stable ortherwise the device will stop working as it's controlled
100% through wireless tcp/ip connection.

## Conclusion

these method provide the solution for mass code update for IOT devices/systems and a convinience
way for web/frontend/backend developer who already has knowledge about javascript and api to
build a IOT system without need of knowledge in C++ and integreted system.





