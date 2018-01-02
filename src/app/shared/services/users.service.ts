import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { hostname } from '../config';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {

  }
  login(formData) {
    return this.http.post(`${hostname}/login`, formData);
  }
  getUserByEmail(email: string) {
    return this.http.get(`${hostname}/users?email=${email}`);

  }

  createNewUser(user: User) {
    return this.http.post(`${hostname}/users`, user, {responseType: 'text'});
  }
}
