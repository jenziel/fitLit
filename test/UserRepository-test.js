const { expect } = require('chai');
// const expect = chai.expect;
// import { expect } from 'chai';
import {  retrieveUserData } from '../src/scripts';

describe('User Repository', () => {

  it('should run tests', function () {
    expect(true).to.be.true;
  });

  it('should be a function', function() {
    expect(retrieveUserData).to.be.a('function')
  });

  it('should return a user object', function() {
    const user2 = retrieveUserData(2)
    expect(user2.name).to.equal('Tyreek VonRueden')
  });

});