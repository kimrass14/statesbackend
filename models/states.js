const mongoose = require('../db/connection')

const Schema = mongoose.Schema

const stateSchema = new Schema(
    {
        state: String,
        img: String,
        capital: [
            {ref: 'Capital', type: Schema.Types.ObjectId}
        ]
    }
)

const State = mongoose.model('State', stateSchema)

module.exports = State