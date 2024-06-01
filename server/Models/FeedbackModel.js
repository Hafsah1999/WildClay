const { Schema,model } = require('../connection')

const FeedbackSchema = new Schema ({
    customername : String,
    email : String,
    phoneno : String,
    feedback : String,
    image : String,
});
module.exports = model('Feedback', FeedbackSchema);
