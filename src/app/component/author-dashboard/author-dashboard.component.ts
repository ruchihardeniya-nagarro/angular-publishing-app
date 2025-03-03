import { Component } from '@angular/core';
import { AuthorService } from '../../service/author.service';

@Component({
  selector: 'app-author-dashboard',
  standalone: false,
  templateUrl: './author-dashboard.component.html',
  styleUrl: './author-dashboard.component.scss'
})
export class AuthorDashboardComponent {
authors: any[] = [];
  searchQuery: string = '';

  constructor(private authorService: AuthorService) { }

  ngOnInit(): void {
    this.getAuthors();
  }

  getAuthors(): void {
    this.authorService.getAuthors().subscribe(authors => {
      this.authors = authors;
    });
  }

  searchAuthors(): void {
    if (this.searchQuery) {
      this.authorService.searchAuthorsByName(this.searchQuery).subscribe(authors => {
        this.authors = authors;
      });
    } else {
      this.getAuthors(); // If no search query, show all authors
    }
  }
}
