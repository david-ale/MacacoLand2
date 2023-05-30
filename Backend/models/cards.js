const {Schema,model} = require('mongoose')

const cardScheme = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: Buffer,
        required: false
        }
},{
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

cardScheme.method('toJSON',function(){
    const {__v,_id,...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('card',cardScheme);