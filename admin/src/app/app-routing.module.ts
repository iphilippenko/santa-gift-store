import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadChildren: './pages/dashboard/dashboard.page.module#DashboardPageModule'
    },
    {
        path: 'login',
        loadChildren: './pages/login/login.page.module#LoginPageModule'
    },
    {
        path: 'users',
        loadChildren: './pages/users/users.page.module#UsersPageModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
