using System.Linq;
using System.Threading.Tasks;
using VirtoCommerce.CustomerModule.Core.Model;
using VirtoCommerce.CustomerModule.Core.Services;
using VirtoCommerce.GDPR.Core.Models.DownloadData;
using VirtoCommerce.GDPR.Core.Services;
using VirtoCommerce.OrdersModule.Core.Model;
using VirtoCommerce.OrdersModule.Core.Model.Search;
using VirtoCommerce.Platform.Core.Common;
using VirtoCommerce.Platform.Core.GenericCrud;

namespace VirtoCommerce.GDPR.Data.Services
{
    public class DownloadContactDataService : IDownloadContactDataService
    {
        private readonly IMemberService _memberService;
        private readonly ISearchService<CustomerOrderSearchCriteria, CustomerOrderSearchResult, CustomerOrder> _customerOrderSearchService;

        /// <summary>
        /// Max count of customer order donload data
        /// </summary>
        protected virtual int DefaultTake => 9999;

        public DownloadContactDataService(IMemberService memberService, ISearchService<CustomerOrderSearchCriteria, CustomerOrderSearchResult, CustomerOrder> customerOrderSearchService)
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
            orderSearchCriteria.CustomerId = contact.Id;
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
                Addresses = contact.Addresses.Select(add => new Core.Models.DownloadData.Address
                {
                    FirstName = add.FirstName,
                    LastName = add.LastName,
                    Country = add.CountryName,
                    Region = add.RegionName,
                    City = add.City,
                    Line1 = add.Line1,
                    Line2 = add.Line2,
                    ZipCode = add.Zip,
                    Email = add.Email,
                    Phone = add.Phone
                }).ToList(),
                Accounts = contact.SecurityAccounts.Select(acc => new Account
                {
                    Login = acc.UserName,
                    EmailAddress = acc.Email
                }).ToList(),
                Orders = customerOrders.Results.SelectMany(o =>
                {
                    return customerOrders.Results.Where(x => x.Id == o.Id).Select(x => new Order
                    {
                        Addresses = o.Addresses.Select(a => new Core.Models.DownloadData.Address
                        {
                            FirstName = a.FirstName,
                            LastName = a.LastName,
                            Country = a.CountryName,
                            Region = a.RegionName,
                            City = a.City,
                            Line1 = a.Line1,
                            Line2 = a.Line2,
                            ZipCode = a.Zip,
                            Email = a.Email,
                            Phone = a.Phone
                        }).ToList()
                    });
                }).ToList()
            };

            return result;
        }
    }
}
