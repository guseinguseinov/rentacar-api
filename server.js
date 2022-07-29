import http from 'http';
import app from './app.js';

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Server started at http://localhost:8080');
});