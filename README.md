# World Leaders

**Author Kris Sakarias**

**Version 2.0.0**

## Overview

This server and REST API is powered by Express and fetches data from the CIA API (https://github.com/iancoleman/cia_world_factbook_api#data). MongoDB collections are created and maintained to store basic data specific to countries around the world, as well as their governmental systems. This back-end architecture will eventually support a React front-end, which will imformatively organize and display the data.

### Documentation

Starting the Server:

```
git clone https://github.com/kris71990/worldleadersapp

npm i

mongod

npm run start
```

Database Models:

There are currently two models controlling the structure of the data used in this application.

```
Country
System
```

Any country in the world can be stored in the country collection of the Country model. A system (and only one) can only be created for a country that exists in the country collection (1:1 relationship). Each system holds a unique reference number to the country it represents. 


Endpoints:

1. POST to /countries
  - Required Parameters
    - `countryName` - the name of some country in the world (use quotes for multiple words)
  - Example request 
    - `http POST localhost:${PORT}/countries countryName=benin`
  - The above request will retrieve and parse data from the CIA world factbook for Benin, save the relevant data into the database, and return the saved data.

2. GET from /countries/:id
  - Required Parameters
    - `id` - the id of some country currently in the database
  - Example request 
    - `http GET localhost:${PORT}/countries/5b130b049fe61724b1d83609`
  - The above request will return the country with the given id from the database, if it exists.

3. A POST to /system
   - Required Parameters
    - `countryName` - the name of some country in the database
    - `countryId` - the Mongo ObjectId of the country in the database
  - Example request 
    - `http POST localhost:${PORT}/system countryName=benin countryId=5b130b049fe61724b1d83609`
  - The above request will verify that the Benin currently exists in the 'country' collection in the database, and that it does not already reference an existing governmental system. If Benin exists without reference to a system, the post will retrieve and parse Benin's governmental system data and save it to the database, with reference to Benin's entry in the 'country' collection.

4. A GET from /system/:country
  - Required Parameters
    - `country` - the name of some country currently in the database
  - Example request 
    - `http GET localhost:${PORT}/system/benin`
  - The above request will return the governmental system data for Benin.

### Tests

All the above functionality is tested using the Jest library. 

To run tests `npm run test`