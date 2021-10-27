var expect = require("chai").expect;
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var request = require("request");
chai.should();
chai.use(sinonChai);
var getUsers = require("../src 2/sinon");
describe("GetUsers Test", function () {
  this.beforeEach(function () {
    spy = sinon.spy();
    sinon.stub(request, "get").callsFake(function (url, callback) {
      callback({}, { body: '{"users":["user1", "user2"]}' });
    });
  });

  this.afterEach(function () {
    sinon.restore();
  });
  it("Calls the callback spy", function () {
    var spy = sinon.spy();
    getUsers(spy);
    spy.should.have.been.calledOnce;
  });
  it("Calls the correct URL", function () {
    var spy = sinon.spy();
    getUsers(spy);
    request.get.should.have.been.calledWith("https://www.mysite.com/api/users");
  });

  it("Returns correct data", function () {
    getUsers(spy);
    spy.should.have.been.calledWith({ users: ["user1", "user2"] });
  });
});
