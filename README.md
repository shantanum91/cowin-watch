# cowin-watch
Nodejs program to watch for vaccine availability


Get State Id:
https://cdn-api.co-vin.in/api/v2/admin/location/states


Get District Id:
https://cdn-api.co-vin.in/api/v2/admin/location/districts/{stateId}


Example for Maharashtra: https://cdn-api.co-vin.in/api/v2/admin/location/districts/21


## cowin-watch.js
Program to search vaccine availability based on district id and make a beep sound if slots are available. You can add pin filter or keep it null to consider all pins. You can also exclude specific pins or keep empty array to not exclude any pin.

## cowin-watch-telegram.js
All features of cowin-watch.js, additionaly it can send the alert on Telegram. You need to put your Telegram hannel name in the code & Bot token in token.txt file (create this file in the same folder).

How to create Telegram Bot?: https://core.telegram.org/bots

How to create Telegram public Channel?: https://telegram.org/tour/channels


## How did I host it?

![Image](cowinwatch.png?raw=true "Setup")
