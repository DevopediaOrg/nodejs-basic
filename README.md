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

To get a high-level overview of Node.js, read the [Node.js](https://devopedia.org/node-js) article on Devopedia.

The rest of this document guides you through the project step by step. To try out code at a particular step, checkout the relevant branch. For example, to checkout code of `br0.1` branch, run command `git checkout br0.1`. Branch names are mentioned in section headers.


# 1. Hello World (br0.1)

Execute this command: `node hello.js`

This doesn't do anything useful except print out a string and exit. While Node usually is an app server listening for client requests, it can also be used to build a standalone program that does something specific and exits normally.


# 2. A Hello World Server (br0.2)

Execute this command: `node server.js`. Access the URL from your browser. Congrats! You now have a Node-based web app running!

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


# 6. Form with File Upload (br0.6)

We extend the example with a simple form. This form allows a file upload. We make use of `formidable` module. You can install it by running `npm install` since we've already recorded it as a package dependency. To learn more, visit the [Dependency Manager](https://devopedia.org/dependency-manager) article on Devopedia.

Open homepage, fill the form and submit it. No form validation is done but we will add this later. 

Let's study the code in `server.js`, where the file upload is handled. What happens if you remove the `return` statement? What happens if we handle file upload error by adding this line:
```
if (error) throw error;
```

Instead of throwing the error, what happens if we do this:
```
if (error) {
  console.log(error.message);
  return;
}
```

If you prefer a more modern syntax, the `request.addListener()` code in `server.js` can be rewritten as follows:
```
request
  .on('data', (chunk) => postData += chunk)
  .on('end', () => route(handle, request, response, postData));
```


# 7. Refactor File Upload Code & Input Validation (br0.7)

We refactor the code so that file upload is now done inside the handler. We remove some redundant code used earlier just for learning purpose. We no longer need `postData` variable. We send back the response after the form is fully received but before the uploaded file is renamed.

We do input validation on the form at server side. For this purpose we use `node-input-validator` module. Install it as usual by executing `npm install`. Study the [documentation of node-input-validator](https://github.com/artisangang/node-input-validator). Notice how we reuse code in `getFormBody()`.


# 8. Serving Static Files (br0.8)

While there are third-party modules to serve static file, we'll use `fs` module to do this. Install `mime-types` module by running `npm install`.

Let's serve all static files from `static` folder. File `favicon.ico` is added to the subfolder `static/images` although the corresponding request will be for `/favicon.ico`. Our router will do the routing as needed.

We've also added a fancy 404 error page. Credit for this code goes to [Vineeth TR](https://codepen.io/vineethtr/pen/NRzNLz).


# 9. Model-View-Controller & Handlebars (br0.9)

When we serve the form on homepage, the form HTML was earlier part of `requestHandlers.js`, which also has the main logic for processing each request. It's good practice to separate the business logic from the response sent to clients. Traditionally, a basic design for a web app has three parts, called **MVC**:
* **Model**: This is where the business logic resides. Often this relates to data but in our app we're not storing anything at the moment. Our model is simply `requestHandlers.js`.
* **View**: This contains the structure of what's sent in response to client requests. Our views are in folder `/views`.
* **Controller**: This routes the requests from clients to suitable models for processing. File `router.js` is doing this in our app.

We've refactored the code to follow MVC pattern. We now have a view to serve the form. This view is also making use of [Handlebars](https://handlebarsjs.com/) as the templating engine. To install `handlebars`, run `npm install`. Study the form code that now uses Handlebars.


# 10. Logging (br0.10)

We've been logging requests to the console but let's log them to a file. [Winston](https://github.com/winstonjs/winston#logging-levels) is what we'll use for this. To install `winston`, run `npm install`. 


# 11. Completing the App (br0.11)

You're on your way towards mastering Node.js! In this project, you've learned the following:
* Handling request and response Node objects
* Sending GET data and parsing the query string
* Sending POST form data with file upload
* Validating input at the server side
* Serving static content
* Implementing MVC pattern with Node
* Templating the views
* Logging for housekeeping and debugging
* Debugging your app in VS Code
* Using built-in modules: http, url, fs, util, child_process
* Using third-party modules: formidable, handlebars, mime-types, node-input-validator, winston

Here are some suggestions to improve this app on your own:
* Save user form data into a database such as SQLite. Use a model to access user data from database.
* Change homepage to include signup or login/logout options. Create two views: one for signup form and another for login form.
* Use client-side JavaScript to validate forms. Also validate password on signup form via a "Confirm Password" field.
* To manage user sessions for logged in users, you will need to make use of cookies. Learn how to do this.
* If logged in, user should see his/her details. If logged in, user can see details of all other registered users.
* Use AJAX to show in real time how many users are currently logged in on the server.
* Add CSS/JS to beautify the look and feel of the pages.
