using System.Collections.Generic;

namespace VirtoCommerce.GDPR.Core.Models.DownloadData
{
    public class Order
    {
        public ICollection<Address> Addresses { get; set; }
    }
}
