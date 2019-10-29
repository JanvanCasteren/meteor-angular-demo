import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginViewComponent} from './view-components/login-view/login-view.component';
import {HomeViewComponent} from './view-components/home-view/home-view.component';
import {AdministrationViewComponent} from './view-components/administration-view/administration-view.component';
import {MenuComponent} from './components/menu/menu.component';
import {AddUserComponent} from './components/add-user/add-user.component';
import {AddOrganisationComponent} from './components/add-organisation/add-organisation.component';
import {TodosComponent} from './components/todos/todos.component';
import {AddTodoComponent} from './components/add-todo/add-todo.component';
import {UsersComponent} from './components/users/users.component';
import {OrganisationsComponent} from './components/organisations/organisations.component';
import { DummyViewComponent } from './view-components/dummy-view/dummy-view.component';


@NgModule({
  declarations: [
    LoginViewComponent,
    HomeViewComponent,
    AdministrationViewComponent,
    AppComponent,
    MenuComponent,
    AddUserComponent,
    AddOrganisationComponent,
    UsersComponent,
    OrganisationsComponent,
    TodosComponent,
    AddTodoComponent,
    DummyViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
