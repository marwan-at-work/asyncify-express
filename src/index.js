const httpVerbsArray = [ 'get', 'post', 'put', 'delete', 'patch' ];

const asyncExpress = app => {
  return new Proxy(app, {
    get(app, prop) {
      if (httpVerbsArray.includes(prop)) {
        return delegate(app, prop);
      } else {
        return app[prop];
      }
    }
  });
};

const delegate = (app, prop) => {
  const func = app[prop].bind(app);
  return (url, asyncFunc) => {
    return func(url, wrap(asyncFunc));
  }
};

const wrap = asyncFunc => {
  return (req, res, next) => {
    asyncFunc(req, res, next).catch(next);
  }
};

export default asyncExpress;
