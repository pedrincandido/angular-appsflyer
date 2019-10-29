import { Injectable } from '@angular/core';
import { App } from '../interfaces/app.interface';
import { DeviceDetectorService } from 'ngx-device-detector';

declare var app: App | undefined;

@Injectable({
  providedIn: 'root'
})
export class AppsflyerService {

  constructor(
    private deviceService: DeviceDetectorService
  ) { }

  recordEventAndroid(eventName: string, eventParams?: any) {
    app.recordEvent(eventName, eventParams);
  }

  recordEventIOS(eventName: string, eventParams?: any) {
    (window as any).webkit.messageHandlers.event.postMessage(`${eventName}+${eventParams}`);
  }

  callEventForDevice(eventName: string, eventParams?: any) {
    const { os } = this.deviceService.getDeviceInfo();
    const device = os && os.toLowerCase();

    const isAndroid = device && device.includes('android');
    const exitsMessageHandler = (window as any).webkit && (window as any).webkit.messageHandlers;
    const isIOS = device && device.includes('ios');

    if (isAndroid && window.hasOwnProperty('app')) {
      this.recordEventAndroid(eventName, eventParams);
    } else if (isIOS && exitsMessageHandler) {
      this.recordEventIOS(eventName, eventParams);
    }
  }
}
