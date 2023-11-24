import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AngularFireStorage } from '@angular/fire/compat/storage'; 

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  userData: any;
  apiUserData: any;
  userEmail: string;
  data: any;
  datos: any;


  constructor(private api: ApiService, 
              private afAuth: AngularFireAuth,
              private toastController: ToastController,
              private storage: AngularFireStorage ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // El usuario ha iniciado sesión en Firebase
        this.userData = user;
        this.userEmail = user.email; // Obtenemos el correo del usuario autenticado

        // Llama a la API para obtener todos los usuarios y luego filtra el usuario por correo
        this.api.getUser().subscribe((response) => {
          this.data = response;
          this.datos = this.data.users;

          const usuarioEncontrado = this.datos.find(usuario => {
            return usuario.email === this.userEmail;
          });

          if (usuarioEncontrado) {
            this.apiUserData = usuarioEncontrado;
            console.log(this.apiUserData)
          } else {
            console.log('error');
          }
        });
      } else {
        // El usuario no ha iniciado sesión
        this.userData = null;
      }
    });
  }


  async actualizarCampo(campo: string) {
    const toast = await this.toastController.create({
      message: `¿Deseas actualizar el campo ${campo}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Actualizar',
          handler: () => {
            this.confirmarActualizacion(campo);
          },
        },
      ],
    });

    await toast.present();
  }

  confirmarActualizacion(campo: string) {
    const userId = this.apiUserData.id;
    const nuevoValor = this.apiUserData[campo];

    this.api.updateUserField(userId, campo, nuevoValor).subscribe(response => {
      if (response.success) {
        // Manejar la respuesta o mostrar una notificación de éxito
        console.log(`Campo ${campo} actualizado con éxito`);
        // Actualizar el campo en el objeto local
        this.apiUserData[campo] = nuevoValor;
      } else {
        // Manejar la respuesta en caso de error
        console.error(response.error);
      }
    });

  }
  
}