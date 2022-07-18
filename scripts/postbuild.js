const fs = require('fs')
const manifest = require('../public/manifest.json')

function readFile(path, prefix, extension) {
  const file = new RegExp(`^${prefix}\.[a-z0-9]+\.${extension}$`)
  return fs
    .readdirSync(`./build/${path}`)
    .filter((filename) => file.test(filename))
    .map((filename) => `${path}/${filename}`)[0]
}

const js = readFile('assets', 'index', 'js')
const css = readFile('assets', 'index', 'css')

const newManifest = {
  ...manifest,
  content_scripts: [
    {
      ...manifest.content_scripts[0],
      js: [js],
      css: [css],
    },
  ],
  web_accessible_resources: [
    {
      ...manifest.web_accessible_resources[0],
      resources: [css],
    },
  ],
}

fs.writeFileSync('./build/manifest.json', JSON.stringify(newManifest, null, 2))
