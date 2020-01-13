export default Message = {
    from: {
        type: String,
    },
    to: {
        type: String,
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
    message : {
        type : String,
    },
    isReadBySender : {
        type : Boolean,
    },
    isReadByReceiver : {
        type : Boolean,
    },
    isReminderSent : {
        type : Boolean,
        defaultValue : false,
    }
};
