import notFound from '../utils/notFound';
import initMeetups from './meetups';

const initDynamicRoutes = () => {
  initMeetups();
  notFound();
};

export default initDynamicRoutes;
