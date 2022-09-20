const fs = require('fs')
const [componentName, type] = process.argv.slice(2)
const atomicTypes = ['atoms', 'molecules', 'organisms']
let atomicFolder = `./components/ui/`
let defaultType = 'atoms'

const deleteGitKeep = (basePath) => {
  const file = basePath + '/.gitkeep'
  if (fs.existsSync(file))
    fs.unlink(file, () => {
      console.log(`${file} file deleted successfully`)
    })
}

const ComponentTemplate = () => {
  return `import { FC } from 'react'

interface I${componentName}Props {
  content?: string
}

const ${componentName}: FC<I${componentName}Props> = ({
  content = '${componentName} Component',
}) => {
  return (
    <div className="w-full bg-crimson">
      <h1 className="heading-xxl text-center">{content}</h1>
    </div>
  )
}
export default ${componentName}
`
}

const IndexTemplate = () => {
  return `import ${componentName} from './${componentName}'

export default ${componentName}
`
}

const StoriesTemplate = (defaultType) => {
  const componentImport = `${componentName}Component`
  const properType =
    defaultType.charAt(0).toUpperCase() + defaultType.slice(1).toLowerCase()
  const componentIsOrganism = type === 'organisms'
  return `import React, { ComponentProps } from 'react'
import { ComponentMeta, Story } from '@storybook/react'

import ${componentImport} from './${componentName}'

export default {
  title: '${properType}/${componentName}',
  component: ${componentImport},
} as ComponentMeta<typeof ${componentImport}>

type ExtraProps = {${!componentIsOrganism ? ' containerWidth: number ' : ''}}
type StoryProps = ComponentProps<typeof ${componentImport}> & ExtraProps

const Template: Story<StoryProps> = (args) => {
  ${!componentIsOrganism ? 'const { containerWidth, ...rest } = args' : ''}
  return (
    <div${
      !componentIsOrganism
        ? ` className="p-20" style={{ maxWidth: containerWidth }}`
        : ''
    }>
      <${componentImport} {...${!componentIsOrganism ? 'rest' : 'args'}} />
    </div>
  )
}

export const ${componentName} = Template.bind({})

${componentName}.args = {
  // Component Props
  // Extra Props
  ${!componentIsOrganism ? 'containerWidth: 1000,' : ''}
}
`
}

function createFolder(atomicFolder, defaultType) {
  deleteGitKeep(atomicFolder)
  const directory = `${atomicFolder}${componentName}`
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory)
  } else {
    console.log(`Error: '${componentName}' already exists`)
    return false
  }

  // Component
  let filepath = `${atomicFolder}/${componentName}/${componentName}.tsx`
  fs.writeFile(filepath, ComponentTemplate(componentName), (err) => {
    if (err) throw err
    console.log('Created file: ', filepath)
    return true
  })

  // Index
  filepath = `${atomicFolder}/${componentName}/index.ts`
  fs.writeFile(filepath, IndexTemplate(componentName), (err) => {
    if (err) throw err
    console.log('Created file: ', filepath)
    return true
  })

  // Stories
  filepath = `${atomicFolder}/${componentName}/${componentName}.stories.tsx`
  fs.writeFile(filepath, StoriesTemplate(defaultType), (err) => {
    if (err) throw err
    console.log('Created file: ', filepath)
    return true
  })
}

function generate() {
  // Create Atomic Folders
  if (!fs.existsSync(atomicFolder)) fs.mkdirSync(atomicFolder)
  atomicTypes.forEach((atomicType) => {
    const directory = `${atomicFolder}${atomicType}`
    if (!fs.existsSync(directory)) fs.mkdirSync(directory)
  })

  if (!['atoms', 'molecules', 'organisms'].includes(type)) {
    console.log(
      `Error: '${type}' must be one of the following: 'atoms', 'molecules', 'organisms'`
    )
    return false
  }
  if (fs.existsSync(`${atomicFolder}${type}/`)) {
    atomicFolder += type + '/'
    defaultType = type
  }

  createFolder(atomicFolder, defaultType)
}

generate()
