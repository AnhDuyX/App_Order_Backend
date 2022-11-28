const express = require('express');
const cors = require('cors');
const app = express();
('');
const mongoose = require('mongoose');
const { MONGO_DB_CONFIG } = require('./config/app_config');
const errors = require('./middleware/errors.js');
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');
const { findAll } = require('./controllers/products.controller');

mongoose.Promise = global.Promise;
mongoose
    .connect(MONGO_DB_CONFIG.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(
        () => {
            console.log('Done connect!');
        },
        (error) => {
            console.log('No connect!' + error);
        },
    );

app.use(cors({}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api', require('./routes/app.routes'));
app.use(errors.errorHandler);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// var http = require('http');
// http.createServer(function (req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('Hello Node.js');
// }).listen(4000, '10.0.0.1');
// console.log('Server running at http://127.0.0.1:3000');
app.listen(process.env.port || 4000, function () {
    console.log('Ready to Go!');
});

