var Sequelize = require('sequelize')
var path = require('path')


var sequelize = new Sequelize(undefined,undefined, undefined, {
  host: 'localhost',
  dialect: 'sqlite',

  // SQLite only
  storage: path.join(__dirname,'../database/database.sqlite')
});

/*
sequelize
    .authenticate()
    .then(function(err){
        console.log('Connection has been established successfullu.');
    })
    .catch(function(err){
        console.log('Unable to connect to the database',err);
    })
*/

var Note = sequelize.define('note', {
  text: {
    type: Sequelize.STRING,
  },
  uid:{
    type: Sequelize.STRING
  }
});

// Note.sync({force: true})
//Note.drop();删除该表
//Note.sync({force: true}) 先把表删除，在创建新表
// Note.sync().then(function(){
//     Note.create({text:'hello world'})
// }).then(function(){
//         Note.findAll({raw: true}).then(function(notes){
//         console.log(notes)
//     })
// })

Note.findAll({raw: true}).then(function(notes){
    console.log(notes)
})

//Note.destroy({where:{text:'haha'}},function(){
//     console.log('destroy...')
//     console.log(IArguments)
// })

// Note.findAll({raw:true,where:{id:2}}).then(function(notes){
//     console.log(notes)
// })

module.exports = Note