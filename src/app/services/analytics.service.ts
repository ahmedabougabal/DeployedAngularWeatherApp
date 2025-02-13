// thanks to vercel analytics documentation
import { Injectable, inject } from '@angular/core';
import { inject as injectAnalytics } from '@vercel/analytics';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private router = inject(Router);

  constructor() {
    // Initialize Vercel Analytics
    injectAnalytics();

    // Track page views
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Track page view
      this.trackPageView(event.urlAfterRedirects);
    });
  }

  private trackPageView(url: string) {
    if (typeof window !== 'undefined') {
      // here i can inject some custom event tracking to track some certain searches based on user weather searches
      console.log(`Page view tracked: ${url}`);
    }
  }

  public trackEvent(eventName: string, properties?: Record<string, any>) {
    if (typeof window !== 'undefined') {
      // Track custom events
      console.log(`Event tracked: ${eventName}`, properties);
    }
  }
}
