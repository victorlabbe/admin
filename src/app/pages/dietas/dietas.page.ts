import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { KeyValue } from '@angular/common';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-dietas',
  templateUrl: './dietas.page.html',
  styleUrls: ['./dietas.page.scss'],
})
export class DietasPage implements OnInit {
  opcionesDietas: string[] = ["Entrenamiento de resistencia", "Entrenamiento cardiovascular", "Entrenamiento de alta intensidad (HIIT, CrossFit)","Pérdida de peso"];
  seleccionOpcion: string = '';
  dietasRes: any = { };
  dietaSeleccionada: KeyValue<string, any>; 
  data: any;
  dataDietRes: any;
  dataDietCard: any;
  dataDietHigh: any;
  dataDietWeight: any;
  combinedData: any = { "Entrenamiento de resistencia": {}, "Entrenamiento cardiovascular": {}, "Entrenamiento de alta intensidad (HIIT, CrossFit)": {}, "Pérdida de peso": {} };


  constructor(private http: HttpClient) { }
  firebaseServ = inject(FirebaseService);
  router = inject(Router);
  api = inject(ApiService);



  ngOnInit() {
    // Espera a que se carguen los datos de todas las colecciones
    forkJoin([
      this.api.getDietCard(),
      this.api.getDietHigh(),
      this.api.getDietRes(),
      this.api.getDietWeight()
    ]).subscribe(([dietCard, dietHigh, dietRes, dietWeight]) => {
      this.dataDietCard = dietCard;
      this.dataDietHigh = dietHigh;
      this.dataDietRes = dietRes;
      this.dataDietWeight = dietWeight;
  
      // Combina los datos en combinedData
      this.dietasRes["Entrenamiento de resistencia"] = this.dataDietRes.diet_resistencias;
      this.dietasRes["Entrenamiento cardiovascular"] = this.dataDietCard.diet_resistencias;
      this.dietasRes["Entrenamiento de alta intensidad (HIIT, CrossFit)"] = this.dataDietHigh.diet_resistencias;
      this.dietasRes["Pérdida de peso"] = this.dataDietWeight.diet_resistencias;
      console.log(this.dietasRes)
    });
}

  seleccionarDieta() {
    this.dietaSeleccionada = this.dietasRes[this.seleccionOpcion];
    console.log(this.dietaSeleccionada);
  }
 





  userRole: string = 'usuario'; // Simula el rol del usuario (puedes obtenerlo de tu sistema de autenticación)
  

  // Función para verificar si el usuario tiene el rol "admin"
  isUserAdmin(): boolean {
    return this.userRole === 'admin';
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

}
