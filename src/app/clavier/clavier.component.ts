import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-clavier',
  imports: [MatButtonModule,MatCardModule],
  templateUrl: './clavier.component.html',
  styleUrl: './clavier.component.css'
})
export class ClavierComponent {

}
