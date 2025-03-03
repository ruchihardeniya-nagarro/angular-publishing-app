import { Component, inject, model, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../service/article.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-article-detail',
  standalone: false,
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss'
})
export class ArticleDetailComponent implements OnInit {
  constructor(private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private fb: FormBuilder,
    private authService: AuthService,

  ) { }
  ngOnInit(): void {
    this.getArticleDetail();
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required]],  // Username validation
    });
  }
  article: any;
  relatedArticles: any;
  commentForm!: FormGroup;
  readonly dialog = inject(MatDialog);
  readonly comment = signal('');
  articleIdforDia!: number;

  getArticleDetail() {
    const articleId = +this.route.snapshot.paramMap.get('id')!; // Get article ID from the route params
    // Fetch article details
    this.articleIdforDia = articleId;
    this.articleService.getArticleById(articleId).subscribe((data) => {
      this.article = data;

      // Fetch related articles based on category
      this.articleService.getRelatedArticles(this.article.category).subscribe((data) => {
        this.relatedArticles = data.filter(
          (item: any) => item.id !== this.article.id // Exclude the current article
        );
      });
    });
  }

  onSubmit(): void {
    if (this.commentForm.invalid) {
      return;  // Stop if form is invalid
    }
    let user = JSON.parse(this.authService.getUser());
    const apartmentId = +this.route.snapshot.paramMap.get('id')!;
    const { comment } = this.commentForm.value;
    if (user) {
      this.articleService.addComment(apartmentId, user.id,user.displayName, comment).subscribe({
        next: () => {
          this.getArticleDetail();
          this.commentForm.reset(this.commentForm.value);
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {name: this.comment(),articleId:this.articleIdforDia},
      width: '50%',  // Width of the dialog
      height:'100vh',
      position: {
        right: '0px',  // Position the dialog on the right side of the screen
      },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log('The dialog was closed',result);
      }
    });

  }

  gotodetail(id:number) {
    this.router.navigate(['/article-detail', id]);
    this.getArticleDetail()
   }
}
