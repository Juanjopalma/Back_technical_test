const connection = require("../config/db");
const fetch = require('node-fetch');

class indexControllers {

  // // obtengo los datos de la api (bien)
  // getDataCountryofAPI = (req, res) => {
  //   let url = "https://restcountries.com/v3.1/all?fields=name,population";

  //   fetch(url)
  //       .then((response) => response.json())
  //       .then( (data) => { 
  //         const datos = data?.map((country) => ({
  //           name: country.name.common,
  //           population: country.population
  //         }));

  //         res.json(datos);
  //         console.log(res);
  //       })
  //       .catch((err) => console.log('Error al llamar a la API:', err))
  // }

  // Inserta todos los países de la api
  postDataCountry = (req, res) => {

    let url = "https://restcountries.com/v3.1/all?fields=name,population";

    fetch(url)
        .then((response) => response.json())
        .then( (data) => { 
          const datos = data?.map((country, index) => ({
            id: index + 1,
            name: country.name.common,
            population: country.population
          }));

          let sql = `SELECT * FROM country`; 

          connection.query(sql, (err, results) => {
            if (err) {
              console.log("Error al verificar la existencia de datos en la bd", err);
              return res.status(500).json({ error: "Error al verificar la existencia de datos en la bd" });
            }

            // me introduce los datos en la bd en caso de estar vacía dicha bd: bien
            else if (results.length === 0) {
              datos.forEach( ({ id, name, population }) => {
                let sql2 = `INSERT INTO country (country_id, common_name, population) VALUES ('${id}', '${name}', ${population})`;
          
                connection.query(sql2, (err, result) => {
                  if (err) {
                    console.log("Error al introducir los datos en la bd", err);
                  } 
                })
              })
            }

            // en caso de 
            else if (results.length !== 0) {
              console.log("Ya están los datos en la bd", err);
              return res.status(500).json({ error: "Ya están los datos en la bd" });
            }
          })
          
        })
        .catch((err) => console.log('Error al llamar a la API:', err))

  }

  // obtener los países de la base de datos
  getDataCountry = (req, res) => {

    const country = req.params.country;
    console.log(country);

    let sql = `SELECT * FROM country WHERE common_name = '${country}'`; 

    connection.query(sql, (err, results) => {
      if (err) {
        console.log("Error al traer el país de la bd", err);
        return res.status(500).json({ error: "Error al traer los países de la bd" });
      }
      else if (results.length === 0) {
        console.log("Ha escrito mal el país o el país no existe en la bd");
        return res.status(400).json({ error: "Ha escrito mal el país o el país no existe en la bd" });
      }
      else {
        console.log("País obtenidos de la bd");
        return res.status(200).json(results)
      }
    })
  }

  // obtener los países de la base de datos
  getDataCountries = (req, res) => {
    let sql = `SELECT * FROM country`; 

    connection.query(sql, (err, results) => {
      if (err) {
        console.log("Error al traer los países de la bd", err);
        return res.status(500).json({ error: "Error al traer los países de la bd" });
      }
      else {
        console.log("Datos obtenidos de la bd");
        return res.status(200).json(results)
      }
    })
  }

}


module.exports = new indexControllers;