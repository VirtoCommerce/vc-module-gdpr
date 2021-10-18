using VirtoCommerce.gdpr.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace VirtoCommerce.gdpr.Web.Controllers.Api
{
    [Route("api/gdprModule")]
    public class gdprModuleController : Controller
    {
        // GET: api/VirtoCommerce.gdpr
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
