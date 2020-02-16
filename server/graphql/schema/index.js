const {buildSchema} = require('graphql');

module.exports = buildSchema(`
        type User {
            _id: ID!
            username: String!
            password: String
            role: String!
            flatmate: Flatmate
            createdAt: String!
            updatedAt: String!
        }
        
        type Comment {
            _id: ID!
            value: String!
            createdBy: Flatmate!
            createdAt: String!
            updatedAt: String!
        }
        
        type Flatmate {
            _id: ID!
            firstname: String!
            lastname: String!
            birthday: String
            movedOut: String
            user: User!
            comments: [Comment!]
            createdAt: String!
            updatedAt: String!
        }
        
        type AuthData {
            userId: ID!
            token: String!
            tokenExpiration: Int!
        }
        
        input CommentInput {
            value: String!
        }
        
        input FlatmateInput {
            firstname: String!
            lastname: String!
            birthday: String
        }
        
        input UserInput {
            username: String!
            password: String!
        }
        type RootQuery {
            users: [User!]!
            flatmates: [Flatmate!]!
            comments: [Comment]
            login(username:String!, password:String!) : AuthData!
        }
        type RootMutation {
            createUser(userInput: UserInput): User
            createFlatmate (flatmateInput: FlatmateInput): Flatmate
            createComment (commentInput: CommentInput): Comment
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `)