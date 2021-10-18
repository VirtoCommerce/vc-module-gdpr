using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace VirtoCommerce.gdpr.Data.Repositories
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<gdprModuleDbContext>
    {
        public gdprModuleDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<gdprModuleDbContext>();

            builder.UseSqlServer("Data Source=(local);Initial Catalog=VirtoCommerce3;Persist Security Info=True;User ID=virto;Password=virto;MultipleActiveResultSets=True;Connect Timeout=30");

            return new gdprModuleDbContext(builder.Options);
        }
    }
}
