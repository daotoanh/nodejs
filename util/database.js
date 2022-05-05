const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://toanh:lokebeoli@cluster0.v2nz2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(client => {
    console.log('Connected!')
    callback(client)
})
.catch(err => console.log(err))
}

module.exports = mongoConnect