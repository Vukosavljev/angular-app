import { SensorModel } from './../models/sensor.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SensorObserverService {
    private sensorSubject = new BehaviorSubject<
        SensorModel[] | HttpErrorResponse | {}
    >({});
    allSendors$ = this.sensorSubject.asObservable();

    fetchSensors(sensors: SensorModel[] | HttpErrorResponse): void {
        return this.sensorSubject.next(sensors);
    }

    private getSensorsValue() {
        return this.sensorSubject.getValue();
    }

    deleteSensor(id: number): void {
        const currentSensors = this.getSensorsValue();
        if (Array.isArray(currentSensors)) {
            const newSensors = currentSensors.filter(
                (sensor: SensorModel) => sensor.id !== id
            );
            this.sensorSubject.next(newSensors);
        }
    }

    addSensor(newSensor: SensorModel) {
        const currentSensors = this.getSensorsValue();
        if (Array.isArray(currentSensors)) {
            this.sensorSubject.next([...currentSensors, newSensor]);
        }
    }
}
