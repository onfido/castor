# Contributing

When contributing to this repository, please read through and get familiarised with the processes of making a change to this package.

If you have further questions please discuss the change you wish to make with the owners of this repository.

## Get ready for development

You will need Node 14 running locally.

**1. Install Node**

Use [nvm](https://github.com/nvm-sh/nvm/) to manage the different Node versions and switch between them.

To install and switch to required version run:

    nvm install && nvm use

Finally install Yarn via Homebrew:

    brew install yarn

Then remove Node that was installed alongside Yarn:

    brew uninstall node --ignore-dependencies

**2. Install local Node dependencies**

    yarn install

## Make a change

1.  Make sure that tests pass:

    `yarn test`

2.  Make sure that lint passes:

    `yarn lint`

3.  Commit according to [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). We support these tools:

    - Commitizen, which runs automatically on a pre-commit Git hook thanks to Husky.

    - The [VS Code plugin](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits).

4.  When opening a pull request, provide as much details as possible for a reviewer to better understand the change.

5.  Check the change manually locally _before_ you assign reviewers.

6.  When a PR is approved - **do not merge** until acceptance testing is done, and the change is ready for a release.

### Run Storybook locally

You can run a Storybook instance locally with:

    yarn start

### Testing locally

#### Unit tests

You can run unit tests as the CI would with:

    yarn test

That runs all specs and generates coverage reports.

If you want watch mode for your changes only, use:

    yarn jest --watch

You can also filter to a single file if you want, like:

    yarn jest --watch my-file

#### UI tests (including visual regression)

Those are found in `./e2e`, in its root or inside folders, but mandatorily with a `.e2e.ts` file suffix.

They are written in [Cypress](https://www.cypress.io/).

Visual regression tests are run for all "All Combinations" stories, or you can add specs individually for other stories.

You can run UI tests as the CI would with:

    yarn e2e

That runs all specs and generates coverage reports.

For writing tests locally:

1. You can serve the app in e2e mode with:

   yarn e2e:serve

2. Then in another terminal open Cypress with:

   yarn cypress open

Alternatively you could use a single terminal with:

    yarn concurrently -k -n ,cypress:open yarn:e2e:serve "yarn cypress open"

If tests fail on image diffing, make sure no regression has been introduced.

Diffed images are stored in `./coverage/e2e/.diff`.

If you introduced visual changes intentionally and are sure it's how it should look, update the screenshot baselines with:

    yarn snapshot

### Build packages locally

Castor consists of multiple packages. You can build them by running:

    yarn build

It generates style tokens and themes, then concurrently executes multiple steps for each package by:

- generating compressed `.css` files (without source map) for vanilla integration
- generating ESM compiled `.js` from `.ts` files with `tsc` and `tsconfig.json`

Additionally you may also generate the single file global `Castor` for prototyping (from `.ts` files, with esbuild) by running:

    yarn prototype

## Publish new version

Only maintainers of this repository are allowed to make releases.

[Semantic Versioning 2.0.0](https://semver.org) is automatically applied and the changelog is automatically generated.

Simply run this script in the root to cut a new release:

    yarn release

Optionally you can mark it as pre-release, e.g. `1.0.0-alpha.0`

    yarn release --prerelease alpha

If you need to override SemVer behavior (not recommended):

    yarn release --release-as 1.1.0

The last line of the script's log will give you the command you need to execute to push the commit and tag.

### Release the latest version (example)

You will need `release/*` branch push permissions.

In the following example we assume that:

- the latest version is 1.0.0
- the version 1.1.0 is being released

```sh
# ensure tree is clean - WARNING: will delete pending changes
git reset --hard

# get all latest changes from remote
git fetch --all --prune

# checkout latest 'main'
git checkout main
git pull

# create and checkout release branch
git checkout -b release/1.1.0

# use automated release script
yarn release

# push to trigger 'publish' GitHub Action
git push --follow-tags origin release/1.1.0
```

Open a release PR to merge the version bump and the changelog back to `main` branch.

```sh
# once merged, checkout merge commit on 'main'
git checkout c6da29b

# move version tag
git tag v1.1.0 -f
git push origin v1.1.0 -f
```

### Release a non-latest minor/patch version (example)

You will need `release/*` branch push permissions.

In the following example we assume that:

- the latest version is 2.0.1
- the version 1.2.1 is being released
- we'll cherry-pick hotfixes from 2.0.1 onto 1.2.0

```sh
# ensure tree is clean - WARNING: will delete pending changes
git reset --hard

# get all latest changes from remote
git fetch --all --prune

# checkout latest available version tag for v1.x.x
git checkout v1.2.0

# create and checkout release branch
git checkout -b release/1.2.x

# cherry-pick required fixes from 'main'
git cherry-pick 64b6be1
# pick appropriate commit hashes and repeat as needed

# use automated release script
yarn release

# push to trigger 'publish' GitHub Action
git push --follow-tags -u origin release/1.2.x
```

No need to open a PR to merge a non-latest release back to `main`, nor do tags need to be moved. However, consider protecting the branch `release/1.2.x` against deletion under GitHub's "Branches" settings.
