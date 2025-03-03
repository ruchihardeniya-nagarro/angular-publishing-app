import { Component, inject, model, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleService } from '../../service/article.service';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dialog',
  standalone: false,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {

  }
  ngOnInit(): void {
    this.articleId = +this.route.snapshot.paramMap.get('id')!;
    this.getArticleDetail();
    console.log("articleId",this.articleId)
  }
  readonly data = inject<any>(MAT_DIALOG_DATA);
  // readonly animal = model(this.data.animal);
  commentText: string = '';  // Bind to the input field
  articleId!: number;
  articleData: any;
  articleComments: Array<any> = [];
  onNoClick(): void {
    this.dialogRef.close();
  }
  onClose(): void {
    this.dialogRef.close();
  }

  // Method to handle the comment submission (For now, just close the dialog)
  onSubmit(): void {
    let user = JSON.parse(this.authService.getUser());
    const  comment  = this.commentText;
    if (user) {
      this.articleService.addComment(this.data.articleId, user.uid, user.displayName,comment).subscribe({
        next: () => {
          this.commentText = '';
          this.getArticleDetail();
          alert("Comment Added Successfully!")
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  getArticleDetail() {
    const articleId = this.data.articleId; // Get article ID from the route params
    this.articleService.getArticleById(articleId).subscribe((data) => {
      this.articleData = data;
      this.articleComments = data?.comments
    });
  }
 onLike(comment: Comment): void {
  }

  onReply(comment: Comment): void {
    // Handle reply functionality (you can open a dialog for replies)
    console.log('Replying to comment:', comment);
  }
}
