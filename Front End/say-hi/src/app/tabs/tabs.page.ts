import { Component, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  @ViewChild('ionTabs', { static: true }) ionTabs: IonTabs;
  selectedTab = 'tab1';

  tabs = [
    {
      tab: 'tab1',
      icon: 'person-circle-sharp',
      label: 'Account',
    },
    {
      tab: 'tab2',
      icon: 'heart-circle-sharp',
      label: 'Favorites',
    },
    {
      tab: 'chat-tab',
      icon: 'chatbubbles-sharp',
      label: 'Matches',
    },
  ];

  constructor() {}

  layout(e) {
    console.log(e);
    return 'icon-top';
  }

  ionTabsDidChange() {
    this.selectedTab = this.ionTabs.getSelected();
    console.log(this.ionTabs.getSelected());
  }
}
