import pg from "pg";


// create client
const client = new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"BackEnd",
    password:'1234',
    port:5050
})

// connect client
client.connect();

console.log("connected succussfully");


client.query('SELECT * FROM Student', (err, result) => {
    if (err) {
      console.error('Error executing query', err);
    } else {
      console.log('Query result:', result.rows);
    }
  
    client.end();
});