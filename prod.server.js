var express = require('express')
var config = require('./config/index')
var axios = require('axios')

var port = process.env.PORT || config.build.port

var app = express()

var apiRoutes = express.Router()

apiRoutes.get('/api/getDiscList', function(req, res) { //
    var url = 'https://u.y.qq.com/cgi-bin/musicu.fcg' // 原api  
    axios.get(url, {
      headers: {
        referer: 'https://y.qq.com/portal/singer_list.html',
        origin: 'https://y.qq.com' //访问的域名
      },
      params: req.query //req.query我打印过是url的data参数
    }).then((response) => {
      res.json(response.data) //发送一个JSON响应
    }).catch((e) => {
      console.log(e)
    })
  }),
  apiRoutes.get('/api/getPcRecommend', function(req, res) { //
    var url = 'https://u.y.qq.com/cgi-bin/musicu.fcg' // 原api  
    axios.get(url, {
      headers: {
        referer: 'https://y.qq.com/',
        origin: 'https://y.qq.com' //访问的域名
      },
      params: req.query //req.query我打印过是url的data参数
    }).then((response) => {
      res.json(response.data) //发送一个JSON响应
    }).catch((e) => {
      console.log(e)
    })
  }),
  apiRoutes.get('/api/getUrl', function(req, res) { //
    var url = 'https://u.y.qq.com/cgi-bin/musicu.fcg' // 原api  
    axios.get(url, {
      headers: {
        referer: 'https://y.qq.com/portal/player.html',
        origin: 'https://y.qq.com' //访问的域名
      },
      params: req.query //req.query我打印过是url的data参数
    }).then((response) => {
      res.json(response.data) //发送一个JSON响应
    }).catch((e) => {
      console.log(e)
    })
  }),
  apiRoutes.get('/api/lyric', function(req, res) { //
    var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg' // 原api  
    axios.get(url, {
      headers: {
        referer: 'https://y.qq.com/portal/player.html',
        origin: 'https://y.qq.com' //访问的域名
      },
      params: req.query //req.query我打印过是url的data参数
    }).then((response) => {
      res.json(response.data) //发送一个JSON响应
    }).catch((e) => {
      console.log(e)
    })
  }),
  apiRoutes.get('/api/songList', function(req, res) { //
    var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg' // 原api  
    axios.get(url, {
      headers: {
        referer: 'https://y.qq.com/n/yqq/playsquare/',
        origin: 'https://y.qq.com' //访问的域名
      },
      params: req.query //req.query我打印过是url的data参数
    }).then((response) => {
      res.json(response.data) //发送一个JSON响应
    }).catch((e) => {
      console.log(e)
    })
  }),
  apiRoutes.get('/api/getMusicList', function(req, res) { //
    var url = 'https://u.y.qq.com/cgi-bin/musicu.fcg' // 原api  
    axios.get(url, {
      headers: {
        referer: 'https://y.qq.com/n/yqq/toplist/',
        origin: 'https://y.qq.com' //访问的域名
      },
      params: req.query //req.query我打印过是url的data参数
    }).then((response) => {
      res.json(response.data) //发送一个JSON响应
    }).catch((e) => {
      console.log(e)
    })
  }),
  apiRoutes.get('/api/search', function(req, res) { //
    var url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp' // 原api  
    axios.get(url, {
      headers: {
        referer: 'https://m.y.qq.com/',
        origin: 'https://m.y.qq.com' //访问的域名
      },
      params: req.query //req.query我打印过是url的data参数
    }).then((response) => {
      res.json(response.data) //发送一个JSON响应
    }).catch((e) => {
      console.log(e)
    })
  })

app.use('/api', apiRoutes)

app.use(express.static('./dist'))

module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
