import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>()

  private recipes: Recipe[] = [
    new Recipe('First Recipe',
      'This is a simply a test',
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/2/1/0/WU0202_chili_s3x4.jpg.rend.hgtvcom.826.620.suffix/1486076474733.jpeg',
      [
        new Ingredient('Chicken', 1),
        new Ingredient('French Fries', 10)
      ]),

    new Recipe('Second Recipe',
      'This is a simply a test',
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/2/1/0/WU0202_chili_s3x4.jpg.rend.hgtvcom.826.620.suffix/1486076474733.jpeg',
      [
        new Ingredient('Dhosa', 5),
        new Ingredient('Paneer', 50)
      ])
  ];
  constructor(private shoppingListService: ShoppingListService) { }
  getRecipes() {
    // with slice we will get a copy of variable rather than a reference
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
