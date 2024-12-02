// sbujyOTTvAlojWgE
// mongodb+srv://fawazfawu96:<db_password>@cluster0.aeof9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0



const mongoose = require('mongoose')

function RunServer() {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected')
    } catch (error) {
        console.log('Not Connected')
    }
}
module.exports = RunServer;