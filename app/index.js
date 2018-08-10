var yeoman = require('yeoman-generator');
var glob = require('glob');
var path = require('path');
var mkdirp = require('mkdirp');


module.exports = class extends yeoman {

    prompting() {
        this.log('----------------------');
        this.log('Fuse Project Generator'); 
        this.log('----------------------');
        this.log('');
        var prompts = [{
                type    : 'input',
                name    : 'name',
                message : 'Your Fuse project name',
                default : this.appname
            }, 
            {
                type    : 'input',
                name    : 'camelVersion',
                message : 'Your Camel version',
                default : '2.18.1',
                store   : true
            },
            {
                type    : 'input',
                name    : 'camelDSL',
                message : 'DSL type',
                choices : ['blueprint', 'spring'],
                default : 'spring',
                store   : true
            }, {
                type: 'input',
                name: 'package',
                message: 'Package name: ',
                default: 'com.' + this.appname
            }];
            return this.prompt(prompts).then(function (props) {
                this.props = props;
                this.log('fuse project name', props.name);
                this.log('camel version', props.camelVersion);
                this.log('camel DSL', props.camelDSL);
                this.log('package name', props.package);
            }.bind(this));
        }
        
        //writing logic here
        writing() {
            app: {
                var userProps = this.props;

                var packageFolder = userProps.package.replace(/\./g, '/');
                var src = 'src/main/java';
                var myTemplatePath = path.join(this.templatePath(), userProps.camelDSL);
                this.folders = glob.sync('**/*/', {cwd: myTemplatePath});
                this.files = glob.sync('**/*', {cwd: myTemplatePath, nodir: true});

                this.log('Creating folders');
                this.folders.forEach(function (folder) {
                    mkdirp.sync(folder.replace(/src\/main\/java/g, path.join(src, packageFolder)));
                });
            
                this.log('Copying files');
                this.sourceRoot(myTemplatePath);
                for (var i = 0; i < this.files.length; i++) {
                    this.fs.copyTpl(
                        this.templatePath(this.files[i]),
                        this.destinationPath(this.files[i].replace(/src\/main\/java/g, path.join(src, packageFolder))),
                        {userProps: userProps}
                    );
                }
            
                this.log('Copying dot files');
                this.fs.copy(
                    this.templatePath('.*'),
                    this.destinationRoot()
            );
        }
    }
};
