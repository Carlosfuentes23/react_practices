import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';

import { UsersRoutingModule } from './users-routing.module';

import { UsersComponent } from './users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { InicioComponent } from './inicio/inicio.component';
import { CreateProyectComponent } from './create-proyect/create-proyect.component';
import { CreatePhaseComponent } from './create-phase/create-phase.component';
import { ProjectComponent } from './project/project.component';
import { PhaseComponent } from './phase/phase.component';
import { SelectRoleComponent } from './select-role/select-role.component';


@NgModule({
  declarations: [
    UsersComponent,
    EditUserComponent,
    InicioComponent,
    CreateProyectComponent,
    CreatePhaseComponent,
    ProjectComponent,
    PhaseComponent,
    SelectRoleComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
