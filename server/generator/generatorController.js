function EventsController (req, res) {
    var archiver = require('archiver'),
        fs = require('fs'),
        archive = archiver('zip'),
        db = new require('../db/db')(),
        dirname = './generator/archivingData',
        fileName = 'weeks.js',
        _ = require('underscore-node');
    
	handle();

	function handle () {
        createFiles();
	}
    
    function createFiles () {
        db.fetch('weeks', function (err, collection) {
            if (err) throw err;
            var tpl = _.template("var weeks = <%= array %>;");
            var data = tpl({array : JSON.stringify(collection)});
            
            fs.writeFile(dirname + '/' + fileName, data, function (err) {
                if (err) throw err;
                console.log(fileName + ' created');
                archivate();
            });
        });
    }

	function archivate () {
        archive.on('error', function(err) {
            res.status(500).send({error: err.message});
        });

        res.attachment('archive.zip');

        archive.pipe(res);
        
        archive.append(fs.createReadStream(dirname + '/' + fileName), { name: fileName });
        
        archive.finalize();
	}

	return this;
}

module.exports = EventsController;