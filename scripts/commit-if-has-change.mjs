import { execSync } from 'child_process'


function main() {
  const version = require('../packages/main/package.json').version
  const githubToken = process.env.RELEASE_BOT_GITHUB_TOKEN

  if (!githubToken) {
    console.log(`Missing RELEASE_BOT_GITHUB_TOKEN`)
    return
  }

  const args = process.argv
  const message = args[args.indexOf('--message') + 1]

  try {
    const status = execSync('git status --porcelain').toString()
    if (!status) {
      console.log('No changes to commit.')
      return
    }

    // Update for lockfile diff.
    execSync('pnpm install')

    execSync(
      `git remote set-url origin https://devjiwonchoi:${githubToken}@github.com/devjiwonchoi/lab-releases.git`
    )
    execSync('git config user.name "devjiwonchoi"')
    execSync('git config user.email "devjiwonchoi@gmail.com"')
    execSync('git add .')
    execSync(`git commit -m "${message || `v${version}`}"`)
    execSync('git push')
  } catch (error) {
    console.error('Error during git operations:', error)
  }
}

main()
