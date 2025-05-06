import { environment } from './../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{ name: string, token: string }>(`${this.baseUrl}/users/session`, { email, password });
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.baseUrl}/users`, { name, email, password });
  }

  logout() {
    localStorage.removeItem('token');
  }
}
