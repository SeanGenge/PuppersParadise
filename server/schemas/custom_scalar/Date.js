// https://www.apollographql.com/docs/apollo-server/schema/custom-scalars/

const { GraphQLScalarType, Kind } = require('graphql');

const dateScalar = new GraphQLScalarType({
	name: 'Date',
	description: 'Date custom scalar type',
	parseValue(value) {
		return value;
	},
	serialize(value) {
		return new Date(Number(value));
	},
	parseLiteral(ast) {
		if (ast.kind === Kind.INT) {
			return new Date(ast.value);
		}
		return null;
	}
});

module.exports = dateScalar;