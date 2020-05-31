import { DOCUMENT, Location } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HelpFilter } from '../models/help-filter';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    @Inject(DOCUMENT) private doc: HTMLDocument,
    private title: Title,
    private meta: Meta,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  public updateTitle(title: string) {
    this.title.setTitle(title);
  }

  public updateDescription(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc });
  }

  public updateDisplayedUrlForDetails(details: string) {
    this.location.go(`/details/${this.convertSpacesToDashes(details)}`);
  }

  private convertSpacesToDashes(str: string) {
    return str.replace(/\s+/g, '-').toLowerCase();
  }

  public updateDisplayedUrlForFilterData(filter: HelpFilter) {
    const queryParams: Params = {};
    if (!!filter.city) {
      queryParams['miasto'] = this.convertSpacesToDashes(filter.city);
    }
    if (!!filter.helpKind) {
      queryParams['rodzaj-pomocy'] = this.convertSpacesToDashes(filter.helpKind);
    }
    if (!!filter.helpTopic) {
      queryParams['temat-pomocy'] = this.convertSpacesToDashes(filter.helpTopic);
    }
    this.router.navigate([], {
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  public updateCanonicalUrl(url: string) {
    this.removeOldCannonicalUrls();

    const link: HTMLLinkElement = this.doc.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    this.doc.head.getElementsByTagName('link');
    this.doc.head.appendChild(link);
  }

  private removeOldCannonicalUrls() {
    const currentLinks = this.doc.head.getElementsByTagName('link');
    for (let i = 0; i < currentLinks.length; i++) {
      const element = currentLinks[i];
      if (element.rel === 'canonical') {
        this.doc.head.removeChild(element);
      }
    }
  }

  public updateOgUrl(url: string) {
    this.meta.updateTag({ name: 'og:url', content: url });
  }
}
