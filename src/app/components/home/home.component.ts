import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelpFilter } from '../../models/help-filter';
import { NavigationService } from '../../services/navigation.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public helpFilter: HelpFilter;

  private cities = ['Warszawa', 'Gdańsk', 'Kraków'];

  private helpKinds = [
    'Pomoc materialna',
    'Pomoc finansowa',
    'Pomoc noclegowa'
  ];

  private helpTopics = [
    'odzież',
    'logopeda',
    'przestępstwo'
  ];


  constructor(
    private seoService: SeoService,
    private router: Router,
    private navigation: NavigationService) {


  }

  ngOnInit(): void {
    this.helpFilter = this.navigation.getHelpFilterFromRoue();

    this.seoService.updateTitle('Title for home page');
    this.seoService.updateDescription('Description for home page');
    this.seoService.updateCanonicalUrl(this.router.url);
    this.seoService.updateDisplayedUrlForFilterData({
      city: this.getRandomCity(),
      helpKind: this.getRandomHelpKind(),
      helpTopic: this.getRandomHelpTopic()
    });
  }

  private getRandomCity(): string {
    return this.cities[Math.floor(Math.random() * this.cities.length)];
  }

  private getRandomHelpKind(): string {
    return this.helpKinds[Math.floor(Math.random() * this.helpKinds.length)];
  }

  private getRandomHelpTopic(): string {
    return this.helpTopics[Math.floor(Math.random() * this.helpTopics.length)];
  }

}
