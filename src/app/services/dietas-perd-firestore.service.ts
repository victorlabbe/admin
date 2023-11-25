import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DietasPerdFirestoreService {

  new_id =  0;

  private dietCardCollection : AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore,
    private http: HttpClient) {
    this.dietCardCollection = this.firestore.collection('dietaPerdidaPeso');

   }
   

  async getNextAvailableID(): Promise<string> {
    let newId = 1;

    while (true) {
      const resRef = this.firestore.collection('dietaPerdidaPeso').doc(`${newId}`);
      const resDoc = await resRef.get().toPromise();

      if (!resDoc.exists) {
        return `${newId}`;
      }

      newId++;
    }
  }


   getDietPerd(): Observable<any[]> {
    return this.dietCardCollection.valueChanges({ idField: 'id' });
  }

  getDietPerdById(dietCardId: string): Observable<any> {
    return this.dietCardCollection.doc(dietCardId).valueChanges({ idField: 'id' });
  }

  createDietPerd(newDietCard: any, desiredId: string) {
    // Usa el ID deseado para crear el documento en Firestore
    return this.firestore.collection('dietaPerdidaPeso').doc(desiredId).set(newDietCard);
  }

  updateDietPerd(dietCardId: string, newData: any): Promise<void> {
    return this.dietCardCollection.doc(dietCardId).update(newData);
  }

  deleteDietPerd(dietCardId: string): Promise<void> {
    return this.dietCardCollection.doc(dietCardId).delete();
  }
}
