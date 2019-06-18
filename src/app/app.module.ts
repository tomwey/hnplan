import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { Utils } from '../provider/Utils';
import { PipesModule } from '../pipes/pipes.module';
import { ApiService } from '../provider/api-service';
import { Tools } from '../provider/Tools';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { iOSFixedScrollFreeze } from '../provider/iOSFixedScrollFreeze';
import { IonicStorageModule } from '@ionic/storage';
import { AppStore } from '../provider/app-store';
import { ComponentsModule } from '../components/components.module';
import { HomePage } from '../pages/home/home';
import { CalendarModule } from "ion2-calendar";

@NgModule({
  declarations: [
    MyApp,
    // TabsPage,
    HomePage,
    // VistorsQueryPage,
    // HouseQueryPage,
    // MyCustomerPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      mode: 'ios',
      backButtonText: '',
    }),
    CalendarModule,
    PipesModule,
    IonicImageViewerModule,
    ComponentsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // TabsPage,
    HomePage,
    // VistorsQueryPage,
    // HouseQueryPage,
    // MyCustomerPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Utils,
    ApiService,
    Tools,
    iOSFixedScrollFreeze,
    AppStore,
  ]
})
export class AppModule { }
