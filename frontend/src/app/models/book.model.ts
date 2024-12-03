export interface Book {
  _id?: string;
  name: string;
  isbn: string;
  author: string;
  pages: number;
  createdAt?: Date;
  updatedAt?: Date;
}
