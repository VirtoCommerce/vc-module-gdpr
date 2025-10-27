using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using VirtoCommerce.GDPR.Core;
using VirtoCommerce.GDPR.Core.Services;
using VirtoCommerce.GDPR.Data.Services;
using VirtoCommerce.Platform.Core.Modularity;
using VirtoCommerce.Platform.Core.Security;

namespace VirtoCommerce.GDPR.Web
{
    public class Module : IModule
    {
        public ManifestModuleInfo ModuleInfo { get; set; }

        public void Initialize(IServiceCollection serviceCollection)
        {
            serviceCollection.AddTransient<IOperationLogService, OperationLogService>();
            serviceCollection.AddTransient<IDownloadContactDataService, DownloadContactDataService>();
            serviceCollection.AddTransient<IAnonymizeContactDataService, AnonymizeContactDataService>();
        }

        public void PostInitialize(IApplicationBuilder appBuilder)
        {
            // Register permissions
            var permissionsRegistrar = appBuilder.ApplicationServices.GetRequiredService<IPermissionsRegistrar>();
            permissionsRegistrar.RegisterPermissions(ModuleInfo.Id, "GDPR", ModuleConstants.Security.Permissions.AllPermissions);
        }

        public void Uninstall()
        {
            // do nothing in here
        }
    }
}
