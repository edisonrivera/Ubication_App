import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UbicationService } from '../services/ubication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  latitude: any = 0
  longitude: any = 0;
  url: string = "";
  ubications: any[] = [];
  constructor(private geolocation: Geolocation, private ubicationService: UbicationService) {}

  ngOnInit(){
    this.loadUbications()
  }


  loadUbications() {
    this.ubicationService.getUbications().subscribe((ubications) => {
      this.ubications = ubications;
    });
  }

  saveUbication(){
    this.ubicationService.sendUbication(this.latitude, this.longitude, this.url);
  }



  options = {
    timeout: 10000,
    enableHighAccuracy: true,
    maximumAge:3600
  }

  getCurrentCoordinates(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude=resp.coords.latitude;
      this.longitude=resp.coords.longitude;
      this.url = "https://www.google.com/maps/@" + this.latitude + "," + this.longitude;
      this.saveUbication();
    }).catch((error) => {
      console.log('Ubication Error');
    })
  }

}
