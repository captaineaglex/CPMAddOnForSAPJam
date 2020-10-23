const axios = require('axios');
const JAM_BASE_URL = process.env.JAM_BASE_URL;
//const JAM_BASE_URL = "https://jam2.sapjam.com";
const JAM_OAUTH_TOKEN = process.env.JAM_OAUTH_TOKEN;
//const JAM_OAUTH_TOKEN = "72KHkhJadI9wRCnMQnMvi5eXVEFP4TNDy4UW5jaa";
const ADMIN_GROUP_ID = process.env.ADMIN_GROUP_ID;
const SABANCI_SOCIAL_ADMIN_ID = process.env.SABANCI_SOCIAL_ADMIN_ID;
//const ADMIN_GROUP_ID = "DWyeqeXYqzcePBg82YTlCL";

//"{\"Text\": \"Uygunsuz bir içerik paylaştınız. İçeriğiniz incelendikten sonra size haber verilecektir!\"}");
//Members('%s')/Messages",ActorId

//https://developer.sapjam.com/api/v1/OData/Group_Join?Id='SV15R9N1u5HGaJZEFddzYh'

//https://developer.sapjam.com/api/v1/OData/Groups('SV15R9N1u5HGaJZEFddzYh')/Memberships


module.exports = {
    
    SendMessage: async function(MemberId, MessageContent) {
    
        console.log(`I am sending SAP Jam message to Member Id = ${MemberId}`)
        
        const config = {
            //method: 'post',
            
            headers: { 'Authorization' : `Bearer ${JAM_OAUTH_TOKEN}`,
                   'Accept' : 'application/json',
                   'Content-Type' : 'application/json'
            }   
        }

        params = {
            Text : `${MessageContent}`,
        }

        let url = `${JAM_BASE_URL}/api/v1/OData/Members('${MemberId}')/Messages`
   
        await axios.post(url,params,config).then(response => {

            console.log(`Status of sending message to ${MemberId} is ${response.status} ${response.statusText}`)
        
        })
    },

    SendMessageToGroupAdmins: async function(TargetId,MessageContent,ContentType) {
        //If FeedType is a comment on a content item like page or blog then TargetId is actually ContentItem Id.
        console.log(`I am getting the admin for Group Id = ${TargetId} for ${ContentType}`)


        if (ContentType!='GroupEntity') {
            
            const config = {
                method: 'get',
                url: `${JAM_BASE_URL}/api/v1/OData/ContentItems(Id='${TargetId}',ContentItemType='${ContentType}')/Group?$expand=Memberships&$select=Memberships`,
                headers: { 'Authorization' : `Bearer ${JAM_OAUTH_TOKEN}`,
                       'Accept' : 'application/json',
                       'Content-Type' : 'application/json'
                }   
            }   
            let response = await axios(config)
            console.log(`Status of Getting the admin of Group ${TargetId} where this ${ContentType} was commented is ${response.status} ${response.statusText}`)
            
            response.data.d.results.Memberships.results.forEach(results => {
            if (results.MemberType === 'admin'){
                console.log(`Group Admin is  ${results.MemberId} `)
                this.SendMessage(results.MemberId,MessageContent)
            }     
        });

        } else {
            const config = {
                method: 'get', 
                url: `${JAM_BASE_URL}/api/v1/OData/Groups('${TargetId}')/Memberships?$select=MemberId,MemberType`,
                headers: { 'Authorization' : `Bearer ${JAM_OAUTH_TOKEN}`,
                       'Accept' : 'application/json',
                       'Content-Type' : 'application/json'
                }   
            }
                   
            let response = await axios(config)
            console.log(`Status of Getting the admin of Group ${TargetId} is ${response.status} ${response.statusText}`)
            response.data.d.results.forEach(results => {
            if (results.MemberType === 'admin'){
                console.log(`Group Admin is  ${results.MemberId} `)
                this.SendMessage(results.MemberId,MessageContent)
            }  
            
        });
            
        }
    },
    SendMessageToCompanyAdmins: async function(MessageContent,Company) {
    
        console.log(`I am getting the Company admins from Company Admin Group Id = ${ADMIN_GROUP_ID}`)
       
    
        
        const config = {
            method: 'get',
            url: `${JAM_BASE_URL}/api/v1/OData/Groups('${ADMIN_GROUP_ID}')/Memberships?$expand=Member&$select=Member`,
            headers: { 'Authorization' : `Bearer ${JAM_OAUTH_TOKEN}`,
                   'Accept' : 'application/json',
                   'Content-Type' : 'application/json'
            }   
        }
   
        //let Admins = new Array()
        let response = await axios(config)
        console.log(`Status of Getting company admins is ${response.status} ${response.statusText}`)
        //let index = 0;
        let Email = new String
        response.data.d.results.forEach(results => {
            Email = results.Member.Email
            if ( Company === Email.substring(Email.indexOf('@')+1,Email.lastIndexOf('.'))) {
                console.log(`Company Admin is  ${results.Member.FullName} for ${Company}`)
                this.SendMessage(results.Member.Id,MessageContent)
            }  
            
        });

    },

    HandleInappropriateFeed: async function(Feed){
    let MsgToCompAdmin = `${Feed.FullName} adlı kişinin paylaşımında kullandığı “${Feed.ContainedBL}” içeriği uygunsuz bulunmuştur. Bilginize.\n\n${Feed.Company.toUpperCase()} Şirketi İçerik Kontrol Ekibi`
    let MsgToSabanciSocialAdmins = `${Feed.Company.toUpperCase()} şirketinden ${Feed.FullName} adlı kişinin paylaşımında kullandığı “${Feed.ContainedBL}” içeriği uygunsuz bulunmuştur. Bilginize.\n\n${Feed.Company.toUpperCase()} Şirketi İçerik Kontrol Ekibi`
    let MsgToGrpAdmin= `Admini olduğunuz ${Feed.FeedTarget} Grubunda, ${Feed.FullName} adlı kişinin paylaşımında kullandığı “${Feed.ContainedBL}” içeriği uygunsuz bulunmuştur. Bilginize.\n\n${Feed.Company.toUpperCase()} Şirketi İçerik Kontrol Ekibi`
    let MsgToContentOwner = `“${Feed.ContainedBL}” içeriğini barındıran paylaşımınız incelendi ve Sabancı Social Platformu kullanım koşullarına aykırı bulundu. Bu tarz paylaşımlar yapmamanızı rica ederiz.\n\n${Feed.Company.toUpperCase()} Şirketi İçerik Kontrol Ekibi`
    let ContentType = new String
    console.log(Feed.FeedType)
    console.log(Feed.FeedTargetType)
    console.log(Feed.IsInappropriate)
    switch (Feed.FeedTargetType) {

        case 'Group':
            ContentType= 'GroupEntity'
            console.log(`Feed is posted on Group ${Feed.FeedTarget}'s wall. Sending message to ${Feed.Company.toUpperCase()}'s admins and ${Feed.FeedTarget} group admins`)
            this.SendMessageToGroupAdmins(Feed.FeedTargetId,MsgToGrpAdmin,ContentType)
            this.SendMessageToCompanyAdmins(MsgToCompAdmin,Feed.Company)
            this.SendMessage(Feed.FeederId,MsgToContentOwner)
            this.SendMessage(SABANCI_SOCIAL_ADMIN_ID,MsgToSabanciSocialAdmins)
            break; 

        case 'ContentItem':
            if (Feed.FeedType.includes('wiki')) {
                ContentType = 'Page'
            } else if (Feed.FeedType.includes('blog')) {
                ContentType = 'BlogEntry'
            } else if (Feed.FeedType.includes('document')) {
                ContentType = 'Document'
            } else if (Feed.FeedType.includes('link')) {
                ContentType = 'Link'
            } else if (Feed.FeedType.includes('poll')) {
                ContentType = 'Poll'
            } else if (Feed.FeedType.includes('tool')) {
                ContentType = 'Tool'
            }
            console.log(`Feed is posted on ${Feed.FeedTarget}'s profile wall. Sending message to ${Feed.Company}'s admins`)
            this.SendMessageToGroupAdmins(Feed.FeedTargetId,MsgToGrpAdmin,ContentType)
            this.SendMessageToCompanyAdmins(MsgToCompAdmin,Feed.Company)
            this.SendMessage(Feed.FeederId,MsgToContentOwner)
            this.SendMessage(SABANCI_SOCIAL_ADMIN_ID,MsgToSabanciSocialAdmins)
            break;
    
        default:
            this.SendMessageToCompanyAdmins(MsgToCompAdmin,Feed.Company)
            this.SendMessage(Feed.FeederId,MsgToContentOwner)
            this.SendMessage(SABANCI_SOCIAL_ADMIN_ID,MsgToSabanciSocialAdmins)
            break;
        }
    },

    HandleAppropriateFeed: async function(Feed){
        let MsgToContentOwner = new String
       
        let ContentTitle = Feed.FeedContent.substring(15,Feed.FeedContent.search('Content:'))
        let Content = Feed.FeedContent.substring(Feed.FeedContent.search('Content:')+8,Feed.FeedContent.length)
        Content = Content.replace('<p>',"")
        Content = Content.replace('</p>',"")

        switch (Feed.FeedType) {
            case 'Page':
                MsgToContentOwner = `Gönderiniz, incelememiz sonrasında paylaşımınız için uygun bulunmuştur. Aşağıdaki gönderinizi kopyala yapıştır yaparak yeniden paylaşabilirsiniz.\n\n -------------------- \n\n Başlık: ${ContentTitle}\n\n -----------------------\n\n İçerik: ${Content} \n\n ---------------------`
                break;
            
            case 'BlogEntry':
                MsgToContentOwner = `Gönderiniz, incelememiz sonrasında paylaşımınız için uygun bulunmuştur. Aşağıdaki gönderinizi kopyala yapıştır yaparak yeniden paylaşabilirsiniz.\n\n -------------------- \n\n Başlık: ${ContentTitle}\n\n -----------------------\n\n İçerik: ${Content} \n\n ---------------------`
                break;
        
            default:
                MsgToContentOwner = `Gönderiniz, incelememiz sonrasında paylaşımınız için uygun bulunmuştur. Aşağıdaki gönderinizi kopyala yapıştır yaparak yeniden paylaşabilirsiniz.\n\n -------------------- \n\n ${Feed.FeedContent} \n\n ----------------------`
                break;
        }
        this.SendMessage(Feed.FeederId,MsgToContentOwner)
    },

}