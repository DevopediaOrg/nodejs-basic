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

The rest of this document guides you through the project step by step. To try out code at a particular step, checkout the relevant branch. For example, to checkout code of `br0.1` branch, run command `git checkout br0.1`. Branch names are mentioned in section headers. With the command `git branch -a` you can list all branches.


# 1. Hello World (br0.1)

Execute this command: `node hello.js`

This doesn't do anything useful except print out a string and exit. While Node usually is an app server listening for client requests, it can also be used to build a standalone program that does something specific and exits normally.

The file `hello.js` has a single line of code. Small code snippets can be executed directly on the command line using the `-e` option: `node -e "console.log('Hello World!')"`

Official documentation explains all the [command-line options](https://nodejs.org/api/cli.html#cli_command_line_options).

The same single line code can be executed within the developer console of a web browser. Like a web browser, Node.js provides a JavaScript runtime but for server-side execution.
