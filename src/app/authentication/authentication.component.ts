import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {

}
