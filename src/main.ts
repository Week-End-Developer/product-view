import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/modules/home/app.config';
import { AppComponent } from './app/modules/home/components/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
