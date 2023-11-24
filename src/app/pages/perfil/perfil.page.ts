import { Component, OnInit } from '@angular/core';
import { UserFirestoreService } from 'src/app/services/user-firestore.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  users: any[] = []; // Lista de usuarios obtenidos
  selectedUser: any; // Usuario seleccionado

  constructor(private userFirestoreService: UserFirestoreService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userFirestoreService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  onSelectUser(user: any): void {
    this.selectedUser = user;
    // Aquí podrías hacer algo con el usuario seleccionado, como mostrar los detalles, editar o eliminar.
  }

  updateUser(): void {
    if (this.selectedUser) {
      // Lógica para actualizar el usuario seleccionado
      this.userFirestoreService.updateUser(this.selectedUser.id, this.selectedUser).then(() => {
        console.log('Usuario actualizado exitosamente');
        // Actualizar la lista de usuarios o realizar alguna acción adicional si es necesario
      }).catch(error => {
        console.error('Error al actualizar el usuario', error);
      });
    }
  }


  deleteUserFromFirebase(): void {
    if (this.selectedUser) {
      this.userFirestoreService.deleteUser(this.selectedUser.id)
        .then(() => {
          console.log('Usuario eliminado  Firestore');
          this.selectedUser = null; // Limpiar el usuario seleccionado después de eliminarlo
        })
        .catch(error => {
          console.error('Error al eliminar el usuario', error);
        });
    }
  }
  
  
}