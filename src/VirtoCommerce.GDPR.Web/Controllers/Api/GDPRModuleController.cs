using VirtoCommerce.GDPR.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace VirtoCommerce.GDPR.Web.Controllers.Api
{
    [Route("api/GDPRModule")]
    public class GDPRModuleController : Controller
    {
        // GET: api/VirtoCommerce.GDPR
        /// <summary>
        /// Get message
        /// </summary>
        /// <remarks>Return "Hello world!" message</remarks>
        [HttpGet]
        [Route("")]
        [Authorize(ModuleConstants.Security.Permissions.Read)]
        public ActionResult<string> Get()
        {
            return Ok(new { result = "Hello world!" });
        }
    }
}
