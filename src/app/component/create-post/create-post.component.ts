import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ArticleService } from '../../service/article.service';

@Component({
  selector: 'app-create-post',
  standalone: false,
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private articleService: ArticleService

  ) { }
  title: string = '';
  content: string = '';  // This will hold the content from the Quill editor
  scheduledDate: Date | null = null; // For scheduling posts
  description!: string;
  saveDraft() {
    const draft = {
      title: this.title,
      content: this.content,
      status: 'draft',
      scheduledDate: this.scheduledDate
    };
    console.log('Draft Saved:', draft);
    // You can integrate a backend service to save the draft in a database.
  }
  editorConfig = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['bold', 'italic', 'underline'],
      ['link', 'image', 'video'],
      ['blockquote'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      ['clean'] // to clear formatting
    ]
  };
  publishPost() {
    let user = JSON.parse(this.authService.getUser());

    const post = {
      title: this.title,
      content: this.content,
      status: 'published',
      scheduledDate: this.scheduledDate,
      comment: [],
      description: this.description,
      author: user?.displayName,
      publishDate: Date(),
      views: '0'
    };
    console.log('Post Published:', post);
    this.articleService.addArticle(post).subscribe({
      next: () => {

        alert("Post Created Successfully");
      },
      error: (err) => {
        alert("post not created")
      },
    });
  }
}
