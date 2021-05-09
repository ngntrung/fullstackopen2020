"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  type Book {\n    title: String!\n    published: Int!\n    author: String!\n    id: String!\n    genres: [Genre!]!\n  }\n\n  type Author {\n    name: String!\n    id: String!\n    born: Int\n    bookCount: Int!\n  }\n\n  type Genre {\n    type: String\n  }\n\n  type Query {\n    bookCount: Int!\n    authorCount: Int!\n    allBooks(genre: String, author: String): [Book!]!\n    allAuthors: [Author!]!\n\n  }\n\n  type Mutation {\n    addBook(\n      title: String!\n      published: Int!\n      author: String!\n      genres: [String!]!\n    ): Book\n    \n    editAuthor(name: String, setBornTo: Int): Author\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _require = require('apollo-server'),
    ApolloServer = _require.ApolloServer,
    gql = _require.gql;

var _require2 = require('uuid'),
    uuid = _require2.v1;

var authors = [{
  name: 'Robert Martin',
  id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
  born: 1952
}, {
  name: 'Martin Fowler',
  id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
  born: 1963
}, {
  name: 'Fyodor Dostoevsky',
  id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
  born: 1821
}, {
  name: 'Joshua Kerievsky',
  // birthyear not known
  id: "afa5b6f2-344d-11e9-a414-719c6709cf3e"
}, {
  name: 'Sandi Metz',
  // birthyear not known
  id: "afa5b6f3-344d-11e9-a414-719c6709cf3e"
}];
/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

var books = [{
  title: 'Clean Code',
  published: 2008,
  author: 'Robert Martin',
  id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
  genres: ['refactoring']
}, {
  title: 'Agile software development',
  published: 2002,
  author: 'Robert Martin',
  id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
  genres: ['agile', 'patterns', 'design']
}, {
  title: 'Refactoring, edition 2',
  published: 2018,
  author: 'Martin Fowler',
  id: "afa5de00-344d-11e9-a414-719c6709cf3e",
  genres: ['refactoring']
}, {
  title: 'Refactoring to patterns',
  published: 2008,
  author: 'Joshua Kerievsky',
  id: "afa5de01-344d-11e9-a414-719c6709cf3e",
  genres: ['refactoring', 'patterns']
}, {
  title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
  published: 2012,
  author: 'Sandi Metz',
  id: "afa5de02-344d-11e9-a414-719c6709cf3e",
  genres: ['refactoring', 'design']
}, {
  title: 'Crime and punishment',
  published: 1866,
  author: 'Fyodor Dostoevsky',
  id: "afa5de03-344d-11e9-a414-719c6709cf3e",
  genres: ['classic', 'crime']
}, {
  title: 'The Demon ',
  published: 1872,
  author: 'Fyodor Dostoevsky',
  id: "afa5de04-344d-11e9-a414-719c6709cf3e",
  genres: ['classic', 'revolution']
}];
var typeDefs = gql(_templateObject());
var resolvers = {
  Query: {
    bookCount: function bookCount() {
      return books.length;
    },
    authorCount: function authorCount() {
      return authors.length;
    },
    allBooks: function allBooks(root, args) {
      return books.filter(function (book) {
        return book.genres.includes(args.genre) && book.author === args.author;
      });
    },
    allAuthors: function allAuthors() {
      return authors;
    }
  },
  Book: {
    genres: function genres(root) {
      return root.genres.map(function (genre) {
        return {
          type: genre
        };
      });
    }
  },
  Author: {
    bookCount: function bookCount(root) {
      var result = books.filter(function (book) {
        return book.author === root.name;
      });
      return result.length;
    }
  },
  Mutation: {
    addBook: function addBook(root, args) {
      var book = _objectSpread({}, args, {
        id: uuid()
      });

      books = books.concat(book);

      if (!books.find(function (book) {
        return book.author === args.author;
      })) {
        authors = authors.concat(args.author);
      }

      return book;
    },
    editAuthor: function editAuthor(root, args) {
      var author = authors.find(function (author) {
        return author.name === args.name;
      });

      if (author) {
        author.born = args.setBornTo;
        return {
          name: args.name,
          born: args.setBornTo
        };
      } else {
        return null;
      }
    }
  }
};
var server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers
});
server.listen().then(function (_ref) {
  var url = _ref.url;
  console.log("Server ready at ".concat(url));
});