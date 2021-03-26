import {Component, OnInit} from "@angular/core"
import { Produto } from "../model/produto";
import { ProdutoServico } from "../servicos/produto/produto.servico";

@Component({
  selector: "produto",
  templateUrl: "./produto.component.html",
  styleUrls: ["./produto.component.css"]
})
export class ProdutoComponent implements OnInit {
  public produto: Produto;
   public arquivoSelecionado: File;

  constructor(private produtoServico: ProdutoServico) {
    this.produto = new  Produto();
  }

  ngOnInit(): void {
    
  }
  public nome: string;
  public liberadoParaVenda: boolean;

  public obterNome(): string {
    return "LAL";
  }

  public cadastrar() {
    alert("sda");
    //this.produtoServico.cadastrar(this.produto)
    //  .subscribe(
    //    produtojson => { console.log(produtojson) },
    //    e => { console.log(e)}
    //  );
  }
  public inputChange(files: FileList) {
    this.arquivoSelecionado = files.item(0);
    this.produtoServico.enviarArquivo(this.arquivoSelecionado)
      .subscribe(
        retorno => {

        },
        e => {

        }
          );

  }
}
