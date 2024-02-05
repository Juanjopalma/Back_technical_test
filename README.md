# API_Countries_Project 

This application allows you to save all countries of Api and saved in database, moreover, you can get one country or all countries, and update the data of the countries or the data of one country in the database.

## Prerequisites
- Have Node installed
- Have Postman installed or Thunder Client extension of Visual Studio Code

## Installation
1. Clone this repository to your local machine: 
   - git clone https://github.com/Juanjopalma/Back_technical_test.git

2. Move to the application folder:
   - cd Back_technical_test

4. Install the dependencies:
   - npm i

5. Start the application:
   - npm run dev

6. Open Postman or Thunder Client to do the CRU (Create, Read and Update)
   - 1º: POST Method to save the data in the database
   - 2º: Any of the other methods (GET or PUT)

8. If you want, you can see the data in the browser also to:
  - See the countries of database in:   http://localhost:3000/api/v1/data/countries
  - See the country that you want, for example:  http://localhost:3000/api/v1/data/country/Andorra
