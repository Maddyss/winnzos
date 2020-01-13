/**
 * Created by root on 19/09/16.
 */
if(Meteor.isServer){
    var timeInMillis = 1000 * 10; // 10 secs
    FlowRouter.setPageCacheTimeout(timeInMillis);
    FlowRouter.setDeferScriptLoading(true);
}