const dotenv = require('dotenv');
const path = require('path');

const dotenv_file_path = dotenv.config({ path: path.resolve(__dirname , ".." , ".env") });

const required_envs = ['PORT' , 'SERVICE_NAME', 'NODE_ENV'];

for (const key of required_envs) {
    if(!process.env[key]) {
        console.error(`Missing env variable ${key}`);
        process.exit(1);
    };
};

const config = {
    nodeEnv: process.env.NODE_ENV,
    serviceName: process.env.SERVICE_NAME,
    port: process.env.PORT
};

console.log(config);