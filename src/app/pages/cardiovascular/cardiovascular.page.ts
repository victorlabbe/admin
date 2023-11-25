import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DietasCardFirestoreService } from 'src/app/services/dietas-card-firestore.service';

@Component({
  selector: 'app-cardiovascular',
  templateUrl: './cardiovascular.page.html',
  styleUrls: ['./cardiovascular.page.scss'],
})
export class CardiovascularPage implements OnInit {

  dietsCard: any[] = [];
  selectedDietCard: any = {};
  showDetail: boolean = false;
  showCreateForm: boolean = false;
  showCreateButton: boolean = true;
  almuerzo = 'almuerzo';
  cena = 'cena';
  desayuno = 'desayuno';
  nextId: string;

  newDietCard: any = {
    [this.desayuno]: this.desayuno,
    [this.almuerzo]: this.almuerzo,
    [this.cena]: this.cena
  };

  constructor(
    private dietCardService: DietasCardFirestoreService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.getDietCard()

  }



  async getDietCard() {
    this.dietCardService.getDietCard().subscribe((dietsCard: any[]) => {
      this.dietsCard = dietsCard;
      console.log(this.dietsCard)
    });
  }

  selectDietCard(dietCard: any) {
    this.selectedDietCard = { ...dietCard };
    this.showDetail = true;
    this.showCreateForm = false;
    this.showCreateButton = false; // Ocultar el botón al seleccionar un dieta
  }

  async updateDietCard() {
    if (this.selectDietCard) {
      try {
        await this.dietCardService.updateDietCard(this.selectedDietCard.id, this.selectedDietCard);
        this.showDetail = false;
        this.getDietCard();
        this.presentAlert('Éxito', 'dieta actualizada exitosamente');
      } catch (error) {
        console.error('Error al actualizar la dieta', error);
        this.presentAlert('Error', 'Hubo un problema al actualizar la dieta');
      }
    }
  }

  async deleteDietCard(dietCardId: string) {
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
              await this.dietCardService.deleteDietCard(dietCardId);
              this.showDetail = false;
              this.getDietCard();
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

  async createDietCard() {
    try {
      if (
        this.selectedDietCard.nombreCena &&
        this.selectedDietCard.descripcionCena &&
        this.selectedDietCard.nombreMeriendaNocturna &&
        this.selectedDietCard.descripcionMeriendaNocturna &&
        this.selectedDietCard.nombreCena.trim() !== '' &&
        this.selectedDietCard.descripcionCena.trim() !== '' &&
        this.selectedDietCard.nombreMeriendaNocturna.trim() !== '' &&
        this.selectedDietCard.descripcionMeriendaNocturna.trim() !== ''
      ) {
        this.nextId = await this.dietCardService.getNextAvailableID();
  
        // Asignar los valores del formulario al objeto newDietCard, incluyendo el ID autoincremental
        this.newDietCard = {
          id: this.nextId,
          almuerzo: this.almuerzo,
          cena: this.cena,
          desayuno: this.desayuno,
          nombreDesayuno: this.selectedDietCard.nombreDesayuno || '',
          descripcionDesayuno: this.selectedDietCard.descripcionDesayuno || '',
          nombreAlmuerzo: this.selectedDietCard.nombreAlmuerzo || '',
          descripcionAlmuerzo: this.selectedDietCard.descripcionAlmuerzo || '',
          nombreMeriendaTarde: this.selectedDietCard.nombreMeriendaTarde || '',
          descripcionMeriendatarde: this.selectedDietCard.descripcionMeriendatarde || '',
          nombreCena: this.selectedDietCard.nombreCena || '',
          descripcionCena: this.selectedDietCard.descripcionCena || '',
          nombreMeriendaNocturna: this.selectedDietCard.nombreMeriendaNocturna || '',
          descripcionMeriendaNocturna: this.selectedDietCard.descripcionMeriendaNocturna || ''
          // Agregar otros campos según sea necesario
        };
  
        console.log(this.newDietCard);
        // Crear la dieta con el ID asignado específicamente
        await this.dietCardService.createDietCard(this.newDietCard, this.nextId)
  
        // Actualizar la lista de dietas
        this.getDietCard();
  
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
  




  showCreateDietCardForm() {
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

