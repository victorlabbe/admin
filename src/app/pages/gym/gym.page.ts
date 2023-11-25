import { Component, OnInit } from '@angular/core';
import { GymFirestoreService } from 'src/app/services/gym-firestore.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-gym',
  templateUrl: './gym.page.html',
  styleUrls: ['./gym.page.scss'],
})
export class GymPage implements OnInit {

  gyms: any[] = [];
  selectedGym: any = {};
  newGym: any = {};
  showDetail: boolean = false;
  showCreateForm: boolean = false;
  showCreateButton: boolean = true;
  nextId: string;

  constructor(
    private gymService: GymFirestoreService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.getGyms();
  }

  async getGyms() {
    this.gymService.getGyms().subscribe((gyms: any[]) => {
      this.gyms = gyms;
    });
  }

  selectGym(gym: any) {
    this.selectedGym = { ...gym };
    this.showDetail = true;
    this.showCreateForm = false;
    this.showCreateButton = false; // Ocultar el botón al seleccionar un gimnasio
  }

  async updateGym() {
    if (this.selectedGym) {
      try {
        await this.gymService.updateGym(this.selectedGym.id, this.selectedGym);
        this.showDetail = false;
        this.getGyms();
        this.presentAlert('Éxito', 'Gimnasio actualizado exitosamente');
      } catch (error) {
        console.error('Error al actualizar el gimnasio', error);
        this.presentAlert('Error', 'Hubo un problema al actualizar el gimnasio');
      }
    }
  }

  async deleteGym(gymId: string) {
    const confirmAlert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de eliminar este gimnasio?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              await this.gymService.deleteGym(gymId);
              this.showDetail = false;
              this.getGyms();
              this.presentAlert('Éxito', 'Gimnasio eliminado exitosamente');
            } catch (error) {
              console.error('Error al eliminar el gimnasio', error);
              this.presentAlert('Error', 'Hubo un problema al eliminar el gimnasio');
            }
          }
        }
      ]
    });

    await confirmAlert.present();
  }

  async createGym() {
    if (this.newGym.nombre && this.newGym.direccion && this.newGym.horario && this.newGym.latitud && this.newGym.longitud) {
      try {
        this.nextId = await this.gymService.getNextAvailableID();
        this.newGym= {
          id:this.nextId,
          nombre: this.newGym.nombre,
          direccion: this.newGym.direccion,
          horario: this.newGym.horario,
          latitud: this.newGym.latitud,
          longitud: this.newGym.longitud
        };
        await this.gymService.createGym(this.newGym, this.nextId);
        this.newGym = {};
        this.getGyms();
        this.showCreateButton = true; // Mostrar el botón después de crear el gimnasio
        this.presentAlert('Éxito', 'Gimnasio creado exitosamente');
      } catch (error) {
        console.error('Error al crear el gimnasio', error);
        this.presentAlert('Error', 'Hubo un problema al crear el gimnasio');
      }
    } else {
      console.error('Todos los campos son requeridos');
      this.presentAlert('Error', 'Todos los campos son requeridos');
    }
  }

  showCreateGymForm() {
    this.showCreateForm = true;
    this.showDetail = false;
    this.showCreateButton = false; // Ocultar el botón al mostrar el formulario de creación
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
