import { Component, OnInit } from '@angular/core';
import { EnderecoService } from './services/endereco.service';
import { Endereco } from './models/Endereco';
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
this.endereco=new Endereco();
  }

  insertEndereco(form: NgForm) {
    if (this.endereco.cep !== undefined) {
      this.enderecoService.saveEndereco(this.endereco).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.enderecoService.saveEndereco(this.endereco).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }
// Chama o serviço para obtém todos os enderecos
  getEnderecos() {
    this.enderecoService.getEnderecos().subscribe((enderecos: Endereco[]) => {
      this.enderecos = enderecos;
    });
  }

  getEnderecosApi(endereco:Endereco) {
    this.enderecoService.getEnderecosApi(endereco.cep).subscribe((enderecos: Endereco[]) => {
      this.enderecos = enderecos;
    });
  }

// limpa o formulario
 cleanForm(form: NgForm) {
    this.getEnderecos();
    form.resetForm();
    this.endereco = {} as Endereco;
  }
}
