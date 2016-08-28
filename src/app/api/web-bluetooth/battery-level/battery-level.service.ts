import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  BluetoothCore,
  BluetoothRemoteGATTServer,
  BluetoothRemoteGATTService,
  BluetoothRemoteGATTCharacteristic,
  DataView
} from '../shared';

@Injectable()
export class BatteryLevelService {

  static GATT_CHARACTERISTIC_BATTERY_LEVEL = 'battery_level';
  static GATT_SERVICE_BATTERY = 'battery_service';

  constructor(
    private _core: BluetoothCore
  ) {
  }

  getFakeValue() {
    this._core.fakeNext(
      () => (Math.random()*110)|0
    )
  }

  getDevice() {
    return this._core.getDevice$();
  }

  getNotification() {
    return this._core.getNotification$();
  }

  /**
   * Get Battery Level GATT Characteristic value.
   * This logic is specific to this service, this is why we can't abstract it elsewhere.
   * The developer is free to provide any service, and characteristics she wants.
   *
   * @return {Observable<number>} Emites the value of the requested service read from the device
   */
   getBatteryLevel(): Observable<number> {
    console.log('Getting Battery Service...');

    return this._core

        .discover$({
          filters: [{
            services: [BatteryLevelService.GATT_SERVICE_BATTERY]
          }]
        })
        .flatMap( (gatt: BluetoothRemoteGATTServer)  => this._core.getPrimaryService$(gatt, BatteryLevelService.GATT_SERVICE_BATTERY) )
        .flatMap( (primaryService: BluetoothRemoteGATTService) => this._core.getCharacteristic$(primaryService, BatteryLevelService.GATT_CHARACTERISTIC_BATTERY_LEVEL) )
        .flatMap( (characteristic: BluetoothRemoteGATTCharacteristic) =>  this._core.readValue$(characteristic) )
        .map( (value: DataView, index: number) => value.getUint8(0) )

  }

}