 //------------------------------------------------------------------------------ 
 // <auto-generated> 
 // This code was generated by a tool. 
 // 
 // Changes to this file may cause incorrect behavior and will be lost if 
 // the code is regenerated. 
 // </auto-generated> 
 //------------------------------------------------------------------------------

import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLList
} from "graphql";

// TODO: imports schema fields
// import {} from "../graphql";
import { AuthorModel, AuthorRepository } from "../mongoose-types"; // import mongoose types


/*
* Author Type
*/
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => (
      { name: { type: GraphQLString },
  username: { type: GraphQLString },
  email: { type: GraphQLString },
  address: { type: GraphQLString },
  phone: { type: GraphQLString },
  website: { type: GraphQLString },
  company: { type: GraphQLString } }
    )
});

/*
* Author Input Type
*/
const AuthorInput = new GraphQLInputObjectType({
    name: 'AuthorInput',
    description: 'Author payload definition',
    fields: () => (
      { name: { type: GraphQLString },
  username: { type: GraphQLString },
  email: { type: GraphQLString },
  address: { type: GraphQLString },
  phone: { type: GraphQLString },
  website: { type: GraphQLString },
  company: { type: GraphQLString } }
    )
});

/*
* Author Query
*/
const query = {
    getAuthors: {
        type: new GraphQLList(AuthorType),
        args: {
            limit: {
                description: 'limit items in the results',
                type: GraphQLInt
            }
        },
        resolve: (root, { limit }) => AuthorRepository.getInstance().find({}, {limit: limit})
    },
    getAuthorById: {
        type: (AuthorType),
        args: {
            _id: {
                description: 'limit items in the results',
                type: GraphQLString
            }
        },
        resolve: (root, { _id }) => AuthorRepository.getInstance().findById(_id)
    },

};

/*
* Author Mutation
*/
const mutation = {
    addAuthor: {
        type: AuthorType,
        args: {
            input: { type: AuthorInput }
        },
        resolve: (obj, input) => AuthorRepository.getInstance().create(input)
    },
    updateAuthor: {
        type: AuthorType,
        args: {
            _id: {
                description: 'id of AuthorType',
                type: GraphQLString
            },
            input: { type: AuthorInput }
        },
        resolve: (obj, _id, input) => AuthorRepository.getInstance().update(_id, input)
    },
    removeAuthor: {
        type: AuthorType,
        args: {
            _id: {
                description: 'id of AuthorType',
                type: GraphQLString
            }
        },
        resolve: (root, { _id }) => AuthorRepository.getInstance().delete(_id)
    },
};


/*
*  Author Subscription
*/
const subscription = {

};

/*
* Author Export
*/
export const AuthorSchema = {
    query,
    mutation,
    subscription,
    types: [AuthorType]
};