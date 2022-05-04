const fs = require('fs');

const reqlog = function (req){
    let data = JSON.parse(fs.readFileSync('public/data/reqlog.json'))

    data.requests++
    data.items.push({
        ip: req.ip,
        request: req.originalUrl,
        time: new Date().toISOString(),
    })

    if (!req.ip in data.ips){
        data.ips.push(req.ip)
        data.uniques++
    }

    fs.writeFileSync('public/data/reqlog.json', JSON.stringify(data))
}

module.exports = {
    reqlog
}