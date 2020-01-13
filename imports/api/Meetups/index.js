import { Mongo } from 'meteor/mongo';
import 'meteor/aldeed:collection2';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import {
  Meetup as Model, DayOff, meetupTypes,
} from './models';
import {
  insertMeetup, removeMeetup, insertDayOff, removeDayOff, insertPublicHolydays, updateMeetup, deleteMeetup,
} from './methods';

const Meetups = new Mongo.Collection('Meetups');
Meetups.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
Meetups.attachSchema(new SimpleSchema(Model));

// Collection
export default Meetups;
export {
  // Models
  Model,
  DayOff,
  // Constants
  meetupTypes,
  // Methods
  insertMeetup,
  removeMeetup,
  insertDayOff,
  removeDayOff,
  insertPublicHolydays,
  updateMeetup,
  deleteMeetup,
};
