var express = require('express');
var router = express.Router();

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var JirenguStrategy = require('passport-jirengu').Strategy;

passport.serializeUser(function(user, done){
    console.log('---serializeUser---')
    console.log(user)
    done(null,user);
});

passport.deserializeUser(function(obj,done){
    console.log('---serializeUser---')
    done(null,obj);
})


passport.use(new JirenguStrategy({
    clientID:'089d4934b7d3cb0d64b71026acf7d0cc3f89f0b06142fcd9f397eaa39b1bfef1',
    tokenURL:'http://user.jirengu.com/oauth/token',
    clientSecret:'d23b5999949b28ab1d59a86dbbf6518c98954f6e257c38ad2c0ab16f8b6c6093',
    callbackURL:'http://127.0.0.1:3000/auth/jirengu/callback'},
    function(accessToken,refreshToken,profile,done){
        done(null,profile)
    }))

passport.use(new GitHubStrategy({
    clientID: '70786e5bebe72594ad57',
    clientSecret: '7197d9196be1ac5fa4b5a94c855082297cd8a2a4',
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ githubId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));
     function(accessToken,refreshToken,profile,done){
        done(null,profile)
    }))

router.get('/jirengu',passport.authenticate('jirengu'));
router.get('/github',passport.authenticate('github'));

 
router.get('/jirengu/callback', 
  passport.authenticate('jirengu', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home. 
    console.log('success.....')
    console.log(req.user);
    req.session.user = {
        id: req.user._json.uid,
        username: req.user._json.name,
        avatar: req.user._json.avatar,
        provider: req.user.provider
    }
    res.redirect('/'); //跳转到首页
  });

router.get('/github/callback', 
passport.authenticate('github', { failureRedirect: '/login' }),
function(req, res) {
// Successful authentication, redirect home. 
    console.log('success.....')
    console.log(req.user);
     req.session.user = {
        id: req.user._json.uid,
        username: req.user.displayName || req.user.username,
        avatar: req.user._json.avatar_url,
        provider: req.user.provider
    }
    res.redirect('/');
});

router.get('/logout',function(req,res){
    req.session.destroy()
    res.redirect('/')




})




module.exports = router;
