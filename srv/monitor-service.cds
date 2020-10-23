using com.sabanci as sb from '../db/data-model';

service MonitorService {

entity Blacklist as projection on sb.Blacklist;
entity FeedEntry as SELECT from sb.FeedEntry {
*
} order by FeedTime desc; 

action MarkAsInappropriate(feed: FeedEntry.Email);

entity Categories as select from sb.Blacklist{
    key Category,
  } group by Category;

}

// @(restrict: [ 
//    { grant: '*', where: 'buyer = $user' },
//  ])