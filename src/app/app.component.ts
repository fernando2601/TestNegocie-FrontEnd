import { Component, OnInit } from '@angular/core';
import { EnderecoService } from './services/endereco.service';
import { Endereco } from './models/endereco';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  endereco = {} as Endereco;
  enderecos: Endereco[];

  constructor(private enderecoService: EnderecoService) {}

  ngOnInit() {
    this.getEnderecos();
  }

// Chama o serviço para obtém todos os enderecos
  getEnderecos() {
    this.enderecoService.getEnderecos().subscribe((enderecos: Endereco[]) => {
      this.enderecos = enderecos;
    });
  }

 // copia o endereco para ser editado.
  editEndereco(endereco: Endereco) {
    this.endereco = { ...endereco };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getEnderecos();
    form.resetForm();
    this.endereco = {} as Endereco;
  }

}
