import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PostService} from '../../services/post.service';
import {Subscription} from 'rxjs';
import {AuthService, UserData} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  images: any[] = [
    'https://images-na.ssl-images-amazon.com/images/I/51DR2KzeGBL._AC_.jpg',
    'https://www.leparisien.fr/resizer/m6B_XdWcRMxBW2zYBFQcmPZvWrM=/932x582/arc-anglerfish-eu-central-1-prod-leparisien.s3.amazonaws.com/public/IXELPMG7HO3V7MS222VLDVZSKU.jpg',
    'http://3.bp.blogspot.com/-7fMPIQBuvgc/TaiT17-61AI/AAAAAAAAFEY/z9b1uHoZBkA/s1600/plus+bel+endroit+du+monde4.jpg',
    'https://images.musement.com/cover/0002/49/thumb_148242_cover_header.jpeg?w=1200&h=630&q=95&fit=crop',
    'https://www.construire-tendance.com/wp-content/grand-media/image/fa_ade-piscine-de-nuit-villa-du-desert-par-Tor-Barstad-Scottsdale-Usa_2.jpg',
    'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg',
  ];
  subs: Subscription[] = [];
  posts: any[] = [];
  user: UserData;

  constructor(private postService: PostService,
              private authService: AuthService) {
  }

  async ngOnInit(): Promise<void> {
    this.subs.push(this.postService.getAllPosts().subscribe(async (posts) => {
      this.posts = posts;
      console.log(posts);
    }));

    this.subs.push(this.authService.CurrentUser().subscribe(user => {
      this.user = user;
      console.log(user);
    }));

  }

  postMessage(form: NgForm): void {
    const {message} = form.value;
    this.postService.postMessage(message,
      `${this.user.firstName} ${this.user.lastName}`,
      {
        avatar: this.user.avatar,
        lastName: this.user.lastName,
        firstname: this.user.firstName
      },
    );
    form.resetForm();
  }

  logout(): void {
    this.authService.Logout();
  }
}