import processEnvVar from "./utils/processEnvVar.js";
import server from "./index.js";
// import connectToDB from "./config/connectToDatabase.js";


const PORT = processEnvVar.PORT;


server.listen(PORT, ()=>{
    console.log(`server is listening on http://api-integration-with-rdbms.onrender.com`);
});
