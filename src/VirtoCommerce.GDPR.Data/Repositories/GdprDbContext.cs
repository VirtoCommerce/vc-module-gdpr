using EntityFrameworkCore.Triggers;
using Microsoft.EntityFrameworkCore;

namespace VirtoCommerce.GDPR.Data.Repositories
{
    public class GdprDbContext : DbContextWithTriggers
    {
        public GdprDbContext(DbContextOptions<GdprDbContext> options)
          : base(options)
        {
        }

        protected GdprDbContext(DbContextOptions options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //        modelBuilder.Entity<GDPREntity>().ToTable("MyModule").HasKey(x => x.Id);
            //        modelBuilder.Entity<GDPREntity>().Property(x => x.Id).HasMaxLength(128);
            //        base.OnModelCreating(modelBuilder);
        }
    }
}
