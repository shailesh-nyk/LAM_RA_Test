var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
const api_url = 'http://localhost:3001';


var expect = chai.expect;

it("check if Monitoring API server is up and running", function(done){
    chai.request(api_url)
    .get('/api/')
    .send()
    .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('Welcome!!!');
        done();
    });
})

it("Test: GET /status", function(done){
    this.timeout(10000);
    chai.request(api_url)
    .get('/status')
    .end(function (err, res) {
        let result = JSON.parse(res.text);
        expect(res).to.have.status(200);
        expect(result).to.be.a('Array');
        expect(result).to.have.length.greaterThan(1);
        done();
    });
})

it("Test: GET /restart", function(done){
    chai.request(api_url)
    .get('/restart?svcID=1')
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

it("Test: GET /details", function(done){
    chai.request(api_url)
    .get('/details?svcID=1')
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

it("Test: GET /stop", function(done){
    chai.request(api_url)
    .get('/stop?svcID=1')
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

