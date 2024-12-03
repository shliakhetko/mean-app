import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { NotificationService } from '../../services/notification.service';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {BookCardComponent} from '../../components/book-card/book-card.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule, BookCardComponent],
  templateUrl: './book-list.component.html',
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(
    private bookService: BookService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
      },
      error: () => {
        this.notificationService.error('Failed to load books');
      }
    });
  }

  onDeleteBook(bookId: string) {
    this.books = this.books.filter(book => book._id !== bookId);
  }
}
