import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.API_URL;
  constructor(private http: HttpClient) {}

  getAll(endpointUrl: string) {
    return this.http.get<any>(`${this.baseUrl}/${endpointUrl}`);
  }
  get(endpointUrl:string, id:string){
    return this.http.get<any>(`${this.baseUrl}/${endpointUrl}/${id}`)
  }

  post(endpointUrl: string, newObject: any) {
    return this.http.post(`${this.baseUrl}/${endpointUrl}`, newObject);
  }

  put(endpointUrl: string, updatedObject: any) {
    return this.http.put(`${this.baseUrl}/${endpointUrl}`, updatedObject);
  }

  delete(endpointUrl: string, id: number) {
    return this.http.delete(`${this.baseUrl}/${endpointUrl}/${id}`);
  }

  deleteAll(endpointUrl: string) {
    return this.http.delete(`${this.baseUrl}/${endpointUrl}`);
  }
}