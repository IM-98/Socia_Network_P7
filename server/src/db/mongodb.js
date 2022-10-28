const mongoose = require("mongoose")



mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_USER_MDP}@cluster0.6bdm2iw.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true },
)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((err) => console.log(err))

