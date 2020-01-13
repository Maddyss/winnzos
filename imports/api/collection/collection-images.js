/**
 * Created by root on 08/09/16.
 */
import { FilesCollection } from 'meteor/ostrio:files';
import Grid from 'gridfs-stream';
import { MongoInternals } from 'meteor/mongo';
import fs from 'fs';

const imagesFiles = new Mongo.Collection('fs.files');

let gfs;
if (Meteor.isServer) {
    gfs = Grid(
        MongoInternals.defaultRemoteCollectionDriver().mongo.db,
        MongoInternals.NpmModule
    );
}

const Images = new FilesCollection({
    collectionName: 'ImagesPro',
    allowClientCode: false, // Disallow remove files from Client
    onBeforeUpload: function (file) {
        console.log(1);
        // Allow upload files under 10MB, and only in png/jpg/jpeg formats
        if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
            return true;
        } else {
            return 'Please upload image, with size equal or less than 10MB';
        }
    },
    onAfterUpload(image) {
        console.log(2);
        // Move file to GridFS
        Object.keys(image.versions).forEach(versionName => {
            const metadata = { versionName, imageId: image._id, storedAt: new Date() }; // Optional
            const writeStream = gfs.createWriteStream({ filename: image.name, metadata });

            fs.createReadStream(image.versions[versionName].path).pipe(writeStream);

            writeStream.on('close', Meteor.bindEnvironment(file => {
                const property = `versions.${versionName}.meta.gridFsFileId`;

                // If we store the ObjectID itself, Meteor (EJSON?) seems to convert it to a
                // LocalCollection.ObjectID, which GFS doesn't understand.
                this.collection.update(image._id, { $set: { [property]: file._id.toString() } });
                this.unlink(this.collection.findOne(image._id), versionName); // Unlink files from FS
            }));
        });
    },
    interceptDownload(http, image, versionName) {
        console.log(3);
        // Serve file from GridFS
        const _id = (image.versions[versionName].meta || {}).gridFsFileId;
        if (_id) {
            const readStream = gfs.createReadStream({ _id });
            readStream.on('error', err => { throw err; });
            readStream.pipe(http.response);
        }
        return Boolean(_id); // Serve file from either GridFS or FS if it wasn't uploaded yet
    },
    onAfterRemove(images) {
        console.log(4);
        // Remove corresponding file from GridFS
        if(images.length > 0){
            images.forEach(image => {
                Object.keys(image.versions).forEach(versionName => {
                    const _id = (image.versions[versionName].meta || {}).gridFsFileId;
                    if (_id) gfs.remove({ _id }, err => { if (err) throw err; });
                });
            });
        }
        else{
            return true;
        }
    }
});


if (Meteor.isServer) {
    Images.denyClient();
}

export { Images };
export { imagesFiles };
