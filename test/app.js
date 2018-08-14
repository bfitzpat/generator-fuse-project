'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var basicProps = {};
var fs = require('fs-extra');

describe('generator-camel:app', function () {

  describe('Should properly scaffold with default config for Spring', function () {

    before(function () {
      basicProps.name = 'MyAppMock';
      basicProps.package = 'com.generator.mock';
      basicProps.camelVersion = '2.18.2';
      basicProps.camelDSL = 'spring';

      return helpers.run(path.join(__dirname, '../app'))
        .inTmpDir(function (dir) {
          var done = this.async(); // `this` is the RunContext object.
          fs.copy(path.join(__dirname, '../templates'), dir, done);
        })
        .withPrompts({ name: basicProps.name })
        .withPrompts({ camelVersion: basicProps.camelVersion })
        .withPrompts({ camelDSL: basicProps.camelDSL })
        .withPrompts({ package: basicProps.package })
        .toPromise();
    });

    it('Should create the basic structure', function () {
      assert.file('pom.xml');
      assert.file('README.md');
      assert.file('src/main/resources/META-INF/spring/camel-context.xml');
    });

    it('Should create pom.xml with default content', function () {
      assert.fileContent('pom.xml', new RegExp('<groupId>' + basicProps.package + '</groupId>') );
      assert.fileContent('pom.xml', new RegExp('<artifactId>' + basicProps.name + '</artifactId>') );
    });
  });

  describe('Should properly scaffold with default config for Blueprint', function () {

    before(function () {
      basicProps.name = 'MyAppMockBP';
      basicProps.package = 'com.generator.mock.bp';
      basicProps.camelVersion = '2.18.2';
      basicProps.camelDSL = 'blueprint';

      return helpers.run(path.join(__dirname, '../app'))
        .inTmpDir(function (dir) {
          var done = this.async(); // `this` is the RunContext object.
          fs.copy(path.join(__dirname, '../templates'), dir, done);
        })
        .withPrompts({ name: basicProps.name })
        .withPrompts({ camelVersion: basicProps.camelVersion })
        .withPrompts({ camelDSL: basicProps.camelDSL })
        .withPrompts({ package: basicProps.package })
        .toPromise();
    });

    it('Should create the basic structure', function () {
      assert.file('pom.xml');
      assert.file('README.md');
      assert.file('src/main/resources/OSGI-INF/blueprint/blueprint.xml');
    });

    it('Should create pom.xml with default content', function () {
      assert.fileContent('pom.xml', new RegExp('<groupId>' + basicProps.package + '</groupId>') );
      assert.fileContent('pom.xml', new RegExp('<artifactId>' + basicProps.name + '</artifactId>') );
    });
  });

});
