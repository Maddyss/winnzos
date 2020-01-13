import React, { PropTypes } from 'react';
import { Row } from 'react-bootstrap';
import { FichePro as FicheProCol } from '/imports/api/collection/collection';
import Tracker from 'tracker-component';
import Spinner from '/imports/Component/Spinner/Spinner.jsx';
import CalendarSlider from './components/CalendarSlider/CalendarSlider.jsx';

class FichePro extends Tracker.Component {
  static propTypes = {
    ficheProId: PropTypes.string.isRequired,
  }
  constructor(props) {
    super(props);
    const { ficheProId } = this.props;
    this.state = { fichePro: null };
    this.subscribe('fichePro.single', ficheProId);
    this.autorun(() => {
      this.setState({
        fichePro: FicheProCol.findOne(ficheProId),
      });
    });
  }
  render() {
    const { fichePro } = this.state;
    if (!fichePro) {
      return <Spinner />;
    }
    return (
      <Row>
        <CalendarSlider fichePro={fichePro} />
      </Row>
    );
  }
}
export default FichePro;
