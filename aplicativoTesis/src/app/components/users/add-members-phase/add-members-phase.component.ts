import { members } from './../../../interfaces/abilitie.interface';
import { Phase } from './../../../interfaces/phase.interface';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProjectsService } from 'src/app/services/api/projects.service';
import { PhasesService } from 'src/app/services/api/phases.service';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
import { Project } from 'src/app/interfaces/project.interface';

@Component({
  selector: 'app-add-members-phase',
  templateUrl: './add-members-phase.component.html',
  styleUrls: ['./add-members-phase.component.css'],
})
export class AddMembersPhaseComponent implements OnInit {
  id: string | null;
  users: User[] = [];
  pashe: Phase = {};
  addOrNot = false;
  faPlus = faPlus;
  faTrash = faTrash;
  project: Project ={};
  usr = JSON.parse(sessionStorage.getItem('USER')!);

  constructor(
    private projectService: ProjectsService,
    private phaseService: PhasesService,
    private ac: ActivatedRoute
  ) {
    this.id = this.ac.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if(this.id) this.getPhase(this.id);
    this.addOrListMembers();
  }

  addOrListMembers() {
    this.ac.url.subscribe((url) => {
      if (url[0].path === 'add-members-phase') {
        this.addOrNot = true;
        if(this.id) this.getProjectMebers(this.id)
      } else {
        this.addOrNot = false;
        if(this.id) this.getPhaseMembers(this.id)
      }
    })
  }

  getPhaseMembers(idPhase: string) {
    this.phaseService.getPhaseMembers(idPhase).subscribe((res: User[]) => {
      this.users = res;
    });
  }

  getProjectMebers(idPhase: string) {
    this.phaseService.getPhase(idPhase).subscribe((res: Phase) => {
      this.pashe = res;
      if (res.projectid) {
        this.getMembersProject(res.projectid);
      }
    });
  }

  getMembersProject(projectId: string) {
    this.projectService
      .getProjectMembers(projectId)
      .subscribe((res: User[]) => {
        if (this.id) {
          this.filterMembers(res, this.id);
        }
      });
  }

  filterMembers(users: User[], phaseId: string) {
    this.phaseService.getPhaseMembers(phaseId).subscribe((res: User[]) => {
        this.users = users.filter((user) => {
          return !res.some((member) => member._id === user._id);
        });
        //console.log(this.users);
    });

  }

  getPhase(id: string) {
    this.phaseService.getPhase(id).subscribe((res: Phase) => {
      this.pashe = res;
      if (res.projectid) this.getProject(res.projectid);
    });
  }

  getProject(id: string) {
    this.projectService.getProject(id).subscribe((res) => {
      this.project = res;
    });
  }

  addMember(user: User) {
    let phase = this.pashe;
    Swal.fire({
      title: '¿Estas seguro?',
      text: `¿Deseas agregar a ${user.name} a la fase?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed && this.pashe.membersid && user._id && this.id) {
        this.pashe.membersid.push(user._id);
        this.phaseService.updatePhase(this.pashe, this.id).subscribe(
          () => {
            Swal.fire({
              title: 'Usuario agregado',
              text: 'El usuario ha sido agregado a la fase',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#3085d6',
            }).then((result) => {
              if (result.isConfirmed && this.id) {
                this.getPhase(this.id);
                this.addOrListMembers();
              }
            });
          },
          (err) => {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo agregar al usuario',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#3085d6',
            });
          }
        );
      }
    });
  }

  removeMember(user: User) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: `¿Deseas eliminar a ${user.name} de la fase?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed && this.id) {
        this.phaseService.removeMemberPhase(user, this.id).subscribe(() => {
          Swal.fire({
            title: 'Usuario eliminado',
            text: 'El usuario ha sido eliminado de la fase',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3085d6',
          }).then((result) => {
            if (result.isConfirmed && this.id) {
              this.getPhase(this.id);
              this.addOrListMembers();
            }
          });
        },
        (err) => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo eliminar al usuario',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3085d6',
          });
        });
      }
    });
  }
}
