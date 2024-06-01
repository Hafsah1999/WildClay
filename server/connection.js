const mongoose =  require('mongoose')
const url = 'mongodb+srv://Hafsah_Naseer:merijaan786@cluster0.vhuuatt.mongodb.net/mittimahal?retryWrites=true&w=majority' 
mongoose.connect(url)

.then((result) => {
    console.log("connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

module.exports = mongoose;