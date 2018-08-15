var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('lookup',{brand:null,
    price:null,
    mpn:null,
    url:null,
    b1:null,
    p1:null,
    m1:null,
    title: "Lookup | Calculance"
    //u1:null
  });
});

router.get('/formGet', function(req, res) {
var url = "http://octopart.com/api/v3/parts/search";
url += "?callback=?";
url += "&apikey=78e4d422";
url += "&q=" + req.query.part;
url += "&start=0&limit=5";
console.log(url);
request(url,function(err,response,body){
  if(err){
    res.render('lookup', {brand:null,
      price:null,
      mpn:null,
      url:null,
      b1:null,
      p1:null,
      m1:null,
      //u1:null
    });
  }
  else{
    //remove uneeded part of JSON
    body = body.substr(2).slice(0,-1);
    //Parse
    var data = JSON.parse(body);

      if(data['hits'] == 0){
        res.render('lookup', {msg:"Sorry the part is unavailable",
          brand:null,
          price:null,
          mpn:null,
          url:null,
          b1:null,
          p1:null,
          m1:null,
          title: "Lookup | Calculance"
          //u1:null
        });
      }

      else{
          res.render('lookup', {brand:'Brand',
            price:'Price',
            mpn:'Part number',
            url:'Url',
            b1:data['results'][0]['item']['brand']['name'],
            p1:'$'+ data['results'][0]['item']['offers'][0]['prices']['USD'][0][1],
            m1:data['results'][0]['item']['mpn'],
            //u1:data['results'][0]['item']['manufacturer']['homepage_url'],
            /*****/
            b2:data['results'][1]['item']['brand']['name'],
            p2:'$'+ data['results'][1]['item']['offers'][0]['prices']['USD'][0][1],
            m2:data['results'][1]['item']['mpn'],
            //u2:data['results'][1]['item']['manufacturer']['homepage_url'],
            /*****/
            b3:data['results'][2]['item']['brand']['name'],
            p3:'$'+ data['results'][2]['item']['offers'][0]['prices']['USD'][0][1],
            m3:data['results'][2]['item']['mpn'],
            //u3:data['results'][2]['item']['manufacturer']['homepage_url'],
            /*****/
            b4:data['results'][3]['item']['brand']['name'],
            p4:'$'+ data['results'][3]['item']['offers'][0]['prices']['USD'][0][1],
            m4:data['results'][3]['item']['mpn'],
            //u4:data['results'][3]['item']['manufacturer']['homepage_url'],
            /*****/
            b5:data['results'][4]['item']['brand']['name'],
            p5:'$'+ data['results'][4]['item']['offers'][0]['prices']['USD'][0][1],
            m5:data['results'][4]['item']['mpn'],
            //u5:data['results'][4]['item']['manufacturer']['homepage_url']
            /*****/
              });
            }
          }
        });
      });

module.exports = router;
