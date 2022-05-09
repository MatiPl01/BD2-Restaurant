import { Component } from '@angular/core';

@Component({
  selector: 'shared-logo',
  template: `
    <a routerLink="/" class="logo">
      <svg class="logo__icon">
        <use href="assets/svg/logo.svg#logo"></use>
      </svg>
      <div class="logo__headings">
        <h2 class="logo__heading logo__heading--primary">
          YummyFood
        </h2>
        <h3 class="logo__heading logo__heading--secondary">
          Tanio, szybko, smacznie
        </h3>
      </div>
    </a>
  `
})
export class LogoComponent {}
