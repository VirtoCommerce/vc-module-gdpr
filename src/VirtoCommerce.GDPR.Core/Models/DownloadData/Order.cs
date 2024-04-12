using System.Collections.Generic;
using VirtoCommerce.Platform.Core.Swagger;

namespace VirtoCommerce.GDPR.Core.Models.DownloadData
{
    /// <summary>
    /// Customer order download data
    /// </summary>
    [SwaggerSchemaId("GDPROrder")]
    public class Order
    {
        public string CustomerName { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public ICollection<Address> Addresses { get; set; }
        public ICollection<Address> InPayments { get; set; }
        public ICollection<Address> Shipments { get; set; }
    }
}
