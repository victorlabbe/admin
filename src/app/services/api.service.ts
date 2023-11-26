import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiPostUser = 'https://api.seyka.online/user/post';
  private apiGetUser = 'https://api.seyka.online/user';
  private apiDietRes = 'https://api.seyka.online/dietRes';
  private apiDietCard = 'https://api.seyka.online/dietCard';
  private apiDietHigh = 'https://api.seyka.online/dietHigh';
  private apiDietWeight = 'https://api.seyka.online/dietWeight';
  private apiGetGymAss = 'https://api.seyka.online/gym';
  private apiDataAv = 'https://api.seyka.online/dataAv';
  private apiReserv = 'https://api.seyka.online/res';

  constructor(private http: HttpClient) {}

  // Método para obtener encabezados HTTP con el token JWT
  private getHeaders(): HttpHeaders {
    // Obtiene el token JWT almacenado en localStorage
    const userToken = localStorage.getItem('userToken');

    // Crea un objeto HttpHeaders que incluye el token JWT en el encabezado de autorización
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}` // Agrega el token como encabezado de autorización con el prefijo 'Bearer'
    });

    return headers;
  }
  
  getGym(){
    // Obtiene los encabezados que incluyen el token JWT
    const headers = this.getHeaders();
    console.log(headers)
    // Realiza una solicitud GET a la API con los encabezados
    return this.http.get(`${this.apiGetGymAss}/get`, { headers });
  }
  getDietRes(){
    // Obtiene los encabezados que incluyen el token JWT
    const headers = this.getHeaders();
    console.log(headers)
    // Realiza una solicitud GET a la API con los encabezados
    //return this.http.get(this.apiGetUser);
    return this.http.get(`${this.apiDietRes}/get`, { headers });
  }
  getDietCard(){
    // Obtiene los encabezados que incluyen el token JWT
    const headers = this.getHeaders();
    console.log(headers)
    // Realiza una solicitud GET a la API con los encabezados
    //return this.http.get(this.apiGetUser);
    return this.http.get(`${this.apiDietCard}/get`, { headers });
  }
  getDietHigh(){
    // Obtiene los encabezados que incluyen el token JWT
    const headers = this.getHeaders();
    console.log(headers)
    // Realiza una solicitud GET a la API con los encabezados
    //return this.http.get(this.apiGetUser);
    return this.http.get(`${this.apiDietHigh}/get`, { headers });
  }
  getDietWeight(){
    // Obtiene los encabezados que incluyen el token JWT
    const headers = this.getHeaders();
    console.log(headers)
    // Realiza una solicitud GET a la API con los encabezados
    //return this.http.get(this.apiGetUser);
    return this.http.get(`${this.apiDietWeight}/get`, { headers });
  }

  getUser() {
    // Obtiene los encabezados que incluyen el token JWT
    const headers = this.getHeaders();
    console.log(headers)
    // Realiza una solicitud GET a la API con los encabezados
    //return this.http.get(this.apiGetUser);
    return this.http.get(`${this.apiGetUser}/get`, { headers });
    
  }

  // Realiza una solicitud POST con el token JWT incluido
  postUser(form: any) {
    // Obtiene los encabezados que incluyen el token JWT
    const headers = this.getHeaders();

    // Realiza una solicitud POST a la API con los encabezados
    return this.http.post(this.apiPostUser, form, { headers });
  }

  // Actualizar un usuario existente
  updateUser(userId: string, userData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.apiGetUser}/put/${userId}`, userData, { headers });
  }

  // Eliminar un usuario
  deleteUser(userId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiGetUser}/delete/${userId}`, { headers });
  }

  // Buscar un usuario por ID
  getUserById(userId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiGetUser}/get/${userId}`, { headers });
  }
  updateUserField(userId: string, fieldName: string, newValue: any): Observable<any> {
    const headers = this.getHeaders();
    const data = {
      field_name: fieldName,
      new_value: newValue
    };
    

    return this.http.put(`${this.apiGetUser}/updateField/${userId}`, data, { headers });
  }
  getData() {
    // Obtiene los encabezados que incluyen el token JWT
    const headers = this.getHeaders();
    console.log(headers)
    // Realiza una solicitud GET a la API con los encabezados
    //return this.http.get(this.apiGetUser);
    return this.http.get(`${this.apiDataAv}/get`, { headers });
    
  }

  postRes(reservationData: any) {
    // Obtiene los encabezados que incluyen el token JWT
    const headers = this.getHeaders();
  
    // Realiza una solicitud POST a la API con los encabezados
    return this.http.post(`${this.apiReserv}/post`, reservationData, { headers });
  }
  getRes(){
    // Obtiene los encabezados que incluyen el token JWT
    const headers = this.getHeaders();
    console.log(headers)
    // Realiza una solicitud GET a la API con los encabezados
    return this.http.get(`${this.apiReserv}/get`, { headers });
  }

  
}