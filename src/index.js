const express = require('express');
const app = express();
const port = 3000;
const db = require('./app/models');

// Read data
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Route init
const route = require('./route')
route(app)
db.sequelize.sync().then((req) => {
    app.listen(port, () => console.log(`Example app listening at http://localhost:${port}/api`));
});
