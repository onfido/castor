# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.0.0-rc.3](https://github.com/onfido/castor/compare/v1.0.0-rc.2...v1.0.0-rc.3) (2021-01-20)

### Features

- add radio component ([#79](https://github.com/onfido/castor/issues/79)) ([2efd5d4](https://github.com/onfido/castor/commit/2efd5d44c46297f03dca7f29a71e6900457d8dad)), closes [#8](https://github.com/onfido/castor/issues/8)
- **core:** allow space to be used with any number ([#156](https://github.com/onfido/castor/issues/156)) ([8241cb2](https://github.com/onfido/castor/commit/8241cb2f8c70e59cd436bc56d5f658e9daea7f4f))
- generate tokens with theo ([#136](https://github.com/onfido/castor/issues/136)) ([2669588](https://github.com/onfido/castor/commit/2669588253bf824423194f4fb956bb598fba8b1e))

### Bug Fixes

- **core:** correct "neutral-600" color due to accessibility ([#200](https://github.com/onfido/castor/issues/200)) ([e7d0a91](https://github.com/onfido/castor/commit/e7d0a9167c6709fc20d91e758c9c7c8f70d57174))
- **core:** correct border input and action colors on night theme due to accessibility ([#201](https://github.com/onfido/castor/issues/201)) ([2b9778b](https://github.com/onfido/castor/commit/2b9778b8aeea315d307ac6530a34d9a396863c5e))
- **core:** correct sass variable usage ([#158](https://github.com/onfido/castor/issues/158)) ([16ede4a](https://github.com/onfido/castor/commit/16ede4ac904c1e45689b6f9150c79eab557616ff))
- **core:** correctly style radio children when input is disabled ([#197](https://github.com/onfido/castor/issues/197)) ([a982ed5](https://github.com/onfido/castor/commit/a982ed50a4fbc1924289153d179b498595857827))
- **core:** input and textarea borders on focus ([#208](https://github.com/onfido/castor/issues/208)) ([e5c0829](https://github.com/onfido/castor/commit/e5c0829b60e4a6a8d721c3014633fe452944062d))
- **core:** selectors applied conditionally ([#209](https://github.com/onfido/castor/issues/209)) ([e6cc6d5](https://github.com/onfido/castor/commit/e6cc6d58f6b5322c24f121952037d3cb9890fbfc))
- **react:** add display name to radio component ([#188](https://github.com/onfido/castor/issues/188)) ([37b7224](https://github.com/onfido/castor/commit/37b72246225a5fb190e319f701f04db5fcc683ef))
- **react:** withRef component displayNames ([#177](https://github.com/onfido/castor/issues/177)) ([d62e9ce](https://github.com/onfido/castor/commit/d62e9ce1796f5bda1462263f63537beed72728e2))
- do not apply "checked" state styling for invalid radio ([#180](https://github.com/onfido/castor/issues/180)) ([4837498](https://github.com/onfido/castor/commit/4837498408a1615338a578696f3e436ee21fee2e))
- only animate radio "dot" appearance ([#179](https://github.com/onfido/castor/issues/179)) ([62563cd](https://github.com/onfido/castor/commit/62563cd330e974e979dc9600eff8690d46a8980f))
- **react:** export search component ([#141](https://github.com/onfido/castor/issues/141)) ([faf88e1](https://github.com/onfido/castor/commit/faf88e118e40f9cf545571dc8bfb94366c353649))

## 1.0.0-rc.2 (2020-12-21)

### ⚠ BREAKING CHANGES

- **core:** add ods- prefix to all tokens (#103)
- **core:** {theme}-class mixins removed in favour of {theme}('class')

### Features

- add search component ([#109](https://github.com/onfido/castor/issues/109)) ([d9f24bd](https://github.com/onfido/castor/commit/d9f24bdcd4217636b2b456c157cdd44504b57e99))
- **core:** add border-input-selected color alias ([#76](https://github.com/onfido/castor/issues/76)) ([24a299e](https://github.com/onfido/castor/commit/24a299eda0a28056daf3f8db6555d867e079d58a))
- **core:** add ods- prefix to all tokens ([#103](https://github.com/onfido/castor/issues/103)) ([0fec645](https://github.com/onfido/castor/commit/0fec6454f3c71f12c801dc33afa9e6dcdecc8c91)), closes [#102](https://github.com/onfido/castor/issues/102)
- **core:** adjust "white" alias ([#75](https://github.com/onfido/castor/issues/75)) ([2ce7fb9](https://github.com/onfido/castor/commit/2ce7fb964d965719885c6fa4d14158175a2a81ac))
- **core:** remove component transition ([#31](https://github.com/onfido/castor/issues/31)) ([7cb4d72](https://github.com/onfido/castor/commit/7cb4d729c2c583280da3236a310da45175f56efd))
- **core:** support 'raw' theme that doesn't include base tokens ([#36](https://github.com/onfido/castor/issues/36)) ([d786ecd](https://github.com/onfido/castor/commit/d786ecdc21f3f9571862ea12bf4f2ffe1d665b2f))

## 1.0.0-rc.1 (2020-12-01)

Initial release.
