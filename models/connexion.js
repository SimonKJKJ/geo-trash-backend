var mongoose = require('mongoose');

var options = {
  connectTimeoutMS: 5000,
  useUnifiedTopology : true,
  useNewUrlParser: true,
}

mongoose.connect('mongodb+srv://userUno:1234@cluster0.adoao.mongodb.net/geotrash?retryWrites=true&w=majority',
  options,function(err){
    if(err) {
       console.log("erreur connexion bdd"(err)); 
    } else {
        console.log("conexion bdd réussie")
    }
  }
)

module.exports = mongoose