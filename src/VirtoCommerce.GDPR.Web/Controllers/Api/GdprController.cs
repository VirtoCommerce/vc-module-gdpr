using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VirtoCommerce.CustomerModule.Core.Model;
using VirtoCommerce.CustomerModule.Core.Model.Search;
using VirtoCommerce.CustomerModule.Core.Services;
using VirtoCommerce.GDPR.Core;
using VirtoCommerce.GDPR.Core.Models.DownloadData;
using VirtoCommerce.GDPR.Core.Services;
using VirtoCommerce.Platform.Security.Authorization;

namespace VirtoCommerce.GDPR.Web.Controllers.Api
{
    [Route("api/gdpr")]
    public class GdprController : Controller
    {
        private readonly IAuthorizationService _authorizationService;
        private readonly IMemberSearchService _memberSearchService;
        private readonly IAnonymizeContactDataService _anonymizeContactDataService;
        private readonly IDownloadContactDataService _downloadContactDataService;

        public GdprController(IAuthorizationService authorizationService,
            IMemberSearchService memberSearchService,
            IAnonymizeContactDataService anonymizeContactDataService,
            IDownloadContactDataService downloadContactDataService)
        {
            _authorizationService = authorizationService;
            _memberSearchService = memberSearchService;
            _anonymizeContactDataService = anonymizeContactDataService;
            _downloadContactDataService = downloadContactDataService;
        }

        /// <summary>
        /// Get contact list
        /// </summary>
        [HttpPost]
        [Route("contacts/search")]
        [Authorize(ModuleConstants.Security.Permissions.Access)]
        public async Task<ActionResult<Contact[]>> GetContactList([FromBody] MembersSearchCriteria criteria)
        {
            if (!(await AuthorizeAsync(criteria, ModuleConstants.Security.Permissions.Access)).Succeeded)
            {
                return Unauthorized();
            }

            var result = await _memberSearchService.SearchMembersAsync(criteria);

            return Ok(result);
        }

        /// <summary>
        /// Anonymize contact by id
        /// </summary>
        /// <param name="id">contact id</param>
        /// <returns></returns>
        [HttpGet]
        [Route("contacts/anonymize/{id}")]
        [Authorize(ModuleConstants.Security.Permissions.Anonymize)]
        [ProducesResponseType(typeof(void), StatusCodes.Status204NoContent)]
        public async Task<ActionResult<Contact>> AnonymizeContact(string id)
        {
            var result = await _anonymizeContactDataService.AnonymizeContactDataAsync(id);
            return Ok(result);
        }

        /// <summary>
        /// Download contact info by id
        /// </summary>
        /// <param name="id">contact id</param>
        /// <returns></returns>
        [HttpGet]
        [Route("contacts/download/{id}")]
        [Authorize(ModuleConstants.Security.Permissions.Download)]
        public async Task<ActionResult<Customer>> DownloadContactInfo(string id)
        {
            var result = await _downloadContactDataService.GetContactDataAsync(id);
            return Ok(result);
        }

        private Task<AuthorizationResult> AuthorizeAsync(object resource, string permission)
        {
            return _authorizationService.AuthorizeAsync(User, resource, new PermissionAuthorizationRequirement(permission));
        }
    }
}
