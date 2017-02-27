// Init Scorocode
var sc = require('scorocode')
var response = require('./response');

sc.Init({
    ApplicationID: "2f5e13967b7cfcab7572e87fc0e1a6a4",
    JavaScriptKey: "a3d5d5daacbe68792984b763c2098e7e",
    WebSocketKey:  "1b92d91fcce770fdf315501b107a8676",
    MasterKey:     "5a48a907a3d8a5501573d6e5fa4c8fc6"
})


if (pool.cmd === 'add') {
    const array = pool.ids.map(it => {

        return new sc.Object('obj08_3')
        .set('obj08', pool.obj08)
        .set('ref03', it).save();

    })

    Promise.all(array)
    .then(res => {
        response(res)
    })
    .catch(e => {
        response(e)
    });
} else {
    const q = new sc.Query('obj08_3');
    q.equalTo('obj08', pool.obj08);
    q.containedIn('_id', pool.ids);
    q.remove()
    .then(res => {
        response(res)
    })
    .catch(e => {
        response(e)
    })
}