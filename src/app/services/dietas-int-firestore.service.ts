import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DietasIntFirestoreService {

  new_id =  0;

  private dietCardCollection : AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore,
    private http: HttpClient) {
    this.dietCardCollection = this.firestore.collection('DietaEntrenamientoFuerte');

   }
   

  async getNextAvailableID(): Promise<string> {
    let newId = 1;

    while (true) {
      const resRef = this.firestore.collection('DietaEntrenamientoFuerte').doc(`${newId}`);
      const resDoc = await resRef.get().toPromise();

      if (!resDoc.exists) {
        return `${newId}`;
      }

      newId++;
    }
  }

   getDietInt(): Observable<any[]> {
    return this.dietCardCollection.valueChanges({ idField: 'id' });
  }

  getDietIntById(dietCardId: string): Observable<any> {
    return this.dietCardCollection.doc(dietCardId).valueChanges({ idField: 'id' });
  }

  createDietInt(newDietCard: any, desiredId: string) {
    // Usa el ID deseado para crear el documento en Firestore
    return this.firestore.collection('DietaEntrenamientoFuerte').doc(desiredId).set(newDietCard);
  }

  updateDietInt(dietCardId: string, newData: any): Promise<void> {
    return this.dietCardCollection.doc(dietCardId).update(newData);
  }

  deleteDietInt(dietCardId: string): Promise<void> {
    return this.dietCardCollection.doc(dietCardId).delete();
  }
}

