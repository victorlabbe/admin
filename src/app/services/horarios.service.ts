import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  private hourCollection: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore) {
    this.hourCollection = this.firestore.collection('horasDisponibles');
  }

  async getNextAvailableID(): Promise<string> {
    let newId = 1;

    while (true) {
      const resRef = this.firestore.collection('horasDisponibles').doc(`${newId}`);
      const resDoc = await resRef.get().toPromise();

      if (!resDoc.exists) {
        return `${newId}`;
      }

      newId++;
    }
  }

  getHour(): Observable<any[]> {
    return this.hourCollection.valueChanges({ idField: 'id' });
  }

  getHourById(HourId: string): Observable<any> {
    return this.hourCollection.doc(HourId).valueChanges({ idField: 'id' });
  }

  createHour(newHour: any, desiredId: string) {
    // Usa el ID deseado para crear el documento en Firestore
    return this.firestore.collection('horasDisponibles').doc(desiredId).set(newHour);
  }

  updateHour(HourId: string, newData: any): Promise<void> {
    return this.hourCollection.doc(HourId).update(newData);
  }

  deleteHour(HourId: string): Promise<void> {
    return this.hourCollection.doc(HourId).delete();
  }
}
