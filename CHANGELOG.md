# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.5.2](https://github.com/onfido/castor/compare/v1.5.1...v1.5.2) (2021-09-28)

### Bug Fixes

- **react:** adds missing tooltip and popover exports ([#1009](https://github.com/onfido/castor/issues/1009)) ([6a2a61d](https://github.com/onfido/castor/commit/6a2a61d3ae30960c6d70e6103861dffb8ac59589))

### [1.5.1](https://github.com/onfido/castor/compare/v1.5.0...v1.5.1) (2021-09-27)

### Bug Fixes

- select empty state ([#1008](https://github.com/onfido/castor/issues/1008)) ([abccd9c](https://github.com/onfido/castor/commit/abccd9c9e148a61d607bf6220df3b6d551b489d7))

## [1.5.0](https://github.com/onfido/castor/compare/v1.4.0...v1.5.0) (2021-08-25)

### Features

- implement popover ([#878](https://github.com/onfido/castor/issues/878)) ([90e1d61](https://github.com/onfido/castor/commit/90e1d616dbbd37a079e35266988a1d2c5976beb1))
- implement tooltip ([#883](https://github.com/onfido/castor/issues/883)) ([2834dfd](https://github.com/onfido/castor/commit/2834dfd310e570738ea112bb3f4da2020583b734))
- **react:** forwardRef all components ([#869](https://github.com/onfido/castor/issues/869)) ([76f506c](https://github.com/onfido/castor/commit/76f506c143724eeeb25e03f23217c037ade0db78))

### Bug Fixes

- **core:** font helper CSS-in-JS compatibility ([#841](https://github.com/onfido/castor/issues/841)) ([40a66c1](https://github.com/onfido/castor/commit/40a66c1c020d5d83010cc2f3f6e83c2a2c63629d))
- **core:** use css properties from csstype, do not rely on react ([#840](https://github.com/onfido/castor/issues/840)) ([09e3b33](https://github.com/onfido/castor/commit/09e3b338c673afd6b862e8ac8b37aa63f955de68)), closes [#811](https://github.com/onfido/castor/issues/811)
- **react:** popover with portal reposition on document resize ([#925](https://github.com/onfido/castor/issues/925)) ([2024b19](https://github.com/onfido/castor/commit/2024b192cc2e9878f802500c61dc446ce068cf8c))

## [1.4.0](https://github.com/onfido/castor/compare/v1.3.0...v1.4.0) (2021-06-25)

### Features

- add progress component ([#766](https://github.com/onfido/castor/issues/766)) ([0ade2be](https://github.com/onfido/castor/commit/0ade2be603b4585b1c461f4af90a494c5d0b0cc7))
- add select (native) component ([#403](https://github.com/onfido/castor/issues/403)) ([dfe7075](https://github.com/onfido/castor/commit/dfe7075485f00a9c938764c15ef640be457a5637))
- **react:** auto-generate ids for checkbox/radio + label connections ([#705](https://github.com/onfido/castor/issues/705)) ([906dd83](https://github.com/onfido/castor/commit/906dd83b40c7e146493d0353f7f533ff80f58645))
- do not force setting label for asterisk ([#706](https://github.com/onfido/castor/issues/706)) ([033484c](https://github.com/onfido/castor/commit/033484c8b137d7f7aed2a5236fb3bd797df8ccbc))

### Bug Fixes

- **react:** do not set role as "button" on button as anchor ([#726](https://github.com/onfido/castor/issues/726)) ([ab12ee2](https://github.com/onfido/castor/commit/ab12ee24399e914b7a63052b82ef8d0815867f10))
- **react:** hide icon within component using aria ([#723](https://github.com/onfido/castor/issues/723)) ([fdc2bcb](https://github.com/onfido/castor/commit/fdc2bcb6920b0fe49656fb40a1af40fc5f787797))
- correct "withIcon" validation prop type to be on core ([#721](https://github.com/onfido/castor/issues/721)) ([49e6c39](https://github.com/onfido/castor/commit/49e6c3999f035443d1ef85c3c836cd8ab890d94d))

## [1.3.0](https://github.com/onfido/castor/compare/v1.2.0...v1.3.0) (2021-05-12)

### Features

- **core:** improve font monospace list ([#619](https://github.com/onfido/castor/issues/619)) ([59d9801](https://github.com/onfido/castor/commit/59d9801fe15c3d14d3c00879b62dd620c31751f8))
- **core:** themes set color-scheme ([#591](https://github.com/onfido/castor/issues/591)) ([6e65067](https://github.com/onfido/castor/commit/6e65067e8ab9f090edf3feed2f7feffdc50e61ec))
- **react:** deprecate "children" for adding input/textarea label ([#622](https://github.com/onfido/castor/issues/622)) ([359b5a2](https://github.com/onfido/castor/commit/359b5a2fc599cdb6e2ac8228b03b8e4712d7f860))
- generate themes with theo ([#589](https://github.com/onfido/castor/issues/589)) ([6037ab5](https://github.com/onfido/castor/commit/6037ab5aa3dd3af615fe77cda9a5c47ed76b91df))

### Bug Fixes

- **core:** monospace font ([#592](https://github.com/onfido/castor/issues/592)) ([5137132](https://github.com/onfido/castor/commit/513713238acc16ac2a86f03f564c8f856b0aa804))
- **core:** search includes icon and input if not already added ([e293315](https://github.com/onfido/castor/commit/e293315598fde7f95330885d41cc108c711e2e88))
- **react:** change button href check from key to value ([#576](https://github.com/onfido/castor/issues/576)) ([2f7ffe4](https://github.com/onfido/castor/commit/2f7ffe493299a6fca42d7d45cc9ac6f72de60b62))
- **react:** form onSubmit values ([#615](https://github.com/onfido/castor/issues/615)) ([46b1899](https://github.com/onfido/castor/commit/46b18999762dbd29f0af8ff488f7576f9402ce8c))
- **react:** form values onChange and onSubmit ([#635](https://github.com/onfido/castor/issues/635)) ([4cf3691](https://github.com/onfido/castor/commit/4cf36914890365bd75248fdcaac06f6791f849c8))
- **react:** useField types ([#590](https://github.com/onfido/castor/issues/590)) ([3d48384](https://github.com/onfido/castor/commit/3d48384be8ee8ba27833f69d713d7b2062abb31d))

## [1.2.0](https://github.com/onfido/castor/compare/v1.1.0...v1.2.0) (2021-03-25)

### Features

- add spinner component ([#402](https://github.com/onfido/castor/issues/402)) ([a9a1776](https://github.com/onfido/castor/commit/a9a177677ffa22888268ad6d0d80b734a97b120b)), closes [#67](https://github.com/onfido/castor/issues/67)
- default spinner as "medium" size ([#459](https://github.com/onfido/castor/issues/459)) ([718f8c4](https://github.com/onfido/castor/commit/718f8c4367c420f85f4f3df96fef150779f8c864))
- form ([#439](https://github.com/onfido/castor/issues/439)) ([e7e1e5d](https://github.com/onfido/castor/commit/e7e1e5d2ad3cbda12b6cf6aec5c4af4c22971bb0))
- set background color for "bordered" indicator container ([#386](https://github.com/onfido/castor/issues/386)) ([eecd7e6](https://github.com/onfido/castor/commit/eecd7e68ae8d88ba90e31f88b8e9d963dc5888dd))

### Bug Fixes

- align field label width with input/textarea ([#469](https://github.com/onfido/castor/issues/469)) ([e2fad4e](https://github.com/onfido/castor/commit/e2fad4ee7954e65abd6f6a21ed018486c7d9cba2))
- checkbox grid and ghost gap ([#380](https://github.com/onfido/castor/issues/380)) ([7387123](https://github.com/onfido/castor/commit/73871237ec96ada4afcd10d7d061f58986c4ce69))
- correct pointer for checkbox/radio component label ([#440](https://github.com/onfido/castor/issues/440)) ([f51012e](https://github.com/onfido/castor/commit/f51012e8aae559162e03b0d8853e26c597c482ae))
- form disabled interactions ([#456](https://github.com/onfido/castor/issues/456)) ([1ed733b](https://github.com/onfido/castor/commit/1ed733b69a53e0832838a820eb785c9bd044b746))
- form grid styles and story radios ([#484](https://github.com/onfido/castor/issues/484)) ([e86f0d6](https://github.com/onfido/castor/commit/e86f0d6bd0aa263a18aea2a6e370005deb52b915))
- **core:** correct background color of simulated input ([#383](https://github.com/onfido/castor/issues/383)) ([e4926e9](https://github.com/onfido/castor/commit/e4926e96050c1f04ccd0606d6e07fd019c8e5193))
- **core:** set placeholder opacity so each browser is aligned ([#417](https://github.com/onfido/castor/issues/417)) ([b3d6e39](https://github.com/onfido/castor/commit/b3d6e393aa757b994d48356b7d24ba0fb0521903))
- **react:** exclude "children" from search component props type ([#411](https://github.com/onfido/castor/issues/411)) ([49c687d](https://github.com/onfido/castor/commit/49c687da532cca76407ddeb8d0fc2b4393fd9fd5))

## [1.1.0](https://github.com/onfido/castor/compare/v1.0.1...v1.1.0) (2021-02-23)

### Features

- add asterisk component ([#326](https://github.com/onfido/castor/issues/326)) ([f9f9fb2](https://github.com/onfido/castor/commit/f9f9fb2eaa25d2d57ab9fd8f09118d2e37b8276c))
- add field-label component ([#267](https://github.com/onfido/castor/issues/267)) ([3e91a40](https://github.com/onfido/castor/commit/3e91a4098b56b9fe7180d2b40166646f3b858568)), closes [#4](https://github.com/onfido/castor/issues/4)
- add fieldset component ([#333](https://github.com/onfido/castor/issues/333)) ([ab42203](https://github.com/onfido/castor/commit/ab4220324998dce6a6a71e5c4010219104e8692e))
- add fieldset-legend component ([#338](https://github.com/onfido/castor/issues/338)) ([baa765a](https://github.com/onfido/castor/commit/baa765a713cc0cea917b4de2c19636ec9d8cce48))
- support custom transition-duration ([#330](https://github.com/onfido/castor/issues/330)) ([1d112ba](https://github.com/onfido/castor/commit/1d112ba9d23c242e6c198fc442746fd6e6ba3465))
- **core:** add .-touched:invalid as an alternative to .-invalid ([#329](https://github.com/onfido/castor/issues/329)) ([785a3f0](https://github.com/onfido/castor/commit/785a3f0c3927153fc485ef658e9a0366c1e168c2))
- add validation component ([#303](https://github.com/onfido/castor/issues/303)) ([4894c1b](https://github.com/onfido/castor/commit/4894c1b67a231dd993e2b98574cc6f35980258fd)), closes [#5](https://github.com/onfido/castor/issues/5)
- **core:** automatically include field-label (for input/textarea) ([#293](https://github.com/onfido/castor/issues/293)) ([c9984f6](https://github.com/onfido/castor/commit/c9984f6b58d03c205288b5fa22611a3e6e15a2ea))

### Bug Fixes

- **core:** compile field-label only once ([#298](https://github.com/onfido/castor/issues/298)) ([055fcdd](https://github.com/onfido/castor/commit/055fcdda07fc5e272882b0f63417fc33a87afdb1))
- **core:** correct "disabled" styling for checkbox and radio ([#328](https://github.com/onfido/castor/issues/328)) ([a68dc30](https://github.com/onfido/castor/commit/a68dc30b715d062044c3991aedbb71a01e852c61))
- **core:** correct placement of "bordered" indicator-container ([#301](https://github.com/onfido/castor/issues/301)) ([851a386](https://github.com/onfido/castor/commit/851a386687e1f2657eb91d612000fb5153041515))
- **core:** correctly space full width checkbox and radio ([#327](https://github.com/onfido/castor/issues/327)) ([68aab8a](https://github.com/onfido/castor/commit/68aab8abe76e98f3b3901eaf45fe1c19c4b15254))
- **core:** make sure field-label follows 8px grid ([#291](https://github.com/onfido/castor/issues/291)) ([880be1b](https://github.com/onfido/castor/commit/880be1b344db0bade0dcbdc48b09cc40ca6c3b89))

### [1.0.1](https://github.com/onfido/castor/compare/v1.0.0...v1.0.1) (2021-02-09)

### Bug Fixes

- peer dependency versions ([#285](https://github.com/onfido/castor/issues/285)) ([601fd94](https://github.com/onfido/castor/commit/601fd94368a8284844e5dfc08b5a9dcecf7a3891))

## [1.0.0](https://github.com/onfido/castor/compare/v1.0.0-rc.4...v1.0.0) (2021-01-29)

### Bug Fixes

- **react:** indicator data- and aria- properties apply to label ([#236](https://github.com/onfido/castor/issues/236)) ([ef83180](https://github.com/onfido/castor/commit/ef831808d71f96f18724a3c4dd5698d5f2bbd802)), closes [#230](https://github.com/onfido/castor/issues/230)
- use "gap" with grid ([#232](https://github.com/onfido/castor/issues/232)) ([fc3cf09](https://github.com/onfido/castor/commit/fc3cf0911ebf8534f6e297dfb95a62d29a141896))
- **core:** checkbox component "invalid" state styling ([#231](https://github.com/onfido/castor/issues/231)) ([caf3578](https://github.com/onfido/castor/commit/caf3578c57490fa90a77a620cfcd5cd816fa0439))
- correct indicator container border radius to "large" ([#229](https://github.com/onfido/castor/issues/229)) ([a2a04cc](https://github.com/onfido/castor/commit/a2a04cc5bc505db8d9cf95ff0c39325732d7c913))

## [1.0.0-rc.4](https://github.com/onfido/castor/compare/v1.0.0-rc.3...v1.0.0-rc.4) (2021-01-26)

### ⚠ BREAKING CHANGES

- **core:** CSS for each individual component is no longer being generated and distributed. Use
  Sass to pick individual component styling, or eliminate dead code from "castor.css" on your app.
- Use HelperText instead of Description within Radio
  component.

### Features

- add checkbox component ([#78](https://github.com/onfido/castor/issues/78)) ([4ede06a](https://github.com/onfido/castor/commit/4ede06ab5975632d3f49cd2f7b8010a81a2087c6)), closes [#1](https://github.com/onfido/castor/issues/1)
- **core:** do not distribute individual component css files ([#225](https://github.com/onfido/castor/issues/225)) ([c1e4feb](https://github.com/onfido/castor/commit/c1e4feb47468dccf9e781dbde0bfff5242736029))
- rename description component to helper-text ([#216](https://github.com/onfido/castor/issues/216)) ([2cdabe0](https://github.com/onfido/castor/commit/2cdabe075a9752576119a829f61e28e0a2ebba6a))

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
