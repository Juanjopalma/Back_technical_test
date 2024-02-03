const connection = require("../config/db");

class indexControllers {

  getDataCountryofAPI = (req, res) => {
    let url = "https://restcountries.com/v3.1/all?fields=name,population";

    fetch(url)
        .then((response) => response.json())
        .then( (data) => { 
          const datos = data?.map((country) => ({
            name: country.name.common,
            population: country.population
          }));

          res.json(datos);


        })
        .catch((err) => console.log('Error al llamar a la API:', err))
        
  }

  postDataCountry = (req, res) => {
    const jsonData = req.body;
    console.log(jsonData);

    jsonData.forEach( ({ name, population }) => {
      let sql = `INSERT INTO country (common_name, population) VALUES ('${name}', ${population})`;

      connection.query(sql, (err, result) => {
        if (err) {
          console.log("Error with db", err);
        } else {
          console.log("datos introducidos en bd");
        }
      })
    })
  }

    getDataOfDataBase = (req, res) => {
      console.log(res.body);
    }

}

module.exports = new indexControllers;