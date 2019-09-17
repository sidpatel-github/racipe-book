import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  storeRecipes() {
    const reipes = this.recipeService.getRecipes();
    this.http.put('https://ng-recipe-book-a3b5a.firebaseio.com/recipes.json', reipes).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes() {

    return this.http.get<Recipe[]>('https://ng-recipe-book-a3b5a.firebaseio.com/recipes.json',
    ).pipe(
      map(recipes => {
        // this is to set ingredients as empty array if it's not there in DB
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      }));



    // ********************* */

    // return this.authService.user.pipe(take(1),
    //   exhaustMap(user => {
    //     return this.http.get<Recipe[]>('https://ng-recipe-book-a3b5a.firebaseio.com/recipes.json',
    //       {
    //         params: new HttpParams().set('auth', user.token)
    //       }
    //     );
    //   }),
    //   map(recipes => {
    //     // this is to set ingredients as empty array if it's not there in DB
    //     return recipes.map(recipe => {
    //       return {
    //         ...recipe,
    //         ingredients: recipe.ingredients ? recipe.ingredients : []
    //       };
    //     });
    //   }),
    //   tap(recipes => {
    //     this.recipeService.setRecipes(recipes);
    //   }));
  }
}
