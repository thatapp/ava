---
title: Configuration component
layout: component
section: Utility components
description: A component that allows separating the modification of configurable values from the modification of the flow.
icon: configuration.png
icontext: Configuration component
category: configuration
updatedDate: 2025-12-03
ComponentVersion: 1.0.2
---

## AVA 1.0.0 release status — 2026-10-30

**Published conditionally: #57/#72 remain required; not installed or live verified.** [Exact source](https://github.com/thatapp/connector-configuration-component/tree/496585cba0e0ef032229890a5ed357fdd3c4f6e8) · [Full report](https://github.com/thatapp/connector-configuration-component/blob/496585cba0e0ef032229890a5ed357fdd3c4f6e8/REPORT.md) · [Packaged intake](https://github.com/thatapp/connector-configuration-component/blob/496585cba0e0ef032229890a5ed357fdd3c4f6e8/INTAKE.json).

The Emit data action parses saved configData as literal JSON and emits one object. The root must be a non-null object, including an empty object; nested arrays are supported. The supplied string is limited to5120 UTF-8 bytes including whitespace and depth30. Nonfinite parsed numbers, invalid Unicode and __proto__/constructor/prototype property names refuse. Duplicate keys keep their last value and numbers retain JavaScript precision. These explicit bounds supersede unrestricted-complexity prose below. Verification and execution share validation; emission is awaited without retry or snapshots.

Saved configuration takes precedence over node and message overrides, and an updated saved value is used by the next tested dispatch. configData is ordinary nonsecret configuration, not encrypted secret storage; downstream values remain intact while normal record masking applies. The actual catalog advertises component_verify available:true and on_save:true, and real verifier calls pass/refuse. #57 concerns authenticated browser/UI acceptance. The inherited JSONataView currently becomes a generic text field; JSONata expressions, Evaluate/editor behavior, realtime caching and transactional updates across flows are unverified. No triggers, network requests, dependencies or environment variables are introduced. The separate Simple/REST/Email example is not qualified by this release.

Final committed checks on both Node20.20.2/24.13.0 pass33 offline tests,36 canonical sealed-worker outcomes, the unchanged require allowlist,61-file secret scan and standalone hostcheck. The saved-configuration proof passes29 checks/23 actual workers/23 real store rounds. Independently authored tests were rerun with92 checks/82 instrumented workers/88 store rounds plus two separate sealed-loader controls per runtime; zero external network attempts. Synthetic in-memory persistence exercises actual flow-store/resolver/dispatcher/verifier code, not a deployed database. Packaged INTAKE.json explicitly identifies reviewed runtimeaf28789 before documentation/evidence packaging; external final publication receipts pin the released commit. Both original source failures and packaging corrections remain disclosed in REPORT. Original source, seven screenshots, three complete pages and historical release text are preserved.

Annotated tag7585442619ddbcf2b2b7435c2bbecbb199cbafb2 peels to the source above; main remainsc3db1f8eaf6c29e9476d3a7551d85990bc6016d2. Installation follows the single [#62 table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Historical release notes and example material below remain historical, with the release qualifications above controlling current availability.

---

## Description

{{page.description}}

## How it works.  API version / SDK version

Configuration component has a credential which is a text field with the following
rules:

*   It must be a valid JSON in order for the credentials to be verified.
*   It must not exceed 5KB in size.

The screenshot below shows the configuration component *Choose Credential* stage
during the integration flow design. The text field will be evaluated to check if
the above conditions are met.

{% include img.html max-width="100%" url="img/configuration-credentials.png" title="Credentials" %}

Afterwards, it emits a message with an object equivalent to the JSON in the config.
So any data which is used in the flow and is repeated in multiple places can be configured (or later changed) in the single step.
After that new values are used where it is needed.

### Short example

You want to make an email marketing that can allow the customers on your email list to be aware of new products, discounts, and other services. You have a base of your clients but your CRM system cannot automatically control the special clients which you want to mail with special promotions or offers. This can be done by adding a configuration component where you can set the list of your special clients that are very important for you and control it manually by modifying the clients list.

If you are interested in a more detailed example of using a configuration component, please read this [article](usage-example).

### Environment variables

No environment variables are necessary to configure the component.

> Please Note: From the platform version 20.51 we deprecated the
> component `LOG_LEVEL` environment variable. Now you can control logging level per each step of the flow.

## Credentials

Configuration data should be specified as credentials of a JSON format. JSON
must be valid in order for credentials to be verified (except arrays, see the
[Known limitations below](#known-limitations)). Credentials verification will
fail otherwise.

Input data example. Consider the following example:

*   Someone wants to synchronize prices between an ERP and an E-SHOP
*   The price logic is so complex that it can not pragmatically exist in a single flow.
*   Prices in the ERP exist in only in currency A. Prices in the E-SHOP are in currency B. The customer wants to convert prices as data is moved between systems at a fixed rate that they set.
*   This fixed rate must be the same between all flows.

If the configuration component existed, you build flows of the following form:

```
ERP.GetPriceInfo()
  -> Config.LoadConfig()
    -> E-SHOP.SetPrice(price := ERPResults.Price * ConfigResults.ExchangeRate)
```

If one needed to change the exchange rate, that value could be edited by modifying
the configuration credentials to include the new rate and then resetting the snapshot
for all the price import flows. Currency rates sample:

```json
{
  "USDEUR": 0.881715,
  "USDFJD": 2.115102,
  "USDPLN": 3.787097,
  "USDQAR": 3.641042,
  "USDUAH": 30.718014,
  "USDZWL": 322.355011
}
```

Then the currency rate can be used in any number of flows, where it is needed
and then changed form the single place. That changes will affect all the flows
where it is used.

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about Configuration component like [changelog](/components/configuration/technical-notes#changelog).

## Triggers

The configuration component has no trigger functions.
This means the component can not be selected as a first step in any integration flow.

## Actions

### Emit data

The only action that is supported by this component is to emit data. This action emits the configuration data as a valid JSON object in a message. The output json schema can have any complexity.

But there are some [platform limitations](#known-limitations) with naked arrays, which do not allow access to the data in such arrays that has been emitted from a component, from the next step. This is why the naked arrays should not be passed to the component directly.

## Known limitations

1.  As realtime flows use credentials which were saved at the moment of starting the flow, **this component should be used only in ordinary flows**. This is not a bug or limitation, but the platform specific case.
2.  Despite naked arrays are valid JSON, there are some platform limitations, which do not allow to access the data in such arrays, that has been emitted from a component, from the next step. This is why **the naked arrays should not be passed to the component directly**. So instead of

```json
[
 {
   "Product Name": "Bowler Hat",
   "ProductID": 858383,
   "SKU": "0406654608",
   "Description": {
     "Colour": "Purple",
     "Width": 300,
     "Height": 200,
     "Depth": 210,
     "Weight": 0.75
   },
   "Price": 34.45,
   "Quantity": 2
 }
]
```
use something like:

```json
{
  "Product": [
    {
      "Product Name": "Bowler Hat",
      "ProductID": 858383,
      "SKU": "0406654608",
      "Description": {
        "Colour": "Purple",
        "Width": 300,
        "Height": 200,
        "Depth": 210,
        "Weight": 0.75
      },
      "Price": 34.45,
      "Quantity": 2
    }
  ]
}
```
