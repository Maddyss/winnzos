/**
 * Created by root on 10/09/16.
 */
import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

import {Images} from '/imports/api/collection/collection-images';

Meteor.methods ({
    "Methods.images.pro.remove": function (idImages) {
        "use strict";
        check(idImages, String);
        console.log(idImages);
        Images.remove({_id: idImages}, function(err){
            if(err)
                console.log(err.reason);
            else
                return true;
        })
    }
});