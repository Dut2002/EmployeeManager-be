const siteRouter = require('./site')
const loginRouter = require('./login')
const accountRouter = require('./account')

function route(app){
    
    app.use('/api/login/', loginRouter);
    app.use('/api/account/', accountRouter);
    app.use('/api/', siteRouter);
}

module.exports = route