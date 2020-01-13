import {SubsManager} from 'meteor/meteorhacks:subs-manager';

const globalSubs = new SubsManager();
[
    'Meetups.all',
    'User.current',
].forEach(s => globalSubs.subscribe(s));

export default globalSubs;
