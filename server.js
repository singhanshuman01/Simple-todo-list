const { server } = require('./src/websocket/websock');
require('dotenv').config();

const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`Server listening on PORT:${port}`));