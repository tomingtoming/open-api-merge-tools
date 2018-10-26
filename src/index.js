yaml = require('js-yaml');
fs = require('fs');

const readYamlFile= (filePath) => {
    try {
        const targetYamlFile = fs.readFileSync(filePath);
        return yaml.safeLoad(targetYamlFile, 'utf8');
    } catch (e) {
        throw new Error(e)
    }
};
const readYamlEnv = (envFile, targetENV) => {
    if (envFile.propertyIsEnumerable(targetENV)) {
        return envFile[targetENV];
    }
    throw new Error('env yaml not target')
};

const getOptions = (args) => {
    if  (args.length <  5){
      throw new Error('invalid arguments length.')
    }
    const options = {};
    options.apiFilePath = args[2];
    options.envFilePath = args[3];
    options.targetENV = args[4].replace('-', '');
    return options;
}

const writeYamlFile= (data, filename) => {
    try {
        const dirname = './output';
        if (!fs.existsSync(dirname)) fs.mkdirSync(dirname);
        fs.writeFileSync('./output/' + filename, yaml.safeDump(data));
        return 'Successful XD!!! \n ./output/' + filename + '\n';
    } catch (e) {
        return 'Failed :(';
    }
};

const envLocal = process.env;
const options = getOptions(process.argv);

const openApiFile = readYamlFile(options.apiFilePath);
// console.log(openApiFile);

const envFile = readYamlFile(options.envFilePath);
console.log(envFile);

console.log(readYamlEnv(envFile, options.targetENV));

console.log(openApiFile);

const test = readYamlFile(process.argv[2]);
console.log(test);

const doc = readYamlFile(process.argv[3]);
console.log(doc);

const output = writeYamlFile(test, process.argv[5]);
console.log(output);
