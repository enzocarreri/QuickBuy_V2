using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuickBuy.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Repositorio.Config
{
    public class ProdutoPedidoConfiguration : IEntityTypeConfiguration<ProdutoPedido>
    {
        public void Configure(EntityTypeBuilder<ProdutoPedido> builder)
        {
            builder.HasKey(p => p.Id);
            builder
                .Property(p => p.IdProdutoPedido)
                .IsRequired();            
            builder
                .Property(p => p.Quantidade)
                .IsRequired();
        }
    }
}
