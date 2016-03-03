##webpack loader for wire.js specifications
##installation
```
npm i
```

##tests
```
npm test
```

##webpack loader configuration
```js
module: {
    loaders: [
        {   
            test: /\.spec\.coffee$/, 
            loaders: ['../../index?markup=component&componentsDir=' + componentsDir],
            exclude: /node_modules/
        }
    ]
}
```
Queries:
- markup: field name in wire.js specification to be parsed as component markup
- componentsDir: directory where to search markup components