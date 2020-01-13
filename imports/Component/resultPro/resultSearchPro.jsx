import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Tracker from 'tracker-component';
import Spinner from '/imports/Component/Spinner/Spinner.jsx';
import { GoogleMaps } from 'meteor/dburles:google-maps';
import { concordanceActivites } from '/imports/router/utils/seo';

import ImagesPro from '/imports/Component/resultPro/imagesPro.jsx';
import ResGoogle from '/imports/Component/resultPro/resGoogle.jsx';
import ListPro from '/imports/Component/resultPro/listProWinnzos.jsx';
import {
  concordanceNomRegion,
  concordanceLocalisationRegion
} from './function/utils';

export default class ResultSearchPro extends Tracker.Component {
  constructor(props) {
    super(props);
    var pos =
      this.props.regionId === parseInt(Session.get('regionId')) &&
      Session.get('pos')
        ? Session.get('pos')
        : concordanceLocalisationRegion(parseInt(this.props.regionId));

    this.state = {
      pos: pos
    };
    var position = false;
    var _this = this;
    if (this.props.nomVille) {
      Meteor.call('Methods.Get.Adresse.String', this.props.nomVille, function(
        err,
        res
      ) {
        if (err) console.log(err);
        if (res.data.results && res.data.results[0].formatted_address) {
          $('#pac-input').val(res.data.results[0].formatted_address);
          _this.setState({
            pos: res.data.results[0].geometry.location
          });
          Session.set('pos', res.data.results[0].geometry.location);
          position = true;
        }
      });
    } else {
      position = true;
    }
    var shouldReload = true;
    this.autorun(() => {
      // debugger;
      if (shouldReload && position) {
        this.setState({
          loaded: GoogleMaps.loaded(),
          mapOptions: GoogleMaps.loaded() && this._mapOptions()
        });
        shouldReload = !GoogleMaps.loaded();
      }
    });
  }
  componentDidMount() {
    GoogleMaps.load({ v: '3', key: '***', libraries: 'places,geometry' });
  }
  _mapOptions() {
    return {
      center: this.state.pos,
      zoom: 13
    };
  }
  render() {
    if (this.state.loaded)
      return (
        <GoogleMap
          name='mymap'
          options={this.state.mapOptions}
          activiteId={this.props.activiteId.toString()}
          inputTerm={this.props.inputTerm}
          regionId={this.props.regionId}
          listLieu={this.props.listLieu}
          nomVille={this.props.nomVille}
        />
      );

    return <Spinner />;
  }
}

class GoogleMap extends Tracker.Component {
  static propTypes = {
    regionId: PropTypes.number,
    activiteId: PropTypes.string,
    term: PropTypes.string,
    listTypeLieu: PropTypes.string
  };
  static defaultProps = {
    regionId: 0,
    activiteId: '-1',
    term: '',
    listTypeLieu: ''
  };
  constructor(props) {
    super(props);
    this.state = {
      regionId: this.props.regionId,
      activiteId: this.props.activiteId,
      term: this.props.inputTerm,
      fichePro: null,
      totalResultat: 0,
      nbResultat: 6,
      resGoogle: null,
      listTypeLieu: this.props.listLieu,
      maps: null,
      service: null,
      pos:
        this.props.regionId === parseInt(Session.get('regionId')) &&
        Session.get('pos')
          ? Session.get('pos')
          : concordanceLocalisationRegion(parseInt(this.props.regionId)),
      countFichePro: 0,
      markers: [],
      nouvellePosition: false
    };

    Session.set('regionId', this.props.regionId);
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
    this.markerLocalisationMoi = this.markerLocalisationMoi.bind(this);
    $(document).on('placechanged', (e, place) => this.onPlaceChanged(place));
  }

  onPlaceChanged(place) {
    let regionId = concordanceNomRegion(
      $.grep(place.address_components, function(elt, i) {
        return elt.types[0] === 'administrative_area_level_1';
      })
    );
    $('.region')
      .val(regionId)
      .trigger('change');
    this.setState({
      pos: place.geometry.location.toJSON(),
      regionId: regionId,
      nouvellePosition: true
    });

    FlowRouter.go('/annuaire/' + regionId);

    // debugger;
    Session.set('pos', place.geometry.location.toJSON());
    Session.set('regionId', regionId);
    this.state.maps.instance.setCenter(place.geometry.location.toJSON());

    this.doTextSearch(this.state.service, this.state.maps);
  }

  componentDidMount() {
    var _this = this;
    var input = document.getElementById('pac-input');
    var pos = {
      lat: 48.862725,
      lng: 2.287592000000018
    };

    GoogleMaps.create({
      name: this.props.name,
      element: this.refs.map,
      options: this.props.options
    });

    if (this.props.nomVille === undefined && this.state.pos !== undefined) {
      Meteor.call('Methods.Get.Adresse', this.state.pos, function(err, res) {
        if (err) console.log(err.reason);
        else if (
          res.data &&
          res.data.results &&
          res.data.results[0].formatted_address
        )
          $('#pac-input').val(res.data.results[0].formatted_address);
      });
    }

    $('#searchPro').on('change', function() {
      _this.setState({
        term: $(this).val()
      });
    });

    GoogleMaps.ready(this.props.name, function(map) {
      var autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['geocode'],
        componentRestrictions: { country: 'fr' },
        language: 'fr'
      });
      var service = new google.maps.places.PlacesService(map.instance);

      autocomplete.addListener('place_changed', function() {
        var place = autocomplete.getPlace();
        _this.onPlaceChanged(place);
      });

      _this.setState({
        service: service,
        maps: map
      });

      _this.doTextSearch(service, map);
    });
    window.prerenderReady = true;
  }
  doTextSearch(service, map) {
    var _this = this;

    let term = '';
    if (_this.state.listTypeLieu.toString() === '' && _this.state.term === '') {
      term = $('.select2-selection__rendered').prop('title');
    }

    service.textSearch(
      {
        query: term !== '' ? term : _this.state.term,
        location: _this.state.pos,
        radius: 1000,
        type: _this.state.listTypeLieu.toString(),
        rankby: 'distance',
        language: 'fr'
      },
      function(results, status, pagination) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          return;
        } else {
          $.each(_this.state.markers, function(i, elt) {
            elt.setMap(null);
          });
          _this.setState({
            markers: []
          });
          $.each(results, function(i, elt) {
            let marker = new google.maps.Marker({
              position: elt.geometry.location,
              map: map.instance,
              title: elt.name
            });
            var infowindow = new google.maps.InfoWindow({
              content: '<span style="padding:10px">' + elt.name + '</span>'
            });
            marker.addListener('click', function() {
              infowindow.close();
              infowindow.open(map.instance, marker);
            });
            let newmarker = _this.state.markers.slice();
            newmarker.push(marker);
            _this.setState({ markers: newmarker });
            if (i > _this.state.nbResultat) {
              marker.setMap(null);
            }
          });

          _this.markerLocalisationMoi();

          _this.setState({
            resGoogle: results,
            totalResultat: results.length,
            service: service,
            maps: map
          });
        }
      }
    );
  }
  componentWillReceiveProps(nextProps, nextContext) {
    // debugger;
    if (this.state.service !== null) {
      var _this = this;
      if (
        this.state.listTypeLieu !== nextProps.listLieu &&
        nextProps.listLieu !== ''
      )
        _this.setState({
          listTypeLieu: nextProps.listLieu
        });

      let term = '';
      if (nextProps.listLieu.toString() === '' && _this.state.term === '') {
        term = $('.select2-selection__rendered').prop('title');
      }

      this.state.service.textSearch(
        {
          query: term !== '' ? term : _this.state.term,
          location: _this.state.pos,
          radius: 1000,
          type: nextProps.listLieu.toString(),
          rankby: 'distance',
          language: 'fr'
        },
        function(results, status, pagination) {
          if (status === 'ZERO_RESULTS') {
            $.each(_this.state.markers, function(i, elt) {
              elt.setMap(null);
            });
            _this.setState({
              markers: []
            });

            _this.markerLocalisationMoi();

            _this.setState({
              resGoogle: null,
              totalResultat: 0
            });
          } else if (status !== google.maps.places.PlacesServiceStatus.OK) {
            return;
          } else {
            $.each(_this.state.markers, function(i, elt) {
              elt.setMap(null);
            });
            _this.setState({
              markers: []
            });

            _this.markerLocalisationMoi();

            $.each(results, function(i, elt) {
              let marker = new google.maps.Marker({
                position: elt.geometry.location,
                map: _this.state.maps.instance,
                title: elt.name
              });
              _this.state.markers.push(marker);
              var infowindow = new google.maps.InfoWindow({
                content: '<span>' + elt.name + '</span>'
              });
              marker.addListener('click', function() {
                infowindow.close();
                infowindow.open(_this.state.maps.instance, marker);
              });
              if (i > _this.state.nbResultat) {
                marker.setMap(null);
              }
            });
            _this.setState({
              resGoogle: results,
              totalResultat: results.length,
              nouvellePosition: false
            });
          }
        }
      );
    } else if (nextProps.listLieu === '') {
      this.setState({
        resGoogle: null,
        totalResultat: 0
      });
    }
    if (this.state.regionId !== nextProps.regionId) {
      this.setState({
        pos: concordanceLocalisationRegion(parseInt(this.props.regionId))
      });
    }
    this.setState({
      regionId: nextProps.regionId,
      activiteId: nextProps.activiteId
    });
  }
  markerLocalisationMoi() {
    var _this = this;
    let marker = new google.maps.Marker({
      position: _this.state.pos,
      map: _this.state.maps.instance,
      title: 'Vous etes ici',
      icon: '/maps/icons/location-marker.png'
    });

    var infowindow = new google.maps.InfoWindow({
      content: '<span style="padding:10px">Vous etes ici</span>',
      maxWidth: 200
    });

    marker.addListener('click', function() {
      infowindow.close();
      infowindow.open(_this.state.maps.instance, marker);
    });

    var newmarker = _this.state.markers.slice();
    newmarker.push(marker);
    _this.setState({ markers: newmarker });
  }
  componentWillUnmount() {
    if (GoogleMaps.maps[this.props.name]) {
      google.maps.event.clearInstanceListeners(
        GoogleMaps.maps[this.props.name].instance
      );
      delete GoogleMaps.maps[this.props.name];
    }

    $(document).unbind('placechanged');
  }
  moreResultat() {
    var _this = this;
    let result = this.state.nbResultat + 6;
    this.setState({
      nbResultat: this.state.nbResultat + 6
    });
    $.each(_this.state.markers, function(i, elt) {
      elt.setMap(null);
    });
    $.each(this.state.resGoogle, function(i, elt) {
      if (i < result) {
        let marker = new google.maps.Marker({
          position: elt.geometry.location,
          map: _this.state.maps.instance,
          title: elt.name
        });
        _this.state.markers.push(marker);
        var infowindow = new google.maps.InfoWindow({
          content: '<span>' + elt.name + '</span>'
        });
        marker.addListener('click', function() {
          infowindow.open(_this.state.maps.instance, marker);
        });
      }
    });
  }
  lessResultat() {
    var _this = this;
    if (this.state.nbResultat > 6) {
      let result = this.state.nbResultat - 6;
      this.setState({
        nbResultat: this.state.nbResultat - 6
      });
      $.each(_this.state.markers, function(i, elt) {
        elt.setMap(null);
      });
      $.each(this.state.resGoogle, function(i, elt) {
        if (i < result) {
          let marker = new google.maps.Marker({
            position: elt.geometry.location,
            map: _this.state.maps.instance,
            title: elt.name
          });
          _this.state.markers.push(marker);
          var infowindow = new google.maps.InfoWindow({
            content: '<span>' + elt.name + '</span>'
          });
          marker.addListener('click', function() {
            infowindow.open(_this.state.maps.instance, marker);
          });
        }
      });
    }
  }
  render() {
    let nbRes = parseInt(this.state.nbResultat);
    const { regionId, resGoogle, activiteId, term, ...rest } = this.state;
    let nameActivite = concordanceActivites(this.state.activiteId);
    let totalResult =
      parseInt(this.state.countFichePro) + parseInt(this.state.totalResultat);
    return (
      <section id='content'>
        <div
          className='container-fluid'
          style={{ backgroundColor: 'Gainsboro' }}>
          <div className='row'>
            <div className='col-xs-12'>
              <h1 className='heading-1 text-center'>
                {this.props.nomVille !== undefined ? (
                  <div>
                    {' '}
                    Trouvez l'entreprise d'activitée {
                      nameActivite.metier
                    } sur {this.props.nomVille} qui vous correspond{' '}
                  </div>
                ) : (
                  <div>Faites votre r&eacute;servation en ligne</div>
                )}{' '}
              </h1>
              <h2 className='sub-heading-1 text-center'>
                Environ {totalResult} r&eacute;sultats
              </h2>
            </div>
            <div className='col-xs-12 text-center'>
              <a href='/parrainage' className='btn btn-success uppercase'>
                Aidez nous à améliorer Winnzos !
              </a>
            </div>
          </div>
          <div className='col-xs-12 col-sm-4'>
            <div
              className='map-container'
              ref='map'
              style={{ height: '450px' }}></div>
          </div>
          {
            <ListPro
              regionId={regionId}
              activiteId={activiteId}
              term={term}
              nbres={nbRes}
              {...rest}
            />
          }
          {<ResGoogle res={resGoogle} nbres={nbRes} {...rest} />}
        </div>
        <div id='pagination'>
          <a
            href='javascript:;'
            title='Plus de r&eacute;sultats'
            className='more-button'
            id='plus'
            onClick={this.moreResultat.bind(this)}>
            Plus de r&eacute;sultats
          </a>
          <a
            href='javascript:;'
            title='Plus de r&eacute;sultats'
            className='more-button'
            id='moins'
            onClick={this.lessResultat.bind(this)}>
            Moins de r&eacute;sultats
          </a>
        </div>
        <div className='img-responsive'>
          <img src='/front/powered_by_google_on_white_hdpi.png'></img> ET{' '}
          <img src='/front/logo-winnzos.png'></img>
        </div>
      </section>
    );
  }
}
