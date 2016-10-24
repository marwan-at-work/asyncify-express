## Asyncify Express

Pass async/await functions to express route handlers.

### Requirements

You must use a node version that supports promises and the [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) library.

### Installation

#### NPM

```
npm install asyncify-express
```

#### Yarn

```
yarn add asyncify-express
```

### Motivation

You can pass `async` functions to route handlers. However, Express will run them like regular functions. Therefore, any errors will not be caught and processed appropriately because errors inside `async` functions have to be caught explicitly i.e. `(async () => {...})().catch(err => ...)`. Otherwise they will silently fail. Therefore, this library uses a `Proxy` to trap any HTTP Verb methods on the express `app` object and explicitly catches errors and passes them on to the Express `next` handler to be handled like regular functions.


### Use

```javascript
import express from 'express';
import asyncifyExpress from ('../async-express');

const app = asyncifyExpress(express());

app.get('/users', async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
});

```

Note that because the library uses a proxy, it only wraps the `get, post, delete, put, patch` functions. Other functions get safely passed on to the original `express()` app.
