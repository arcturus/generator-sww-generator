'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var changeCase = require('change-case')

module.exports = yeoman.generators.NamedBase.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    // Setup configuration
    this.packageContent = {
      name: this.name
    };
    this.indexContent = {
      name: this.name,
      camelCaseName: changeCase.pascalCase(this.name)
    };
    this.contentContent = {
      camelCaseName: changeCase.pascalCase(this.name)
    }
  },

  // prompting: function () {
  //   var done = this.async();
  //
  //   // Have Yeoman greet the user.
  //   this.log(yosay(
  //     'Welcome to the amazing ' + chalk.red('SwwGenerator') + ' generator!'
  //   ));
  //
  //   var prompts = [{
  //     type: 'confirm',
  //     name: 'someOption',
  //     message: 'Would you like to enable this option?',
  //     default: true
  //   }];
  //
  //   this.prompt(prompts, function (props) {
  //     this.props = props;
  //     // To access props later use this.props.someOption;
  //
  //     done();
  //   }.bind(this));
  // },

  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        this.packageContent
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
      this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('_gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copyTpl(
        this.templatePath('index.js'),
        this.destinationPath('index.js'),
        this.indexContent
      );
      this.fs.copyTpl(
        this.templatePath('content.js'),
        this.destinationPath('./lib/'+ this.name +'.js'),
        this.contentContent
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
