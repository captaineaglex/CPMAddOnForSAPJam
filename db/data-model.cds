namespace com.sabanci;

using { Country, managed, sap } from '@sap/cds/common';

  entity FeedEntry {
    key FeedId : String;
    FeederId   : String;
    FullName   : String;
    Email      : String;    
    Company    : String;
    FeedTime   : DateTime;
    FeedType   : String;
    FeedTargetType: String;
    FeedTarget : String;
    FeedTargetId: String;
    FeedContent: String;
    ContainedBL: String;
    IsInappropriate: Boolean;
  }


  entity Blacklist: managed {

    key ID: UUID;
    Word  : String;
    Category: String;
    IsActive : Boolean;
    Activeness: Integer;
    DateDisabled: DateTime;
  }

