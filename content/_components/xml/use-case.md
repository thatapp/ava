---
title: XML Use Case
layout: component
description: An example for a better understanding of how the XML component works.
icon: xml.png
icontext: XML component
category: xml
ComponentVersion: 1.4.2
updatedDate: 2025-12-04
---

## AVA 1.0.0 release status — 2026-10-30

**Published conditionally; not installed or live verified.** [Exact source](https://github.com/thatapp/connector-xml-component/tree/2730719ed80d6064f0bcca806654318f32287f1f) · [Complete field and qualification report](https://github.com/thatapp/connector-xml-component/blob/2730719ed80d6064f0bcca806654318f32287f1f/REPORT.md) · [Immutable final intake](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/blob/309f1fa35189512cc260b945cb1eb3586b08f615/docs/ipaas/source-inventory-2026-10-30/xml-release-intake/qualification.json).

The release implements XML to JSON, JSON to XML, XML Attachment to JSON and the original deprecated JSON-to-XML action. No credentials or triggers are added. XML-to-JSON emits the parsed root object; attributes use `_attr`, inner text uses `_` and repeated children become arrays. The historical prose's `#` text key is not the implemented mapping. JSON-to-XML accepts an already mapped `body.input` object with exactly one root. JSONata evaluation belongs to the host mapper. Optional upload/header/standalone fields are strict booleans; current standalone defaults to no, while the deprecated body-direct action defaults to yes.

Saxes validates XML 1.0 grammar and namespaces before historical xml2js conversion. DTDs, malformed or partial XML, invalid characters, unsupported encodings and normalized-name collisions refuse before output. **Conversion retains literal CRLF/CR text and attribute whitespace; this is not XML-standard normalization or full XML conformance.** Mixed-content order and namespace-preserving roundtrip are not lossless, and no XSD/DTD validation is provided. Comments and processing instructions do not become JSON fields. UTF-8 and ASCII are supported; an ASCII declaration additionally restricts raw source characters, while numeric character references may produce Unicode.

Attachment upload uses scoped parent storage. Output `attachmentUrl` is a reference object, alongside `attachmentSize` and the same reference in `attachments['jsonToXml.xml']`; it is not a downloadable Maester URL. Incoming attachments may be public HTTPS URLs or scoped references. Complete200 downloads are required; partial/range or mismatched uncompressed lengths refuse. Clean-room upload records the attempt then refuses without a fabricated successful reference. Failed emission cleans up only the new attachment; incoming caller-owned references are retained. Delivery is not transactional or exactly-once.

Inputs/outputs are bounded to4MiB, depth40 and10,000 elements/attributes or JSON values; batches contain at most25 files, and all files are validated before the first emission. `MAX_FILE_SIZE` is in MiB and may lower the4MiB cap, subject to host environment injection. The historical5/10MiB statements are not current supported limits. Patterns apply only to legacy lowercase `.xml` filenames and use bounded RE2 syntax; backreferences and lookaround refuse. Modern body attachment arrays are not filename-filtered, and an explicitly empty array stays empty. Debug attachment JSON above512KiB refuses instead of producing a fabricated sample. Old ordinary internal attachment URLs and memory-setting environment names are not interchangeable with this host's capabilities.

Final Node20.20.2 and24.13.0 each pass95 npm tests,100 canonical outcomes, the unchanged require allowlist and198-file secret scans, plus standalone hostcheck and113 supplementary process workers/two metadata workers/two scoped stores. Independent review passes149 process workers, two metadata callbacks and two sealed cleanup controls per runtime, resolving original XML-R1/R2 findings. Root additionally verifies eight encoding workers and eight old/corrected conversion controls each. All use synthetic data and zero external network attempts. Original failed reviews, fixture-encoding error and normalization-test expectation error remain preserved separately.

Host #75 attachment/binary integration, #58 environment injection, #72 production integration, #57 UI/mapping and #80 explicit contract limits remain conditional. The complete restaurant/webhook/JSONata/email example, real provider/storage behavior and deployment remain UNVERIFIED. Tag 082036ce14194fdecc8986a5322e25e90f0ca592 peels to the source above; original main is unchanged. Installation follows the single [#62 table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Historical examples and upstream release notes below remain historical.

---

## Client use case

Many organizations use XML files because they are extendable, readable and understandable but it is difficult to code. Imagine a restaurant that uses XML files containing breakfast menus. The integration flow must calculate business statistics that can be used in accounting and data analytics. XML component could transform format to JSON which can be modified and transformed back again. JSON is simple and easy to use with its hierarchical structure. JSON functions can do all necessary calculations. As an output, there will be a string with results which will be converted to XML. Let's start with our flow.

<details close markdown="block"><summary><strong>Flow view</strong></summary>

{% include img.html max-width="50%" url="img/flow-view.png" title="Flow view" %}

</details>

### Step 1 - Webhook

In the first step we will use the [Webhook](/components/webhook) component which receives **XML**.

{% include img.html max-width="100%" url="img/post-webhook.png" title="Post webhook" %}

**XML** body sent to Webhook which contains the restaurant menu:

<details close markdown="block"><summary><strong>XML body</strong></summary>

```xml
<breakfast_menu_july>
<food>
<name>Belgian Waffles</name>
<price>5.95</price>
<description>Two of our famous Belgian Waffles with plenty of real maple syrup</description>
<orders>65</orders>
</food>
<food>
<name>Strawberry Belgian Waffles</name>
<price>7.95</price>
<description>Light Belgian waffles covered with strawberries and whipped cream</description>
<orders>32</orders>
</food>
<food>
<name>Berry-Berry Belgian Waffles</name>
<price>8.95</price>
<description>Light Belgian waffles covered with an assortment of fresh berries and whipped cream</description>
<orders>43</orders>
</food>
<food>
<name>French Toast</name>
<price>4.50</price>
<description>Thick slices made from our homemade sourdough bread</description>
<orders>60</orders>
</food>
<food>
<name>Homestyle Breakfast</name>
<price>6.95</price>
<description>Two eggs, bacon or sausage, toast, and our ever-popular hash browns</description>
<orders>95</orders>
</food>
</breakfast_menu_july>
```

</details>

### Step 2 - XML

The second step is XML component with **XML to JSON** action and sample retrieved from the [Webhook](/components/webhook/) from the first step.

{% include img.html max-width="100%" url="img/xml-to-json-step-2.png" title="XML to JSON" %}

### Step 3 - XML

In the third step we are using XML component again, this time **JSON to XML** action. There is no need to use [Jsonata component](/components/jsonata/) because JSON can be put into the **JSON to convert*** field in the Mapping. Upload XML as file to attachments is enabled.

{% include img.html max-width="100%" url="img/json-to-xml-step-3.png" title="JSON to XML" %}

Now let's take a closer look at XML configuration with **JSON to XML** action. To calculate the sales statistics we need to convert string-numbers to numbers and then use JSONata functions:

<details close markdown="block"><summary><strong>JSON to convert field</strong></summary>

    ```
    {
    "breakfast_menu_july": {
    "sales": {
    "orders": $sum([$getPassthrough()."step_2".body."breakfast_menu_july".food[].orders].$number()),
    "profit": $sum([$getPassthrough()."step_2".body."breakfast_menu_july".food[]].($number($.price)*$number($.orders)))
    }
    }
    }
    ```

</details>

### Step 4 - E-Mail

Our last step will be the [E-Mail](/components/email/) component with an XML file as an **attachment** to see the output file with the results.

{% include img.html max-width="100%" url="img/email-config.png" title="Email Configuration" %}

You can see the E-Mail message with the **attachment** we need:

{% include img.html max-width="50%" url="img/email-attach.png" title="Email with attachment" %}

The XML output will consist of the profit and order numbers for the breakfast menu for the month of July.

<details close markdown="block"><summary><strong>Click to expand for more details</strong></summary>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<breakfast_menu_july>
  <sales>
    <orders>295</orders>
    <profit>1956.25</profit>
  </sales>
</breakfast_menu_july>
```

</details>
