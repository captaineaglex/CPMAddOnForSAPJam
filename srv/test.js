const axios = require('axios');
//const JAM_BASE_URL = process.env.JAM_BASE_URL;
const JAM_BASE_URL = "https://jam2.sapjam.com";
//const JAM_OAUTH_TOKEN = process.env.JAM_OAUTH_TOKEN;
const JAM_OAUTH_TOKEN = "72KHkhJadI9wRCnMQnMvi5eXVEFP4TNDy4UW5jaa";
//const ADMIN_GROUP_ID = process.env.ADMIN_GROUP_ID;
const ADMIN_GROUP_ID = "DWyeqeXYqzcePBg82YTlCL"

 
async function SendMessage(MemberId, MessageContent) {
    
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
    }


//let MsgToContentOwner = "Gönderiniz incelendikten sonra uygun bulunumuştur. Gönderinizi aşağıdaki şekilde kopyala yapıştır yaparsanız, yayınlanacaktır.\n\n -------------------- \n\n gönderinin içeriği \n\n --------------------- \n\n Always Post Responsibly"
//let MsgToContentOwner = "test mesaj"
//SendMessage('Hfogt9BM8GDYr6xzNMJ6Lq',MsgToContentOwner)
let x = `Content Title: a.q. Content: <p>amk</p>`
let ContentTitle = x.substring(15,x.search('Content:'))
let Content = x.substring(x.search('Content:')+8,x.length)
Content = Content.replace('<p>',"")
Content = Content.replace('</p>',"")
let y = "sap";
let MsgToContentOwner = `Gönderiniz incelendikten sonra uygun bulunmuştur. Gönderinizi aşağıdaki şekilde kopyala yapıştır yaparsanız, yayınlanacaktır.\n\n -------------------- \n\n Başlık: ${ContentTitle}\n\n -----------------------\n\n İçerik: ${Content} \n\n --------------------- \n\n Always Post Responsibly`
console.log(y.toUpperCase())