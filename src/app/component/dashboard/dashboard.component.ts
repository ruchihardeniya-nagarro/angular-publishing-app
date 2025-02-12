import { Component, OnInit } from '@angular/core';
import { Auth, getRedirectResult } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ArticleService } from '../../service/article.service';
import { ArticleData } from '../../interface/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor(
    private articleService: ArticleService,
    private router:Router
  ) { }
  ngOnInit(): void {
    this.loadTotaldata();
    this.loadArticles();
    this.loadFeaturedArticles();
  }

  articles: any[] = [];
  featuredArticles: any[] = [];
  totalData: any[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  totalPages: number = 0;
  pageSize: number = 2;
  sortBy: string = 'publishDate';
  sortOrder: string = 'desc';
  searchKeyword: string = ''; // Store the search keyword
  authorSearch: string = ''; // Store the author name for search


  loadArticles() {
    this.articleService.getArticles(this.currentPage, this.pageSize, this.sortBy, this.sortOrder,
      this.searchKeyword,
      this.authorSearch
    ).subscribe(async (data: any) => {
      this.articles = data?.articles?.data;
      console.log(" this.totalPages", data)
      this.totalPages = Math.ceil(this.totalData.length / this.pageSize);;
    });
  }

  loadFeaturedArticles(): void {
    this.articleService.getFeaturedArticles().subscribe((data: any[]) => {
      this.featuredArticles = data;
    });
  }

  loadTotaldata() {
    this.articleService.getAllArticles().subscribe((data: any[]) => {
      this.totalData = data;
      console.log("11loadTotaldata", this.totalData)
    });
  }

  searchArticlesByAuthor(): void {
    if (this.authorSearch) {
      this.articleService.searchArticlesByAuthor(this.authorSearch).subscribe(data => {
        this.articles = data;
        this.featuredArticles = []
        this.totalPages = Math.ceil(this.articles.length / this.pageSize);;
      });
    }
  }

  clearSearch() { 
    this.loadArticles();
    
  }

  changePage(page: number): void {
    this.currentPage = page;
    console.log("page", page)
    this.loadArticles();
  }

  changeSort(order: string): void {
    this.sortOrder = order;
    this.loadArticles();
  }

  viewDetailClicked(id: number | string) {
    this.router.navigate(['/article-detail', id]);
  }

  onModelChange(value: string): void {
    console.log("value",value)
    // Check if the value is cleared (empty string, null, or undefined)
    if (value === '' || value === null || value === undefined) {
          this.loadArticles();

    }
  }
}
