const mongoose = require('mongoose')
const { mongoPath } = require('./config.json')

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log('Connected to MongoDB!')
    }).catch((err) =>{
        console.log(err)
    })
    return mongoose
}