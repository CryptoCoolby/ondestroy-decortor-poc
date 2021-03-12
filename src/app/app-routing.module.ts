import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MyComponentComponent2 } from './my-component copy/my-component.component';

const routes: Routes = [{
  path: '',
  component: AppComponent,
},

{
  path: 'asd',
  component: AppComponent
},
{
  path: 'asd2',
  component: AppComponent
},
{
  path: 'asd3',
  component: MyComponentComponent2
},
{
  path: 'asd4',
  component: AppComponent
},
  {
    path: '**',
    component: AppComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
