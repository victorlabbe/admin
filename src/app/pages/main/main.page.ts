import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DataStorageService } from 'src/app/services/data-storage.service';





@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  data: any;

  
  constructor(private afAuth: AngularFireAuth,
              private firebaseServ:FirebaseService,
              private utilsServ: UtilsService,
              private router: Router,
              private api: ApiService,
              private dataStorageService: DataStorageService){}

  marcador: any[];
  



  ngOnInit() {
    this.api.getGym().subscribe((response) => {
      this.data = response;
      this.marcador = this.data;
      this.dataStorageService.setDataGym(this.marcador)
      const dataGym = this.dataStorageService.getDataGym()
      console.log(dataGym)
    });

  
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


