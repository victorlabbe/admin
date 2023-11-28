import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HorariosService } from 'src/app/services/horarios.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
})
export class HorariosPage implements OnInit {

  hours: any[] = [];
  selectedHour: any = {};
  newHour: any = { hora: [] }; // Inicializa newHour con un array para las horas
  showDetail: boolean = false;
  showCreateForm: boolean = false;
  showCreateButton: boolean = true;
  nextId: string;

  constructor(
    private hourService: HorariosService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.getHour();
  }

  async getHour() {
    this.hourService.getHour().subscribe((hour: any[]) => {
      this.hours = hour;
      console.log(this.hours);
    });
  }

  selectHour(hour: any) {
    this.selectedHour = { ...hour };
    this.showDetail = true;
    this.showCreateForm = false;
    this.showCreateButton = false;
  }

  async updateHour() {
    if (this.selectedHour) {
      try {
        await this.hourService.updateHour(this.selectedHour.id, this.selectedHour);
        this.showDetail = false;
        this.getHour();
        this.presentAlert('Éxito', 'Horario actualizado exitosamente');
      } catch (error) {
        console.error('Error al actualizar el Horario', error);
        this.presentAlert('Error', 'Hubo un problema al actualizar el Horario');
      }
    }
  }

  async deleteHour(hourId: string) {
    const confirmAlert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de eliminar este Horario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              await this.hourService.deleteHour(hourId);
              this.showDetail = false;
              this.getHour();
              this.presentAlert('Éxito', 'Horario eliminado exitosamente');
            } catch (error) {
              console.error('Error al eliminar el Horario', error);
              this.presentAlert('Error', 'Hubo un problema al eliminar el Horario');
            }
          }
        }
      ]
    });

    await confirmAlert.present();
  }

  async createHour() {
    if (this.newHour.fechasDisponibles && this.newHour.hora ) {
      try {
        this.nextId = await this.hourService.getNextAvailableID();
        this.newHour.id = this.nextId.toString(); // Convertir a string antes de asignar
        await this.hourService.createHour(this.newHour, this.nextId);
        this.newHour = { 
          id:this.nextId,
          fechasDisponibles: this.newHour.fechasDisponibles,
          hora: [] }; // Reinicia el objeto newHour después de la creación
        this.getHour();
        this.showCreateButton = true;
        this.presentAlert('Éxito', 'Horario creado exitosamente');
      } catch (error) {
        console.error('Error al crear el Horario', error);
        this.presentAlert('Error', 'Hubo un problema al crear el Horario');
      }
    } else {
      console.error('Todos los campos son requeridos');
      this.presentAlert('Error', 'Todos los campos son requeridos');
    }
  }

  addHourNew(newHourValue: string) {
    if (!this.newHour.hora) {
      this.newHour.hora = [];
    }
    this.newHour.hora.push(newHourValue);
    // Limpiar el campo de entrada
    newHourValue = '';
  }

  showCreateHourForm() {
    this.showCreateForm = true;
    this.showDetail = false;
    this.showCreateButton = false;
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
