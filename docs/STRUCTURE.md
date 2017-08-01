## Project Structure

```
|-- README.md
|
|-- .gitignore
|
|-- package.json
|
|-- bower.json
|
|-- Gruntfile.js
|
|-- app.js
|
|-- routes.js
|
|-- /docs
|
|-- /controllers
|    |
|    |--connection.js
|    |
|    |--friends.js
|    |
|    |--updates.js
|
|-- /models
|    |
|    |--connection.js
|    |
|    |--friends.js
|    |
|    |--updates.js
|
|-- /views
|    |
|    |--error.ejs
|    |
|    |--connection.ejs
|    |
|    |--friends.ejs
|
|-- /tools
|   |
|   |--/deploy
|   |   |
|   |   |--/nodemon
|   |   |   |
|   |   |   |--/debug
|   |   |       |
|   |   |       |--LOCAL.json
|   |   |--/pm2
|   |       |
|   |       |--/debug
|   |           |
|   |           |--LOCAL.json
|   |--/jslint
|   |   |
|   |   |--.jshintrc-client
|   |   |--.jshintrc-server
|   |
|   |--/ssl
|   |
|   |--database.js
|   |
|   |--debug.js
|   |
|   |--error.js
|   |
|   |--genSSL.sh
|   |
|   |--log.js
|
```