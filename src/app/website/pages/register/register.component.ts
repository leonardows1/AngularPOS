import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OnExit } from 'src/app/guards/exit.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnExit {
  onExit(){
    const rta = confirm('¿Estás seguro de salir?');
    return rta;
  }

  ngOnInit(): void {
  }

}
