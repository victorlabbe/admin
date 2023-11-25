import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DietasIntFirestoreService } from 'src/app/services/dietas-int-firestore.service';

@Component({
  selector: 'app-intensidad',
  templateUrl: './intensidad.page.html',
  styleUrls: ['./intensidad.page.scss'],
})
export class IntensidadPage implements OnInit {

  dietsInt: any[] = [];
  selectedDietInt: any = {};
  showDetail: boolean = false;
  showCreateForm: boolean = false;
  showCreateButton: boolean = true;
  almuerzo = 'almuerzo';
  cena = 'cena';
  desayuno = 'desayuno';
  nextId: string;

  newDietInt: any = {
    [this.desayuno]: this.desayuno,
    [this.almuerzo]: this.almuerzo,
    [this.cena]: this.cena
  };

  constructor(
    private dietIntService: DietasIntFirestoreService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.getDietInt()

  }



  async getDietInt() {
    this.dietIntService.getDietInt().subscribe((dietsInt: any[]) => {
      this.dietsInt = dietsInt;
      console.log(this.dietsInt)
    });
  }

  selectDietInt(dietCard: any) {
    this.selectedDietInt = { ...dietCard };
    this.showDetail = true;
    this.showCreateForm = false;
    this.showCreateButton = false; // Ocultar el botón al seleccionar un dieta
  }

  async updateDietInt() {
    if (this.selectDietInt) {
      try {
        await this.dietIntService.updateDietInt(this.selectedDietInt.id, this.selectedDietInt);
        this.showDetail = false;
        this.getDietInt();
        this.presentAlert('Éxito', 'dieta actualizada exitosamente');
      } catch (error) {
        console.error('Error al actualizar la dieta', error);
        this.presentAlert('Error', 'Hubo un problema al actualizar la dieta');
      }
    }
  }

  async deleteDietInt(dietIntId: string) {
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
              await this.dietIntService.deleteDietInt(dietIntId);
              this.showDetail = false;
              this.getDietInt();
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

  async createDietInt() {
    try {
      if (
        this.selectedDietInt.nombreCena &&
        this.selectedDietInt.descripcionCena &&
        this.selectedDietInt.nombreMeriendaNocturna &&
        this.selectedDietInt.descripcionMeriendaNocturna &&
        this.selectedDietInt.nombreCena.trim() !== '' &&
        this.selectedDietInt.descripcionCena.trim() !== '' &&
        this.selectedDietInt.nombreMeriendaNocturna.trim() !== '' &&
        this.selectedDietInt.descripcionMeriendaNocturna.trim() !== ''
      ) {
        this.nextId = await this.dietIntService.getNextAvailableID();
  
        // Asignar los valores del formulario al objeto newDietInt, incluyendo el ID autoincremental
        this.newDietInt = {
          id: this.nextId,
          almuerzo: this.almuerzo,
          cena: this.cena,
          desayuno: this.desayuno,
          nombreDesayuno: this.selectedDietInt.nombreDesayuno || '',
          descripcionDesayuno: this.selectedDietInt.descripcionDesayuno || '',
          nombreAlmuerzo: this.selectedDietInt.nombreAlmuerzo || '',
          descripcionAlmuerzo: this.selectedDietInt.descripcionAlmuerzo || '',
          nombreMeriendaTarde: this.selectedDietInt.nombreMeriendaTarde || '',
          descripcionMeriendatarde: this.selectedDietInt.descripcionMeriendatarde || '',
          nombreCena: this.selectedDietInt.nombreCena || '',
          descripcionCena: this.selectedDietInt.descripcionCena || '',
          nombreMeriendaNocturna: this.selectedDietInt.nombreMeriendaNocturna || '',
          descripcionMeriendaNocturna: this.selectedDietInt.descripcionMeriendaNocturna || ''
          // Agregar otros campos según sea necesario
        };
  
        console.log(this.newDietInt);
        // Crear la dieta con el ID asignado específicamente
        await this.dietIntService.createDietInt(this.newDietInt, this.nextId)
  
        // Actualizar la lista de dietas
        this.getDietInt();
  
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
  




  showcreateDietIntForm() {
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
