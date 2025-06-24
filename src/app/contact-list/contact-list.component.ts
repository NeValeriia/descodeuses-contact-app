import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ContactService } from '../services/contact.service';
import { Contacts } from '../models/contact.model';

@Component({
  selector: 'app-contact-list',
  imports: [
    MatListModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule, //ngModel
    MatIconModule,
    MatMenuModule, //pour le menu
    CommonModule,
    MatDividerModule,
    MatSnackBarModule,
    MatButtonModule,
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactListComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private service: ContactService
  ) {}

  listContact: Contacts[] = [];

  countContacts = 0;

  //Creer variable 'listeContactFiltre' intialisé à vide
  textRecherche: string = '';
  listeContactFiltre: any[] = [];
  //any : type dynamique
  //dynamique: n'est pas statique mais multiple
  //Afficher le nombre de contactes au bas de la page
  //Faire boucle sur la liste initiale 'listContact'
  //Remplir  'listeContactFiltre' SEULEMENT SI Prenom ou Nom commence par le texte saisi
  //Relier la liste HTML à cette nouvelle variable 'listeContactFiltre

  ngOnInit(): void {
    this.service.getContacts().subscribe((data) => {
      this.listContact = data;
      this.onSearch();
      this.countContacts = this.listContact.length;
    });

    //this.onSearch();
    //Compter le nombre des elements
    //methode 1: .length;
    //this.countContacts = this.listContact.length;
    //methode 2: boucle for
    for (let index = 0; index < this.listContact.length; index++) {
      this.countContacts = this.countContacts + 1;
    }

    // Sort the contacts alphabetically by 'nom'
    this.listContact = this.listContact.sort((contactA, contactB) => {
      // On utilise localeCompare pour un tri alphabétique correct
      return (contactA.nom ? contactA.nom : '').localeCompare(
        contactB.nom ? contactB.nom : ''
      );
    });

    this.onSearch();
    //Compter le nombre des elements
    //methode 1: .length;
    this.countContacts = this.listContact.length;
    //methode 2: boucle for
    //for (let index = 0; index < this.listContact.length; index++) {
    //   this.countContacts = this.countContacts + 1;
  }

  onSearch() {
    //Methode 1: par filter;
    /*this.listeContactFiltre = this.listContact.filter(
      (contact) =>
        contact.nom
          .toLowerCase()
          .startsWith(this.textRecherche.toLowerCase()) ||
        contact.prenom
          .toLowerCase()
          .startsWith(this.textRecherche.toLowerCase())
    );
  }*/
    //Methode 1: avec la boucle for
    this.listeContactFiltre = [];
    for (let i = 0; i < this.listContact.length; i++) {
      const contact = this.listContact[i];
      const recherche = this.textRecherche.toLowerCase().trim(); // mettre au lieu de texte saisie entre les parentheses;
      if (
        contact.nom?.toLowerCase().startsWith(recherche) ||
        '' ||
        contact.prenom?.toLowerCase().startsWith(recherche) ||
        ''
      ) {
        this.listeContactFiltre.push(contact);
      }
    }
  }

  openConfirmDialog(id: number): void {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      //console.log(`Le dialogue s'est fermé. Résultat : ${result}`);
      if (result === true) {
        this.deleteContact(id);
      }
    });
  }

  deleteContact(id: number) {
    console.log(id);
    const index = this.listContact.findIndex((element) => element.id == id);

    this.listContact.splice(index, 1);
    this.countContacts = this.listContact.length;

    this.onSearch();
    this.snackBar.open('Contact deleted!', '', { duration: 1000 });
  }

  envoyerEmail(email: string): void {
    // Crée le lien mailto et déclenche la navigation
    window.location.href = 'mailto:' + email;
  }
}
