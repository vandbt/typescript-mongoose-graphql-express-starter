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
import { PostModel, PostRepository } from "../mongoose-types"; // import mongoose types


/*
* Post Type
*/
const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => (
      { title: { type: GraphQLString },
  content: { type: GraphQLString },
  author: { type: GraphQLString },
  comments: { type: new GraphQLList(GraphQLString) },
  createdAt: { type: GraphQLString } }
    )
});

/*
* Post Input Type
*/
const PostInput = new GraphQLInputObjectType({
    name: 'PostInput',
    description: 'Post payload definition',
    fields: () => (
      { title: { type: GraphQLString },
  content: { type: GraphQLString },
  author: { type: GraphQLString },
  comments: { type: new GraphQLList(GraphQLString) },
  createdAt: { type: GraphQLString } }
    )
});

/*
* Post Query
*/
const query = {
    getPosts: {
        type: new GraphQLList(PostType),
        args: {
            limit: {
                description: 'limit items in the results',
                type: GraphQLInt
            }
        },
        resolve: (root, { limit }) => PostRepository.getInstance().find({}, {limit: limit})
    },
    getPostById: {
        type: (PostType),
        args: {
            _id: {
                description: 'limit items in the results',
                type: GraphQLString
            }
        },
        resolve: (root, { _id }) => PostRepository.getInstance().findById(_id)
    },

};

/*
* Post Mutation
*/
const mutation = {
    addPost: {
        type: PostType,
        args: {
            input: { type: PostInput }
        },
        resolve: (obj, input) => PostRepository.getInstance().create(input)
    },
    updatePost: {
        type: PostType,
        args: {
            _id: {
                description: 'id of PostType',
                type: GraphQLString
            },
            input: { type: PostInput }
        },
        resolve: (obj, _id, input) => PostRepository.getInstance().update(_id, input)
    },
    removePost: {
        type: PostType,
        args: {
            _id: {
                description: 'id of PostType',
                type: GraphQLString
            }
        },
        resolve: (root, { _id }) => PostRepository.getInstance().delete(_id)
    },
};


/*
*  Post Subscription
*/
const subscription = {

};

/*
* Post Export
*/
export const PostSchema = {
    query,
    mutation,
    subscription,
    types: [PostType]
};