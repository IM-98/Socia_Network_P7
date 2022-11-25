
# Social Network

A Company Social Network Project made with React, Express, MongoDb.

After clone the repo or download files, you will initialize the project.

To do so, you'll need to setup both frontend and backend part of the app.

## BackEnd ##

The server run on port 4200, to run the server locally : 
first go to server folder, open a new terminal and then do npm install.
After package installation, you'll need to connect to your MongoDb Cluster.

In the server folder, create a new files named .env with this variables : 
``` 
MONGO_DB_USER = "your username"

MONGO_DB_USER_MDP = "your password"

PORT = 4200

// TOKEN variable is used to allow Json Web token to generate and decode user session token

TOKEN = "YOUR_RANDOM_TOKEN"

```

Still in the server folder, create a new folder named "uploads" with 2 other folder in it : "posts" and "profile".

In "profile" folder, you can add an image named "random-user.png", which will be your default profile picture.

These folder are where your client images upload will be stored.

After that done, you can do npm start in the terminal and you should see a success message in the console.

## FrontEnd ##

The application has been made with create-react-app and run on port 3000.

To run the app in your browser, first go to the "client" folder and do npm install.
After that, still in this folder create a new file named ".env" with these variables inside :

``` 
REACT_APP_API_PROFILE = "localhost:4200/profile"

REACT_APP_API_IMG = "localhost:4200/posts"
```

Then you will be able to run the app on your default browser by doing npm start in the terminal.

Finally, you should see this page in your browser :

   ![Connection Interface](register.png?raw=true "Connection")

You can now register a new user and see it in your MongoDb Cluster.

Password will be hashed thanks to bcrypt package but you will able to see all user informations.

### *Admin Role* ###

By default, all users have an admin attribut set on false.
If you need an admin role for one of your user, you can set the boolean "isAdmin" on true,
directly in your MongoDb collection.

```
const schemaUser = mongoose.Schema({
    pseudo: {type: String, required: true, maxlength : 30, minlength : 2, unique: true},
    email: {type: String, required: true, unique: true, validate: [isEmail]},
    password: {type: String, required: true, minlength: 6},
    picture : {type: String, default: "/random-user.png"},
    isAdmin : {type: Boolean, default: false}, // false by default
    bio : {type : String, maxlength: 1024 },
    followers: {type:[String]},
    following : {type: [String]},
    likes: {type: [String]}
    },
    {timestamps : true,}
)

module.exports = mongoose.model('User', schemaUser)
```
