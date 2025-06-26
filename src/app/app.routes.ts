import { Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ClavierComponent } from './clavier/clavier.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: 'Home',
    data: { isMenu: true },
  },

  {
    path: 'contact-list',
    component: ContactListComponent,
    title: 'Contact- list',
    data: { isMenu: true },
  },
  {
    path: 'contact-detail/:id',
    component: ContactDetailComponent,
    title: 'Contact detail',
    
  },
  {
    path: 'contact-detail', //nouveau ContactDetailComponent sans parametre id
    component: ContactDetailComponent,
    title: 'Contact detail',
    
  },
  {
    path: 'clavier', //nouveau ContactDetailComponent sans parametre id
    component: ClavierComponent,
    title: 'clavier',
  }
];
// This file defines the routes for the application.
