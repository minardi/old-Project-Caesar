function EventsController (req, res) {
    var archiver = require('archiver'),
        fs = require('fs'),
        archive = archiver('zip'),
        dirname = './generator/archivingData',
        fileName = 'test.txt';
    
	handle();

	function handle () {
        createFiles();
	}
    
    function createFiles () {
        fs.writeFile(dirname + '/' + fileName, 'Hi there!! =)', function (err) {
            if (err) throw err;
            console.log(fileName + ' created');
        });
        
        archivate();
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

	function sendArchive () {
		res.send('download should be started.')
	}

	return this;
}

module.exports = EventsController;