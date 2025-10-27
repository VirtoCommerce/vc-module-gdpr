using System.Linq;
using System.Threading.Tasks;
using VirtoCommerce.GDPR.Core.Services;
using VirtoCommerce.Platform.Core.ChangeLog;

namespace VirtoCommerce.GDPR.Data.Services;

public class OperationLogService(
    IChangeLogService changeLogService,
    IChangeLogSearchService searchService)
    : IOperationLogService
{
    /// <summary>
    /// Deletes all user logs where objectId is userId and objectType is 'ApplicationUser'
    /// </summary>
    public async Task DeleteOperationLogsByUserIdsAsync(string[] userIds)
    {
        var searchCriteria = new ChangeLogSearchCriteria()
        {
            ObjectType = "ApplicationUser",
            ObjectIds = userIds,
        };

        var searchResult = await searchService.SearchAsync(searchCriteria);

        if (searchResult.Results.Count > 0)
        {
            var operationLogIds = searchResult.Results.Select(x => x.Id).ToArray();
            await changeLogService.DeleteAsync(operationLogIds);
        }
    }
}
