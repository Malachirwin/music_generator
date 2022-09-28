# Music generator
This repo is designed to generate blank music sheets.

## Getting started
Clone the repo and run
```shell
yarn install
```

To generate the pdf musicsheet run
```shell
yarn generate_music [number-of-pages]
```

This runs the `src/script.js` file and will generate a pdf located in the `tmp` directory

## Going further
Some day it would be cool if there could be another argument that would be a json file that holds note values and then could print the notes with the correct type.
