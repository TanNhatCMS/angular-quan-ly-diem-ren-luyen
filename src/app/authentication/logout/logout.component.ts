import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {MatAnchor, MatButtonModule} from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LogoutConfirmationDialogComponent } from './logout-confirmation-dialog.component';
import {isPlatformBrowser, Location } from '@angular/common';
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [MatDialogModule, MatAnchor],
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private location: Location,
  @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.openLogoutConfirmation();
  }

  ngOnInit(): void {

  }

  openLogoutConfirmation(): void {
    const dialogRef = this.dialog.open(LogoutConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User confirmed logout');
        // Perform the logout action here
        this.authService.logout();
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000); // Redirect after 3 seconds
      } else {
        if (isPlatformBrowser(this.platformId)) {
          this.location.back();
        }
      }
    });
  }
}
