import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {


  private details = [
    'Punkt 3 pomocy prawnej w BibliotecePublicznej w MAgdalence',
    'GOPS w Przeworsku',
    'Gminny Ośrodek Pomocy Społecznej w Borkowicach',
  ]
  constructor(private seoService: SeoService, private router: Router) { }

  ngOnInit(): void {
    this.seoService.updateTitle('Title for details page');
    this.seoService.updateDescription('Description for details page');
    this.seoService.updateCanonicalUrl(window.location.href);

    const randomIndex =  Math.floor(Math.random() * this.details.length);
    const selectedItem = this.details[randomIndex];
    this.seoService.updateDisplayedUrlForDetails(selectedItem);
  }

}
