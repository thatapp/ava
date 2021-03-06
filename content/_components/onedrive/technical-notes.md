---
title: Microsoft OneDrive Technical Notes
layout: component
description: Technical Notes for the Microsoft OneDrive component
icon: onedrive.png
icontext: Microsoft OneDrive component
category: onedrive
ComponentVersion: 1.0.2
updatedDate: 2020-10-30
redirect_from:
  - /components/onedrive/completeness-matrix.html
  - /components/onedrive/changelog.html
---

## Changelog

### 1.0.2 (October 30, 2020)

* Update sailor version to 2.6.18
* Annual audit of the component code to check if it exposes a sensitive data in the logs

### 1.0.1 (August 4, 2020)

* Adapt Polling Trigger to account for the fact that OrderBy is not supported in One Drive for Business
* Polling trigger handles cases where there are more than 200 matching files
* Limit parallelization of writing to steward in polling trigger
* Polling trigger correctly sorts items by timestamp
* Update dependencies. Sailor is updated to version `2.6.14`
* Fix integration tests

### 1.0.0 (March 26, 2020)

* Create Get New And Updated Files Polling Trigger
* Create Upsert File Action
* Create Create Folder Action
* Create Get File Action
* Create Delete File Action

## Completeness Matrix

Here is the Microsoft OneDrive component Completeness Matrix:

![Completeness Matrix](https://user-images.githubusercontent.com/16806832/77531578-d58d1280-6e9b-11ea-8802-4ed8e492f081.png)
