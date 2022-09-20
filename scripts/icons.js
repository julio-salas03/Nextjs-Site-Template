const fs = require('fs')
const prompt = require('prompt')

const [fileName] = process.argv.slice(2)
const baseRoute = 'components/icons/'
const fileRoute = baseRoute + `Icon${fileName}.tsx`
const indexFile = baseRoute + 'index.tsx'
const gitKeep = baseRoute + '.gitkeep'

if (!fileName) throw new Error('Fatal: You must provide a file name')
if (fs.existsSync(fileRoute)) throw new Error('Fatal: File already exists')

const handleWriteError = (err, cb) => {
  if (err) throw err
  if (cb) cb()
}

const IconTemplate = () => {
  return `import type { FC, SVGProps } from 'react'
import classNames from 'classnames'

const Icon${fileName}: FC<SVGProps<SVGSVGElement>> = ({ className, ...rest }) => {
  return (
    <svg
        className={classNames(className, 'inline-block fill-current')}
        {...rest}
    >
      <></>
    </svg>
  )
}

  export default Icon${fileName}`
}

const createIconFile = () => {
  const content = IconTemplate()
  fs.promises.writeFile(fileRoute, content, 'utf-8', handleWriteError)
}

const updateIndexFile = () => {
  const fileContent = fs.readFileSync(indexFile, 'utf8', (_, data) => data)

  const newContent =
    fileContent +
    `export { default as Icon${fileName} } from './Icon${fileName}'\n`

  fs.writeFile(indexFile, newContent, 'utf-8', handleWriteError)
}

const deleteGitKeep = () => {
  if (fs.existsSync(gitKeep))
    fs.unlink(gitKeep, () => {
      console.log(`${gitKeep} file deleted successfully`)
    })
}

const createIndexFile = async () => {
  return await fs.writeFile(indexFile, '', 'utf-8', (err) =>
    handleWriteError(err, () => {
      deleteGitKeep()
      createIconFile()
      updateIndexFile()
    })
  )
}

const init = () => {
  fs.readFile(indexFile, 'utf-8', (err) => {
    if (err.code === 'ENOENT') {
      console.log(`No index file found. Create one?\nYes (y)/ No (n)`)
      try {
        prompt.start()
        prompt.get(['create'], async function (err, { create }) {
          if (create === 'y') await createIndexFile()
          else if (create === 'n')
            throw new Error('Fatal: no index file. Could not proceed')
          else console.error('you must provide a valid answer')
        })
      } catch (err) {
        console.error(err)
      }
    } else console.error(err)
  })
}

init()
