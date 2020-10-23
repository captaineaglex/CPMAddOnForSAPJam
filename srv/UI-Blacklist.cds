using from './monitor-service';
annotate MonitorService.Blacklist with @(
    UI: {
        Identification: [ {Value: ID} ],
        LineItem: [
            {Value: Word},
            {Value: Category},
            {Value: IsActive, Criticality: Activeness},
            {Value: DateDisabled},
            //{$Type: 'UI.DataFieldForAnnotation', Label: 'Change Status',Criticality: Activeness, Target : '@UI.FieldGroup#Enable'}
        ],
        /*
        HeaderInfo: {
            TypeName: '{i18n>Blacklist}',
            TypeNamePlural: '{i18n>Blacklists}',
            Title: {Value: '{i18n>Word}'}  
        },*/
        /*HeaderFacets: [
            {$Type: 'UI.Facet', Label: '{i18n>General}', Target: '@UI.FieldGroup#General'}
        ],*/
        Facets: [
			{$Type: 'UI.ReferenceFacet', Label: 'General', Target: '@UI.FieldGroup#General'},
            {$Type: 'UI.ReferenceFacet', Label: 'ChangeLog', Target: '@UI.FieldGroup#ChangeLog'}
		],
		FieldGroup#General: {
			Data: [
				{Value: Word},
                {Value: Category},
                {Value: IsActive},
				//{Value: DateAdded},
				//{Value: DateEnabled},
				{Value: DateDisabled} 
			]
		},
        FieldGroup#ChangeLog: {
			Data: [
				{Value: createdAt},
                {Value: createdBy},
                {Value: modifiedAt},
                {Value: modifiedBy},
				//{Value: DateAdded},
				//{Value: DateEnabled},
				//{Value: DateDisabled} 
			]
		},
        FieldGroup#Enable : 
        {Data : [{
        $Type  : 'UI.DataFieldForAction',
        Label  : 'Change Status',
        Action : 'CatalogService.ChangeStatus',
        }]},
    }
){
    //DateAdded @UI.Hidden: true;

};

annotate MonitorService.Blacklist with {
    Word @(
        title:'{i18n>Word}',
    );
    DateAdded @(
        title:'{i18n>DateAdded}',
        UI.Hidden: false);
    DateDisabled @title:'{i18n>DateDisabled}';
    IsActive @(
        title:'{i18n>IsActive}',
        Common: {
            FieldControl: #Mandatory},
    );
    Category @(
        title: '{i18n>Category}',
        Common: {
            FieldControl: #Mandatory},
        ValueList.entity: 'Categories',
    )    
}


//annotate MonitorService.Blacklist with @fiori.draft.enabled ;
annotate MonitorService.Blacklist with @odata.draft.enabled;
annotate MonitorService.Blacklist with @(Capabilities:{DeleteRestrictions.Deletable: false});
annotate MonitorService.Blacklist with {
    modifiedAt @cds.on.insert:$now;
    modifiedBy @cds.on.insert:$user;
    createdAt @cds.on.insert:$now;
    createdBy @cds.on.insert:$user;
    
    //DateAdded @cds.on.insert:$now;
    //DateEnabled @cds.on.insert:$now;
    //IsActive @cds.on.insert: true;

}
//annotate MonitorService with @impl:'./cat-service.js';
