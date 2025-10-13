const app = require('./src/index');
require('dotenv').config();


const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`Server listening on PORT:${port}`));