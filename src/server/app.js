const app = require('../server/server')

const port = process.env.PORT || 3000;
const server = app.listen(port, listening);


function listening() {
    console.log(`running on localhost: ${port}`)
}