import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import PromotionCodeModel from '/imports/api/promotioncodes/model.js';


var ItemSchema = new SimpleSchema({
    id: {
        type: String,
    },
    option: {
        type: String,
        optional: true,
    },
    priceHt: {
        type: Number,
        decimal: true,
    },
    priceTtc: {
        type: Number,
        decimal: true,
    },
    duration: {
        type: Number,
        optional: true,
    },
    name: {
        type: String,
    }
});

export default Order = {
    _id: {
        type: String,
    },
    userId: {
        type: String,
    },
    purchaseDate: {
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
    items: {
        type: [ItemSchema],
    },
    status: {
        type: String,
        allowedValues: ['created', 'paid', 'rejected', 'pending']
    },
    totalTtc: {
        type: Number,
        decimal: true,
    },
    totalHt: {
        type: Number,
        decimal: true,
    },
    totalDiscount: {
        type: Number,
        decimal: true,
    },
    mercanetSentData: {
        optional: true,
        type: Object,
        blackbox:true,
    },
    mercanetResponseData: {
        optional: true,
        type: Object,
        blackbox:true,
    },
    promotionCode: {
        type : new SimpleSchema(PromotionCodeModel),
        optional: true
    }
};
