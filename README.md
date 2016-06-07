# carte Blanche Angular2 [![Build Status][ci-img]][ci]

[CarteBlanche] plugin for Angular2.

[CarteBlanche]: https://github.com/pure-ui/carte-blanche
[ci-img]:  https://travis-ci.org/joaogarin/carte-blanche-angular2.svg
[ci]:      https://travis-ci.org/joaogarin/carte-blanche-angular2

## Usage

```js
var carteBlancheAngular2 = require('carteBlancheAngular2')

plugins: [
  new carteBlancheAngular2({ /* …options… */ })
]
```

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
