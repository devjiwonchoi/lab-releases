import { exec } from 'node:child_process'

async function versionPackages() {
  const releaseType = process.env.RELEASE_TYPE
  if (!releaseType) {
    throw new Error('RELEASE_TYPE is not set.')
  }

  if (releaseType === 'stable') {
    // Exit pre mode in case we're in it.
    await exec('pnpm changeset pre exit')
  }

  if (releaseType === 'release-candidate') {
    // Exit pre mode in case we're in it.
    await exec('pnpm changeset pre exit')
    // Enter pre mode as "rc" tag.
    await exec('pnpm changeset pre enter rc')
  }

  await exec('pnpm changeset version')
  await exec('pnpm install --no-frozen-lockfile')
}

versionPackages()
