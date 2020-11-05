import { Injectable } from '@angular/core';
//import { Frase } from "../modelos/frase";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token: any= "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYWRwYmFjay5wcnVlYmFzZ3QuY29tXC9hcGlcL2F1dGhlbnRpY2F0ZSIsImlhdCI6MTYwNDYwMzE2OCwiZXhwIjoxNjA0NjEzOTY4LCJuYmYiOjE2MDQ2MDMxNjgsImp0aSI6IjBnaFJvWFFvdHNXTm5iMmIiLCJzdWIiOjM1LCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.vHGNcZCzeVX_Pbqb5QWhMY9BsJac5yQFT6rv1niV-jQ";
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
      
    }),
  };
  constructor(private http: HttpClient) { }

  public getData(): Observable<any> {
    return this.http.get("https://adpback.pruebasgt.com/api/contactos/action/listar",this.httpOptions);
  }

  public crearContacto(data) {
    return this.http.post(
      `https://adpback.pruebasgt.com/api/contactos/action/crear`,
      data,
      this.httpOptions
    );
  }

  public editarContacto(data) {
    return this.http.post(
      `https://adpback.pruebasgt.com/api/contactos/action/editar`,
      data,
      this.httpOptions
    );
  }

  convertirObjToFormData(obj) {
    const formData = new FormData();

    // prevent to send empty fields
    Object.keys(obj).forEach(key => {
      if (obj[key] !== '') {
        formData.append(key, obj[key]);
      }
    });

    return formData;
  }


}
