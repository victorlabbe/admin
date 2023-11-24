import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
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


  constructor(private http: HttpClient,
              private firebaseServ : FirebaseService,
              private router : Router) { }





  ngOnInit() {
  }
 
  signOut() {
    // Eliminar el token de autenticación de localStorage
    localStorage.removeItem('userToken');
    
    // Llamar al método de signOut de Firebase si es necesario
    this.firebaseServ.signOut();
    
    // Navegar a la página de inicio
    this.router.navigate(['/']);
  }



}
