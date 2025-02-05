import {Component, CUSTOM_ELEMENTS_SCHEMA, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {NavigationCancel, NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import {CommonModule, isPlatformBrowser, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {HeaderComponent} from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import {slideInAnimation} from '../animations';
import {LoaderComponent} from "./components/loader/loader.component";
import {ToggleService} from './common/header/toggle.service';
import {AuthService} from './services/auth.service';
import {filter} from 'rxjs/operators';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, CommonModule, RouterLink, HeaderComponent, SidebarComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [slideInAnimation],
  providers: [
    Location, {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit{
  title = 'Shop Phone';
  routerSubscription: any;
  location: any;
  constructor(
    private authService: AuthService,
    public toggleService: ToggleService,
    public router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.toggleService.isToggled$.subscribe(isToggled => {
      this.isToggled = isToggled;
    });
  }
  // Toggle Service
  isToggled = false;

  // Dark Mode
  toggleTheme() {
    this.toggleService.toggleTheme();
  }

  // Settings Button Toggle
  toggle() {
    this.toggleService.toggle();
  }
  prepareRoute(outlet: RouterOutlet): void {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
    );
  }

  // ngOnInit
  ngOnInit(){
    if (isPlatformBrowser(this.platformId)) {
      this.recallJsFuntions();
    }
  }

  // recallJsFuntions
  recallJsFuntions() {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel))
      .subscribe(event => {
        this.location = this.router.url;
        if (!(event instanceof NavigationEnd)) {
          return;
        }
        this.scrollToTop();
      });
  }
  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }
}
