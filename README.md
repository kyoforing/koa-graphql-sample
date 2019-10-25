## GraphQL Sample by koa-graphql
## Getting started
+ Step 1: edit .env.development to set your database config
+ Step 2: execute default.sql to create default table and data
+ Step 3: run follow command in cli

```sh
$ yarn
$ yarn start
```

+ Step 4: Open http://localhost:3000/graphql

## query example

+ getAuthor
```
{
  getAuthor(id: 3) {
    id
    name
    posts {
      id
      text
      author {
        name
      }
    }
  }
}
```

+ getPostsByTitle
```
{
  getPostsByTitle(titleContains: "iOS") {
    title
    text
  }
}
```

+ addAuthor
```
mutation AddAuthor ($input: addAuthorInput) {
  addAuthor(input: $input) {
    id
  }
}
```

+ updateAuthor
```
mutation UpdateAuthor ($input: updateAuthorInput) {
  updateAuthor(input: $input) {
    id
    name
  }
}
```

+ deleteAuthor
```
mutation {
  deleteAuthor(id: 3) {
    status
  }
}
```
