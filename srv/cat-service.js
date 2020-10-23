const cds = require('@sap/cds')



module.exports = cds.service.impl (async function() {
  /*
  this.before('READ', 'Blacklist', req =>{
    console.log('Username: '+ req.user)
    console.log('User IdP group: '+ req.user.groups)
    console.log('User Company: '+ req.user.company)
    console.log('Username: '+ req.user.mail)
    console.log('User in SAbanciSocialECPM Role collection: '+ req.user.is('SabanciSocialECPM'))
    console.log('User in blacklist admin: '+ req.user.is('blacklistadmin'))
  })*/
  
  
  
  
  /*
  this.after('READ', 'Blacklist', each =>{
    each.Activeness = each.IsActive === true ? 3 : 1

  })*/
  
  
  
  this.before ('NEW','Blacklist', req => {
    let ts = Date.now()
    let reqtime = new Date(ts)
    let UpdateTime = reqtime.toLocaleDateString()
    if (UpdateTime.length === 9) {
    UpdateTime=0+UpdateTime 
    UpdateTime = UpdateTime.substr(6,4)+'-'+UpdateTime.substr(0,2)+'-'+UpdateTime.substr(3,2)
    }
    else {UpdateTime = UpdateTime.substr(6,4)+'-'+UpdateTime.substr(0,2)+'-'+UpdateTime.substr(3,2)}
    //req.data.DateAdded = UpdateTime
    })

  this.before ('CREATE','Blacklist', req => {
      let ts = Date.now()
      let reqtime = new Date(ts)
      let NewBL = req.data.Word
      let User = req.user
      
      console.log('New word('+NewBL+')is added to the Blacklist by '+User+' on '+reqtime)
    })



  this.before('PATCH','Blacklist', req =>{
        console.log('The word with the ID('+req.data.ID+') is being edited by '+req.user+' now ')
        console.log('Activeness is changed to: '+req.data.IsActive)
        console.log('Category is changed to: '+req.data.Category)
        let ts = Date.now()
        let reqtime = new Date(ts)
        let UpdateTime = reqtime.toUTCString()
        //req.data.DateDisabled = req.data.IsActive === false ? reqtime: null
        console.log ('IsActive '+ req.data.IsActive)
        console.log ('Date Disabled is '+ req.data.DateDisabled)
        console.log ('UpdateTime is (UTC)'+ UpdateTime)
        console.log ('Request Time is '+ reqtime)
        console.log ('Request Time (Locale) is '+ reqtime.toLocaleDateString())
        console.log ('Get Date is '+ reqtime.getUTCDate())
        console.log ('Get Day is '+ reqtime.getUTCDay())
        console.log ('Get Year is '+ reqtime.getUTCFullYear())
        console.log ('Get Month is '+ reqtime.getUTCMonth())
        console.log ('Get Hour is '+ reqtime.getUTCHours())
        console.log ('Get Minute is '+ reqtime.getUTCMinutes())
        console.log ('Get Second is '+ reqtime.getUTCSeconds())
        console.log ('ModifiedAt is '+ req.data.modifiedAt)

    })
  
  this.before ('UPDATE','Blacklist', req => {
      let ts = Date.now()
      let reqtime = new Date(ts)
      let UpdateTime = reqtime.toUTCString()
      console.log('First UpdateTime is '+ UpdateTime)
      let BL = req.data.Word
      let User = req.user
      const tx = cds.transaction(req)
      console.log('The word('+BL+')is edited by '+User+' on '+UpdateTime)
      console.log('This word is enabled now?: '+req.data.IsActive)
      console.log('The category of the word is: '+req.data.Category)
    })


})
