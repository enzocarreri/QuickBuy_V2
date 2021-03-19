using System.Collections.Generic;

namespace QuickBuy.Dominio.Entidades
{
    public class Usuario : Entidade
    {
        public int Id { get; set; }

        public string Email { get; set; }
        public string Senha { get; set; }
        public string Nome { get; set; }
        public string Sobrenome { get; set; }

        //um usuario pode ter nenhum ou muitos pedidos
        public virtual ICollection<Pedido> Pedido { get; set; }

        public override void Validate()
        {
            LimparMensagemValidacao();
            if (!string.IsNullOrEmpty(Email))
            {
                AdicionarCritica("Critica: preencha o email");
            }
            if (!string.IsNullOrEmpty(Senha))
            {
                AdicionarCritica("Critica: preencha a senha");
            }
        }
    }
}
