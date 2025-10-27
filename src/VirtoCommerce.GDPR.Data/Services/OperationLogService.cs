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
        const int batchSize = 1000;
        var searchCriteria = new ChangeLogSearchCriteria
        {
            ObjectType = "ApplicationUser",
            ObjectIds = userIds,
            Take = batchSize,
        };

        int foundCount;
        do
        {
            var searchResult = await searchService.SearchAsync(searchCriteria);
            var operationLogIds = searchResult.Results.Select(x => x.Id).ToArray();
            foundCount = operationLogIds.Length;

            if (foundCount > 0)
            {
                await changeLogService.DeleteAsync(operationLogIds);
            }
        } while (foundCount == batchSize);
    }
}
