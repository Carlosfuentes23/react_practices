import { Component, OnInit } from '@angular/core';
import { Phase } from 'src/app/interfaces/phase.interface';

@Component({
  selector: 'app-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.css']
})
export class PhaseComponent implements OnInit {

  phase : Phase ={
    name: "Front-End",
    leader_id: "",
    
    description: "En esta reunion se definieron los diseños del frontend",
    members_id: ["Carlos Fuentes", "Sebastian Reyes", "Camilo Rozo"],
    skills:["Bootstrap","Html 5","JS","Angular"],
    date_estimated: Date.now(),
  };

  constructor() { }

  ngOnInit(): void {
  }

}
