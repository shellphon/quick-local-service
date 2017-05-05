var QLS = require('../index.js');

var expect = require('chai').expect,
	qls = QLS();

describe("quick local service", function() {
	
	it("QLS() should be instance of QLS", function() {
		expect(qls).to.be.an.instanceof(QLS);
	});


});