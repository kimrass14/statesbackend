const mongoose = require('../db/connection')

const Schema = mongoose.Schema

const capitalSchema = new Schema(
    {
        city: String,
        population: Number
    }
)

const Capital = mongoose.model('Capital', capitalSchema)

module.exports = Capital