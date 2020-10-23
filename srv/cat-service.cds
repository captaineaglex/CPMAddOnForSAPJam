using com.sabanci as sb from '../db/data-model';

service CatalogService {

  entity FeedEntry as projection on sb.FeedEntry;
  entity Blacklist as projection on sb.Blacklist;
 /* entity  Blacklist as select from sb.Blacklist {
    *,
    null as Activeness: Integer,
    null as PossibleAction: String

  }*/
  
  //actions { action ChangeStatus ();}

  
}
