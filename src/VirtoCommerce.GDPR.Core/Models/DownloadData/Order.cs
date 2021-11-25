using System.Collections.Generic;

namespace VirtoCommerce.GDPR.Core.Models.DownloadData
{
    /// <summary>
    /// Customer order download data
    /// </summary>
    public class Order
    {
        public ICollection<Address> Addresses { get; set; }
    }
}
