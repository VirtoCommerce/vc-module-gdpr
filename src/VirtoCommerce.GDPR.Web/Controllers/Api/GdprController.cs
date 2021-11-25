using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VirtoCommerce.CustomerModule.Core.Model;
using VirtoCommerce.CustomerModule.Core.Model.Search;
using VirtoCommerce.CustomerModule.Core.Services;
using VirtoCommerce.GDPR.Core;
using VirtoCommerce.GDPR.Core.Services;
using VirtoCommerce.Platform.Security.Authorization;

namespace VirtoCommerce.GDPR.Web.Controllers.Api
{
    [Route("api/gdpr")]
    public class GdprController : Controller
    {
        private readonly IAuthorizationService _authorizationService;
        private readonly IMemberService _memberService;
        private readonly IMemberSearchService _memberSearchService;
        private readonly IDownloadContactDataService _downloadContactDataService;

        public GdprController(IAuthorizationService authorizationService, IMemberService memberService, IMemberSearchService memberSearchService, IDownloadContactDataService downloadContactDataService)
        {
            _authorizationService = authorizationService;
            _memberService = memberService;
            _memberSearchService = memberSearchService;
            _downloadContactDataService = downloadContactDataService;
        }

        /// <summary>
        /// Get contact list
        /// </summary>
        [HttpPost]
        [Route("contacts/search")]
        [Authorize(ModuleConstants.Security.Permissions.Access)]
        [ProducesResponseType(typeof(void), StatusCodes.Status204NoContent)]
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
        /// Delete contact by id
        /// </summary>
        /// <param name="id">contact id</param>
        /// <returns></returns>
        [HttpDelete]
        [Route("contacts/delete")]
        [Authorize(ModuleConstants.Security.Permissions.Delete)]
        [ProducesResponseType(typeof(void), StatusCodes.Status204NoContent)]
        public async Task<ActionResult> DeleteContact([FromQuery] string id)
        {
            await _memberService.DeleteAsync(new[] { id });
            return NoContent();
        }

        /// <summary>
        /// Download contact info by id
        /// </summary>
        /// <param name="id">contact id</param>
        /// <returns></returns>
        [HttpGet]
        [Route("contacts/download")]
        [Authorize(ModuleConstants.Security.Permissions.Download)]
        [ProducesResponseType(typeof(void), StatusCodes.Status204NoContent)]
        public async Task<ActionResult> DownloadContactInfo([FromQuery] string id)
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
