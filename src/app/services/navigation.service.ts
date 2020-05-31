import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelpFilter } from '../models/help-filter';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private route: ActivatedRoute) { }

  public getHelpFilterFromRoue(): HelpFilter {
    const helpFilter: HelpFilter = {};

    const cityParam = this.route.snapshot.queryParamMap.get('miasto');
    if (!!cityParam) {
      helpFilter.city = cityParam;
    }

    const helpKindParam = this.route.snapshot.queryParamMap.get('rodzaj-pomocy');
    if (!!helpKindParam) {
      helpFilter.helpKind = helpKindParam;
    }

    const helpTopicParam = this.route.snapshot.queryParamMap.get('temat-pomocy');
    if (!!helpTopicParam) {
      helpFilter.helpTopic = helpTopicParam;
    }

    return helpFilter;
  }
}
