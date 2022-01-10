using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using VirtoCommerce.CustomerModule.Core.Model;
using VirtoCommerce.CustomerModule.Core.Services;
using VirtoCommerce.GDPR.Core.Services;
using VirtoCommerce.OrdersModule.Core.Model;
using VirtoCommerce.OrdersModule.Core.Model.Search;
using VirtoCommerce.OrdersModule.Core.Services;
using VirtoCommerce.Platform.Core.Common;
using VirtoCommerce.Platform.Core.GenericCrud;
using VirtoCommerce.Platform.Core.Security;

namespace VirtoCommerce.GDPR.Data.Services
{
    public class AnonymizeContactDataService : IAnonymizeContactDataService
    {
        private readonly IMemberService _memberService;
        private readonly ISearchService<CustomerOrderSearchCriteria, CustomerOrderSearchResult, CustomerOrder> _customerOrderSearchService;
        private readonly ICustomerOrderService _customerOrderService;
        private readonly Func<UserManager<ApplicationUser>> _userManagerFactory;
        private readonly string _anonymName = "Anonymized";
        private readonly string _anonymPostalCode = "000000";
        private readonly string _anonymPhone = "+00000000000";

        /// <summary>
        /// Max count of customer order donload data
        /// </summary>
        protected virtual int DefaultTake => int.MaxValue;

        public AnonymizeContactDataService(IMemberService memberService,
            ISearchService<CustomerOrderSearchCriteria, CustomerOrderSearchResult, CustomerOrder> customerOrderSearchService,
            ICustomerOrderService customerOrderService,
            Func<UserManager<ApplicationUser>> userManager)
        {
            _memberService = memberService;
            _customerOrderSearchService = customerOrderSearchService;
            _customerOrderService = customerOrderService;
            _userManagerFactory = userManager;
        }

        public async Task<Contact> AnonymizeContactDataAsync(string id)
        {
            var contact = (Contact)await _memberService.GetByIdAsync(id);

            var orderSearchCriteria = AbstractTypeFactory<CustomerOrderSearchCriteria>.TryCreateInstance();

            var accountIds = contact.SecurityAccounts.Select(x => x.Id).Concat(new string[] { contact.Id });
            orderSearchCriteria.CustomerIds = accountIds.ToArray();
            orderSearchCriteria.Take = DefaultTake;

            var customerOrdersSearchResult = await _customerOrderSearchService.SearchAsync(orderSearchCriteria);

            contact.FirstName = _anonymName;
            contact.LastName = _anonymName;
            contact.FullName = _anonymName;
            contact.CreatedBy = _anonymName;
            contact.ModifiedBy = _anonymName;
            contact.BirthDate = null;
            contact.Emails = new List<string>();
            contact.Phones = new List<string>();
            contact.IsAnonymized = true;
            foreach (var address in contact.Addresses)
            {
                address.FirstName = _anonymName;
                address.LastName = _anonymName;
                address.City = _anonymName;
                address.Line1 = _anonymName;
                address.Line2 = _anonymName;
                address.PostalCode = _anonymPostalCode;
                address.Email = GetRandomEmail();
                address.Phone = _anonymPhone;
            }

            foreach (var user in contact.SecurityAccounts)
            {
                user.UserName = $"{_anonymName}_{Guid.NewGuid():N}";
                user.Email = GetRandomEmail();
                user.CreatedBy = _anonymName;
                user.ModifiedBy = _anonymName;
            }

            foreach (var result in customerOrdersSearchResult.Results)
            {
                result.CustomerName = _anonymName;
                result.CreatedBy = _anonymName;
                result.ModifiedBy = _anonymName;

                foreach (var orderAddress in result.Addresses)
                {
                    orderAddress.FirstName = _anonymName;
                    orderAddress.LastName = _anonymName;
                    orderAddress.City = _anonymName;
                    orderAddress.Line1 = _anonymName;
                    orderAddress.Line2 = _anonymName;
                    orderAddress.PostalCode = _anonymPostalCode;
                    orderAddress.Email = GetRandomEmail();
                    orderAddress.Phone = _anonymPhone;
                }
            }

            await _memberService.SaveChangesAsync(new[] { contact });
            await _customerOrderService.SaveChangesAsync(customerOrdersSearchResult.Results.ToArray());
            foreach (var user in contact.SecurityAccounts)
            {
                await SaveUserChangesAsync(user);
            }

            return contact;
        }

        private async Task SaveUserChangesAsync(ApplicationUser user)
        {
            using var userManager = _userManagerFactory();
            await userManager.UpdateAsync(user);
        }

        private string GetRandomEmail()
        {
            return $"{Guid.NewGuid():N}@{Guid.NewGuid():N}.com";
        }
    }
}
