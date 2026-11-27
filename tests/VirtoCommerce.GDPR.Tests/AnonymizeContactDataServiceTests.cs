using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Moq;
using VirtoCommerce.CustomerModule.Core.Model;
using VirtoCommerce.CustomerModule.Core.Services;
using VirtoCommerce.GDPR.Data.Services;
using VirtoCommerce.OrdersModule.Core.Model;
using VirtoCommerce.OrdersModule.Core.Model.Search;
using VirtoCommerce.OrdersModule.Core.Services;
using VirtoCommerce.Platform.Core.ChangeLog;
using VirtoCommerce.Platform.Core.Security;
using Xunit;

namespace VirtoCommerce.GDPR.Tests
{
    [Trait("Category", "Unit")]
    public class AnonymizeContactDataServiceTests
    {
        private const string ContactId = "contact";
        private const string UserId = "user";

        private readonly Mock<IMemberService> _memberService = new();
        private readonly Mock<ICustomerOrderSearchService> _orderSearchService = new();
        private readonly Mock<IChangeLogSearchService> _changeLogSearchService = new();
        private readonly Mock<UserManager<ApplicationUser>> _userManager;
        private readonly List<ApplicationUser> _updatedUsers = new();

        public AnonymizeContactDataServiceTests()
        {
            _userManager = new Mock<UserManager<ApplicationUser>>(Mock.Of<IUserStore<ApplicationUser>>(), null, null, null, null, null, null, null, null);
            _userManager
                .Setup(x => x.UpdateAsync(It.IsAny<ApplicationUser>()))
                .Callback<ApplicationUser>(_updatedUsers.Add)
                .ReturnsAsync(IdentityResult.Success);

            _orderSearchService
                .Setup(x => x.SearchAsync(It.IsAny<CustomerOrderSearchCriteria>(), It.IsAny<bool>()))
                .ReturnsAsync(new CustomerOrderSearchResult { Results = new List<CustomerOrder>() });
            _changeLogSearchService
                .Setup(x => x.SearchAsync(It.IsAny<ChangeLogSearchCriteria>()))
                .ReturnsAsync(new ChangeLogSearchResult { Results = new List<OperationLog>() });
        }

        [Fact]
        public async Task AnonymizeContactDataAsync_SavesUserLoadedFromUserManager_KeepsPasswordHashAndSecurityStamp()
        {
            // The member carries a reduced copy of the account
            SetupContact(new ApplicationUser { Id = UserId, UserName = "john", Email = "john@example.com" });
            _userManager
                .Setup(x => x.FindByIdAsync(UserId))
                .ReturnsAsync(new ApplicationUser
                {
                    Id = UserId,
                    UserName = "john",
                    Email = "john@example.com",
                    PasswordHash = "password-hash",
                    SecurityStamp = "security-stamp",
                });

            var contact = await CreateService().AnonymizeContactDataAsync(ContactId);

            var user = Assert.Single(_updatedUsers);
            Assert.Equal(UserId, user.Id);
            Assert.StartsWith("Anonymized_", user.UserName);
            Assert.NotEqual("john@example.com", user.Email);
            Assert.Equal("password-hash", user.PasswordHash);
            Assert.Equal("security-stamp", user.SecurityStamp);

            var account = Assert.Single(contact.SecurityAccounts);
            Assert.Equal(user.UserName, account.UserName);
            Assert.Equal(user.Email, account.Email);
        }

        [Fact]
        public async Task AnonymizeContactDataAsync_UserNotFound_SkipsUser()
        {
            SetupContact(new ApplicationUser { Id = UserId, UserName = "john" });
            _userManager
                .Setup(x => x.FindByIdAsync(UserId))
                .ReturnsAsync((ApplicationUser)null);

            await CreateService().AnonymizeContactDataAsync(ContactId);

            Assert.Empty(_updatedUsers);
        }

        private void SetupContact(ApplicationUser account)
        {
            _memberService
                .Setup(x => x.GetByIdAsync(ContactId, It.IsAny<string>(), It.IsAny<string>()))
                .ReturnsAsync(new Contact
                {
                    Id = ContactId,
                    FirstName = "John",
                    LastName = "Doe",
                    Addresses = new List<CustomerModule.Core.Model.Address>(),
                    SecurityAccounts = new List<ApplicationUser> { account },
                });
        }

        private AnonymizeContactDataService CreateService()
        {
            return new AnonymizeContactDataService(
                _memberService.Object,
                _orderSearchService.Object,
                Mock.Of<ICustomerOrderService>(),
                Mock.Of<IChangeLogService>(),
                _changeLogSearchService.Object,
                () => _userManager.Object);
        }
    }
}
