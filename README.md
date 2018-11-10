# 0. Overview

This is a sample project for beginners who wish to learn Node.js. We will build a small web app. To learn the concepts step by step, we suggest you clone this code repository and checkout relevant checkpoints identified by branch names.

To start learning, you will need to install some essential tools. Versions mentioned below were used on Windows 10 when preparing this project but you may use more recent versions. Install the following:
* [Git](https://git-scm.com/download) (2.19.1): Used to clone repo and checkout code of a specific branch.
* [Node](https://nodejs.org/) (10.13.0 LTS): JavaScript runtime to run Node.js apps.
* [npm](https://www.npmjs.com/get-npm) (6.4.1): Used To install and manage node modules. This is automatically installed as part of Node installation.
* [VS Code](https://code.visualstudio.com/) (1.28.2): Any code editor or IDE would do but we'll use Visual Studio Code for this project. 

To validate that correct versions are installed, you can type the following commands on a terminal:
```
git --version
node -v
npm -v
code -v
```

To get a high-level overview of Node.js, read the [Node.js article on Devopedia](https://devopedia.org/node-js).

The rest of this document guides you through the project step by step. To try out code at a particular step, checkout the relevant branch. For example, to checkout code of `br0.1` branch, run command `git checkout br0.1`. Branch names are mentioned in section headers.


# 1. Hello World (br0.1)

Execute this command: `node hello.js`

This doesn't do anything useful except print out a string and exit. While Node usually is an app server listening for client requests, it can also be used to build a standalone program that does something specific and exits normally.


# 2. A Hello World Server (br0.2)

Execute this command: `node server.js`. Access the URL `http://localhost:8888` from your browser. Congrats! You now have a Node-based web app running!

Open the file `server.js` in VS Code. It's important to follow style conventions and use a suitable linting tool to catch errors early. [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) is a popular resource. ESLint is a useful tool for linting. ESLint is already configured in file `.eslintrc.js`. To install ESLint for our project, execute this command `npm install`. You will now notice that VS Code will highlight syntax/style errors (if any).

It's a good time to get familiar with Node.js documentation. Read about the following API calls that we've used in `server.js`:
* [http.createServer()](https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener)
* [server.listen()](https://nodejs.org/api/net.html#net_server_listen)

It will be apparent from the documentation that callback functions are the last argument. This is the convention in Node.


# 3. Server as a Module (br0.3)

We'll refactor the code to make the design more modular. Server code is made into a module. The app's entry point is `index.js`. Thus, we can start it by running `node index.js`

Try out the following URLs in browser: `http://localhost:8888` and `http://localhost:8888?username=Johnny`

In `server.js`, since the request callback is likely to get more complex, we give it a name `onRequest()` and then pass it to the server. We use `url` module to extract parts of the query string. This is a legacy module: there's also `URL` class as an alternative. See [URL API docs](https://nodejs.org/api/url.html) for more information.

This may also be a good time to try out debugging the code in VS Code. There's already a debugging configuration in file `.vscode/launch.json` that you can use.


# 4. Setting up the Router (br0.4)

We also have two new files:
* `router.js`: This routes requests to different callbacks.
* `requestHandlers.js`: This encapsulates all the request callbacks.

In file `index.js` we map URL paths to their callbacks within a single handler object. Also, we pass both the router and handler to the server. Instead of hard-coding these into the server, we pass them as arguments to the server. In other words, the server is loosely coupled from both the router and the handler. This concept is called [Dependency Injection](https://devopedia.org/dependency-injection).

The router takes the handler and the request as arguments. In fact, router doesn't need the entire request. It needs only the URL path. But the handlers might require the entire request object and hence we pass it along. 

Do the following:
* Open `http://localhost:8888/list` in a browser tab (don't wait for response)
* Open `http://localhost:8888` in another browser tab

Note that we now return a 404 error for the `favicon.ico` file.

Study the callback code. Which one is a blocking call? Which one is a non-blocking call? Can you explain what's happening?


# 5. Passing Response Object to Request Handlers (br0.5)

Response object is passed into the request handlers. Each handler will take care of writing the response. This design allows us to handle non-blocking operations correctly. Their callbacks will have the necessary output to form the response correctly.

Note that server code is extremely simple now. Everything is handled by router and request callbacks.

