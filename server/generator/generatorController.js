function EventsController (req, res) {
    var archiver = require('archiver'),
        fs = require('fs'),
        archive = archiver('zip'),
        db = new require('../db/db')(),
        dirname = './generator/archivingData',
        _ = require('underscore-node');
    
	handle();

	function handle () {
        createFiles();
	}
    
    function createFiles () {
        db.fetch('weeks', function (err, collection) {
            if (err) throw err;
            var tpl = _.template("var scheduleCollection = <%= array %>;");
            var data = tpl({array : JSON.stringify(collection)});
            
            fs.writeFile(dirname + '/weeks.js', data, function (err) {
                if (err) throw err;
                console.log('weeks.js created');
            });
        });
        
        db.fetch('events', function (err, collection) {
            if (err) throw err;
            var tpl = _.template("var eventsCollection = <%= array %>;");
            var data = tpl({array : JSON.stringify(collection)});
            
            fs.writeFile(dirname + '/events.js', data, function (err) {
                if (err) throw err;
                console.log('events.js created');
            });
        });
        
        db.fetch('resources', function (err, collection) {
            if (err) throw err;
            var tpl = _.template("var resourcesCollection = <%= array %>;");
            var data = tpl({array : JSON.stringify(collection)});
            
            fs.writeFile(dirname + '/resources.js', data, function (err) {
                if (err) throw err;
                console.log('resources.js created');
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
        
        fs.readdir(dirname, function (err, files) {
            if (err) throw err;
            _.each(files, function (file) {
                archive.append(fs.createReadStream(dirname + '/' + file), { name: file });
            });
            archive.finalize();
        });
	}

	return this;
}

module.exports = EventsController;