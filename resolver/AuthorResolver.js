/* eslint-disable no-plusplus */
const { makeExecutableSchema } = require('graphql-tools');
const DataLoader = require('dataloader');

const knex = require('../config/knexfile');

// Implement
const getAuthors = async ids => {
  const getAuthorsRlt = await knex('authors')
    .whereIn('id', ids)
    .select('id')
    .select('name')
    .then(rows => ids.map(id => rows.find(x => x.id === id)));

  return getAuthorsRlt;
};

const getPostsByAuthor = async ids => {
  const getPosts = await knex('posts')
    .whereIn('author_id', ids)
    .select('id')
    .select('author_id')
    .select('title')
    .select('text')
    .then(rows => ids.map(id => rows.filter(x => x.author_id === id)));

  return getPosts;
};

const addAuthor = async args => {
  const { name } = args[0].input;
  const insObj = {
    name,
  };

  const newAuthorUid = await knex('authors')
    .insert(insObj)
    .then(rows => (rows.length > 0 ? rows[0] : null));
  insObj.id = newAuthorUid;

  return [insObj];
};

const updateAuthor = async args => {
  const { id, name } = args[0].input;
  const author = {
    id,
    name,
  };
  // eslint-disable-next-line no-unused-vars
  const updAuthorSql = await knex('authors')
    .update('name', name)
    .where('id', id)
    .then(rows => rows);

  return [author];
};

const deleteAuthor = async args => {
  const rlt = {
    status: 'Success',
  };

  // eslint-disable-next-line no-unused-vars
  const delAuthorSql = await knex('authors')
    .delete()
    .where('id', args[0].id)
    .then(rows => rows);

  return [rlt];
};

const loaders = {
  authors: new DataLoader(getAuthors),
  postsByAuthor: new DataLoader(getPostsByAuthor),
  addAuthor: new DataLoader(addAuthor),
  updateAuthor: new DataLoader(updateAuthor),
  deleteAuthor: new DataLoader(deleteAuthor),
};

// Schema
const typeDefs = `
  type Author {
    id: ID!
    name: String
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String
    text: String
    author: Author
  }

  type Query {
    getAuthor(id: Int!): Author
    getPostsByTitle(titleContains: String): [Post]
  }

  input addAuthorInput {
    name: String!
  }

  input updateAuthorInput {
    id: ID!
    name: String
  }

  type delAuthorResp {
    status: String
  }

  type Mutation {
    addAuthor(input: addAuthorInput): Author
    updateAuthor(input: updateAuthorInput): Author
    deleteAuthor(id: ID!): delAuthorResp
  }
`;

// Resolver
const resolvers = {
  Query: {
    getAuthor(obj, args) {
      return loaders.authors.load(args.id);
    },

    getPostsByTitle(obj, args) {
      return knex('posts')
        .whereRaw(`title LIKE '%${args.titleContains}%'`)
        .select();
    },
  },

  Mutation: {
    addAuthor(obj, args) {
      return loaders.addAuthor.load(args);
    },

    updateAuthor(obj, args) {
      return loaders.updateAuthor.load(args);
    },

    deleteAuthor(obj, args) {
      return loaders.deleteAuthor.load(args);
    },
  },

  Author: {
    posts(author) {
      return loaders.postsByAuthor.load(author.id);
    },
  },

  Post: {
    author(post) {
      return loaders.authors.load(post.author_id);
    },
  },
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
