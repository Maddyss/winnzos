import React, {Component} from 'react';

var ProfilePicture = (props) => {
    var {setImage, photoProfil, imagesPro} = props;

    return <form action="#" role="form">
        <div className="form-group">
            <div className="fileinput fileinput-new" data-provides="fileinput">
                <div>
                    {imagesPro().length > 0 ? photoProfil() :
                        <span className="btn default btn-file">
                                    <span className="fileinput-new"> Choisir une image </span>
                                    <input type="file" name="..." onChange={(e) => setImage(e)}/>
                                </span>
                    }
                </div>
            </div>
        </div>
    </form>
}

ProfilePicture.propTypes = {
    setImage: React.PropTypes.func.isRequired,
    photoProfil: React.PropTypes.func.isRequired,
    imagesPro: React.PropTypes.func.isRequired,
};

export default ProfilePicture;