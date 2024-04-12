import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/model/menu-item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  title: string = "Menu-Component";
  menuItems: MenuItem[] = [];

  constructor() {}

  ngOnInit(): void {
    // create menuItems for each item in our menu: movie, actor, credit
    this.menuItems.push(new MenuItem("Movie", "/movie/list", "Movie List"));
    this.menuItems.push(new MenuItem("Actor", "/actor/list", "Actor List"));
    this.menuItems.push(new MenuItem("Credit", "/credit/list", "Credit List"));
  }

}
