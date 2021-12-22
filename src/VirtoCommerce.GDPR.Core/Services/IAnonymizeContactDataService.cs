using System.Threading.Tasks;
using VirtoCommerce.CustomerModule.Core.Model;

namespace VirtoCommerce.GDPR.Core.Services
{
    public interface IAnonymizeContactDataService
    {
        Task<Contact> AnonymizeContactDataAsync(string id);
    }
}
