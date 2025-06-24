import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Contacts } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements InMemoryDbService {
  constructor() {}

  createDb() {
    const listContact: Contacts[] = [
      {
        id: 1,
        nom: 'Ccc',
        prenom: 'Nadya',
        description: '',
        email: 'nadya@gmail.com',
        numeroTel: '',
        imageUrl: '/assets/avatar.jpg',
      },
      {
        id: 2,
        nom: 'Aaa',
        prenom: 'Nana',
        description: '',
        email: 'nana@gmail.com',
        numeroTel: '',
        imageUrl: '/assets/7294793.jpg',
      },
      {
        id: 4,

        nom: 'Bbb',
        prenom: 'Nina',
        email: 'nina@gmail.com',
        description: '',
        numeroTel: '',
        imageUrl: '/assets/7294811.jpg',
      },
      {
        id: 5,
        nom: 'Ppp',
        prenom: 'Lila',
        email: 'lila@gmail.com',
        description: '',
        numeroTel: '',
        imageUrl: '/assets/7309678.jpg',
      },
    ];

    return {
      contacts: listContact,
    };
  }
}
