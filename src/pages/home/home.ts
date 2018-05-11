import { Component } from '@angular/core';
import { IonicPage,NavController } from 'ionic-angular';

import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import {GoogleMaps,GoogleMap,GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker
} from '@ionic-native/google-maps';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: any;
  posActual:Geoposition;
  public data:any;

  public lati:number;
  public longi:number;

  constructor(
    private navCtrl: NavController,
    private geolocation: Geolocation,private googleMaps: GoogleMaps,
    public http: Http  
  ) {}
  
  markers: any[] = [
    {
      position:{
        latitude: 21.480616,
        longitude: -104.864867,
      },
      title:'ITT'
    },
    {
      position:{
        latitude: 21.485800, 
        longitude: -104.818215,
      },
      title:'Casa de Betsy'
    }
  ];
  ionViewDidLoad(){
    this.getPosition();
    this.displayGoogleMapCasa();
    this.displayGoogleMapITT();
    
  }

  //Obtener posición actual
  getPosition():any{
    this.geolocation.getCurrentPosition()
    .then(response => {
      this.displayGoogleMapsActual(response);
    })
    .catch(error =>{
      console.log(error);
    })
  }

  displayGoogleMapsActual(position: Geoposition){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude, longitude);
    
    let mapEle: HTMLElement = document.getElementById('map');
    let myLatLng = {lat: latitude, lng: longitude};

    let mapOptions = {
      center: myLatLng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(mapEle,mapOptions);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Posición Actual'
      });
      mapEle.classList.add('show-map');
    });
    
  }
//Ubicación de la casa de alguien
  displayGoogleMapCasa() {    
      let title;
      var latLng = new google.maps.LatLng(this.markers[1].position.latitude, this.markers[1].position.longitude);
    
      title=this.markers[1].title;

    let mapOptions = {
      center: latLng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    
    let mapEle: HTMLElement = document.getElementById('map');
    this.map = new google.maps.Map(mapEle, mapOptions);
    
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        title: title,
        icon: '../assets/imgs/casita.png'
      });
      mapEle.classList.add('show-map');
    });
  }
//Ubicación del ITT
  displayGoogleMapITT() {    
    let title;
    var latLng = new google.maps.LatLng(this.markers[0].position.latitude, this.markers[0].position.longitude);
  
    title=this.markers[0].title;

  let mapOptions = {
    center: latLng,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  
  let mapEle: HTMLElement = document.getElementById('map');
  this.map = new google.maps.Map(mapEle, mapOptions);
  
  google.maps.event.addListenerOnce(this.map, 'idle', () => {
    let marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: title,
     icon: '../assets/imgs/escudo_itt.png'
    });
    mapEle.classList.add('show-map');
  });
}

}
