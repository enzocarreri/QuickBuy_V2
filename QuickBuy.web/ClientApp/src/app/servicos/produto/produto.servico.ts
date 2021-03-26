import { Injectable, Inject, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Produto } from "../../model/produto";

@Injectable({
  providedIn: "root"
})
export class ProdutoServico implements OnInit {
  
  private baseUrl: string;
  public produtos: Produto[];

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;

  }
  ngOnInit(): void {
    this.produtos = [];
  }

  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }

  public cadastrar(produto: Produto): Observable<Produto> {
    /*    const headers = new HttpHeaders().set('content-type', 'application/json');
        var body = {
          nome: produto.nome,
          senha: produto.descricao,
          preco: produto.preco
        }*/

    return this.http.post<Produto>(this.baseUrl + "api/produto/cadastrar", JSON.stringify(produto), { headers: this.headers });
  }
  public salvar(produto: Produto): Observable<Produto> {   
    return this.http.post<Produto>(this.baseUrl + "api/produto/salvar", JSON.stringify(produto), { headers: this.headers });
  }
  public deleter(produto: Produto): Observable<Produto> {    
    return this.http.post<Produto>(this.baseUrl + "api/produto/deleter", JSON.stringify(produto), { headers: this.headers });
  }
  public obterTodosProdutos(): Observable<Produto[]> {
    /*    const headers = new HttpHeaders().set('content-type', 'application/json');
        var body = {
          nome: produto.nome,
          senha: produto.descricao,
          preco: produto.preco
        }*/

    return this.http.get<Produto[]>(this.baseUrl + "api/produto");
  }
  public obterTodosProduto(produtoId:number): Observable<Produto[]> {
    /*    const headers = new HttpHeaders().set('content-type', 'application/json');
        var body = {
          nome: produto.nome,
          senha: produto.descricao,
          preco: produto.preco
        }*/

    return this.http.get<Produto[]>(this.baseUrl + "api/produto");
  }
  public enviarArquivo(arquivoSelecionado: File): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append("arquivoEnviado", arquivoSelecionado, arquivoSelecionado.name);
    this.http.post<boolean>(this.baseUrl + "api/produto/enviarArquivo", arquivoSelecionado); 
  }
}

