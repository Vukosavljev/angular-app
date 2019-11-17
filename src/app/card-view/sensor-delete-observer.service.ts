import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SensorDeleteService {
    private deletedSensor = new Subject<number>();
    deletedSendor$ = this.deletedSensor.asObservable();

    deleteSensorNotify(id: number) {
        return this.deletedSensor.next(id);
    }
}
