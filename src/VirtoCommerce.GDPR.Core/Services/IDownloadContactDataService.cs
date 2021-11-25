using System.Threading.Tasks;
using VirtoCommerce.GDPR.Core.Models.DownloadData;

namespace VirtoCommerce.GDPR.Core.Services
{
    public interface IDownloadContactDataService
    {
        Task<Customer> GetContactDataAsync(string id);
    }
}
