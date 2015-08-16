function EventsController (req, res) {
    var archiver = require('archiver'),
        path = require('path'),
        fs = require('fs'),
        archive = archiver('zip'),
        db = new require('../db/db')(),
        dirname = './CalendarApplication',
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

        res.attachment('calendar.zip');

        archive.pipe(res);
        
        walk(dirname, function(filePath, stat) {
            archive.append(fs.createReadStream(filePath), { name: filePath });
        });
        
        archive.finalize();
	}
    
    function walk (currentDirPath, callback) {
        fs.readdirSync(currentDirPath).forEach(function(name) {
            var filePath = path.join(currentDirPath, name);
            var stat = fs.statSync(filePath);
            if (stat.isFile()) {
                callback(filePath, stat);
            } else if (stat.isDirectory()) {
                walk(filePath, callback);
            }
        });
    }

	return this;
}

module.exports = EventsController;