import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export default UserView = {
    _id: {
        type: String,
        optional : true,
    },
    date: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date();
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date()};
            } else {
                this.unset();  // Prevent user from supplying their own value
            }
        }
    },
    userVisitedId : {
        type : String,
    },
    userVisitorId : {
        type : String,
        optional : true,
    },
    location : {
        type : String,
        allowedValues : ['detail','list']
    }
};
