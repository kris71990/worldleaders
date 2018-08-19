# The World Right Now

[![Travis branch](https://img.shields.io/travis/kris71990/the_world_right_now/master.svg)](https://travis-ci.org/kris71990/the_world_right_now)
![Coverage](https://img.shields.io/badge/coverage-98%25-brightgreen.svg)
[![David](https://img.shields.io/david/expressjs/express.svg)]( https://github.com/kris71990/the_world_right_now)
![version](https://img.shields.io/badge/version-2.0.0-orange.svg)
[![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)](https://github.com/kris71990/the_world_right_now)


**Author: Kris Sakarias**

**Version: 2.0.0**

## Overview

This is a full-stack application that informs the user about the current social, political, and economic state of the countries in the world. It is currently online at http://www.theworldrightnow.info/

The back-end server and REST API is built with Node and powered by Express and MongoDB. All data is collected from and verified against data from the CIA API (https://github.com/iancoleman/cia_world_factbook_api#data). This data comes in the form of a single very large JSON object, which The World Right Now utilizes to perform its CRUD functionality for the purposes of this app. The server does a very large amount of parsing and validation to a ensure a smooth and accurate user experience.

The front-end is built with React. The user can select a country from the dropdown menu to view the latest social, political, and economic information about it. A series of rankings pages parses and organizes a very large amount of data so that the user can quickly see how different countries compare against eachother in a variety of different ways. 

Political and electoral information is also examined. A country's political system page allows the user to see the type of government, the current leaders (with pictures), future elections, and much more.

The current functionality is described in detail in the front-end and back-end subdirectory READMEs.

## Usage

**Starting the Server**:

```
git clone https://github.com/kris71990/the_world_right_now.git
cd front-end npm i
cd back-end npm i
mongod

/back-end: npm run start
/front-end: npm run watch
```

Please consult the back-end and front-end subdirectory READMEs for detailed documentation of the functionality of the app.


## Testing

All CRUD functionality in the app is tested using the Jest library. 

To run server tests, navigate to the back-end directory and run `npm run test`

The server's performance has also been tested under load with artillery.io.