import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('First Recipe', 'This is a simply a test', 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/2/1/0/WU0202_chili_s3x4.jpg.rend.hgtvcom.826.620.suffix/1486076474733.jpeg'),
    new Recipe('Second Recipe', 'This is a simply a test', 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/2/1/0/WU0202_chili_s3x4.jpg.rend.hgtvcom.826.620.suffix/1486076474733.jpeg')
  ];

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
