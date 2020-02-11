const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const {buildSchema} = require('graphql');

const app = express();
const schema = buildSchema(`
    type Query {
        hello: String
        }
    `);
const root = {
    hello: () => {
        return 'Hello world!';
    },
};
app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    schema: schema,
    rootValue: root,
    graphiql: true
}))


app.listen(3000);