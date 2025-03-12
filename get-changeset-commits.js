const fs = require('fs').promises
const path = require('path')
const { execSync } = require('child_process')

async function getChangesetCommits() {
  try {
    // Read all files from .changeset directory
    const files = await fs.readdir('./.changeset')

    // Filter for .md files and exclude README
    const mdFiles = files.filter(
      (file) => file.endsWith('.md') && !file.toLowerCase().startsWith('readme')
    )

    const results = {}

    // Get initial commit for each file
    for (const file of mdFiles) {
      const filePath = path.join('.changeset', file)

      // Use git log to find the first commit
      const firstCommit = execSync(
        `git log --diff-filter=A --format=%H -- "${filePath}"`,
        { encoding: 'utf-8' }
      ).trim()

      results[file] = firstCommit
    }

    return results
  } catch (error) {
    console.error('Error:', error.message)
    return {}
  }
}

// Execute and log results
getChangesetCommits().then((commits) => {
  console.log('Changeset files and their initial commits:')
  console.log(JSON.stringify(commits, null, 2))
})
