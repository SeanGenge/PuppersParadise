const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const fs = require('fs');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const routes = require('./routes');
const { authMiddleware } = require('./utils/auth');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: authMiddleware
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
	// Create the upload directory for uploading images in the build folder if it doesn't exist
	if (!fs.existsSync(path.join(__dirname, '../../../client/build/images/uploads'))) {
		fs.mkdirSync(path.join(__dirname, '../../../client/build/images/uploads'), { recursive: true });
	}
	
	app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const startApolloServer = async (typeDefs, resolvers) => {
	await server.start();
	server.applyMiddleware({ app });
	
	app.use(routes);
	
	db.once('open', () => {
		app.listen(PORT, () => {
			console.log(`API server running on port ${PORT}!`);
			console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
		});
	})
};

startApolloServer(typeDefs, resolvers);