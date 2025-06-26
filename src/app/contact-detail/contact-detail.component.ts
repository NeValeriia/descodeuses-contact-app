import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ContactService } from '../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css',
})
export class ContactDetailComponent implements OnInit {
  formGroup!: FormGroup;
  contact!: any;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    //je recupere le Id de mon URL et je le converti au nombre
    //pour faire appel au fetch by ID du service CRUD
    const id = Number(this.route.snapshot.paramMap.get('id'));
if (id>0){  //appel au service pour recuperer le contact
  this.contactService.getContact(id).subscribe((data) => {
    this.contact = data;

    this.formGroup = this.fb.group({
      id: new FormControl<number | null>(this.contact.id, [
        Validators.required,
      ]),
      nom: new FormControl<string | null>(this.contact.nom, [
        Validators.required,
      ]),
      prenom: new FormControl<string | null>(this.contact.prenom, [
        Validators.required,
      ]),
      description: new FormControl<string | null>(this.contact.description),
      email: new FormControl<string | null>(this.contact.email, [
        Validators.required,
        Validators.email,
      ]),
      numeroTel: new FormControl<string | null>(this.contact.numeroTel, [
        Validators.required,
      ]),
      imageUrl: new FormControl<string | null>(this.contact.imageUrl),
    });
  });
} else {
  this.contact = {
    id: null,
    nom: '',
    prenom: '',
    description: '',
    email: '',
    numeroTel: '',
    imageUrl: '',
  };

  this.formGroup = this.fb.group({
    id: new FormControl<number | null>(this.contact.id, [
      Validators.required,
    ]),
    nom: new FormControl<string | null>(this.contact.nom, [
      Validators.required,
    ]),
    prenom: new FormControl<string | null>(this.contact.prenom, [
      Validators.required,
    ]),
    description: new FormControl<string | null>(this.contact.description),
    email: new FormControl<string | null>(this.contact.email, [
      Validators.required,
      Validators.email,
    ]),
    numeroTel: new FormControl<string | null>(this.contact.numeroTel, [
      Validators.required,
    ]),
    imageUrl: new FormControl<string | null>(this.contact.imageUrl),
  });
}
  
  }
  onSubmit() {
    //tester si formulaire valide
    if (this.formGroup.valid) {
      //faire appel au update du service CRUD
      this.contactService
        .updateContact(this.formGroup.value)
        .subscribe((data) => {
          //afficher message pop-up
          this.snackBar.open('Updated!', '', { duration: 1000 });
        });
    }
  }

  onCancel() {
    this.router.navigate(['/contact-list']);
  }
}
