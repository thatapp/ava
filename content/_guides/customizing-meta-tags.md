---
title: Customizing HTML Meta Tags
description: This document provides an introduction and a step-by-step instruction on changing your Platform page metadata from the defaults.
layout: article
section: Tenant Management
order: 1
since: 20190705
---

This document provides an [introduction](#introduction) and a step-by-step [instruction](#instruction) on changing your Platform page metadata from the defaults.

## Introduction

As of version 3.17.0, you can change the default HTML meta tags of your platform page. There are two reasons to do this. First of all, the more you can customize and personalize the Platform, the better in terms of whitelabeling. The second reason is the uncertain rules of search engine optimization. Google's policies change all the time to prevent grey and black hat SEO activities, or improve consumers' search experience. Still, HTML meta tags always remain important to a certain extent for page evaluation. Whatever this extent may be presently, it's better to have relevant tags.    

We offer the following meta tags for customization:

- **Description.** This is a brief text that you can see near the link to your page in the search results. It's not recommended to exceed 158 characters, because everything else will be cropped.  

- **Keywords.** These are words associated with the Platform in some way.

- **Author.** This one is used when you want to give credit to the person responsible for the content.

## Instruction

Follow these steps:

1\. Go to your Platform page, right click for the context menu and select "View Page Source".

![Platform Page](/assets/img/integrator-guide/customizing-metadata/Screenshot_1.png)

2\. Check the following part, which is in `<head>`:

```
<meta name="description" content="somedefaultstuff">
<meta name="keywords"  content="otherdefaultstuff">
<meta name="author"   content="moredefaultstuff">
```

These is the default metadata.

![Default metadata](/assets/img/integrator-guide/customizing-metadata/Screenshot_2.png)

3\. Make the API request:

```
curl {{apiBaseUri}}/v2/tenants/{TENANT_ID}\
    -X PATCH \
    -u{EMAIL}:{APIKEY} \
    -H 'Content-Type:application/json' -d '{
   "data":{
      "type":"tenant",
      "attributes":{
         "html_meta":{
            "description":"Bla bla bla",
            "keywords":[
               "pizza",
               "skateboard",
               "cowabunga"
            ],
            "author":"TMNT"
         }
      ]
   }
}
}'
```                 
Here you can fill in your own `description`, `keywords` and `author`.

![Description - Keywords - Author](/assets/img/integrator-guide/customizing-metadata/Screenshot_3.png)

4\. Go to your Platform page. Right click for the context menu and select "View Page Source" and see the result.

![Metadata - view page source](/assets/img/integrator-guide/customizing-metadata/Screenshot_4.png)
