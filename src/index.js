const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const db = require('./app/models');


app.use(cors());

// Read data
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Route init
const route = require('./route')
route(app)
db.sequelize.sync().then((req) => {
    app.listen(port, () => console.log(`Example app listening at http://localhost:${port}/api`));
});
