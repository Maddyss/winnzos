import { Meteor } from 'meteor/meteor';
import '/imports/api/Users';
import ReactiveComponent from './ReactiveComponent.jsx';

class UserReactiveComponent extends ReactiveComponent {
  user = () => Meteor.user()
}

export default UserReactiveComponent;
