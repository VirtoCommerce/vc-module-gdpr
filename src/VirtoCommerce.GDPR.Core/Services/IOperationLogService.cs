using System.Threading.Tasks;

namespace VirtoCommerce.GDPR.Core.Services;

public interface IOperationLogService
{
    Task DeleteOperationLogsByUserIdsAsync(string[] userIds);
}
