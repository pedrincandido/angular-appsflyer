import { TestBed } from '@angular/core/testing';

import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { AppsflyerService } from '../../public-api';

fdescribe('AppsflyerService', () => {
  let service: AppsflyerService;
  let deviceService: DeviceDetectorService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        DeviceDetectorService
      ]
    }));


  beforeEach(() => {
    service = TestBed.get(AppsflyerService);
    deviceService = TestBed.get(DeviceDetectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call get mobile event device android', () => {
    const deviceInfoMock: DeviceInfo = {
      os: 'Android',
      userAgent: '',
      browser_version: '',
      browser: 'android',
      device: 'iphone 7',
      os_version: '10.6.7'
    };

    const eventParams = '{"af_revenue":"6.72", "af_content_type": "wallets", "af_content_id": "15854"}';

    spyOn(deviceService, 'getDeviceInfo').and.returnValue(deviceInfoMock);

    const recordEventAndroidSpy = spyOn(service, 'recordEventAndroid').and.stub();

    service.callEventForDevice('f_purchase', eventParams);

    expect(recordEventAndroidSpy).toHaveBeenCalled();
  });

  it('should call get mobile event Device iOS', () => {
    const deviceInfoMock: DeviceInfo = {
      os: 'iOS',
      userAgent: '',
      browser_version: '',
      browser: 'iOS',
      device: 'iphone 7',
      os_version: '10.6.7'
    };

    const eventParams = '{"af_revenue":"6.72", "af_content_type": "wallets", "af_content_id": "15854"}';

    spyOn(deviceService, 'getDeviceInfo').and.returnValue(deviceInfoMock);

    const recordEventIOSSpy = spyOn(service, 'recordEventIOS').and.stub();

    service.callEventForDevice('f_test', eventParams);

    expect(recordEventIOSSpy).toHaveBeenCalled();
  });

  it('should call get mobile event Device, but not call record event', () => {
    const deviceInfoMock: DeviceInfo = {
      os: 'iOS',
      userAgent: '',
      browser_version: '',
      browser: 'iOS',
      device: 'iphone 7',
      os_version: '10.6.7'
    };

    const recordEventAndroidSpy = spyOn(service, 'recordEventAndroid');
    const recordEventIOSSpy = spyOn(service, 'recordEventIOS');
    spyOn(deviceService, 'getDeviceInfo').and.returnValue(deviceInfoMock);

    service.callEventForDevice('f_test');

    expect(recordEventAndroidSpy).not.toHaveBeenCalled();

    expect(recordEventIOSSpy).not.toHaveBeenCalled();
  });

});
