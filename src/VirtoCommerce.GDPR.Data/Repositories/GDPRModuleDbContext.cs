using EntityFrameworkCore.Triggers;
using Microsoft.EntityFrameworkCore;

namespace VirtoCommerce.GDPR.Data.Repositories
{
    public class GDPRModuleDbContext : DbContextWithTriggers
    {
        public GDPRModuleDbContext(DbContextOptions<GDPRModuleDbContext> options)
          : base(options)
        {
        }

        protected GDPRModuleDbContext(DbContextOptions options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //        modelBuilder.Entity<GDPRModuleEntity>().ToTable("MyModule").HasKey(x => x.Id);
            //        modelBuilder.Entity<GDPRModuleEntity>().Property(x => x.Id).HasMaxLength(128);
            //        base.OnModelCreating(modelBuilder);
        }
    }
}

