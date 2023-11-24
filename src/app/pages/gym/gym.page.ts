import { Component, OnInit } from '@angular/core';
import { GymFirestoreService } from 'src/app/services/gym-firestore.service';

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

  constructor(private gymService: GymFirestoreService) {}

  ngOnInit() {
    this.getGyms();
  }

  getGyms() {
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

  updateGym() {
    if (this.selectedGym) {
      this.gymService.updateGym(this.selectedGym.id, this.selectedGym)
        .then(() => {
          console.log('Gimnasio actualizado exitosamente');
          this.showDetail = false;
          this.getGyms();
        })
        .catch(error => {
          console.error('Error al actualizar el gimnasio', error);
        });
    }
  }

  deleteGym(gymId: string) {
    if (confirm('¿Estás seguro de eliminar este gimnasio?')) {
      this.gymService.deleteGym(gymId)
        .then(() => {
          console.log('Gimnasio eliminado exitosamente');
          this.showDetail = false;
          this.getGyms();
        })
        .catch(error => {
          console.error('Error al eliminar el gimnasio', error);
        });
    }
  }

  createGym() {
    if (this.newGym.nombre && this.newGym.direccion && this.newGym.horario && this.newGym.latitud && this.newGym.longitud) {
      this.gymService.createGym(this.newGym)
        .then(() => {
          console.log('Gimnasio creado exitosamente');
          this.newGym = {};
          this.getGyms();
          this.showCreateButton = true; // Mostrar el botón después de crear el gimnasio
        })
        .catch(error => {
          console.error('Error al crear el gimnasio', error);
        });
    } else {
      console.error('Todos los campos son requeridos');
    }
  }

  showCreateGymForm() {
    this.showCreateForm = true;
    this.showDetail = false;
    this.showCreateButton = false; // Ocultar el botón al mostrar el formulario de creación
  }
}
