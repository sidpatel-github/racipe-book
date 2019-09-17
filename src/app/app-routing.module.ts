import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
  //pathmatch is necessary as default strategy is prefix match so the default path which is "''" will match every time and will give an error
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  // {
  //   path: 'recipes', component: RecipesComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     { path: '', component: RecipeStartComponent },
  //     // ':id' route will come after 'new' other wise it will take new as a id
  //     { path: 'new', component: RecipeEditComponent },
  //     { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
  //     { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] },
  //   ]
  // },
  // { path: 'shopping-list', component: ShoppingListComponent },
  // { path: 'auth', component: AuthComponent }


  // adding lazy loading
  {
    path: 'recipes',
    loadChildren: './recipes/recipes.module#RecipeModule'
  },
  {
    path: 'shopping-list',
    loadChildren: './shopping-list/shopping-list.module#ShoppintListModule'
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,
    {
      // this will pre-load the modules which user is browsing a page
      preloadingStrategy: PreloadAllModules
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
