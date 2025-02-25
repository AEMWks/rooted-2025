import { Component } from '@angular/core';
import { IndexedDBService } from '../../services/indexedDB.service';
import { TimelineModule } from 'primeng/timeline';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  imports: [TimelineModule, CommonModule, CardModule, FontAwesomeModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  savedEvents: any[] = [];

  faTrash = faTrash;
  faBack = faArrowLeft

  constructor(private indexedDBService: IndexedDBService, private router: Router) { }

  async ngOnInit() {
    this.savedEvents = await this.indexedDBService.getEvents();
  }

  async removeEvent(event: any) {
    await this.indexedDBService.removeEvent(event);
    this.savedEvents = await this.indexedDBService.getEvents();
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
