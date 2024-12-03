import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Subscription } from 'rxjs';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="message" class="fixed top-4 right-4 z-50">
      <div
        [ngClass]="{
          'bg-green-500': type === 'success',
          'bg-red-500': type === 'error',
          'bg-yellow-500': type === 'warning'
        }"
        class="text-white px-4 py-2 rounded shadow-lg"
      >
        {{ message }}
      </div>
    </div>
  `
})
export class NotificationComponent implements OnInit, OnDestroy {
  message: string = '';
  type: 'success' | 'error' | 'warning' = 'success';
  private subscription: Subscription | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.subscription = this.notificationService.notification$.subscribe(
      ({ message, type }) => {
        this.message = message;
        this.type = type;

        // Clear message after 3 seconds
        setTimeout(() => {
          this.message = '';
        }, 3000);
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
