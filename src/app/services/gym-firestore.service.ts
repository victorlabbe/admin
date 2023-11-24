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

  getGyms(): Observable<any[]> {
    return this.gymsCollection.valueChanges({ idField: 'id' });
  }

  getGymById(gymId: string): Observable<any> {
    return this.gymsCollection.doc(gymId).valueChanges({ idField: 'id' });
  }

  createGym(gymData: any): Promise<any> {
    return this.gymsCollection.add(gymData);
  }

  updateGym(gymId: string, newData: any): Promise<void> {
    return this.gymsCollection.doc(gymId).update(newData);
  }

  deleteGym(gymId: string): Promise<void> {
    return this.gymsCollection.doc(gymId).delete();
  }
}
