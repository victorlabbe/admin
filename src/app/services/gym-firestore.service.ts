import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GymFirestoreService {

  private gymsCollection: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore) {
    this.gymsCollection = this.firestore.collection('gimnasios');
  }

  async getNextAvailableID(): Promise<string> {
    let newId = 1;

    while (true) {
      const resRef = this.firestore.collection('gimnasios').doc(`${newId}`);
      const resDoc = await resRef.get().toPromise();

      if (!resDoc.exists) {
        return `${newId}`;
      }

      newId++;
    }
  }

  getGyms(): Observable<any[]> {
    return this.gymsCollection.valueChanges({ idField: 'id' });
  }

  getGymById(gymId: string): Observable<any> {
    return this.gymsCollection.doc(gymId).valueChanges({ idField: 'id' });
  }

  createGym(newGym: any, desiredId: string) {
    // Usa el ID deseado para crear el documento en Firestore
    return this.firestore.collection('gimnasios').doc(desiredId).set(newGym);
  }

  updateGym(gymId: string, newData: any): Promise<void> {
    return this.gymsCollection.doc(gymId).update(newData);
  }

  deleteGym(gymId: string): Promise<void> {
    return this.gymsCollection.doc(gymId).delete();
  }
}
