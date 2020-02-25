const devConfig = {
    CONNECTION_URL: process.env.DB_CONNECTION,
    JWT_SECRET: process.env.TOKEN_SECRET,
};

const testConfig = {
    CONNECTION_URL: process.env.DB_CONNECTION,
};

const prodConfig = {
    CONNECTION_URL: process.env.DB_CONNECTION,
};

const defaultConfig = {
    PORT: process.env.PORT || 5000,
    IS_PROD: process.env.NODE_ENV == 'production'
};

function envConfig(env) {
    switch (env) {
        case 'development':
            return devConfig;
        case 'test':
            return testConfig;
        case 'production':
            return prodConfig;
    }
}

module.exports = {
    ...defaultConfig,
    ...envConfig(process.env.NODE_ENV),
};