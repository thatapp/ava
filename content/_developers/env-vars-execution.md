---
title: Environment variables available during component execution
description: We export a number of environment variables during each task step execution. You can use these variables in your component.
layout: article
section: Developer Reference
order: 1
category: environment-variables
redirect_from:
  - /references/envirament-variables-available-during-component-execution.html
---

## Description

We export a number of environment variables during each task step execution. You can use these variables in your component.

## API
  * `THATAPP_API_USERNAME`: The name of your user to be used for authentication with {{site.data.tenant.name}} REST API.

  * `THATAPP_API_KEY`: The API secret key for for authentication with {{site.data.tenant.name}} REST API.

  * `THATAPP_API_URI`: The address of {{site.data.tenant.name}} REST API.

## Step Execution

  * `THATAPP_TASK_ID`: Id of the task being executed

  * `THATAPP_EXEC_ID`: Id of the execution

  * `THATAPP_COMP_ID`: The id of the component being executed

  * `THATAPP_FUNCTION`: Name of the action or trigger being executed

  * `THATAPP_USER_ID`: Id of the user whose task is being executed
