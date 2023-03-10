# weather-app
The Odin Project, Weather App. 

Steps:

create repo
git clone SSH key into teminal and cd into it
into terminal "npm init -y"
into terminal "npm install webpack webpack-cli --save-dev"
in VS Code, create "dist", and "src" folder
create ".gitignore" file, and type "node_ignore" in it

in src folder create "index.js" file
in VS Code create "webpack.config.js" file
copy/paste webpack.config info from previous project
in src folder create "template.html" file
in webpack.config file, go to script and add ("build": "webpack", (BREAK LINE) "watch": "webpack --watch")
in terminal "npm install eslint --save-dev"
in terminal "./node_modules/.bin/eslint --init" //will be asked questions in the terminal

in VC Code command pallete type "Preferences: Open Workspace Settings (JSON)"
in this page type...

{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "eslint.validate": ["javascript"]
}


go to .eslintrc.json file and copy/past the following...

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

add any additional rules/rule changes you would like

into terminal copy/paste...

"npm install -g install-peerdeps
install-peerdeps --dev eslint-config-airbnb"

"npm install --save-dev style-loader css-loader"
"npm install --save-dev html-webpack-plugin"
"npm install -D babel-loader @babel/core @babel/preset-env webpack"
"npm install @babel/cli"


in src folder create "style.css" file
in src folder, in index.js file add "import './style.css';" into file

