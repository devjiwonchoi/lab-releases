import execa from 'execa'

async function publishNpm() {
  const DRY_RUN = process.env.DRY_RUN === 'true'
  console.log({ DRY_RUN })
  if (DRY_RUN) {
    console.log('Dry run, skipping publish')
    return
  }

  const releaseType = process.env.RELEASE_TYPE
  const tag =
    releaseType === 'canary'
      ? 'canary'
      : releaseType === 'release-candidate'
        ? 'rc'
        : 'latest'

  await execa('pnpm', ['changeset', 'publish', '--tag', tag], {
    stdio: 'inherit',
  })
}

publishNpm()
