---
title: How to cause or emit a Rebound?
layout: article
section: Integration patterns
description: In order to cause a rebound you need to emit rebound event with a cause as a second argument. The cause may be an Error or a String with a description of the cause.
category: integration-patterns
order: 3
---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

## Description

The Rebound is **in-build feature** so all you have to do is use it in your component creation.

In order to cause a rebound **you need to emit rebound event with a cause as a second argument.** The cause may be an Error or a String with a description of the cause.

The basic principle and syntax could be written following examples presented here.

## Causing Rebound in JavaScript code

Here is how to implement Rebound in Node.js code:

```javascript
exports.process = processTrigger;

function processTrigger(msg, cfg){
    var that = this;
    that.emit('rebound', new Error('Rebound reason'));
    that.emit('end');
}
```

Here is an example of Rebound feature usage in [Commercetools component](/components/commercetools/) component action called addVariants:

```js
function addVariant(productId, payload) {
        if (!productId) {
            console.log('No product with masterVariantSku %s found.', masterVariantSku);
            return self.emit('rebound', 'No product with masterVariantSku' + masterVariantSku + 'found.');
        }

        function emitData(response) {
            self.emit('data', response.body);
        }

        return client.products
            .byId(productId)
            .update(payload)
            .then(emitData);
    }
```

## Java rebound examples

Java component hosting is **not offered**. The former Java SDK examples have been removed.
