const MONGO_DB_CONFIG = {
    //DB: 'mongodb://0.0.0.0:27017/demo',
    DB: "mongodb+srv://app_food:AfYZzaF3pAD6tf51@cluster0.yu46ktd.mongodb.net/?retryWrites=true&w=majority",
    PAGE_SIZE: 10,
};

const STRIPE_CONFIG = {
    STRIPE_KEY: "sk_test_51MKiLfHuPjr1bXrBOmFvVLAuTeUXYbmn0QBUJa1yhUQcS1FigG3QLOLm6RTcU1mW0b8DV5Wz3a87ApILgjYQXXDB00J9bq4nrm",
    CURRENCY: "thb"
}

module.exports = {
    MONGO_DB_CONFIG,
    STRIPE_CONFIG
};
