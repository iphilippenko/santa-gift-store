import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsersPage} from '@pages/users/users.page.component';


const routes: Routes = [
    {
        path: '',
        component: UsersPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {
}
