using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using VirtoCommerce.CustomerModule.Core.Model;
using VirtoCommerce.CustomerModule.Core.Services;
using VirtoCommerce.GDPR.Core.Services;
using VirtoCommerce.OrdersModule.Core.Model.Search;
using VirtoCommerce.OrdersModule.Core.Services;
using VirtoCommerce.Platform.Core.ChangeLog;
using VirtoCommerce.Platform.Core.Common;
using VirtoCommerce.Platform.Core.Security;

namespace VirtoCommerce.GDPR.Data.Services
{
    public class AnonymizeContactDataService : IAnonymizeContactDataService
    {
        private readonly IMemberService _memberService;
        private readonly ICustomerOrderSearchService _customerOrderSearchService;
        private readonly ICustomerOrderService _customerOrderService;
        private readonly IChangeLogService _changeLogService;
        private readonly IChangeLogSearchService _changeLogSearchService;
        private readonly Func<UserManager<ApplicationUser>> _userManagerFactory;
        private readonly string _anonymName = "Anonymized";
        private readonly string _anonymPostalCode = "000000";
        private readonly string _anonymPhone = "+00000000000";

        /// <summary>
        /// Max count of customer order download data
        /// </summary>
        protected virtual int DefaultTake => int.MaxValue;

        public AnonymizeContactDataService(
            IMemberService memberService,
            ICustomerOrderSearchService customerOrderSearchService,
            ICustomerOrderService customerOrderService,
            IChangeLogService changeLogService,
            IChangeLogSearchService changeLogSearchService,
            Func<UserManager<ApplicationUser>> userManager)
        {
            _memberService = memberService;
            _customerOrderSearchService = customerOrderSearchService;
            _customerOrderService = customerOrderService;
            _changeLogService = changeLogService;
            _changeLogSearchService = changeLogSearchService;
            _userManagerFactory = userManager;
        }

        public async Task<Contact> AnonymizeContactDataAsync(string id)
        {
            var contact = (Contact)await _memberService.GetByIdAsync(id);

            var orderSearchCriteria = AbstractTypeFactory<CustomerOrderSearchCriteria>.TryCreateInstance();

            var accountIds = contact.SecurityAccounts.Select(x => x.Id).Concat(new[] { contact.Id });
            orderSearchCriteria.CustomerIds = accountIds.ToArray();
            orderSearchCriteria.Take = DefaultTake;

            var customerOrdersSearchResult = await _customerOrderSearchService.SearchAsync(orderSearchCriteria);

            contact.FirstName = _anonymName;
            contact.LastName = _anonymName;
            contact.FullName = _anonymName;

            contact.BirthDate = null;
            contact.Emails = new List<string>();
            contact.Phones = new List<string>();
            contact.IsAnonymized = true;
            foreach (var address in contact.Addresses)
            {
                address.Name = _anonymName;
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
            }

            foreach (var result in customerOrdersSearchResult.Results)
            {
                result.CustomerName = _anonymName;

                foreach (var orderAddress in result.Addresses)
                {
                    orderAddress.Name = _anonymName;
                    orderAddress.FirstName = _anonymName;
                    orderAddress.LastName = _anonymName;
                    orderAddress.City = _anonymName;
                    orderAddress.Line1 = _anonymName;
                    orderAddress.Line2 = _anonymName;
                    orderAddress.PostalCode = _anonymPostalCode;
                    orderAddress.Email = GetRandomEmail();
                    orderAddress.Phone = _anonymPhone;
                }

                foreach (var payment in result.InPayments)
                {
                    if (payment.BillingAddress != null)
                    {
                        payment.BillingAddress.Name = _anonymName;
                        payment.BillingAddress.FirstName = _anonymName;
                        payment.BillingAddress.LastName = _anonymName;
                        payment.BillingAddress.City = _anonymName;
                        payment.BillingAddress.Line1 = _anonymName;
                        payment.BillingAddress.Line2 = _anonymName;
                        payment.BillingAddress.PostalCode = _anonymPostalCode;
                        payment.BillingAddress.Email = GetRandomEmail();
                        payment.BillingAddress.Phone = _anonymPhone;
                    }
                }

                foreach (var shipment in result.Shipments)
                {
                    if (shipment.DeliveryAddress != null)
                    {
                        shipment.DeliveryAddress.Name = _anonymName;
                        shipment.DeliveryAddress.FirstName = _anonymName;
                        shipment.DeliveryAddress.LastName = _anonymName;
                        shipment.DeliveryAddress.City = _anonymName;
                        shipment.DeliveryAddress.Line1 = _anonymName;
                        shipment.DeliveryAddress.Line2 = _anonymName;
                        shipment.DeliveryAddress.PostalCode = _anonymPostalCode;
                        shipment.DeliveryAddress.Email = GetRandomEmail();
                        shipment.DeliveryAddress.Phone = _anonymPhone;
                    }
                }
            }

            // TODO need update CreatedBy, ModifiedBy for Contact, CustomerOrder, User. Need to create UseDbTriggers for anonymized entities

            await _memberService.SaveChangesAsync(new Member[] { contact });
            await _customerOrderService.SaveChangesAsync(customerOrdersSearchResult.Results.ToArray());

            foreach (var user in contact.SecurityAccounts)
            {
                await SaveUserChangesAsync(user);
            }

            var userIds = contact.SecurityAccounts.Select(x => x.Id).ToArray();
            await DeleteUserChangeLogRecordsAsync(userIds);

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

        private async Task DeleteUserChangeLogRecordsAsync(IList<string> objectIds)
        {
            const int batchSize = 100;

            var searchCriteria = AbstractTypeFactory<ChangeLogSearchCriteria>.TryCreateInstance();
            searchCriteria.ObjectType = nameof(ApplicationUser);
            searchCriteria.ObjectIds = objectIds;
            searchCriteria.Take = batchSize;

            int currentCount;
            int totalCount;

            do
            {
                var searchResult = await _changeLogSearchService.SearchAsync(searchCriteria);
                currentCount = searchResult.Results.Count;
                totalCount = searchResult.TotalCount;

                if (currentCount > 0)
                {
                    var ids = searchResult.Results.Select(x => x.Id).ToArray();
                    await _changeLogService.DeleteAsync(ids);
                }
            }
            while (searchCriteria.Take > 0 &&
                   currentCount == searchCriteria.Take &&
                   currentCount != totalCount);
        }
    }
}
