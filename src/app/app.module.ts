import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieListComponent } from './feature/movie/movie-list/movie-list.component';
import { ActorListComponent } from './feature/actor/actor-list/actor-list.component';
import { CreditListComponent } from './feature/credit/credit-list/credit-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './core/menu/menu.component';
import { MovieCreateComponent } from './feature/movie/movie-create/movie-create.component';
import { FormsModule } from '@angular/forms';
import { MovieDetailComponent } from './feature/movie/movie-detail/movie-detail.component';
import { MovieEditComponent } from './feature/movie/movie-edit/movie-edit.component';
import { ActorCreateComponent } from './feature/actor/actor-create/actor-create.component';
import { ActorEditComponent } from './feature/actor/actor-edit/actor-edit.component';
import { ActorDetailComponent } from './feature/actor/actor-detail/actor-detail.component';
import { CreditEditComponent } from './feature/credit/credit-edit/credit-edit.component';
import { CreditDetailComponent } from './feature/credit/credit-detail/credit-detail.component';
import { CreditCreateComponent } from './feature/credit/credit-create/credit-create.component';
import { UserLoginComponent } from './feature/user/user-login/user-login.component';
import { BaseComponent } from './feature/base/base.component';
import { SortPipe } from './pipe/sort.pipe';
import { MovieCreditsComponent } from './feature/movie/movie-credits/movie-credits.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    ActorListComponent,
    CreditListComponent,
    MenuComponent,
    MovieCreateComponent,
    MovieDetailComponent,
    MovieEditComponent,
    ActorCreateComponent,
    ActorEditComponent,
    ActorDetailComponent,
    CreditEditComponent,
    CreditDetailComponent,
    CreditCreateComponent,
    UserLoginComponent,
    BaseComponent,
    SortPipe,
    MovieCreditsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
