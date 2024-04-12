using VirtoCommerce.Platform.Core.Swagger;

namespace VirtoCommerce.GDPR.Core.Models.DownloadData
{
    /// <summary>
    /// Customer account download data
    /// </summary>
    [SwaggerSchemaId("GDPRAccount")]
    public class Account
    {
        public string Login { get; set; }
        public string EmailAddress { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
    }
}
