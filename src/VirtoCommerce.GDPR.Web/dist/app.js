(()=>{var e;e="virtoCommerce.gdpr",void 0!==AppDependencies&&AppDependencies.push(e),angular.module(e,[]).config(["$stateProvider","$urlRouterProvider",function(e,t){e.state("workspace.gdpr",{url:"/GDPR",templateUrl:"$(Platform)/Scripts/common/templates/home.tpl.html",controller:["$scope","platformWebApp.bladeNavigationService",function(e,t){t.showBlade({id:"gdprMain",currentEntity:{id:null},controller:"virtoCommerce.gdpr.gdprMainController",template:"Modules/$(VirtoCommerce.GDPR)/Scripts/blades/gdpr-main.tpl.html",isClosingDisabled:!0})}]})}]).run(["platformWebApp.mainMenuService","platformWebApp.widgetService","$state",function(e,t,r){var o={path:"browse/GDPR",icon:"fas fa-key",title:"GDPR",priority:100,action:function(){r.go("workspace.gdpr")},permission:"GDPR:access"};e.addMenuItem(o)}]),angular.module("virtoCommerce.gdpr").controller("virtoCommerce.gdpr.contactDetailController",["$scope","platformWebApp.dialogService","virtoCommerce.gdpr.webApi",function(e,t,r){var o,i=e.blade;i.headIcon="fas fa-address-card",i.toolbarCommands=[{name:"gdpr.blades.contact-detail.commands.remove.label",icon:"fas fa-eraser",executeMethod:function(){var o={id:"confirmDelete",title:"gdpr.blades.contact-detail.commands.remove.message.title",message:"gdpr.blades.contact-detail.commands.remove.message.text",callback:function(t){t&&(i.isLoading=!0,r.delete({id:i.currentEntityId},(function(){e.bladeClose(),i.parentBlade.refresh()})))}};t.showConfirmationDialog(o)},canExecuteMethod:function(){return!0},permission:"virtoCommerce.gdpr:delete"}],o=i.currentEntity,i.currentEntity=angular.copy(o),i.origEntity=o,i.isLoading=!1}]),angular.module("virtoCommerce.gdpr").controller("virtoCommerce.gdpr.contactListController",["$scope","virtoCommerce.gdpr.webApi","platformWebApp.bladeUtils","platformWebApp.uiGridHelper","platformWebApp.ui-grid.extension","platformWebApp.angularToMomentFormatConverter",function(e,t,r,o,i,a){e.uiGridConstants=o.uiGridConstants;var n=e.blade;n.title="gdpr.blades.contact-list.title",n.headIcon="fas fa-user-friends";var l=r.bladeNavigationService;n.refresh=function(r){n.isLoading=!0;var i={memberType:n.memberType,memberId:n.currentEntity.id,keyword:n.searchKeyword,deepSearch:!!n.searchKeyword,sort:o.getSortExpression(e),skip:(e.pageSettings.currentPage-1)*e.pageSettings.itemsPerPageCount,take:e.pageSettings.itemsPerPageCount,objectType:"Member"};n.searchCriteria&&angular.extend(i,n.searchCriteria),t.search(i,(function(t){n.isLoading=!1,e.pageSettings.totalItems=t.totalCount,Array.isArray(t.results)&&t.results.length&&(_.each(t.results,(function(e){if(e.securityAccounts[0]?(e.email=e.securityAccounts[0].email??"",e.login=e.securityAccounts[0].userName??""):(e.email="",e.login=""),e.birthDate){const t=["January","February","March","April","May","June","July","August","September","October","November","December"],r=new Date(e.birthDate);e.birthday=t[r.getMonth()]+" "+r.getDate()+", "+r.getFullYear()}else e.birthday=""})),t.results[0].outerId||(t.results[0].outerId=null)),e.listEntries=t.results?t.results:[]})),r&&n.parentRefresh&&n.parentRefresh()},e.selectNode=function(t){e.selectedNodeId=t.id;var r={id:"contactDetail",currentEntityId:t.id,currentEntity:t,title:t.fullName,subtitle:"gdpr.blades.contact-detail.subtitle",controller:"virtoCommerce.gdpr.contactDetailController",template:"modules/$(VirtoCommerce.GDPR)/scripts/blades/contact-detail.tpl.html"};l.showBlade(r,n)},n.toolbarCommands=[{name:"platform.commands.refresh",icon:"fa fa-refresh",executeMethod:n.refresh,canExecuteMethod:function(){return!0}}];var c=n.filter={keyword:null};c.criteriaChanged=function(){null===c.keyword&&(n.memberType=void 0),e.pageSettings.currentPage>1?e.pageSettings.currentPage=1:n.refresh()},e.setGridOptions=function(t,o){e.gridOptions=o,i.tryExtendGridOptions(t,o),o.onRegisterApi=function(t){e.gridApi=t,t.core.on.sortChanged(e,(function(){n.isLoading||n.refresh()}))},r.initializePagination(e)},e.clearKeyword=function(){n.searchKeyword=null,n.refresh()}}]),angular.module("virtoCommerce.gdpr").controller("virtoCommerce.gdpr.gdprMainController",["$scope","platformWebApp.dialogService","platformWebApp.bladeUtils","platformWebApp.uiGridHelper","virtoCommerce.customerModule.memberTypesResolverService","platformWebApp.ui-grid.extension",function(e,t,r,o,i,a){e.selectedNodeId=null;var n=e.blade;n.title="gdpr.blades.main-title",n.subtitle="gdpr.blades.main-subtitle",n.headIcon="fas fa-key";var l,c=r.bladeNavigationService;n.openBlade=function(t){e.selectedNodeId=t.id,c.showBlade({id:"contactList",currentEntity:{id:null},title:"gdpr.blades.contact-list.title",controller:"virtoCommerce.gdpr.contactListController",template:"Modules/$(VirtoCommerce.GDPR)/Scripts/blades/contact-list.tpl.html"},n)},l=[{id:1,entityName:"customers",name:"Customers",icon:"fas fa-user"}],n.currentEntities=l,n.isLoading=!1,n.openBlade(l[0])}]),angular.module("virtoCommerce.gdpr").factory("virtoCommerce.gdpr.webApi",["$resource",function(e){return e("api/gdpr",{},{search:{method:"POST",url:"api/gdpr/contacts/search"},delete:{method:"DELETE",url:"api/gdpr/contacts/delete"}})}])})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TyxzQkFDVnVILFFBQVEsNEJBQTZCLENBQUMsWUFBYSxTQUFVQyxHQUMxRCxPQUFPQSxFQUFVLFdBQVksR0FBSSxDQUM3QmhELE9BQVEsQ0FBRWlELE9BQVEsT0FBUXBILElBQUssNEJBQy9Cb0MsT0FBUSxDQUFFZ0YsT0FBUSxTQUFVcEgsSUFBSyxrQyIsInNvdXJjZXMiOlsid2VicGFjazovL1ZpcnRvQ29tbWVyY2UuR0RQUi8uL1NjcmlwdHMvbW9kdWxlLmpzIiwid2VicGFjazovL1ZpcnRvQ29tbWVyY2UuR0RQUi8uL1NjcmlwdHMvYmxhZGVzL2NvbnRhY3QtZGV0YWlsLmpzIiwid2VicGFjazovL1ZpcnRvQ29tbWVyY2UuR0RQUi8uL1NjcmlwdHMvYmxhZGVzL2NvbnRhY3QtbGlzdC5qcyIsIndlYnBhY2s6Ly9WaXJ0b0NvbW1lcmNlLkdEUFIvLi9TY3JpcHRzL2JsYWRlcy9nZHByLW1haW4uanMiLCJ3ZWJwYWNrOi8vVmlydG9Db21tZXJjZS5HRFBSLy4vU2NyaXB0cy9yZXNvdXJjZXMvZ2Rwci1hcGkuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIG1vZHVsZU5hbWUgPSAndmlydG9Db21tZXJjZS5nZHByJztcblxuaWYgKEFwcERlcGVuZGVuY2llcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgQXBwRGVwZW5kZW5jaWVzLnB1c2gobW9kdWxlTmFtZSk7XG59XG5cbmFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxuICAgIC5jb25maWcoWyckc3RhdGVQcm92aWRlcicsICckdXJsUm91dGVyUHJvdmlkZXInLFxuICAgICAgICBmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAgICAgICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgICAgICAgICAuc3RhdGUoJ3dvcmtzcGFjZS5nZHByJywge1xuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvR0RQUicsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnJChQbGF0Zm9ybSkvU2NyaXB0cy9jb21tb24vdGVtcGxhdGVzL2hvbWUudHBsLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAnJHNjb3BlJywgJ3BsYXRmb3JtV2ViQXBwLmJsYWRlTmF2aWdhdGlvblNlcnZpY2UnLCBmdW5jdGlvbiAoJHNjb3BlLCBibGFkZU5hdmlnYXRpb25TZXJ2aWNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0JsYWRlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJ2dkcHJNYWluJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50RW50aXR5OiB7IGlkOiBudWxsIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd2aXJ0b0NvbW1lcmNlLmdkcHIuZ2Rwck1haW5Db250cm9sbGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6ICdNb2R1bGVzLyQoVmlydG9Db21tZXJjZS5HRFBSKS9TY3JpcHRzL2JsYWRlcy9nZHByLW1haW4udHBsLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0Nsb3NpbmdEaXNhYmxlZDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxhZGVOYXZpZ2F0aW9uU2VydmljZS5zaG93QmxhZGUobmV3QmxhZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICBdKVxuXG4gICAgLnJ1bihbJ3BsYXRmb3JtV2ViQXBwLm1haW5NZW51U2VydmljZScsICdwbGF0Zm9ybVdlYkFwcC53aWRnZXRTZXJ2aWNlJywgJyRzdGF0ZScsXG4gICAgICAgIGZ1bmN0aW9uIChtYWluTWVudVNlcnZpY2UsIHdpZGdldFNlcnZpY2UsICRzdGF0ZSkge1xuICAgICAgICAgICAgdmFyIG1lbnVJdGVtID0ge1xuICAgICAgICAgICAgICAgIHBhdGg6ICdicm93c2UvR0RQUicsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2ZhcyBmYS1rZXknLFxuICAgICAgICAgICAgICAgIHRpdGxlOiAnR0RQUicsXG4gICAgICAgICAgICAgICAgcHJpb3JpdHk6IDEwMCxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uICgpIHsgJHN0YXRlLmdvKCd3b3Jrc3BhY2UuZ2RwcicpOyB9LFxuICAgICAgICAgICAgICAgIHBlcm1pc3Npb246ICdHRFBSOmFjY2VzcydcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBtYWluTWVudVNlcnZpY2UuYWRkTWVudUl0ZW0obWVudUl0ZW0pO1xuICAgICAgICB9XG4gICAgXSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCd2aXJ0b0NvbW1lcmNlLmdkcHInKVxyXG4gICAgLmNvbnRyb2xsZXIoJ3ZpcnRvQ29tbWVyY2UuZ2Rwci5jb250YWN0RGV0YWlsQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJ3BsYXRmb3JtV2ViQXBwLmRpYWxvZ1NlcnZpY2UnLCAndmlydG9Db21tZXJjZS5nZHByLndlYkFwaScsXHJcbiAgICAgICAgZnVuY3Rpb24gKCRzY29wZSwgZGlhbG9nU2VydmljZSwgZ2RwckFwaSkge1xyXG4gICAgICAgICAgICB2YXIgYmxhZGUgPSAkc2NvcGUuYmxhZGU7XHJcbiAgICAgICAgICAgIGJsYWRlLmhlYWRJY29uID0gJ2ZhcyBmYS1hZGRyZXNzLWNhcmQnO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gaW5pdGlhbGl6ZUJsYWRlKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGJsYWRlLmN1cnJlbnRFbnRpdHkgPSBhbmd1bGFyLmNvcHkoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBibGFkZS5vcmlnRW50aXR5ID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIGJsYWRlLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBkZWxldGVCbGFkZSgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkaWFsb2cgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdjb25maXJtRGVsZXRlJyxcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ2dkcHIuYmxhZGVzLmNvbnRhY3QtZGV0YWlsLmNvbW1hbmRzLnJlbW92ZS5tZXNzYWdlLnRpdGxlJyxcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnZ2Rwci5ibGFkZXMuY29udGFjdC1kZXRhaWwuY29tbWFuZHMucmVtb3ZlLm1lc3NhZ2UudGV4dCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uIChyZW1vdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlbW92ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxhZGUuaXNMb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdkcHJBcGkuZGVsZXRlKHsgaWQ6IGJsYWRlLmN1cnJlbnRFbnRpdHlJZCB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmJsYWRlQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibGFkZS5wYXJlbnRCbGFkZS5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRpYWxvZ1NlcnZpY2Uuc2hvd0NvbmZpcm1hdGlvbkRpYWxvZyhkaWFsb2cpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgYmxhZGUudG9vbGJhckNvbW1hbmRzID0gW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdnZHByLmJsYWRlcy5jb250YWN0LWRldGFpbC5jb21tYW5kcy5yZW1vdmUubGFiZWwnLCBpY29uOiAnZmFzIGZhLWVyYXNlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgZXhlY3V0ZU1ldGhvZDogZGVsZXRlQmxhZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FuRXhlY3V0ZU1ldGhvZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246ICd2aXJ0b0NvbW1lcmNlLmdkcHI6ZGVsZXRlJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgaW5pdGlhbGl6ZUJsYWRlKGJsYWRlLmN1cnJlbnRFbnRpdHkpO1xyXG4gICAgICAgIH1dKTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ3ZpcnRvQ29tbWVyY2UuZ2RwcicpXHJcbiAgICAuY29udHJvbGxlcigndmlydG9Db21tZXJjZS5nZHByLmNvbnRhY3RMaXN0Q29udHJvbGxlcicsIFsnJHNjb3BlJywgJ3ZpcnRvQ29tbWVyY2UuZ2Rwci53ZWJBcGknLCAncGxhdGZvcm1XZWJBcHAuYmxhZGVVdGlscycsICdwbGF0Zm9ybVdlYkFwcC51aUdyaWRIZWxwZXInLCAncGxhdGZvcm1XZWJBcHAudWktZ3JpZC5leHRlbnNpb24nLCAncGxhdGZvcm1XZWJBcHAuYW5ndWxhclRvTW9tZW50Rm9ybWF0Q29udmVydGVyJyxcclxuICAgICAgICBmdW5jdGlvbiAoJHNjb3BlLCBjb250YWN0cywgYmxhZGVVdGlscywgdWlHcmlkSGVscGVyLCBncmlkT3B0aW9uRXh0ZW5zaW9uLCBtb21lbnQpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnVpR3JpZENvbnN0YW50cyA9IHVpR3JpZEhlbHBlci51aUdyaWRDb25zdGFudHM7XHJcblxyXG4gICAgICAgICAgICB2YXIgYmxhZGUgPSAkc2NvcGUuYmxhZGU7XHJcbiAgICAgICAgICAgIGJsYWRlLnRpdGxlID0gJ2dkcHIuYmxhZGVzLmNvbnRhY3QtbGlzdC50aXRsZSc7XHJcbiAgICAgICAgICAgIGJsYWRlLmhlYWRJY29uID0gJ2ZhcyBmYS11c2VyLWZyaWVuZHMnO1xyXG4gICAgICAgICAgICB2YXIgYmxhZGVOYXZpZ2F0aW9uU2VydmljZSA9IGJsYWRlVXRpbHMuYmxhZGVOYXZpZ2F0aW9uU2VydmljZTtcclxuXHJcbiAgICAgICAgICAgIGJsYWRlLnJlZnJlc2ggPSBmdW5jdGlvbiAocGFyZW50UmVmcmVzaCkge1xyXG4gICAgICAgICAgICAgICAgYmxhZGUuaXNMb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHZhciBzZWFyY2hDcml0ZXJpYSA9IGdldFNlYXJjaENyaXRlcmlhKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGJsYWRlLnNlYXJjaENyaXRlcmlhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5leHRlbmQoc2VhcmNoQ3JpdGVyaWEsIGJsYWRlLnNlYXJjaENyaXRlcmlhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb250YWN0cy5zZWFyY2goc2VhcmNoQ3JpdGVyaWEsXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmxhZGUuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5wYWdlU2V0dGluZ3MudG90YWxJdGVtcyA9IGRhdGEudG90YWxDb3VudDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEucmVzdWx0cykgJiYgZGF0YS5yZXN1bHRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5lYWNoKGRhdGEucmVzdWx0cywgZnVuY3Rpb24gKGNvbnRhY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGFjdC5zZWN1cml0eUFjY291bnRzWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhY3QuZW1haWwgPSBjb250YWN0LnNlY3VyaXR5QWNjb3VudHNbMF0uZW1haWwgPz8gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhY3QubG9naW4gPSBjb250YWN0LnNlY3VyaXR5QWNjb3VudHNbMF0udXNlck5hbWUgPz8gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWN0LmVtYWlsID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhY3QubG9naW4gPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRhY3QuYmlydGhEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vbnRocyA9IFsnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkID0gbmV3IERhdGUoY29udGFjdC5iaXJ0aERhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWN0LmJpcnRoZGF5ID0gbW9udGhzW2QuZ2V0TW9udGgoKV0gKyAnICcgKyBkLmdldERhdGUoKSArICcsICcgKyBkLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFjdC5iaXJ0aGRheSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRhLnJlc3VsdHNbMF0ub3V0ZXJJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEucmVzdWx0c1swXS5vdXRlcklkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmxpc3RFbnRyaWVzID0gZGF0YS5yZXN1bHRzID8gZGF0YS5yZXN1bHRzIDogW107XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudFJlZnJlc2ggJiYgYmxhZGUucGFyZW50UmVmcmVzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJsYWRlLnBhcmVudFJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3ROb2RlID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZE5vZGVJZCA9IGRhdGEuaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG5ld0JsYWRlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnY29udGFjdERldGFpbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEVudGl0eUlkOiBkYXRhLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRFbnRpdHk6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGRhdGEuZnVsbE5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VidGl0bGU6ICdnZHByLmJsYWRlcy5jb250YWN0LWRldGFpbC5zdWJ0aXRsZScsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3ZpcnRvQ29tbWVyY2UuZ2Rwci5jb250YWN0RGV0YWlsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6ICdtb2R1bGVzLyQoVmlydG9Db21tZXJjZS5HRFBSKS9zY3JpcHRzL2JsYWRlcy9jb250YWN0LWRldGFpbC50cGwuaHRtbCdcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBibGFkZU5hdmlnYXRpb25TZXJ2aWNlLnNob3dCbGFkZShuZXdCbGFkZSwgYmxhZGUpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgYmxhZGUudG9vbGJhckNvbW1hbmRzID0gW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicGxhdGZvcm0uY29tbWFuZHMucmVmcmVzaFwiLCBpY29uOiAnZmEgZmEtcmVmcmVzaCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZXhlY3V0ZU1ldGhvZDogYmxhZGUucmVmcmVzaCxcclxuICAgICAgICAgICAgICAgICAgICBjYW5FeGVjdXRlTWV0aG9kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNpbXBsZSBhbmQgYWR2YW5jZWQgZmlsdGVyaW5nXHJcbiAgICAgICAgICAgIHZhciBmaWx0ZXIgPSBibGFkZS5maWx0ZXIgPSB7IGtleXdvcmQ6IG51bGwgfTtcclxuXHJcbiAgICAgICAgICAgIGZpbHRlci5jcml0ZXJpYUNoYW5nZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmtleXdvcmQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBibGFkZS5tZW1iZXJUeXBlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS5wYWdlU2V0dGluZ3MuY3VycmVudFBhZ2UgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnBhZ2VTZXR0aW5ncy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJsYWRlLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIHVpLWdyaWRcclxuICAgICAgICAgICAgJHNjb3BlLnNldEdyaWRPcHRpb25zID0gZnVuY3Rpb24gKGdyaWRJZCwgZ3JpZE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5ncmlkT3B0aW9ucyA9IGdyaWRPcHRpb25zO1xyXG4gICAgICAgICAgICAgICAgZ3JpZE9wdGlvbkV4dGVuc2lvbi50cnlFeHRlbmRHcmlkT3B0aW9ucyhncmlkSWQsIGdyaWRPcHRpb25zKTtcclxuXHJcbiAgICAgICAgICAgICAgICBncmlkT3B0aW9ucy5vblJlZ2lzdGVyQXBpID0gZnVuY3Rpb24gKGdyaWRBcGkpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZ3JpZEFwaSA9IGdyaWRBcGk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZEFwaS5jb3JlLm9uLnNvcnRDaGFuZ2VkKCRzY29wZSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWJsYWRlLmlzTG9hZGluZykgYmxhZGUucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBibGFkZVV0aWxzLmluaXRpYWxpemVQYWdpbmF0aW9uKCRzY29wZSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuY2xlYXJLZXl3b3JkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgYmxhZGUuc2VhcmNoS2V5d29yZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBibGFkZS5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRTZWFyY2hDcml0ZXJpYSgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZWFyY2hDcml0ZXJpYSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBtZW1iZXJUeXBlOiBibGFkZS5tZW1iZXJUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lbWJlcklkOiBibGFkZS5jdXJyZW50RW50aXR5LmlkLFxyXG4gICAgICAgICAgICAgICAgICAgIGtleXdvcmQ6IGJsYWRlLnNlYXJjaEtleXdvcmQsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVlcFNlYXJjaDogYmxhZGUuc2VhcmNoS2V5d29yZCA/IHRydWUgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzb3J0OiB1aUdyaWRIZWxwZXIuZ2V0U29ydEV4cHJlc3Npb24oJHNjb3BlKSxcclxuICAgICAgICAgICAgICAgICAgICBza2lwOiAoJHNjb3BlLnBhZ2VTZXR0aW5ncy5jdXJyZW50UGFnZSAtIDEpICogJHNjb3BlLnBhZ2VTZXR0aW5ncy5pdGVtc1BlclBhZ2VDb3VudCxcclxuICAgICAgICAgICAgICAgICAgICB0YWtlOiAkc2NvcGUucGFnZVNldHRpbmdzLml0ZW1zUGVyUGFnZUNvdW50LFxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6ICdNZW1iZXInXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBzZWFyY2hDcml0ZXJpYTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1dKTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ3ZpcnRvQ29tbWVyY2UuZ2RwcicpXHJcbiAgICAuY29udHJvbGxlcigndmlydG9Db21tZXJjZS5nZHByLmdkcHJNYWluQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJ3BsYXRmb3JtV2ViQXBwLmRpYWxvZ1NlcnZpY2UnLCAncGxhdGZvcm1XZWJBcHAuYmxhZGVVdGlscycsICdwbGF0Zm9ybVdlYkFwcC51aUdyaWRIZWxwZXInLCAndmlydG9Db21tZXJjZS5jdXN0b21lck1vZHVsZS5tZW1iZXJUeXBlc1Jlc29sdmVyU2VydmljZScsICdwbGF0Zm9ybVdlYkFwcC51aS1ncmlkLmV4dGVuc2lvbicsXHJcbiAgICAgICAgZnVuY3Rpb24gKCRzY29wZSwgZGlhbG9nU2VydmljZSwgYmxhZGVVdGlscywgdWlHcmlkSGVscGVyLCBtZW1iZXJUeXBlc1Jlc29sdmVyU2VydmljZSwgZ3JpZE9wdGlvbkV4dGVuc2lvbikge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWROb2RlSWQgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgdmFyIGJsYWRlID0gJHNjb3BlLmJsYWRlO1xyXG4gICAgICAgICAgICBibGFkZS50aXRsZSA9ICdnZHByLmJsYWRlcy5tYWluLXRpdGxlJztcclxuICAgICAgICAgICAgYmxhZGUuc3VidGl0bGUgPSAnZ2Rwci5ibGFkZXMubWFpbi1zdWJ0aXRsZSc7XHJcbiAgICAgICAgICAgIGJsYWRlLmhlYWRJY29uID0gJ2ZhcyBmYS1rZXknO1xyXG4gICAgICAgICAgICB2YXIgYmxhZGVOYXZpZ2F0aW9uU2VydmljZSA9IGJsYWRlVXRpbHMuYmxhZGVOYXZpZ2F0aW9uU2VydmljZTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGluaXRpYWxpemVCbGFkZSgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlbnRpdGllcyA9IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5TmFtZTogJ2N1c3RvbWVycycsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0N1c3RvbWVycycsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2ZhcyBmYS11c2VyJ1xyXG4gICAgICAgICAgICAgICAgfV07XHJcbiAgICAgICAgICAgICAgICBibGFkZS5jdXJyZW50RW50aXRpZXMgPSBlbnRpdGllcztcclxuICAgICAgICAgICAgICAgIGJsYWRlLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYmxhZGUub3BlbkJsYWRlKGVudGl0aWVzWzBdKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYmxhZGUub3BlbkJsYWRlID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZE5vZGVJZCA9IGRhdGEuaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG5ld0JsYWRlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnY29udGFjdExpc3QnLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRFbnRpdHk6IHsgaWQ6IG51bGwgfSxcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ2dkcHIuYmxhZGVzLmNvbnRhY3QtbGlzdC50aXRsZScsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3ZpcnRvQ29tbWVyY2UuZ2Rwci5jb250YWN0TGlzdENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiAnTW9kdWxlcy8kKFZpcnRvQ29tbWVyY2UuR0RQUikvU2NyaXB0cy9ibGFkZXMvY29udGFjdC1saXN0LnRwbC5odG1sJyxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBibGFkZU5hdmlnYXRpb25TZXJ2aWNlLnNob3dCbGFkZShuZXdCbGFkZSwgYmxhZGUpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaW5pdGlhbGl6ZUJsYWRlKCk7XHJcbiAgICAgICAgfV0pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgndmlydG9Db21tZXJjZS5nZHByJylcclxuICAgIC5mYWN0b3J5KCd2aXJ0b0NvbW1lcmNlLmdkcHIud2ViQXBpJywgWyckcmVzb3VyY2UnLCBmdW5jdGlvbiAoJHJlc291cmNlKSB7XHJcbiAgICAgICAgcmV0dXJuICRyZXNvdXJjZSgnYXBpL2dkcHInLCB7fSwge1xyXG4gICAgICAgICAgICBzZWFyY2g6IHsgbWV0aG9kOiAnUE9TVCcsIHVybDogJ2FwaS9nZHByL2NvbnRhY3RzL3NlYXJjaCcgfSxcclxuICAgICAgICAgICAgZGVsZXRlOiB7IG1ldGhvZDogJ0RFTEVURScsIHVybDogJ2FwaS9nZHByL2NvbnRhY3RzL2RlbGV0ZScgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfV0pO1xyXG4iXSwibmFtZXMiOlsibW9kdWxlTmFtZSIsInVuZGVmaW5lZCIsIkFwcERlcGVuZGVuY2llcyIsInB1c2giLCJhbmd1bGFyIiwibW9kdWxlIiwiY29uZmlnIiwiJHN0YXRlUHJvdmlkZXIiLCIkdXJsUm91dGVyUHJvdmlkZXIiLCJzdGF0ZSIsInVybCIsInRlbXBsYXRlVXJsIiwiY29udHJvbGxlciIsIiRzY29wZSIsImJsYWRlTmF2aWdhdGlvblNlcnZpY2UiLCJzaG93QmxhZGUiLCJpZCIsImN1cnJlbnRFbnRpdHkiLCJ0ZW1wbGF0ZSIsImlzQ2xvc2luZ0Rpc2FibGVkIiwicnVuIiwibWFpbk1lbnVTZXJ2aWNlIiwid2lkZ2V0U2VydmljZSIsIiRzdGF0ZSIsIm1lbnVJdGVtIiwicGF0aCIsImljb24iLCJ0aXRsZSIsInByaW9yaXR5IiwiYWN0aW9uIiwiZ28iLCJwZXJtaXNzaW9uIiwiYWRkTWVudUl0ZW0iLCJkaWFsb2dTZXJ2aWNlIiwiZ2RwckFwaSIsImRhdGEiLCJibGFkZSIsImhlYWRJY29uIiwidG9vbGJhckNvbW1hbmRzIiwibmFtZSIsImV4ZWN1dGVNZXRob2QiLCJkaWFsb2ciLCJtZXNzYWdlIiwiY2FsbGJhY2siLCJyZW1vdmUiLCJpc0xvYWRpbmciLCJkZWxldGUiLCJjdXJyZW50RW50aXR5SWQiLCJibGFkZUNsb3NlIiwicGFyZW50QmxhZGUiLCJyZWZyZXNoIiwic2hvd0NvbmZpcm1hdGlvbkRpYWxvZyIsImNhbkV4ZWN1dGVNZXRob2QiLCJjb3B5Iiwib3JpZ0VudGl0eSIsImNvbnRhY3RzIiwiYmxhZGVVdGlscyIsInVpR3JpZEhlbHBlciIsImdyaWRPcHRpb25FeHRlbnNpb24iLCJtb21lbnQiLCJ1aUdyaWRDb25zdGFudHMiLCJwYXJlbnRSZWZyZXNoIiwic2VhcmNoQ3JpdGVyaWEiLCJtZW1iZXJUeXBlIiwibWVtYmVySWQiLCJrZXl3b3JkIiwic2VhcmNoS2V5d29yZCIsImRlZXBTZWFyY2giLCJzb3J0IiwiZ2V0U29ydEV4cHJlc3Npb24iLCJza2lwIiwicGFnZVNldHRpbmdzIiwiY3VycmVudFBhZ2UiLCJpdGVtc1BlclBhZ2VDb3VudCIsInRha2UiLCJvYmplY3RUeXBlIiwiZXh0ZW5kIiwic2VhcmNoIiwidG90YWxJdGVtcyIsInRvdGFsQ291bnQiLCJBcnJheSIsImlzQXJyYXkiLCJyZXN1bHRzIiwibGVuZ3RoIiwiXyIsImVhY2giLCJjb250YWN0Iiwic2VjdXJpdHlBY2NvdW50cyIsImVtYWlsIiwibG9naW4iLCJ1c2VyTmFtZSIsImJpcnRoRGF0ZSIsIm1vbnRocyIsImQiLCJEYXRlIiwiYmlydGhkYXkiLCJnZXRNb250aCIsImdldERhdGUiLCJnZXRGdWxsWWVhciIsIm91dGVySWQiLCJsaXN0RW50cmllcyIsInNlbGVjdE5vZGUiLCJzZWxlY3RlZE5vZGVJZCIsIm5ld0JsYWRlIiwiZnVsbE5hbWUiLCJzdWJ0aXRsZSIsImZpbHRlciIsImNyaXRlcmlhQ2hhbmdlZCIsInNldEdyaWRPcHRpb25zIiwiZ3JpZElkIiwiZ3JpZE9wdGlvbnMiLCJ0cnlFeHRlbmRHcmlkT3B0aW9ucyIsIm9uUmVnaXN0ZXJBcGkiLCJncmlkQXBpIiwiY29yZSIsIm9uIiwic29ydENoYW5nZWQiLCJpbml0aWFsaXplUGFnaW5hdGlvbiIsImNsZWFyS2V5d29yZCIsIm1lbWJlclR5cGVzUmVzb2x2ZXJTZXJ2aWNlIiwiZW50aXRpZXMiLCJvcGVuQmxhZGUiLCJlbnRpdHlOYW1lIiwiY3VycmVudEVudGl0aWVzIiwiZmFjdG9yeSIsIiRyZXNvdXJjZSIsIm1ldGhvZCJdLCJzb3VyY2VSb290IjoiIn0=