import dotenv from 'dotenv';
dotenv.config();

function processEnvironmentVaribale() {
    return process.env;
};

const processEnvVar = processEnvironmentVaribale();
export default processEnvVar;