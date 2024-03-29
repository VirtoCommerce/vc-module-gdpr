using System.Linq;
using System.Threading.Tasks;
using VirtoCommerce.CustomerModule.Core.Model;
using VirtoCommerce.CustomerModule.Core.Services;
using VirtoCommerce.GDPR.Core.Models.DownloadData;
using VirtoCommerce.GDPR.Core.Services;
using VirtoCommerce.OrdersModule.Core.Model.Search;
using VirtoCommerce.OrdersModule.Core.Services;
using VirtoCommerce.Platform.Core.Common;

namespace VirtoCommerce.GDPR.Data.Services
{
    public class DownloadContactDataService : IDownloadContactDataService
    {
        private readonly IMemberService _memberService;
        private readonly ICustomerOrderSearchService _customerOrderSearchService;

        /// <summary>
        /// Max count of customer order download data
        /// </summary>
        protected virtual int DefaultTake => 9999;

        public DownloadContactDataService(IMemberService memberService, ICustomerOrderSearchService customerOrderSearchService)
        {
            _memberService = memberService;
            _customerOrderSearchService = customerOrderSearchService;
        }

        /// <summary>
        /// Returns personal contact information
        /// </summary>
        /// <param name="id">contact Id</param>
        /// <returns></returns>
        public async Task<Customer> GetContactDataAsync(string id)
        {
            var contact = (Contact)await _memberService.GetByIdAsync(id);

            var orderSearchCriteria = AbstractTypeFactory<CustomerOrderSearchCriteria>.TryCreateInstance();
            // in old version: CustomerOrder.CustomerId = Member.Id, but in new version: CustomerOrder.CustomerId = AspNetUsers.Id, so we return both variants in here
            var accountIds = contact.SecurityAccounts.Select(x => x.Id).Concat(new[] { contact.Id });
            orderSearchCriteria.CustomerIds = accountIds.ToArray();
            orderSearchCriteria.Take = DefaultTake;

            var customerOrders = await _customerOrderSearchService.SearchAsync(orderSearchCriteria);

            var result = new Customer
            {
                FirstName = contact.FirstName,
                LastName = contact.LastName,
                FullName = contact.FullName,
                Birthday = contact.BirthDate,
                EmailAddresses = contact.Emails,
                Phones = contact.Phones,
                CreatedBy = contact.CreatedBy,
                ModifiedBy = contact.ModifiedBy,
                Addresses = contact.Addresses.Select(add => new Core.Models.DownloadData.Address
                {
                    Name = add.Name,
                    FirstName = add.FirstName,
                    LastName = add.LastName,
                    Country = add.CountryName,
                    Region = add.RegionName,
                    City = add.City,
                    Line1 = add.Line1,
                    Line2 = add.Line2,
                    ZipCode = add.PostalCode,
                    Email = add.Email,
                    Phone = add.Phone
                }).ToList(),
                Accounts = contact.SecurityAccounts.Select(acc => new Account
                {
                    Login = acc.UserName,
                    EmailAddress = acc.Email,
                    CreatedBy = acc.CreatedBy,
                    ModifiedBy = acc.ModifiedBy
                }).ToList(),
                Orders = customerOrders.Results.SelectMany(o =>
                {
                    return customerOrders.Results.Where(x => x.Id == o.Id).Select(x => new Order
                    {
                        CustomerName = o.CustomerName,
                        CreatedBy = o.CreatedBy,
                        ModifiedBy = o.ModifiedBy,
                        Addresses = o.Addresses.Select(a => new Core.Models.DownloadData.Address
                        {
                            Name = a.Name,
                            FirstName = a.FirstName,
                            LastName = a.LastName,
                            Country = a.CountryName,
                            Region = a.RegionName,
                            City = a.City,
                            Line1 = a.Line1,
                            Line2 = a.Line2,
                            ZipCode = a.PostalCode,
                            Email = a.Email,
                            Phone = a.Phone
                        }).ToList(),
                        InPayments = o.InPayments.Select(p => new Core.Models.DownloadData.Address
                        {
                            Name = p.BillingAddress?.Name,
                            FirstName = p.BillingAddress?.FirstName,
                            LastName = p.BillingAddress?.LastName,
                            Country = p.BillingAddress?.CountryName,
                            Region = p.BillingAddress?.RegionName,
                            City = p.BillingAddress?.City,
                            Line1 = p.BillingAddress?.Line1,
                            Line2 = p.BillingAddress?.Line2,
                            ZipCode = p.BillingAddress?.PostalCode,
                            Email = p.BillingAddress?.Email,
                            Phone = p.BillingAddress?.Phone
                        }).ToList(),
                        Shipments = o.Shipments.Select(s => new Core.Models.DownloadData.Address
                        {
                            Name = s.DeliveryAddress?.Name,
                            FirstName = s.DeliveryAddress?.FirstName,
                            LastName = s.DeliveryAddress?.LastName,
                            Country = s.DeliveryAddress?.CountryName,
                            Region = s.DeliveryAddress?.RegionName,
                            City = s.DeliveryAddress?.City,
                            Line1 = s.DeliveryAddress?.Line1,
                            Line2 = s.DeliveryAddress?.Line2,
                            ZipCode = s.DeliveryAddress?.PostalCode,
                            Email = s.DeliveryAddress?.Email,
                            Phone = s.DeliveryAddress?.Phone
                        }).ToList(),
                    });
                }).ToList()
            };

            return result;
        }
    }
}
