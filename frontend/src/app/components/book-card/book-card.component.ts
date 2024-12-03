import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-card.component.html'
})
export class BookCardComponent {
  @Input() book!: Book;
  @Output() deleteBook = new EventEmitter<string>();

  constructor(
    private bookService: BookService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  editBook() {
    this.router.navigate(['/books/edit', this.book._id]);
  }

  onDeleteBook() {
    if (confirm(`Are you sure you want to delete ${this.book.name}?`)) {
      this.bookService.deleteBook(this.book._id!).subscribe({
        next: () => {
          this.notificationService.success('Book deleted successfully');
          this.deleteBook.emit(this.book._id);
        },
        error: () => {
          this.notificationService.error('Failed to delete book');
        }
      });
    }
  }
}
