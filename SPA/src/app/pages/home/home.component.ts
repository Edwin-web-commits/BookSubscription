import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { MembershipService } from 'src/app/modules/memberships/membership.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private membershipService: MembershipService
  ) {}

  ngOnInit(): void {}

  isLoggedIn(): boolean {
    console.log(this.authService.currentUser.username != null ? true : false)
    return this.authService.currentUser.username != null ? true : false;
  }

  goToBillingPortal() {
    this.membershipService.redirectToCustomerPortal();
  }

  isSubscriber(): boolean {
    console.log("isSubscriber"+ this.authService.currentUser.isSubscriber)
    return this.authService.currentUser.isSubscriber;
  }
}
