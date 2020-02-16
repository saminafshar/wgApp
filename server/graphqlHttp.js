const graphqlHttp = require('express-graphql');
const {buildSchema} = require('graphql');
const express = require('express');

const User = require('./models/user');
const app = express();



