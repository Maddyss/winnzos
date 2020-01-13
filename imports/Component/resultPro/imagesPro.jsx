import React, { PropTypes } from 'react';
import { Images } from '/imports/api/collection/collection-images';
import Tracker from 'tracker-component';
import Spinner from '/imports/Component/Spinner/Spinner.jsx';

class ImagesPro extends Tracker.Component {
    static propTypes = {
        proId: PropTypes.string.isRequired,
    }
    constructor(props) {
        super(props);
        const { proId } = this.props;
        this.state = {
            imagesPro: null,
            proId: proId
        };
        this.autorun(() => {
            this.subscribe('get.images.pro', this.state.proId);
        });
        this.autorun(() => {
            this.setState({
                imagesPro: Images.findOne({'userId': this.state.proId}),
            });
        });
    }

    componentWillReceiveProps  (nextProps,  nextContext) {
        this.setState({proId: nextProps.proId});
    }
    componentWillUnmount() {
        const comp = this.autorun(c => {
            c.stop();
        });
    }
    render() {
        const { imagesPro } = this.state;
        if (!imagesPro) {
            return <img src="/front/user-pic-default.png" alt="Nom commercial"/>;
        }
        return (
            <img src={imagesPro.link() } alt="Nom commercial"/>
        );
    }
}
export default ImagesPro;
