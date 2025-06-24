import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contacts } from '../models/contact.model';
@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiURL = 'api/contacts';
  constructor(private http: HttpClient) {}

  getContacts() {
    return this.http.get<Contacts[]>(this.apiURL);
  }

  getContact(id: number) {
    return this.http.get<Contacts>(this.apiURL + '/' + id);
  }

  addContact(contact: Contacts) {
    return this.http.post<Contacts>(this.apiURL, contact);
  }

  updateContact(contact: Contacts) {
    return this.http.put<Contacts[]>(this.apiURL + '/' + contact.id, contact);
  }

  deleteContact(id: number) {
    return this.http.delete(this.apiURL + '/' + id);
  }
}
