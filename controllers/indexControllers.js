const connection = require("../config/db");
const fetch = require('node-fetch');

class indexControllers {

  // Insert all countries of the Api 
  postDataCountry = (req, res) => {
    let url = "https://restcountries.com/v3.1/all?fields=name,population";

    fetch(url)
        .then((response) => response.json())
        .then( (data) => { 
          const dataApi = data?.map((country, index) => ({
            id: index + 1,
            name: country.name.common,
            population: country.population
          }));

          let sql = `SELECT * FROM country`; 

          connection.query(sql, (err, results) => {
            if (err) {
              console.log("Error when verifying the existence of data in the database", err);
              return res.status(500).json({ error: "Error when verifying the existence of data in the database" });
            }

            // Insert the data in the database if it is empty 
            else if (results.length === 0) {
              dataApi.forEach( ({ id, name, population }) => {
                let sql2 = `INSERT INTO country (country_id, common_name, population) VALUES ('${id}', '${name}', ${population})`;
          
                connection.query(sql2, (err, result) => {
                  if (err) {
                    console.log("Error when entering data into the database", err);
                    return res.status(500).json({ error: "Error when entering data into the database" });
                  } 
                })
              })

              return res.status(200).json({ message: "data inserted into the database"})
            }

            // If the database isn't empty 
            else if (results.length !== 0) {
              console.log("The data is already in the database", err);
              return res.status(500).json({ error: "The data is already in the database" });
            }
          })
          
        })
        .catch((err) => console.log('Error calling API:', err))

  }

  // Get one country of the Api 
  getDataCountry = (req, res) => {
    const country = req.params.country;
    console.log(country);

    let sql = `SELECT * FROM country WHERE common_name = '${country}'`; 

    connection.query(sql, (err, results) => {
      if (err) {
        console.log("Error to get the country of database", err);
        return res.status(500).json({ error: "Error to get the country of database" });
      }
      else if (results.length === 0) { 
        console.log("You have written wrong the country or the country does not exist in the database");
        return res.status(400).json({ error: "You have written wrong the country or the country does not exist in the database" });
      }
      else { 
        console.log("Got country of database");
        return res.status(200).json(results)
      }
    })
  }

  // Get all countries of the Api 
  getDataCountries = (req, res) => {
    let sql = `SELECT * FROM country`; 

    connection.query(sql, (err, results) => {
      if (err) {
        console.log("Error to get the countries of database", err);
        return res.status(500).json({ error: "Error to get the countries of database" });
      }
      else { 
        console.log("Got countries of database");
        return res.status(200).json(results)
      }
    })
  }

  // Update all countries of the Api 
  putDataCountries = (req, res) => {
    const updatedData = req.body;

    let sql = "SELECT * FROM country";

    connection.query(sql, (err, results) => {
      if (err) {
        console.log("Error when verifying the existence of data in the database", err);
        return res.status(500).json({ error: "Error when verifying the existence of data in the database" });
      }

      // In case the query comes empty 
      else if (results.length === 0) {
        console.log("There is no data in the database", err);
        return res.status(500).json({ error: "There is no data in the database" });
      }

      // If there is data in the database, the data is updated 
      else if (results.length !== 0) {
        updatedData.forEach( ({ common_name, population }) => {
          let sql2 = `UPDATE country SET common_name = "${common_name}", population = ${population} WHERE common_name = "${common_name}"`;
     
          connection.query(sql2, (err, result) => {
            if (err) {
              console.log("Error to update the data of database", err);
              return res.status(500).json({ message: "Error to update the data of database" });
            }
          })
        })

        return res.status(200).json({ message: "data updated in the database"}) 
      }
    })
  }

}


module.exports = new indexControllers;