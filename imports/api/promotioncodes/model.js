import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export default PromotionCode = {
    _id: {
        type: String,
        optional : true,
    },
    creationDate: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date();
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date()};
            } else {
                this.unset();  // Prevent user from supplying their own value
            }
        },
        optional : true,
    },
    discountPercent : {
        type : Number,
        optional : true,        
    },
    code : {
        type : String,
        optional : true,
    }
};
