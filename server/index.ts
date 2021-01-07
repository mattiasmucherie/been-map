import express from 'express';
require('dotenv').config();

const app = express();
app.use(express.json());

const port = process.env.API_PORT;

app.get('/', (_req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Server started at http:///localhost:${port}`);
});
