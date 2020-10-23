using from './monitor-service';
annotate MonitorService.FeedEntry with @(
    UI: {
        Identification: [ {Value: ID} ],
        LineItem: [
            {Value: FullName},
            {Value: Email},
            {Value: Company},
            {Value: FeedTime},
            {Value: ContainedBL},
            {Value: IsInappropriate}

            //{$Type: 'UI.DataFieldForAnnotation', Label: 'Mark as Inappropriate', Target : '@UI.FieldGroup#Inappropriate'},
        ],
        HeaderInfo: {
            TypeName: '{i18n>FeedEntry}',
            TypeNamePlural: '{i18n>FeedEntries}',
            Title: {Value: '{i18n>FeedEntry}'}  
        },
        /*HeaderFacets: [
            {$Type: 'UI.ReferenceFacet', Label: '{i18n>General}', Target: '@UI.FieldGroup#ChangeLog'}
        ],*/
        Facets: [
			{$Type: 'UI.ReferenceFacet', Label: '{i18n>General}', Target: '@UI.FieldGroup#General'},
            {$Type: 'UI.ReferenceFacet', Label: 'Feed Details', Target: '@UI.FieldGroup#Details'},
           // {$Type: 'UI.ReferenceFacet', Label: 'Change Status', Target: '@UI.FieldGroup#Status'}
		],
		FieldGroup#General: {
			Data: [
				{Value: FeedTime},
                {Value: FullName},
                {Value: Email},
				{Value: Company} 
			]
		},
        FieldGroup#Details: {
			Data: [
				{Value: FeedType},
                {Value: FeedTarget},
                {Value: FeedContent},
                {Value: ContainedBL},
				{Value: IsInappropriate},
			]
		},
       /* FieldGroup#Status: {
			Data: [
				{$Type: 'UI.DataFieldForAnnotation', Label: 'Mark as Appropriate', Target : '@UI.FieldGroup#Appropriate'},
                {$Type: 'UI.DataFieldForAnnotation', Label: 'Mark as Inappropriate', Target : '@UI.FieldGroup#Inappropriate'},
			]
		},*/


       /* FieldGroup#Appropriate : {
            Data : [
                {
                $Type  : 'UI.DataFieldForAction',
                Label  : 'Mark as Appropriate',
                Action : 'MonitorService.MarkAsAppropriate',
        }]},*/

       /* FieldGroup#Inappropriate : {
            Data : [
                {
                $Type  : 'UI.DataFieldForAction',
                Label  : 'Mark as Inappropriate',
                Action : 'MarkAsInappropriate',
        }]},*/
    }
);


annotate MonitorService.FeedEntry with {
    FeedTime @(
        title:'{i18n>FeedTime}',
        FieldControl.ReadOnly,
    );
    FullName @(
        title:'{i18n>FullName}',
        FieldControl.ReadOnly,
    );
    Email @(
        title:'{i18n>Email}',
        FieldControl.ReadOnly,
    );
    Company @(
        title:'{i18n>Company}',
        FieldControl.ReadOnly,
    );
    FeedType @(
        title: '{i18n>FeedType}',
        FieldControl.ReadOnly,
    );   
    FeedTarget @(
        title: '{i18n>FeedTarget}',
        FieldControl.ReadOnly,
    );
    FeedContent @(
        title: '{i18n>FeedContent}',
        FieldControl.ReadOnly,
    );

    ContainedBL @(
        title: '{i18n>ContainedBL}',
        FieldControl.ReadOnly,
    );
    IsInappropriate @title: '{i18n>IsInappropriate}';

}
annotate MonitorService.FeedEntry with @odata.draft.enabled;
annotate MonitorService.FeedEntry with @(
    
    Capabilities:{
        DeleteRestrictions.Deletable: false,
        InsertRestrictions.Insertable: false 
        });


//annotate CatalogService with @impl:'./cat-service.js';
