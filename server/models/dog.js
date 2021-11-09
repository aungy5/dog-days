const { Schema, model } = require('mongoose');

const dogSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        type: {
            type: String,
        },
        breeder: {
            type: String,
        },
        image: {
            type: String,
        },
        description: {
            type: String
        },
        // dogId: {
        //     type: String,
        //     required: true
        // },
        akcLink: {
            type: String,
            required: true
        }
    }
)

//module.exports = dogSchema;

const Dog = model('Dog', dogSchema)
module.exports = Dog;