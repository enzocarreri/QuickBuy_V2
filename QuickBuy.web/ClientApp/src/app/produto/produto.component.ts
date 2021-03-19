import {Component} from "@angular/core"

@Component({
  selector: "produto",
  template: "<html>{{obterNome()}}</html>"
})
export class ProdutoComponent{

  public nome: string;
  public liberadoParaVenda: boolean;

  public obterNome(): string {
    return "LAL";
  }

}
