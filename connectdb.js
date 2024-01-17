import mysql2 from "mysql2";

// const db = mysql2.createConnection({
//     host: "edgarjrflores.cmu-online.tech",
//     user: "cmuon_floresejr",
//     password:"F3ohk$96",
//     database:"cmuonine_floresejrdb"
// })

const db = mysql2.createPool({
  host: "localhost",
  user: "root",
  password:"root",
  database:"artlydb",
  connectTimeout: 30000

});


// const db = mysql2.createPool({
//     host: "edgarjrflores.cmu-online.tech",
//     user: "cmuon_floresejr",
//     password:"F3ohk$96",
//     database:"cmuonine_floresejrdb",
//     connectTimeout: 30000

//   });
  


export default db;  