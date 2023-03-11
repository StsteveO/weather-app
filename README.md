# weather-app
## The Odin Project, Weather App. 
### Setting Up The Enviroment

- In **Github**
  - Create repo.
  - Git clone SSH key. 


- In the **terminal**
  - Git clone SSH key from github, and `cd` into it. 
  - Type `npm init -y` to initialize it/create a JSON file. 
  - Type `npm install webpack webpack-cli --save-dev` to install webpack.
  - Type `npm install eslint --save-dev` to setup eslint. 
  - Type `./node_modules/.bin/eslint --init` 
    - There are several questions that need to be answered.
      - Need help with those questions? Click on [this link.](https://www.digitalocean.com/community/tutorials/linting-and-formatting-with-eslint-in-vs-code#step-3-installing-the-eslint-extension)
  - Type `npm install -g install-peerdeps install-peerdeps --dev eslint-config-airbnb`.
  - Type `npm install --save-dev style-loader css-loader`.
  - Type `npm install --save-dev html-webpack-plugin`.
  - Type `npm install -D babel-loader @babel/core @babel/preset-env webpack`.
  - Type `npm install @babel/cli"`


- In **VS Code**  
  - Create a `dist` folder.
  - Create a `src` folder.
    - Create a `index.js` file.
      - At that very top of this file, add `import './style.css';`.
    - Create a `template.html` file.
    - Create a `style.css` file. 
  - Create a `.gitignore` file, and type `node_modules` in it, to ignore all those files. 
  - Create a `webpack.config.js` file.
    - Paste the following block code (Don't forget to change the `title` in the `plugins:` section):

  ```javascript
    const path = require("path");
    const HtmlWebpackPlugin = require("html-webpack-plugin");

    module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "main.js", // js file in dist
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
        // html file in dist
        title: "To-do List",
        filename: "index.html",
        template: path.resolve(__dirname, "src/template.html"),
        }),
    ],
    devtool: "inline-source-map",
    module: {
        rules: [
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: "asset/resource",
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: "asset/resource",
        },
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
            loader: "babel-loader",
            options: {
                presets: [["@babel/preset-env", { targets: "defaults" }]],
            },
            },
        },
        ],
    },
    };
  ```
  - In the `package.json` file.
    - Go to `script` section and replace it's contents with the following code block:
  ```javascript
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "watch": "webpack --watch"
  ``` 
  - Open the Commande Palette.
    - Type and open `Preferences: Open Workspace Settings (JSON)`.
      - Clear this page and paste the following code block:
   ```javascript
    {
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "eslint.validate": ["javascript"]
    }
   ```
  - In the `.eslintrc.json` file. 
    - Clear this page and paste the following code block:
  ```javascript
    {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": ["airbnb-base", "prettier"],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
      "no-console": "off",
      "quotes": ["error", "double"],
      "no-unused-vars": "off"
    }
    }
  ```
  - Add additional rules, or make changes as needed. 