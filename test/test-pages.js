var request = require("request"),
    assert = require('assert'),
    base_url = "http://localhost:3000/",
    expect  = require('chai').expect;

describe('server tests', function() {
  describe("GET /", function() {
    it("Navigation Bar Title", function(done) {
      request.get(base_url, function(error, response, title) {
        assert.equal('SiTE', title);
        done();
      });
    });
    it('Main Page Status', function(done) {
    	request('http://localhost:3000' , function(error, response, body) {
        	expect(response.statusCode).to.equal(200);
        	done();
    });
	});
	it('Expect 404 Error', function(done) {
		// do not have about page
    	request('http://localhost:3000/about' , function(error, response, body) {
        	expect(response.statusCode).to.equal(404);
        	done();
    	});
	});
    
  	});
  	});