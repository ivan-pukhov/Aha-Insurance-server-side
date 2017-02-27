// Init Scorocode
var sc = require('scorocode')
var response = require('./response');
const ADMIN_ROLE = "admin";

sc.Init({
    ApplicationID: "2f5e13967b7cfcab7572e87fc0e1a6a4",
    JavaScriptKey: "a3d5d5daacbe68792984b763c2098e7e",
    WebSocketKey:  "1b92d91fcce770fdf315501b107a8676",
    MasterKey:     "5a48a907a3d8a5501573d6e5fa4c8fc6"
})

function isAdmin(expectedRoleId) {
    var isAdminRole = false;
    for(let i = 0; i < userRoles.length; i++) {
        if (userRoles[i] === expectedRoleId) {
            isAdminRole = true;
            break;
        }
    }
    return isAdminRole
}

//TODO: Удалить, когда добавится нужная логика на UI.
pool.data = [];
pool.ids.map(id => {
    pool.data.push({
        id: id,
        limitCost: 12,
        isRemoved: false
    })
});
//---------------------------------------------------

var query = new sc.Query("roles");
query.equalTo("code", ADMIN_ROLE)
query.find().then(res => {
    let adminRole = res.result;
    if (adminRole.length > 0) {

        if (isAdmin(adminRole[0].get("_id"))) {
            if (pool.cmd === 'add') {
                const array = pool.data.map(jobLimit => {
                        return new sc.Object('obj08_3')
                            .set('obj08', pool.obj08)
                            .set('ref03', jobLimit.id)
                            .set('isRemoved', jobLimit.isRemoved)
                            .set('limitCost', jobLimit.limitCost)
                            .save();
                });
                Promise.all(array)
                .then(res => {
                    response(res)
                }).catch(e => {
                    response(e)
                });
            } else {
                const q = new sc.Query('obj08_3');
                q.equalTo('obj08', pool.obj08);
                q.containedIn('_id', pool.ids);
                q.remove()
                    .then(res => {
                    response(res)
                }).catch(e => {
                    response(e)
                })
            }
        } else {
            response({
                "error": true,
                "errCode": 403,
                "errMsg": "Только администратор может удалить или добавить лимит"
            })
        }
    } else {
        response({
            "error": true,
            "errCode": 204,
            "errMsg": "В базе нет роли admin"
        })
    }
}).catch(e => {
    response(e)
});


if (userRoles.find(role => role === 'KVPPu9oWaD')) {
    if (pool.cmd === 'add') {
        const array = pool.data.map(jobLimit => {
                return new sc.Object('obj08_3')
                    .set('obj08', pool.obj08)
                    .set('ref03', jobLimit.id)
                    .set('isRemoved', jobLimit.isRemoved)
                    .set('limitCost', jobLimit.limitCost)
                    .save();
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
} else {
    response({
        "error": true,
        "errCode": 403,
        "errMsg": "Только администратор может удалить или добавить лимит"
    })
}
