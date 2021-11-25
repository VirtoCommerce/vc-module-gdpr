using System;
using System.Collections.Generic;

namespace VirtoCommerce.GDPR.Core.Models.DownloadData
{
    /// <summary>
    /// Customer download data
    /// </summary>
    public class Customer
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public DateTime? Birthday { get; set; }
        public ICollection<string> EmailAddresses { get; set; }
        public ICollection<string> Phones { get; set; }
        public ICollection<Address> Addresses { get; set; }
        public ICollection<Account> Accounts { get; set; }
        public ICollection<Order> Orders { get; set; }
    }
}
