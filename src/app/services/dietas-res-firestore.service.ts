import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DietasResFirestoreService {

  new_id =  0;

  private dietCardCollection : AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore,
    private http: HttpClient) {
    this.dietCardCollection = this.firestore.collection('dietasResistencia');

   }
   

  async getNextAvailableID(): Promise<string> {
    let newId = 1;

    while (true) {
      const resRef = this.firestore.collection('dietasResistencia').doc(`${newId}`);
      const resDoc = await resRef.get().toPromise();

      if (!resDoc.exists) {
        return `${newId}`;
      }

      newId++;
    }
  }
  

   getDietRes(): Observable<any[]> {
    return this.dietCardCollection.valueChanges({ idField: 'id' });
  }

  getDietResById(dietCardId: string): Observable<any> {
    return this.dietCardCollection.doc(dietCardId).valueChanges({ idField: 'id' });
  }

  createDietRes(newDietCard: any, desiredId: string) {
    // Usa el ID deseado para crear el documento en Firestore
    return this.firestore.collection('dietasResistencia').doc(desiredId).set(newDietCard);
  }

  updateDietRes(dietCardId: string, newData: any): Promise<void> {
    return this.dietCardCollection.doc(dietCardId).update(newData);
  }

  deleteDietRes(dietCardId: string): Promise<void> {
    return this.dietCardCollection.doc(dietCardId).delete();
  }
}
