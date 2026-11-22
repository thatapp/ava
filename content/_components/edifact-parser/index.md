---
title: Edifact-parser component
layout: component
section: Protocol components
description: A international standard for electronic data interchange (EDI).
icon: edifact.png
icontext: Edifact-parser component
category: edifact-parser
updatedDate: 2023-04-07
ComponentVersion: 1.0.0
---

## Authentication

This component requires no authentication.

## How it works

EDIFACT Parser component expects an incoming message(es) with EDI attachment(s) in it. You can test it using SFTP component like this:

![Edifact Sample](img/edifact-sample.png)

Sample example:

```json
{
  "result": [
    {
      "elements": [
        ["UNOA", "1"],
        ["005435656", "1"],
        ["006415160", "1"],
        ["060515", "1434"],
        ["00000000000778"]
       ],
      "name": "UNB"
    }
  ]
}
```

> Compare the [sample EDI invoice](/assets/examples/edifact/INVOICE.edi) with its [parsed JSON output](/assets/examples/edifact/INVOICE.edi.json).

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about Edifact-parser component like [changelog](/components/edifact-parser/technical-notes#changelog).

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions


### EDIFACT Parse

EDIFACT Parse action expects an incoming message(es) with EDI attachment(s) in it.

The [sample EDI invoice](/assets/examples/edifact/INVOICE.edi) produces the [example JSON response](/assets/examples/edifact/INVOICE.edi.json).
