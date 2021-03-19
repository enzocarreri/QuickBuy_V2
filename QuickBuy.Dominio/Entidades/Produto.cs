using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Dominio.Entidades
{
    public class Produto// : Entidade
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public decimal Preco { get; set; }

      /*  public override void Validate()
        {
            LimparMensagemValidacao();
            //if (!ItensPedido.Any())
            //{
            //    AdicionarCritica("Critica: Item de pedido nao pode estar vazio");
            //}
            //if (!string.IsNullOrEmpty(Descricao))
            //{
            //    AdicionarCritica("Critica: CEP deve estar preenchido");
            //}
        }*/
    }
}
