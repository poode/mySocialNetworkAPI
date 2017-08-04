# mySocialNetworkAPI 
## v1.0.0

## Background

Hey there, I am Gautam ANAND, another Full Stack Engineer that loves Node.js. I like to build solutions that are scalable. This project is a code sample that demonstrates the way i write the code and maintain if it was a usual day at work. The motive is to provide a simple software which is easy to read/evaluate.

In case you plan to hire me, then have a look at my latest [CV here](https://www.visualcv.com/gautamanand/pdf)

## Problem statement for this project

You can check JSON request/response/error specification in `./docs/JSONAPI.md`.

- Task 01: As a user, I need an API to create a friend connection between two email addresses.
- Task 02: As a user, I need an API to retrieve the friends list for an email address.
- Task 03: As a user, I need an API to retrieve the common friends list between two email addresses.
- Task 04: As a user, I need an API to subscribe to updates from an email address.
- Task 05: As a user, I need an API to block updates from an email address.
- Task 06: As a user, I need an API to retrieve all email addresses that can receive updates from an email address.

## Stack

I have used Node.js (v6.x.x), MongoDB (v3.4.X) and Express.js (4.X) as technology stack. The project uses grunt to perform various tasks such as build,  unbuild, test, linting etc. The project structure spec can be found in `./docs/STRUCTURE.md`.

## Solution the problem statement: JSON APIs

- GET /: List all the API services offered by this server. (Bonus)
- POST /connection: Create connection between two email addresses. (Task01)
- GET /connection: List all connection between two email addresses. (Bonus)
- POST /friends: Retrieve the friends list for an email address. (Task02)
- POST /friends/common: Retrieve the common friends list between two email addresses. (Task03)
- POST /updates/subscribe: Subscribe to updates from an email address. (Task04)
- POST /updates/block: Block updates from an email address. (Task05)
- POST /updates/emails: Retrieve all email addresses that can receive updates from an email address. (Task06)

## Some more goodies in the solution

- npm and bower package managers are base to maintain any modular server/client side dependencies.
- asynchronous controllers
- Environmental variables such as `NODE_ENV`, `HTTPS`, `DEBUG_MODE`, `DEBUG_MODE_DB` and `DB_ENV`. The deployment on servers can be custom to be for local development, development/iteration and production servers.
- Logs are saved in MongoDB. This uses my npm module [mongo-morgan-ext](https://github.com/serganus/mongo-morgan-ext)
- Debug mode has been added. This is useful to re-create error scenarios even at production site by simply restarting the same using this mode.
- Proper error handling added.
- Enforcing SSL ensured even for local development using FakeSSL. Yes, the system provides a fakeSSL creation script in `tools/genSSL.sh` and they are found in `tools/ssl/LOCAL`.
- `grunt unbuild` has been added. This simply cleans the client side folders and also clears the mongodb collections. It is mandatory to set `DB_ENV` as export variable. On windows it will be `set DB_ENV=LOCAL`, on linux/osx it should be `export DB_ENV=LOCAL`.

## Screenshots

- I have added screenshots, which can be found in [./docs/screenshots/README.md](https://github.com/serganus/mySocialNetworkAPI/tree/master/docs/screenshots). Used POSTMAN Client to demo the tasks.


## Deployments

- On special request , I can provide a cloud hosted version. Please email me, and give me atleast a day to configure. I will buy a hosting on Digital Ocean, deploy and unsuscribe the cloud subscription after you have evaluated the code.

- You can deploy the following locally on your system for evaluating my code sample. For that i have shared information, on the pre-requisites and setup instructions. Please follow them.

   - #### 6.1 Pre-requisites (need to be installed by you on your computer)
	 - OS: OSX/Windows/Linux
	 - MongoDB 3.4.X
	 - Node.js > 6.X.X
	 - `npm i -g nodemon pm2 bower npm@latest grunt-cli`

   - #### 6.2 Fast track setup
     - `npm run genfakeSSL`: Generate a fakeSSL on the local system. This only required if you want to use HTTPS, for easy usage i have not enforced SSL on every request.
     - `npm run onetime` or `npm run onetime-root`: This will do `npm i && bower install && grunt build`.
     - `npm run nodemon-debug-LOCAL` : This will start the local version in nodemon. Goto `https://localhost:3000`.

   - ### 6.3 Detailed setup instructions that you need to execute on your system console (for advance users/discussion)
	 - `npm i`: Installs the npm modules from `package.json`.
	 - `bower install`: Installs the bower modules from `bower.json`.
	 - `grunt build`: Custom build script to minify client side code etc. (It can be expanded to do more in futher improvements)
	 - `grunt lint`: Custom script to check code quality using linting.
	 - `npm run nodemon-debug-LOCAL`: Local development using Nodemon with custom debugging configs.
	 - `npm run pm2-cluster-debug-LOCAL`: Local development using pm2 with custom debugging configs.
	 - Goto `https://localhost:3000`


## Future

- Check more thoughts in `./docs/TBD.md`


## License

- `LICENSE`
