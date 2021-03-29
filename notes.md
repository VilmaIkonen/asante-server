## Server, logic flow:

Index.js: 
Endpoints for different routes defined (eg. '.../posts)

<--

routes: 
routes for endpoints defined (eg. .../posts/:id or .../posts/:id/likePost)

<--

controllers:
Handlers for the routes. All the logic for the route functions

<--

models: 
schema/model for storing data in db in certain format

## Middleware (for actions that need to happen before something else):

e.g.: User wants to like a post
1. click like button --> auth middleware confirms/denies the request --> next(): 'OK to like the post' --> like controller called --> ...

next() is essentially the middleware, it is crucial!

Middleware will be used in Routes!

middleware --> routes 