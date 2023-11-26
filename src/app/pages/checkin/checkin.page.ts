import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ReservaService } from '../../services/reserva.service';

import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.page.html',
  styleUrls: ['./checkin.page.scss'],
})
export class CheckinPage implements OnInit {
  reservas: any[];
  reser:any;
  user: any;


  constructor(private reservaService: ReservaService,
    private alertController: AlertController,
    private firebaseServ: FirebaseService,
    private router: Router,
    private api: ApiService,
    private afAuth: AngularFireAuth) { }

  

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // Si hay un usuario autenticado, lo almacenamos en la propiedad user
        this.user = user.email;
        console.log(this.user);
  
        // Ahora, puedes filtrar las reservas por el usuario actual
        this.api.getRes().subscribe((response) => {
          this.reser = response;
          this.reservas = this.reser.reservations_data.filter(reserva => reserva.usuario === this.user);
          console.log(this.reservas);
        });
      }
    });
  }



  signOut() {
    // Eliminar el token de autenticación de localStorage
    localStorage.removeItem('userToken');

    // Llamar al método de signOut de Firebase si es necesario
    this.firebaseServ.signOut();

    // Navegar a la página de inicio
    this.router.navigate(['/']);
  }

  openMain() {
    // Abre la página de "Ubicaciones" con un pequeño retraso
    setTimeout(() => {
      this.router.navigate(['/main']);
    }, 400); // 300 milisegundos (ajusta este valor según tus necesidades)
  }

  async mostrarRes(){
    
  }

  

}
