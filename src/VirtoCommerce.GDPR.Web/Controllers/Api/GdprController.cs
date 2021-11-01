using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VirtoCommerce.CustomerModule.Core.Model;
using VirtoCommerce.CustomerModule.Core.Model.Search;
using VirtoCommerce.CustomerModule.Core.Services;
using VirtoCommerce.GDPR.Core;
using VirtoCommerce.Platform.Security.Authorization;

namespace VirtoCommerce.GDPR.Web.Controllers.Api
{
    [Route("api/gdpr")]
    public class GdprController : Controller
    {
        private readonly IAuthorizationService _authorizationService;
        private readonly IMemberService _memberService;
        private readonly IMemberSearchService _memberSearchService;

        public GdprController(IAuthorizationService authorizationService, IMemberService memberService, IMemberSearchService memberSearchService)
        {
            _authorizationService = authorizationService;
            _memberService = memberService;
            _memberSearchService = memberSearchService;
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

            criteria.MemberType = typeof(Contact).Name;
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
        public async Task<ActionResult> DeleteMembers([FromQuery] string id)
        {
            await _memberService.DeleteAsync(new[] { id });
            return NoContent();
        }

        private Task<AuthorizationResult> AuthorizeAsync(object resource, string permission)
        {
            return _authorizationService.AuthorizeAsync(User, resource, new PermissionAuthorizationRequirement(permission));
        }
    }
}
