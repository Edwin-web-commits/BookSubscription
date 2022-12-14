import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICustomerPortal, IMemberShipPlan, ISession } from './IMembership';

declare const Stripe;

@Injectable({
  providedIn: 'root',
})
export class MembershipService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getMembership(): Observable<IMemberShipPlan> {
    return of({
      id: 'prod_MyBZXVfDHqB76n',
      priceId: 'price_1MEFCVKb1Vc3LvtZq7XyKCy0',
      name: 'Book Subscription Plan',
      price: 'R50.00',
      features: [
        'Up to 5 users',
        'Monthly updates',
        'Free cancelation',
      ],
    },{
      id: 'prod_Myup1RUZeGv5Vu',
      priceId: 'price_1MEwzXKb1Vc3LvtZqO5PC4IJ',
      name: "You Don't Know JavaScript",
      price: 'R45.00',
      features: [
        'Up to 5 users',
        'Monthly updates',
        'Free cancelation',
      ],
    });
  }

  requestMemberSession(priceId: string): void {
    this.http
      .post<ISession>(this.baseUrl + 'api/payments/create-checkout-session', {
        priceId: priceId,
        successUrl: environment.successUrl,
        failureUrl: environment.cancelUrl,
      })
      .subscribe((session) => {
        this.redirectToCheckout(session);
      });
  }

  redirectToCheckout(session: ISession) {
    const stripe = Stripe(session.publicKey);

    stripe.redirectToCheckout({
      sessionId: session.sessionId,
    });
  }
  redirectToCustomerPortal() {
    this.http
      .post<ICustomerPortal>(
        this.baseUrl + 'api/payments/customer-portal',
        { returnUrl: environment.homeUrl },
        this.getHttpOptions()
      )
      .subscribe((data) => {
        window.location.href = data.url;
      });
  }

  getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return httpOptions;
  }
}
