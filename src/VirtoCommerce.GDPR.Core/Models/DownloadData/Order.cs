using System.Collections.Generic;

namespace VirtoCommerce.GDPR.Core.Models.DownloadData
{
    /// <summary>
    /// Customer order download data
    /// </summary>
    public class Order
    {
        public string CustomerName { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public ICollection<Address> Addresses { get; set; }
    }
}
