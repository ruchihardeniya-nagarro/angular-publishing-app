import { HttpClient, HttpParams, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { ArticleData } from '../interface/user.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:3000/articles';

  constructor(private http: HttpClient) { }

  // getArticles(page: number = 1, limit: number = 2, sort: string = 'publishDate', order: string = 'desc'): Observable<any> {
  //   let params = new HttpParams()
  //     .set('_page', page.toString())
  //     .set('_limit', limit.toString())
  //     .set('_sort', sort)
  //     .set('_order', order);
  //   return this.http.get<any>(this.apiUrl, { params });
  // }

  searchArticlesByAuthor(author: string): Observable<any> {
    const params = new HttpParams().set('author', author); // Use 'author' for filtering
    return this.http.get<any>(this.apiUrl, { params });
  }

  getFeaturedArticles(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?featured=true`);
  }
  getAllArticles(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  getArticles(page: number = 1, limit: number = 2, sort: string = 'publishDate', order: string = 'desc', searchKeyword: string = '', author: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('_page', page.toString())
      .set('_per_page', limit.toString())
      .set('_sort', sort)
      .set('_order', order);
    if (searchKeyword) {
      params = params.set('q', searchKeyword); // JSON Server allows a generic 'q' for search
    }
    // If an author is provided, add it as a filter
    if (author) {
      params = params.set('author', author);
    }
    return this.http.get<ArticleData>(this.apiUrl, { params, observe: 'response' }).pipe(
      map(response => {
        const articles = response.body;
        const total = parseInt(response.headers.get('X-Total-Count')!, 10);
        return { articles, total };
      })
    );
  }

  getArticleById(articleId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${articleId}`);
  }

  getArticlesByAuthor(author: string): Observable<any> {
    const params = new HttpParams().set('author', author);
    return this.http.get<any>(this.apiUrl, { params });
  }

  // Get related articles by category
  getRelatedArticles(category: string): Observable<any> {
    const params = new HttpParams().set('category', category);
    return this.http.get<any>(this.apiUrl, { params });
  }

  addComment(articleId: number, userId: string, displayName:string,comment: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${articleId}`).pipe(
      switchMap((article: any) => {
        const newComment = {
          id: article.comments.length + 1, // Generate a new ID for the comment
          userId: userId,
          content: comment,
          displayName:displayName,
          timestamp: new Date().toISOString(),
        };
        article.comments.push(newComment); // Add the new comment to the comments array
        return this.http.put(`${this.apiUrl}/${articleId}`, article);
      })
    );
  }

  addArticle(article: any): Observable<any> {
    return this.http.post(this.apiUrl, article);
  }
}
