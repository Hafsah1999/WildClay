const { Schema,model } = require('../connection')

const productSchema = new Schema ({
    pname : String,
    pdetail : String,
    pcategory : String,
    pprice : String,
    image: String,
    originalprice :String,
});
module.exports = model('product', productSchema);
