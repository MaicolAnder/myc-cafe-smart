import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import FingerprintJS from '@fingerprintjs/fingerprintjs';


@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private userId: string = '';

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: Object
  ) {
    
   }

   loadVisitorId() {
    const fp = FingerprintJS.load();
    fp.then(fp => fp.get()).then(result => {
      this.userId = result.visitorId
    })
  }

   setVisitorId(visitorId: string) {
    this.userId = visitorId;
  }
   getVisitorId() {
    return this.userId;
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (isPlatformBrowser(this.platformId)) {
        navigator.geolocation.getCurrentPosition(
          resp => {
            console.log(resp);
            resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude })
          },
          err => reject(err)
        );
      } else {
        reject('Geolocation is not available on the server. Platform is: ' + this.platformId);
      }
    });
  }
}
