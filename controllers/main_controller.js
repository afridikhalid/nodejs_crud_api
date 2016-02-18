/* Get home page request and render view */
module.exports.index = function(req, res) {
    res.render('index', {title: 'NODE JS CRUD API'});
};