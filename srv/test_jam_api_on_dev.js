const axios = require('axios');
const JAM_BASE_URL = "https://developer.sapjam.com";
const HANA_BASE_URL = "https://i068050trial-dev-sabanciecpm-srv.cfapps.eu10.hana.ondemand.com";
const JAM_OAUTH = "Dk0e466Z3WcptccCeYufx8x9RRHYMrRz1lj4kXyH";
const JAM_OAUTH_ADMIN = "IkCwYTIWmSnARY5Hp8pnzcfDwPHi0AYg7q2O1LwS";

//"{\"Text\": \"Uygunsuz bir içerik paylaştınız. İçeriğiniz incelendikten sonra size haber verilecektir!\"}");
//Members('%s')/Messages",ActorId

//https://developer.sapjam.com/api/v1/OData/Group_Join?Id='SV15R9N1u5HGaJZEFddzYh'

//https://developer.sapjam.com/api/v1/OData/Groups('SV15R9N1u5HGaJZEFddzYh')/Memberships


module.exports = {
    
    SendMessage: async function(MemberId, MessageContent) {
    
        console.log(`I am sending SAP Jam message to Member Id = ${MemberId}`)
        
        const config = {
            //method: 'post',
            
            headers: { 'Authorization' : `Bearer ${JAM_OAUTH}`,
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

    GetGroupAdmin: async function(GroupId) {
    
        console.log(`I am getting the admin for Group Id = ${GroupId}`)
       
    
        
        const config = {
            method: 'get',
            url: `${JAM_BASE_URL}/api/v1/OData/Comments('${CommentId}')/Creator`,
            headers: { 'Authorization' : `Bearer ${JAM_OAUTH}`,
                   'Accept' : 'application/json',
                   'Content-Type' : 'application/json'
            }   
        }
   
        let response = await axios(config)

        console.log(`Status of Getting the creator of Comment ${CommentId} is ${response.status} ${response.statusText}`)
        console.log(`Data is  ${response.data.d.results.FullName}`)
        return response.data.d.results;
    },

  


}