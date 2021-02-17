let multiparty = require('multiparty')
var fs = require('fs');
var request = require('request');

// Request Fowarder to Actual API
module.exports = (req, res) => {
    if (req.method === "POST") {
        let form = new multiparty.Form();
        // get image from POSTed Form
        form.parse(req, (err, fields, files) => {
            BACKEND_URL = process.env.APIURL

            let image = files['file'][0] //our image

            // POST the image to actual API sever
            var requ = request.post(BACKEND_URL, function (err, resp, bodyy) {
                // return the response as response to client
                fs.unlinkSync(image.path)
                res.status(resp.statusCode).send(resp.body)
            });
            var formdd = requ.form();
            formdd.append('file', fs.createReadStream(image.path));
        });
        return;
    } else {
        res.status(405).send("Method not allowed");
        return;
    }
}
