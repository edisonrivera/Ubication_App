import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UbicationService {

  constructor(private afd: AngularFirestore) { }

  async sendUbication(latitude: any, longitude: any, url: string) {
    try {

      const ubication = {
        latitude: latitude,
        longitude: longitude,
        url: url,
      };

        await this.afd.collection('ubications').add(ubication);
    } catch (error) {
      console.error('Error al guardar la ubicación', error);
    }
  }

  getUbications() {
    return this.afd
      .collection('ubications', (ref) => ref.orderBy('url'))
      .valueChanges();
  }
}
