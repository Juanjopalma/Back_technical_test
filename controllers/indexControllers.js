const connection = require("../config/db");

class indexControllers {

  // obtengo los datos de la api (bien)
  getDataCountryofAPI = (req, res) => {
    let url = "https://restcountries.com/v3.1/all?fields=name,population";

    fetch(url)
        .then((response) => response.json())
        .then( (data) => { 
          const datos = data?.map((country, index) => ({
            country_id: index + 1,
            name: country.name.common,
            population: country.population
          }));

          res.json(datos);
          console.log(res);
        })
        .catch((err) => console.log('Error al llamar a la API:', err))
  }

  // almacenaje y actualizaciónde de los datos de la api
  postDataCountry = (req, res) => {
    const jsonData = req.body;
    console.log(jsonData); // me trae los datos bien 

    let sql = `SELECT * FROM country`; 

    connection.query(sql, (err, results) => {
      if (err) {
        console.log("Error al verificar la existencia de datos en la bd", err);
        return res.status(500).json({ error: "Error al verificar la existencia de datos en la bd" });
      }

      // me introduce los datos en la bd en caso de estar vacía dicha bd: bien
      else if (results.length === 0) {
        jsonData.forEach( ({ country_id, name, population }) => {
          let sql2 = `INSERT INTO country (country_id, common_name, population) VALUES (${country_id},'${name}', ${population})`;
    
          connection.query(sql2, (err, result) => {
            if (err) {
              console.log("Error al introducir los datos en la bd", err);
            } else {
              console.log("datos introducidos en bd");
            }
          })
        })
      }

      // me actualiza la bd con los nuevos datos: bien
      else {
        jsonData.forEach( ({country_id, name, population}) => {
          let sql2 = `UPDATE country SET common_name = "${name}", population = ${population} WHERE country_id = ${country_id}`;
    
          connection.query(sql2, (err, result) => {
            if (err) {
              console.log("Error al actualizar los db", err);
            } else {
              console.log("datos actualizados en bd");
            }
          })
        })
      }
    })
  }


}

module.exports = new indexControllers;