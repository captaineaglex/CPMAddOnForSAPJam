const cds = require('@sap/cds')
const jam = require('../srv/operations')


module.exports = cds.service.impl (async function() {
 // const db = await cds.connect.to('db') // connect to database service
 //const { FeedEntry } = db.entities         // get reflected definitions
 /*
  this.before('READ', 'Blacklist', req =>{
    console.log('Username: '+ req.user)
    console.log('User IdP group: '+ req.user.groups)
    console.log('User Company: '+ req.user.company)
    console.log('Username: '+ req.user.mail)
    console.log('User in SAbanciSocialECPM Role collection: '+ req.user.is('SabanciSocialECPM'))
    console.log('User in blacklist admin: '+ req.user.is('blacklistadmin'))
  })*/

  this.after('READ', 'Blacklist', each =>{
    each.Activeness = each.IsActive === true ? 3 : 1

  })

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
        let UpdateTime = reqtime.toISOString()
        req.data.DateDisabled = req.data.IsActive === false ? UpdateTime : null
        console.log ('IsActive '+ req.data.IsActive)
        console.log ('Date Disabled is '+ req.data.DateDisabled)
        console.log ('ModifiedAt is '+ req.data.modifiedAt)
        console.log ('UpdateTime is (UTC)'+ UpdateTime)
        console.log ('Request Time is '+ reqtime)
        console.log ('Request Time (LocaleDateString) is '+ reqtime.toLocaleDateString())
        console.log ('Request Time (Local String) is '+ reqtime.toLocaleString())
        console.log ('Request Time (Local Time String) is '+ reqtime.toLocaleTimeString())
        console.log ('Request Time (ISO String) is '+ reqtime.toISOString())
        console.log ('Request Time (Date String) is '+ reqtime.toDateString())

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

    this.before('READ', 'FeedEntry', req =>{
      console.log('Request Query Select' + req.query)
      console.log('User: '+ req.user)
      console.log('Username Id: '+ req.user.id)
      console.log('User IdP group: '+ req.user.Groups)
      console.log('User Company: '+ req.user.company)
      console.log('User mail: '+ req.user.mail)
      console.log('User in blacklist admin: '+ req.user.is('blacklistadmin'))
    })


    /*
    this.on('READ', 'FeedEntry', req =>{
      console.log('Request Query on' + req.query)
      console.log('User on:'+ req.user)
      console.log('Username Id on: '+ req.user.id)
      console.log('User IdP group on: '+ req.user.Groups)
      console.log('User Company on: '+ req.user.company)
      console.log('User mail on: '+ req.user.mail)
      console.log('User in blacklist admin on: '+ req.user.is('blacklistadmin'))
    })*/

    this.before ('UPDATE','FeedEntry', req => {
      console.log(req.data.IsInappropriate)
      switch (req.data.IsInappropriate) {
        case true:
          console.log('this feed is inappropriate')
          jam.HandleInappropriateFeed(req.data)
          break;

        case false:
          console.log('this feed is appropriate')
          jam.HandleAppropriateFeed(req.data)
          break;

        default:
          console.log('default behaviour')
          break;
      }
    
    })




})


/*

const cds = require('@sap/cds');
const { Books, Authors } = cds.entities;

const newAuthors = [{
  id: 42, name: "Douglas Adams" },{ 
  id: 101, name: "Emily Brontë" }];
const newBooks = [{
  title: "The Hitch Hiker's Guide To The Galaxy", author_ID: 42, stock: 1000},{
  title: "Life, The Universe And Everything", author_ID: 42, stock: 95},{
  title: "Wuthering Heights", author_ID: 101, stock: 12}];

cds.run(INSERT.into(Authors).entries(newAuthors));
cds.run(INSERT.into(Books).entries(newBooks));


*/ 