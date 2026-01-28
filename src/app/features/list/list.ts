import { Component } from '@angular/core';
import { UserListComponent } from './app-list/app-list';

@Component({
  selector: 'app-list',
  imports: [
    UserListComponent
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List {

}
