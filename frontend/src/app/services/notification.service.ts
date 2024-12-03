import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<{
    message: string,
    type: 'success' | 'error' | 'warning'
  }>();

  notification$ = this.notificationSubject.asObservable();

  success(message: string) {
    this.notificationSubject.next({ message, type: 'success' });
  }

  error(message: string) {
    this.notificationSubject.next({ message, type: 'error' });
  }

  warning(message: string) {
    this.notificationSubject.next({ message, type: 'warning' });
  }
}
