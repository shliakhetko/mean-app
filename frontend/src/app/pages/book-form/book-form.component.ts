import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { NotificationService } from '../../services/notification.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-form.component.html',
})
export class BookFormComponent implements OnInit {
  bookForm!: FormGroup;
  isEditMode = false;
  bookId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initForm();
    this.checkEditMode();
  }

  initForm() {
    this.bookForm = this.fb.group({
      name: ['', [Validators.required]],
      isbn: ['', [Validators.required]],
      author: ['', [Validators.required]],
      pages: [1, [Validators.required, Validators.min(1)]]
    });
  }

  checkEditMode() {
    this.bookId = this.route.snapshot.paramMap.get('id');
    if (this.bookId) {
      this.isEditMode = true;
      this.bookService.getBookById(this.bookId).subscribe({
        next: (book) => {
          this.bookForm.patchValue(book);
        },
        error: () => {
          this.notificationService.error('Failed to load book details');
        }
      });
    }
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const bookData: Book = this.bookForm.value;

      if (this.isEditMode) {
        this.bookService.updateBook(this.bookId!, bookData).subscribe({
          next: () => {
            this.notificationService.success('Book updated successfully');
            this.router.navigate(['/books']);
          },
          error: () => {
            this.notificationService.error('Failed to update book');
          }
        });
      } else {
        this.bookService.createBook(bookData).subscribe({
          next: () => {
            this.notificationService.success('Book added successfully');
            this.router.navigate(['/books']);
          },
          error: () => {
            this.notificationService.error('Failed to add book');
          }
        });
      }
    }
  }
}
