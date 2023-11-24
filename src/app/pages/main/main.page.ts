import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { UserFirestoreService } from 'src/app/services/user-firestore.service';





@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  data: any;

  
  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private dataStorageService: DataStorageService,
              private userFirestore : UserFirestoreService ){}

  marcador: any[];
  



  ngOnInit(): void {
    this.fetchUsers();
  }
  
  fetchUsers() {
      this.userFirestore .getUsers().subscribe(
        users => {
          console.log('Usuarios obtenidos:', users);
        },
        error => {
          console.error('Error al obtener usuarios:', error);
        }
      );
  }


  signOut() {
    // Eliminar el token de autenticación de localStorage
    localStorage.removeItem('userToken');

    localStorage.removeItem('userEmail');

    this.dataStorageService.clearDataGym();
    
    this.afAuth.signOut().then(() => {
      // Cierre de sesión exitoso
      console.log('Sesión cerrada correctamente.');
      // Navegar a la página de inicio o a donde desees después del cierre de sesión
      this.router.navigate(['/login']); // Reemplaza 'login' con la ruta de tu página de inicio de sesión
    }).catch((error) => {
      console.error('Error al cerrar sesión: ', error);
    });
  }
  }


