using from './monitor-service';


annotate MonitorService with @(requires: 'blacklistadmin');


annotate MonitorService.FeedEntry with @(restrict: [
  { grant: '*', to: 'blacklistadmin', where: '$user.company = Company'  }
]);

