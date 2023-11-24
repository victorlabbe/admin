import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserFirestoreService {

  private usersCollection: AngularFirestoreCollection<any>;
   // Cambia 'any' por el tipo de tu modelo de usuario

  constructor(private firestore: AngularFirestore
    ) {
    this.usersCollection = this.firestore.collection('usuarios');
  }

  // Obtener todos los usuarios
  getUsers(): Observable<any[]> { // Cambia 'any' por el tipo de tu modelo de usuario
    return this.usersCollection.valueChanges({ idField: 'id' });
  }

  // Obtener un usuario por su ID
  getUserById(userId: string): Observable<any> { // Cambia 'any' por el tipo de tu modelo de usuario
    return this.usersCollection.doc(userId).valueChanges({ idField: 'id' });
  }


  // Actualizar un usuario existente
  updateUser(userId: string, newData: any): Promise<void> { // Cambia 'any' por el tipo de tu modelo de usuario
    return this.usersCollection.doc(userId).update(newData);
  }

  // Eliminar un usuario
  deleteUser(userId: string): Promise<void> {
    return this.usersCollection.doc(userId).delete();
  }
  
}
