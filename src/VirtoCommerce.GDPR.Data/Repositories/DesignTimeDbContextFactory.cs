using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace VirtoCommerce.GDPR.Data.Repositories
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<GdprDbContext>
    {
        public GdprDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<GdprDbContext>();

            builder.UseSqlServer("Data Source=(local);Initial Catalog=VirtoCommerce3;Persist Security Info=True;User ID=virto;Password=virto;MultipleActiveResultSets=True;Connect Timeout=30");

            return new GdprDbContext(builder.Options);
        }
    }
}
