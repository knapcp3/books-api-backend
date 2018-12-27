const http = require('http');
const app = require('./server');

const server = http.createServer(app);
const PORT = app.get('port');

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


