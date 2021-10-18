using EntityFrameworkCore.Triggers;
using Microsoft.EntityFrameworkCore;

namespace VirtoCommerce.gdpr.Data.Repositories
{
    public class gdprModuleDbContext : DbContextWithTriggers
    {
        public gdprModuleDbContext(DbContextOptions<gdprModuleDbContext> options)
          : base(options)
        {
        }

        protected gdprModuleDbContext(DbContextOptions options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //        modelBuilder.Entity<gdprModuleEntity>().ToTable("MyModule").HasKey(x => x.Id);
            //        modelBuilder.Entity<gdprModuleEntity>().Property(x => x.Id).HasMaxLength(128);
            //        base.OnModelCreating(modelBuilder);
        }
    }
}

