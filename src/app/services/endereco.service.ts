import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Endereco } from '../models/Endereco';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  url = 'https://viacep.com.br/ws/';
  url2 = 'https://localhost:44361/api/endereco/Insertasync';
  url3 = 'https://localhost:44361/api/endereco/Getasync'


  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos os enderecos
  getEnderecos(): Observable<Endereco[]> {
    return this.httpClient.get<Endereco[]>(this.url3)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getEnderecosApi(endereco:string): Observable<Endereco[]> {
    return this.httpClient.get<Endereco[]>(this.url+endereco+"/json/")
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  insertEndereco(endereco: Endereco): Observable<Endereco> {
    return this.httpClient.post<Endereco>(this.url2, JSON.stringify(endereco), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

 // salva um Endereco
 saveEndereco(endereco: Endereco): Observable<Endereco> {
    return this.httpClient.post<Endereco>(this.url2, JSON.stringify(endereco), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
