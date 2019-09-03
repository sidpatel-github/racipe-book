import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  storeRecipes() {
    const reipes = this.recipeService.getRecipes();
    this.http.put('https://ng-recipe-book-a3b5a.firebaseio.com/recipes.json', reipes).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://ng-recipe-book-a3b5a.firebaseio.com/recipes.json')
      .pipe(map(recipes => {
        // this is to set ingredients as empty array if it's not there in DB
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }), tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
      );
  }
}
