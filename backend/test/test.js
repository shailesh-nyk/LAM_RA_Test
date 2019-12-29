var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
const api_url = 'http://localhost:8000';


var expect = chai.expect;

it("check if API server is up and running", function(done){
    chai.request(api_url)
    .get('/api/')
    .send()
    .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('Welcome!!!');
        done();
    });
})

it("Get student details", function(done){
    chai.request(api_url)
    .get('/api/all')
    .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.numFound).greaterThan(0);
        done();
    });
})

// it("Check if fetched profile details is correct", function(done){
//     chai.request(api_url)
//     .get('/api/buyer?id=1')
//     .send()
//     .end(function (err, res) {
//         expect(res).to.have.status(200);
//         expect(res.body.msgDesc).to.be.a('Array');
//         expect(res.body.msgDesc[0].id).to.equal(1);
//         done();
//     });
// })

// it("Checking if restaurant search returns atleast one restaurant", function(done){
//     chai.request(api_url)
//     .get('/api/search?searchKey=a')
//     .send()
//     .end(function (err, res) {
//         expect(res).to.have.status(200);
//         expect(res.body.content).to.be.a('Array');
//         expect(res.body.content).to.have.length.greaterThan(1);
//         done();
//     });
// })


// it("Checking if restaurant order history returns atleast one order", function(done){
//     chai.request(api_url)
//     .get('/api/order/restaurant?rest_id=10')
//     .send()
//     .end(function (err, res) {
//         expect(res).to.have.status(200);
//         expect(res.body.msgDesc).to.be.a('Array');
//         expect(res.body.msgDesc).to.have.length.greaterThan(1);
//         done();
//     });
// })

// it("Checking if user is able to get items sold by a restaurant in details view", function(done){
//     chai.request(api_url)
//     .get('/api/seller/menu?rest_id=10')
//     .send()
//     .end(function (err, res) {
//         expect(res).to.have.status(200);
//         expect(res.body.msgDesc).to.be.a('Array');
//         expect(res.body.msgDesc).to.have.length.greaterThan(1);
//         done();
//     });
// })

