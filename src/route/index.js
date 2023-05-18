const siteRouter = require('./site');   
const loginRouter = require('./login');
const studentRouter = require('./student');
const registerRouter = require('./register');


function route(app){
    
    app.use('/api/register/', registerRouter);
    app.use('/api/login/', loginRouter);
    app.use('/api/student/', studentRouter);
    app.use('/api/', siteRouter);
}

module.exports = route