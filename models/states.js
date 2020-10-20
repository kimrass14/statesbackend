const {Schema, model} = require("mongoose")

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