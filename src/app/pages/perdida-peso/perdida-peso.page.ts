import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DietasPerdFirestoreService } from 'src/app/services/dietas-perd-firestore.service';

@Component({
  selector: 'app-perdida-peso',
  templateUrl: './perdida-peso.page.html',
  styleUrls: ['./perdida-peso.page.scss'],
})
export class PerdidaPesoPage implements OnInit {

  dietsPerd: any[] = [];
  selectedDietPerd: any = {};
  showDetail: boolean = false;
  showCreateForm: boolean = false;
  showCreateButton: boolean = true;
  almuerzo = 'almuerzo';
  cena = 'cena';
  desayuno = 'desayuno';
  nextId: string;

  newDietPerd: any = {
    [this.desayuno]: this.desayuno,
    [this.almuerzo]: this.almuerzo,
    [this.cena]: this.cena
  };

  constructor(
    private dietPerdService: DietasPerdFirestoreService,
    private alertController: AlertController
  ) { }


  ngOnInit() {
    this.getDietPerd()

  }



  async getDietPerd() {
    this.dietPerdService.getDietPerd().subscribe((dietsPerd: any[]) => {
      this.dietsPerd = dietsPerd;
      console.log(this.dietsPerd)
    });
  }

  selectDietPerd(dietCard: any) {
    this.selectedDietPerd = { ...dietCard };
    this.showDetail = true;
    this.showCreateForm = false;
    this.showCreateButton = false; // Ocultar el botón al seleccionar un dieta
  }

  async updateDietPerd() {
    if (this.selectDietPerd) {
      try {
        await this.dietPerdService.updateDietPerd(this.selectedDietPerd.id, this.selectedDietPerd);
        this.showDetail = false;
        this.getDietPerd();
        this.presentAlert('Éxito', 'dieta actualizada exitosamente');
      } catch (error) {
        console.error('Error al actualizar la dieta', error);
        this.presentAlert('Error', 'Hubo un problema al actualizar la dieta');
      }
    }
  }

  async deleteDietPerd(dietPerdId: string) {
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
              await this.dietPerdService.deleteDietPerd(dietPerdId);
              this.showDetail = false;
              this.getDietPerd();
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

  async createDietPerd() {
    try {
      if (
        this.selectedDietPerd.nombreCena &&
        this.selectedDietPerd.descripcionCena &&
        this.selectedDietPerd.nombreMeriendaNocturna &&
        this.selectedDietPerd.descripcionMeriendaNocturna &&
        this.selectedDietPerd.nombreCena.trim() !== '' &&
        this.selectedDietPerd.descripcionCena.trim() !== '' &&
        this.selectedDietPerd.nombreMeriendaNocturna.trim() !== '' &&
        this.selectedDietPerd.descripcionMeriendaNocturna.trim() !== ''
      ) {
        this.nextId = await this.dietPerdService.getNextAvailableID();
  
        // Asignar los valores del formulario al objeto newDietPerd, incluyendo el ID autoincremental
        this.newDietPerd = {
          id: this.nextId,
          almuerzo: this.almuerzo,
          cena: this.cena,
          desayuno: this.desayuno,
          nombreDesayuno: this.selectedDietPerd.nombreDesayuno || '',
          descripcionDesayuno: this.selectedDietPerd.descripcionDesayuno || '',
          nombreAlmuerzo: this.selectedDietPerd.nombreAlmuerzo || '',
          descripcionAlmuerzo: this.selectedDietPerd.descripcionAlmuerzo || '',
          nombreMeriendaTarde: this.selectedDietPerd.nombreMeriendaTarde || '',
          descripcionMeriendatarde: this.selectedDietPerd.descripcionMeriendatarde || '',
          nombreCena: this.selectedDietPerd.nombreCena || '',
          descripcionCena: this.selectedDietPerd.descripcionCena || '',
          nombreMeriendaNocturna: this.selectedDietPerd.nombreMeriendaNocturna || '',
          descripcionMeriendaNocturna: this.selectedDietPerd.descripcionMeriendaNocturna || ''
          // Agregar otros campos según sea necesario
        };
  
        console.log(this.newDietPerd);
        // Crear la dieta con el ID asignado específicamente
        await this.dietPerdService.createDietPerd(this.newDietPerd, this.nextId)
  
        // Actualizar la lista de dietas
        this.getDietPerd();
  
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
  




  showcreateDietPerdForm() {
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
