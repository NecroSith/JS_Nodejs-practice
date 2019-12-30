# Node.js practice
### This is set of practical tasks and pet projects I made while completing the course "Nodejs: The complete guide to build RESTful APIs (2018)" on Udemy by Mosh Hamedani
#### The main pet project is Vidly application which is a MongoDB database and fully working API
### The app was deployed to Heroku, DB was deployed to MongoDBAtlas
#### The app is loaded with my comments for better understanding stuff that's happening
### Tech stack for Vidly app:
#### Main
- **NodeJS**
- **Express**
- **MongoDB**
- **lodash** (for better managing arrays and objects)
- **Fawn** (for creating a sequence of operations to make complex request to a db)
- **mongoose** (for working with mongodb using express)
- **moment** (for better date and time management)

#### Production
- **heroku** (for managing the project on heroku.com)

#### Preparing for production
- **helmet** (to protect the app from web vulnerabilities)
- **compress** (to compress html requests on production)

#### Validating data
- **Joi** (for better validating data)
- **joi-password-complexity** (for better validating and securing user passwords)

#### Logging and error handing
- **winston** (for logging info and error in file)
- **winston-mongodb** (for logging info and error in a separate collection in MongoDB)
- **express-async-errors** (for catching promises error and such)

#### Security
- **config** (for managing environmetal variables depending on the environment)
- **jsonwebtoken** (for managing jsonwebtokens in the app)
- **bcryptjs** (for encrypting data that pass to the db and back)

#### Unit and integration testing
- **Jest**

#### Integraton testing
- **supertest**
