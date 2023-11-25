import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DietasCardFirestoreService {


  new_id =  0;

  private dietCardCollection : AngularFirestoreCollection<any>;
  private counterDocRef: AngularFirestoreDocument<any>;

  constructor(private firestore: AngularFirestore,
    private http: HttpClient) {
    this.dietCardCollection = this.firestore.collection('dietasCardio');
    this.counterDocRef = this.firestore.doc('counters/dietCardCounter');
   }
   

  async getNextAvailableID(): Promise<string> {
    let newId = 1;

    while (true) {
      const resRef = this.firestore.collection('dietasCardio').doc(`${newId}`);
      const resDoc = await resRef.get().toPromise();

      if (!resDoc.exists) {
        return `${newId}`;
      }

      newId++;
    }
  }

   getDietCard(): Observable<any[]> {
    return this.dietCardCollection.valueChanges({ idField: 'id' });
  }

  getDietCardById(dietCardId: string): Observable<any> {
    return this.dietCardCollection.doc(dietCardId).valueChanges({ idField: 'id' });
  }

  createDietCard(newDietCard: any, desiredId: string) {
    // Usa el ID deseado para crear el documento en Firestore
    return this.firestore.collection('dietasCardio').doc(desiredId).set(newDietCard);
  }

  updateDietCard(dietCardId: string, newData: any): Promise<void> {
    return this.dietCardCollection.doc(dietCardId).update(newData);
  }

  deleteDietCard(dietCardId: string): Promise<void> {
    return this.dietCardCollection.doc(dietCardId).delete();
  }
}
