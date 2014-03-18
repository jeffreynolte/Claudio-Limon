describe('clUser', function () {
  beforeEach(module('app'));
  
  describe('isAdmin', function () {
    it("should return false if the roles array does not have an admin entry", inject(function (clUser) {
      var user = new clUser();
      user.roles = ['not admin'];
      expect(user.isAdmin()).to.be.falsey;
    }));
    
    it("should return false if the roles array has an admin entry", inject(function (clUser) {
      var user = new clUser();
      user.roles = ['admin'];
      expect(user.isAdmin()).to.be.true;
    }));
    
    
  })
})