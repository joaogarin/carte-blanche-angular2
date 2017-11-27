# carte Blanche Angular2 [![Build Status][ci-img]][ci]

[CarteBlanche] plugin for Angular2.

[CarteBlanche]: https://github.com/pure-ui/carte-blanche
[ci-img]:  https://travis-ci.org/joaogarin/carte-blanche-angular2.svg
[ci]:      https://travis-ci.org/joaogarin/carte-blanche-angular2

[![Video sample](https://img.youtube.com/vi/CAVp6YHavCU/0.jpg)](https://www.youtube.com/watch?v=CAVp6YHavCU)

## Usage

```js
var carteBlancheAngular2 = require('carteBlancheAngular2')

plugins: [
  // Plugin: CarteBlanche
  // Description: Provides a carte blanche page for testing components.
  // Allows to test each component and its variations separatly
  new CarteBlanche({
    componentRoot: 'src/app/components',
    filter: /.*\.component.ts$/, // Matches all files ending in .ts
    plugins: [
      new Angular2Plugin({
        variationFolderName: 'variations',
        port: 7000,
        hostname: 'localhost',
        bundle: 'main.js',
      })
    ]
  })
]
```

For now a main bundle must be provided. And additional files can be provided using the files property. in the future support for CommonChunks plugin will be added
so that you dont have to specify your files explicitly.

## Options

- `variationFolderName` (default: `variations`): The name of the folders that stores the variation files.
```JS
new carteBlancheAngular2({
  variationFolderName: 'examples'
})
```

- `port` (default: 8082): The port the variations server runs at.
  ```JS
  new carteBlancheAngular2({
    port: 7000
  })
  ```

- `hostname` (default: `localhost`): The URL the variations server runs at.
  ```JS
  new carteBlancheAngular2({
    hostname: 'mydomain.com'
  })
  ```

- `bundle` (default: `main.js`): The name of the main bundle that holdes the application.
  ```JS
  new carteBlancheAngular2({
    bundle: 'main.js'
  })
  ```
