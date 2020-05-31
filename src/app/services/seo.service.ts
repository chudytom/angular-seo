import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

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
  ) { }

  public updateTitle(title: string) {
    this.title.setTitle(title);
  }

  public updateDescription(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc });
  }

  updateDisplayedUrlForDetails(details: string) {
    this.router.navigate([], {
      relativeTo: this.route,

      skipLocationChange: true,
    })
  }

  public updateDisplayedUrlForFilterData(city?: string, helpKind?: string, helpTopic?: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        miasto: 'city',
      },
      queryParamsHandling: 'merge',
      skipLocationChange: true,
    })
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
