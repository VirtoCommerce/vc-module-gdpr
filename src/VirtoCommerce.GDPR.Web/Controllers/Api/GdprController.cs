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
        [HttpGet]
        [Route("contacts")]
        [Authorize(ModuleConstants.Security.Permissions.Access)]
        [ProducesResponseType(typeof(void), StatusCodes.Status204NoContent)]
        public async Task<ActionResult<Contact[]>> GetContactList()
        {
            var searchCriteria = new MembersSearchCriteria
            {
                MemberType = typeof(Contact).Name,
                DeepSearch = true,
                Take = int.MaxValue
            };
            if (!(await AuthorizeAsync(searchCriteria, ModuleConstants.Security.Permissions.Access)).Succeeded)
            {
                return Unauthorized();
            }
            var result = await _memberSearchService.SearchMembersAsync(searchCriteria);

            return Ok(result);
        }

        /// <summary>
        /// Get plenty contacts
        /// </summary>
        /// <param name="ids">contact IDs</param>
        [HttpGet]
        [Route("contacts_by_ids")]
        [Authorize(ModuleConstants.Security.Permissions.Read)]
        [ProducesResponseType(typeof(void), StatusCodes.Status204NoContent)]
        public async Task<ActionResult<Contact[]>> GetContactsByIds([FromQuery] string[] ids)
        {
            var result = await _memberService.GetByIdsAsync(ids, null, new[] { typeof(Contact).Name });
            if (!(await AuthorizeAsync(result, ModuleConstants.Security.Permissions.Read)).Succeeded)
            {
                return Unauthorized();
            }
            return Ok(result);
        }

        /// <summary>
        /// Search contacts
        /// </summary>
        /// <remarks>Get array of contacts satisfied search criteria.</remarks>
        /// <param name="criteria">concrete instance of SearchCriteria type type will be created by using PolymorphicMemberSearchCriteriaJsonConverter</param>
        //[HttpPost]
        //[Route("contacts/search")]
        //[Authorize(ModuleConstants.Security.Permissions.Read)]
        //[ProducesResponseType(typeof(void), StatusCodes.Status204NoContent)]
        //public async Task<ActionResult<ContactSearchResult>> SearchContacts([FromBody] MembersSearchCriteria criteria)
        //{
        //    if (criteria == null)
        //    {
        //        criteria = AbstractTypeFactory<MembersSearchCriteria>.TryCreateInstance();
        //    }

        //    criteria.MemberType = typeof(Contact).Name;
        //    criteria.MemberTypes = new[] { criteria.MemberType };

        //    if (!(await AuthorizeAsync(criteria, ModuleConstants.Security.Permissions.Read)).Succeeded)
        //    {
        //        return Unauthorized();
        //    }

        //    var searchResult = await _memberSearchService.SearchMembersAsync(criteria);

        //    var result = new ContactSearchResult
        //    {
        //        TotalCount = searchResult.TotalCount,
        //        Results = searchResult.Results.OfType<Contact>().ToList()
        //    };

        //    return Ok(result);
        //}

        /// <summary>
        /// Update contact
        /// </summary>
        [HttpPut]
        [Route("contact/update")]
        [Authorize(ModuleConstants.Security.Permissions.Update)]
        [ProducesResponseType(typeof(void), StatusCodes.Status204NoContent)]
        public async Task<ActionResult<Contact>> UpdateContact([FromBody] Contact contact)
        {
            if (!(await AuthorizeAsync(contact, ModuleConstants.Security.Permissions.Update)).Succeeded)
            {
                return Unauthorized();
            }
            await _memberService.SaveChangesAsync(new[] { contact });
            return NoContent();
        }

        /// <summary>
        /// Delete contacts
        /// </summary>
        /// <remarks>Delete contacts by given array of ids.</remarks>
        /// <param name="ids">An array of contacts ids</param>
        [HttpDelete]
        [Route("contacts/delete")]
        [Authorize(ModuleConstants.Security.Permissions.Delete)]
        [ProducesResponseType(typeof(void), StatusCodes.Status204NoContent)]
        public async Task<ActionResult> DeleteMembers([FromQuery] string[] ids)
        {
            await _memberService.DeleteAsync(ids);
            return NoContent();
        }

        private Task<AuthorizationResult> AuthorizeAsync(object resource, string permission)
        {
            return _authorizationService.AuthorizeAsync(User, resource, new PermissionAuthorizationRequirement(permission));
        }
    }
}
