import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cultivo } from '../models/cultivo';
import { Observable } from 'rxjs';
import { Empaque } from '../models/empaque';
import { RespondeAWS } from '../models/responde-aws';
import { Proceso } from '../models/proceso';

@Injectable({
  providedIn: 'root'
})
export class BridgeService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ahhaskkahshjajhajhjas`
  });

  private apiUrl = environment.aws_host;

  constructor(
    private http: HttpClient
  ) { }

  guardarCultivo(cultivo: Cultivo): Observable<Cultivo> {
    return this.http.post<Cultivo>(this.apiUrl + '/save-crop-coffee', cultivo, { headers: this.headers });
  }

  guardarProceso(proceso: Proceso): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/save-proccess-coffee', proceso, { headers: this.headers });
  }

  guardarEmpaque(empaque: Empaque): Observable<Empaque> {
    return this.http.post<Empaque>(this.apiUrl + '/save-packing-coffee', empaque, { headers: this.headers });
  }

  guardarHistorial(historial: any): Observable<any> {
    return this.http.post(this.apiUrl + '/historial', historial, { headers: this.headers });
  }

  getEmpaque(): Observable<any> {
    return this.http.get(this.apiUrl + '/empaque', { headers: this.headers });
  }

  getHistorial(idUsuario  : string): Observable<any> {
    return this.http.get(this.apiUrl + '/get-historical-data?idUsuario=' + idUsuario, { headers: this.headers });
  }

  getCultivo(idUsuario: string): Observable<RespondeAWS> {
    const playload = {
      idUsuario: idUsuario
    };
    return this.http.get<RespondeAWS>(this.apiUrl + '/get-crop-coffee?idUsuario=' + idUsuario, { headers: this.headers });
  }
}
  