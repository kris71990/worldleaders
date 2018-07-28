# The World Right Now - Front-End

[![Travis branch](https://img.shields.io/travis/kris71990/worldleaders/master.svg)](https://travis-ci.org/kris71990/worldleaders)
[![David](https://img.shields.io/david/expressjs/express.svg)]( https://github.com/kris71990/worldleaders)
![version](https://img.shields.io/badge/version-2.0.0-orange.svg)
[![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)](https://github.com/kris71990/worldleaders)


**Author Kris Sakarias**

**Version 2.0.0**

## Overview

This is a full-stack application that informs the user about the current social, political, and economic state of the countries in the world. 

The back-end server and REST API is built with Node and powered by Express and MongoDB. All data is collected from and verified against data from the CIA API (https://github.com/iancoleman/cia_world_factbook_api#data). This data comes in the form of a single very large JSON object, which The World Right Now utilizes to perform its CRUD functionality for the purposes of this app. The server does a very large amount of parsing and validation to a ensure a smooth and accurate user experience.

The front-end is built with React. The user can select a country from the dropdown menu to view the latest social, political, and economic information about it. A series of rankings pages parses and organizes a very large amount of data so that the user can quickly see how different countries compare against eachother in a variety of different ways. 

Political and electoral information is also examined. A country's political system page allows the user to see the type of government, the current leaders (with pictures), future elections, and much more.

## Documentation

**Create an .env file**
Include these variables to run the application:

```
API_URL=http://localhost:3000
NODE_ENV=development
GOOGLE_API_KEY="Your Google Maps Api Key"
```

**Running the front-end with Webpack**:

After starting the server on the back-end:

```
cd front-end
npm i
npm run watch
```


**Front-end Functionality**

*Component Structure*
```
App
  Header
    AreaRank
    GDPRank
    PopulationRank
    LanguageRank
    SystemRank
  Footer
  Landing
    CountryForm
    Country
      CountryBasic
      FlagForm
      CountryEconomy
      CountryCulture
    System
      CapitalMap
      SystemLeaders
      LeaderForm
      SystemElections
```

*Components*

1. App
    - The main wrapper component. This component is rendered in main within the Provider component, which is integrated with Redux and connects to the Redux store.
    - This component directly renders `Header`, `Footer`, and `Landing`

2. Header - renders a header - this header contains links that render the `Ranking` components 

3. Footer - renders a footer

4. Landing 
    - This component is rendered upon navigation to the homepage. It is the entry point to the rest of the application. 
    - Upon mounting, it fetches an array of objects from `/countries/list` and renders a dropdown list of all the countries in the database via some sorting and parsing logic. 
    - It also renders the `CountryForm` component
    - Upon selection of a country from the list, it will redirect to `countries/:countryId`, which will render the `Country` component

5. CountryForm 
    - This form renders a simple form with a single field. Upon form submission, a post request will be sent to `/countries countryName="user-input-country"`. Once the data is created and returned from the back-end, the country will be added to the dropdown list.

6. Country
    - This component is rendered when a user selects a country from the dropdown list. The id number associated with this country is passed to the component to be used to retrieve the country's data from the backend at `/countries/:id`.
    - The data is encapsulated in a large object with many properties and a lot of information. 
    - This component then passes this object to, and renders, three subcomponents: `CountryBasic`, `CountryEconomy`, and `CountryCulture`.
    - This component also renders `FlagForm`, to add a flag to the page
    - This component also gives the user the ability to update the information if necessary, and add/view the polical information about the country via the `System` component

7. CountryBasic
    - This component parses and renders basic information about the country including: 
      - Name of Country
      Region where it is located
      - Bordering countries
      - Population
      - Population Rank (descending, where 1 is most the populous)
      - Area (in square kilometers)
      - Area Rank (descending, where 1 is the largest)
      - Life Expectancy 
      - Life Expectancy Rank (descending, where 1 has the longest living people)

8. FlagForm
    - This component renders a simple form with a single field. Enter the url of a picture of the country's flag, and it will be saved to the database and rendered on the Country component.
      - URL requirements;
          - Must begin with `https://upload.wikimedia.org/`
          - Must include `Flag_of`
          - Must include name of the country 
          - Must end in `.jpg`, `.png`, or `.svg`
          - Example: `https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg`

9. CountryCulture
    - This component parses and renders information related to the country's culure including:
      - Languages
        - A list of the most commonly spoken languages in the country, ordered by percentage of the population that speaks it.
      - Religions
        A list of the religions practiced in the country by percentage
      - Ethnic Groups
        - A list of the ethnic groups living in the country ordered by percentage

10. CountryEconomy
    - This component parses and renders economic and trade related data:
      - Natural Resources
        - The most common natural resources that exist in the country
      - Imports
        - A list of the primary goods the country imports
      - Import Partners
        - The countries from which most of the imported goods come from
      - Exports
        - A list of the primary goods the country exports
      - Export Partners
        - The countries to which most of the country's exports go

11. System
    - This component is rendered when a user navigates from the `Country` component via a link. If the information is not in the database, it will be retrieved from the external API, saved, and rendered.
    - This component then renders four subcomponents: `CapitalMap`, `LeaderForm`, `SystemLeaders`, and `SystemElections`.

12. CapitalMap
    - This component utilizes the Google Maps API (using a necessary API key) and renders a map of the country, it's capital, and the general surrounding area. 

13. LeaderForm
    - This component is rendered twice to give the user the ability to add photos, if they don't already exist, of the Head of Government and Head of State of the country. Similar to `FlagForm`, a url is required and is validated via a parsing of a string of the current leaders of the country. 
      - URL requirements
          - Must begin with `https://upload.wikimedia.org/`
          - Must end in `.jpg`, `.png`, or `.svg`
          - Must include the name of the leader the form is associated with.
          - Example: `https://upload.wikimedia.org/wikipedia/commons/e/e3/Emmanuel_Macron_in_Tallinn_Digital_Summit._Welcome_dinner_hosted_by_HE_Donald_Tusk._Handshake_%2836669381364%29_%28cropped_2%29.jpg`

14. SystemLeaders
    - This component renders the names of the current leadership of the country and their photos, if they exist.

15. SystemElections
    - This component renders the results of the most recent elections, the current composition of government based on the current electoral results, and the dates the next elections.


*Ranking Components*

1. GDPRank
    - This component renders a list of all countries in the database in descending order of GDP Purchasing Power Parity (richest country first)

2. AreaRank
    - This component renders a list of all countries in the database in descending order of area (largest country first)

3. PopulationRank
    - This component renders a list of all countries in the database in descending order of population (most populous country first)

4. LanguageRank
    - This component renders a list of all languages spoken in the world, in descending order of how many countries they are spoken in.

5. SystemRank
    - This component renders a real-time tally of the types of governmental systems of the countries in the database.

### Testing

Testing front-end components, actions, and reducers is done with Jest as well as a some helper dependencies.

To run tests: `npm run test`