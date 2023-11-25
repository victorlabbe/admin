import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DietasResFirestoreService } from 'src/app/services/dietas-res-firestore.service';

@Component({
  selector: 'app-resistencia',
  templateUrl: './resistencia.page.html',
  styleUrls: ['./resistencia.page.scss'],
})
export class ResistenciaPage implements OnInit {

  dietsRes: any[] = [];
  selectedDietRes: any = {};
  showDetail: boolean = false;
  showCreateForm: boolean = false;
  showCreateButton: boolean = true;
  almuerzo = 'almuerzo';
  cena = 'cena';
  desayuno = 'desayuno';
  nextId: string;

  newDietRes: any = {
    [this.desayuno]: this.desayuno,
    [this.almuerzo]: this.almuerzo,
    [this.cena]: this.cena
  };

  constructor(
    private dietResService: DietasResFirestoreService,
    private alertController: AlertController
  ) { }



  ngOnInit() {
    this.getDietRes()

  }



  async getDietRes() {
    this.dietResService.getDietRes().subscribe((dietsRes: any[]) => {
      this.dietsRes = dietsRes;
      console.log(this.dietsRes)
    });
  }

  selectDietRes(dietCard: any) {
    this.selectedDietRes = { ...dietCard };
    this.showDetail = true;
    this.showCreateForm = false;
    this.showCreateButton = false; // Ocultar el botón al seleccionar un dieta
  }

  async updateDietRes() {
    if (this.selectDietRes) {
      try {
        await this.dietResService.updateDietRes(this.selectedDietRes.id, this.selectedDietRes);
        this.showDetail = false;
        this.getDietRes();
        this.presentAlert('Éxito', 'dieta actualizada exitosamente');
      } catch (error) {
        console.error('Error al actualizar la dieta', error);
        this.presentAlert('Error', 'Hubo un problema al actualizar la dieta');
      }
    }
  }

  async deleteDietRes(dietResId: string) {
    const confirmAlert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de eliminar esta dieta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              await this.dietResService.deleteDietRes(dietResId);
              this.showDetail = false;
              this.getDietRes();
              this.presentAlert('Éxito', 'dieta eliminado exitosamente');
            } catch (error) {
              console.error('Error al eliminar el dieta', error);
              this.presentAlert('Error', 'Hubo un problema al eliminar el dieta');
            }
          }
        }
      ]
    });

    await confirmAlert.present();
  }

  async createDietRes() {
    try {
      if (
        this.selectedDietRes.nombreCena &&
        this.selectedDietRes.descripcionCena &&
        this.selectedDietRes.nombreMeriendaNocturna &&
        this.selectedDietRes.descripcionMeriendaNocturna &&
        this.selectedDietRes.nombreCena.trim() !== '' &&
        this.selectedDietRes.descripcionCena.trim() !== '' &&
        this.selectedDietRes.nombreMeriendaNocturna.trim() !== '' &&
        this.selectedDietRes.descripcionMeriendaNocturna.trim() !== ''
      ) {
        this.nextId = await this.dietResService.getNextAvailableID();
  
        // Asignar los valores del formulario al objeto newDietRes, incluyendo el ID autoincremental
        this.newDietRes = {
          id: this.nextId,
          almuerzo: this.almuerzo,
          cena: this.cena,
          desayuno: this.desayuno,
          nombreDesayuno: this.selectedDietRes.nombreDesayuno || '',
          descripcionDesayuno: this.selectedDietRes.descripcionDesayuno || '',
          nombreAlmuerzo: this.selectedDietRes.nombreAlmuerzo || '',
          descripcionAlmuerzo: this.selectedDietRes.descripcionAlmuerzo || '',
          nombreMeriendaTarde: this.selectedDietRes.nombreMeriendaTarde || '',
          descripcionMeriendatarde: this.selectedDietRes.descripcionMeriendatarde || '',
          nombreCena: this.selectedDietRes.nombreCena || '',
          descripcionCena: this.selectedDietRes.descripcionCena || '',
          nombreMeriendaNocturna: this.selectedDietRes.nombreMeriendaNocturna || '',
          descripcionMeriendaNocturna: this.selectedDietRes.descripcionMeriendaNocturna || ''
          // Agregar otros campos según sea necesario
        };
  
        console.log(this.newDietRes);
        // Crear la dieta con el ID asignado específicamente
        await this.dietResService.createDietRes(this.newDietRes, this.nextId)
  
        // Actualizar la lista de dietas
        this.getDietRes();
  
        // Mostrar mensaje de éxito
        this.presentAlert('Éxito', 'Dieta creada exitosamente');
      } else {
        // Si falta algún campo, muestra un mensaje de error o realiza otra acción
        console.log('Por favor, completa todos los campos');
        this.presentAlert('Completa todos los campos','');
      }
    } catch (error) {
      console.error('Error al crear la dieta', error);
      this.presentAlert('Error', 'Hubo un problema al crear la dieta');
    }
  }
  




  showcreateDietResForm() {
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
