# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added

- Add CRUD operations for Review Replies. [#28](https://github.com/plotwist-app/plotwist-backend/pull/28)

### Changed

- Format files with BiomeJs. [#28](https://github.com/plotwist-app/plotwist-backend/pull/28)

## 1.0.0

### Added

- Create unique endpoint de update user public information. [#35](https://github.com/plotwist-app/plotwist-backend/pull/35)
- Create legacy user login flow. [#34](https://github.com/plotwist-app/plotwist-backend/pull/34)
- Create GET detailed reviews route. [#33](https://github.com/plotwist-app/plotwist-backend/pull/33)
- Create reviews POST, GET, PUT and DELETE routes. [#32](https://github.com/plotwist-app/plotwist-backend/pull/32)
- Create `is_legacy` field in database [#31](https://github.com/plotwist-app/plotwist-backend/pull/31)
- Create subscription webhook [#27](https://github.com/plotwist-app/plotwist-backend/pull/27)
- Create list items create, read, update and delete endpoints [#26](https://github.com/plotwist-app/plotwist-backend/pull/26)
- Create get list endpoint [#22](https://github.com/plotwist-app/plotwist-backend/pull/22)
- Create edit list endpoint [#21](https://github.com/plotwist-app/plotwist-backend/pull/21)
- Create delete list endpoint [#20](https://github.com/plotwist-app/plotwist-backend/pull/20)
- Create reviews endpoint [(#19)](https://github.com/plotwist-app/plotwist-backend/pull/19)

### Changed

- Changed createdAt field convention name in database only [#30](https://github.com/plotwist-app/plotwist-backend/pull/30)
- improve folders structure [(#24)](https://github.com/plotwist-app/plotwist-backend/pull/24)
- Move domain folder to src root [(#23)](https://github.com/plotwist-app/plotwist-backend/pull/23)
- Set some review fields on schema as required [(#19)](https://github.com/plotwist-app/plotwist-backend/pull/19)

## 0.1.0

### Added

- create and get lists endpoint [#18](https://github.com/plotwist-app/plotwist-backend/pull/18)
- health check endpoint [(#16)](https://github.com/plotwist-app/plotwist-backend/pull/16)

### Changed

- refactor service and routes [(#10)](https://github.com/plotwist-app/plotwist-backend/pull/10)
- split layers and create repositories and services [(#10)](https://github.com/plotwist-app/plotwist-backend/pull/10)
- improve Docker compose file to create dev and test databases [(#5)](https://github.com/plotwist-app/plotwist-backend/pull/5)
- improve Drizzle migrations [(#1)](https://github.com/plotwist-app/plotwist-backend/pull/1)
- init Drizzle migrations [(#1)](https://github.com/plotwist-app/plotwist-backend/pull/1)

### Added

- remove profiles table and change relations to users table [#14](https://github.com/plotwist-app/plotwist-backend/pull/14)
- added response schemas in login and users routes [#13](https://github.com/plotwist-app/plotwist-backend/pull/13)
- relations to users table and indexes [(#11)](https://github.com/plotwist-app/plotwist-backend/pull/11)
- check username and email route [(#9)](https://github.com/plotwist-app/plotwist-backend/pull/9)
- remove either and handle errors manually [(#8)](https://github.com/plotwist-app/plotwist-backend/pull/8)
- setup register user and login route [(fdb6c89)](https://github.com/plotwist-app/plotwist-backend/pull/7)
- add PR template File [(#4)](https://github.com/plotwist-app/plotwist-backend/pull/4)
- add changelog File [(#3)](https://github.com/plotwist-app/plotwist-backend/pull/3)
- remove unused stuffs [(#12e87f0)](https://github.com/plotwist-app/plotwist-backend/commit/12e87f05c6a7f804057535c373bb8788a7520459)
- add base schema relations for authentication entities [(#b2d5390)](https://github.com/plotwist-app/plotwist-backend/commit/b2d53907af46d5961329966642455f1b37922465)
- setup initial register review route [(#f31e178)](https://github.com/plotwist-app/plotwist-backend/commit/f31e1781f9dcf3a68b929f3761405c23cf192ffd)
- change vite file to vitest [(#252fd5f)](https://github.com/plotwist-app/plotwist-backend/commit/252fd5f7e2e02c7cfbe8ab2e14125f2cd8afaa56)
- init project base structure [(#21f7ae5)](https://github.com/plotwist-app/plotwist-backend/commit/21f7ae544d6057bbc42e8c68df5cfdae9c0273c9)

### Removed

- email and username from profiles schema [(#11)](https://github.com/plotwist-app/plotwist-backend/pull/11)
- we've removed an template/unused route[(#2)](https://github.com/plotwist-app/plotwist-backend/pull/2)
- template/unused route[(#2)](https://github.com/plotwist-app/plotwist-backend/pull/2)
