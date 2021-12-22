angular.module('virtoCommerce.gdpr')
    .controller('virtoCommerce.gdpr.contactListController', ['$scope', 'virtoCommerce.gdpr.webApi', 'platformWebApp.bladeUtils', 'platformWebApp.uiGridHelper', 'platformWebApp.ui-grid.extension', 'platformWebApp.angularToMomentFormatConverter',
        function ($scope, contacts, bladeUtils, uiGridHelper, gridOptionExtension, moment) {
            $scope.uiGridConstants = uiGridHelper.uiGridConstants;

            var blade = $scope.blade;
            blade.title = 'gdpr.blades.contact-list.title';
            blade.headIcon = 'fas fa-user-friends';
            var bladeNavigationService = bladeUtils.bladeNavigationService;

            blade.refresh = function (parentRefresh) {
                blade.isLoading = true;
                var searchCriteria = getSearchCriteria();

                if (blade.searchCriteria) {
                    angular.extend(searchCriteria, blade.searchCriteria);
                }

                contacts.search(searchCriteria,
                    function (data) {
                        blade.isLoading = false;
                        $scope.pageSettings.totalItems = data.totalCount;

                        if (Array.isArray(data.results) && data.results.length) {
                            _.each(data.results, function (contact) {
                                if (contact.securityAccounts[0]) {
                                    contact.email = contact.securityAccounts[0].email ?? '';
                                    contact.login = contact.securityAccounts[0].userName ?? '';
                                }
                                else {
                                    contact.email = '';
                                    contact.login = '';
                                }
                                if (contact.birthDate) {
                                    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                                    const d = new Date(contact.birthDate);
                                    contact.birthday = months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
                                } else {
                                    contact.birthday = '';
                                }
                            });
                            if (!data.results[0].outerId) {
                                data.results[0].outerId = null;
                            }
                        }

                        $scope.listEntries = data.results ? data.results : [];
                    });

                if (parentRefresh && blade.parentRefresh) {
                    blade.parentRefresh();
                }
            };

            blade.selectNode = function (data) {
                $scope.selectedNodeId = data.id;

                var newBlade = {
                    id: 'contactDetail',
                    currentEntityId: data.id,
                    currentEntity: data,
                    title: data.fullName,
                    subtitle: 'gdpr.blades.contact-detail.subtitle',
                    controller: 'virtoCommerce.gdpr.contactDetailController',
                    template: 'modules/$(VirtoCommerce.GDPR)/Scripts/blades/contact-detail.tpl.html'
                };
                bladeNavigationService.showBlade(newBlade, blade);
            };

            blade.toolbarCommands = [
                {
                    name: "platform.commands.refresh", icon: 'fa fa-refresh',
                    executeMethod: blade.refresh,
                    canExecuteMethod: function () {
                        return true;
                    }
                }
            ];

            // ui-grid
            $scope.setGridOptions = function (gridId, gridOptions) {
                $scope.gridOptions = gridOptions;
                gridOptionExtension.tryExtendGridOptions(gridId, gridOptions);

                gridOptions.onRegisterApi = function (gridApi) {
                    $scope.gridApi = gridApi;
                    gridApi.core.on.sortChanged($scope, function () {
                        if (!blade.isLoading) blade.refresh();
                    });
                };

                bladeUtils.initializePagination($scope);
            };

            $scope.clearKeyword = function () {
                blade.searchKeyword = null;
                blade.refresh();
            };

            function getSearchCriteria() {
                return {
                    memberType: 'Contact',
                    memberId: blade.currentEntity.id,
                    keyword: blade.searchKeyword,
                    deepSearch: blade.searchKeyword ? true : false,
                    sort: uiGridHelper.getSortExpression($scope),
                    skip: ($scope.pageSettings.currentPage - 1) * $scope.pageSettings.itemsPerPageCount,
                    take: $scope.pageSettings.itemsPerPageCount,
                    objectType: 'Member'
                };
            }
        }]);
