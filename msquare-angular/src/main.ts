import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { initGsapPlugins } from './app/shared/animation.config';

initGsapPlugins();

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

