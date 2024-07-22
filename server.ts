import { app } from './app'
import { connectDB } from './db';

const port = process.env.PORT ?? 3000;

async function startServer() {
	try {
		await connectDB();
		app.listen(port, () =>
			console.log(`Server listening on http://localhost:${port}`)
		);

	} catch (err) {
		console.error('Unexpected error occurred', err);
	}
}

startServer();