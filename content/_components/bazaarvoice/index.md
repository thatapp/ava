---
title: Bazaarvoice component
layout: component
section: E-Commerce components
description: A SaaS software for retailers that allows them to add product reviews, ratings, and more.
icon: bazaarvoice.png
icontext: Bazaarvoice component
category: bazaarvoice
updatedDate: 2025-11-14
ComponentVersion: 0.0.4
---

## AVA 1.0.0 verified source publication — 2026-10-30

**PUBLISHED conditional #72 recording integration and documented source/account/Curations limits.** [Exact source](https://github.com/thatapp/connector-bazaarvoice/tree/8c170b4498387191984752897f077c8ee0386156) · [Full contract report](https://github.com/thatapp/connector-bazaarvoice/blob/8c170b4498387191984752897f077c8ee0386156/REPORT.md) · [Packaged intake](https://github.com/thatapp/connector-bazaarvoice/blob/8c170b4498387191984752897f077c8ee0386156/INTAKE.json).

Twelve actions cover Conversations reads/submissions and Curations content retrieval; there are no triggers. Both API credential channels use official origins and bounded opaque keys. Native response envelopes and business tokens remain intact except where credential masking applies. HasErrors/Errors/FormErrors or failed HTTP responses fail without emitting success.

Verification authenticates Conversations only. It does not independently verify Curations, and the host does not retain the verifier's explanatory return message; that limitation is stated here explicitly. PhotoUrl is forwarded without downloading. externalAuthorId maps to UserId, not an invented encrypted authentication token. Account-specific required fields, hosted-auth completion and Curations entitlement remain vendor/account concerns.

Pagination is one requested page under the documented limit/offset fields. Missing original schemas were reconstructed from published examples; broader schema parity is not asserted. Clean-room submission POSTs are recorded unsent and refuse fabricated success. There is no OAuth or attachment-store dependency in this connector.

Publisher evidence reports95 offline tests,96 sealed-loader tests and38 canonical workers on both runtimes. Independent review has52 checks:51 actual workers and one preflight Unicode refusal, with initially empty redactors and zero leaks/network attempts. The packaged scan covers65 files. Host4576be and harnessf05a0c4d remain integration dependencies.

This documentation chat independently checked the published tag/peeled commit and read the accepted packaged intake through GitHub. The counts above are attributed to the publisher/reviewer; this chat did not rerun those connector suites. All four packaged intake gates pass. Source publication is not installation, deployment, UI acceptance or live vendor certification. The historical ComponentVersion and content below do not override this release scope. The single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62) carries the current installation prerequisites.

---

## Credentials

Here are the credentials necessary to authenticate with the Bazaarvoice:

*   `apiUri` - for Conversations API
*   `apiKey` - for Conversations API
*   `curationsApiUri` - for Curations API
*   `curationsApiKey` - for Curations API

## Technical Notes

The [technical notes](technical-notes) page gives some technical details about Bazaarvoice component like [changelog](/components/bazaarvoice/technical-notes#changelog).

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

  1. [Retrieve reviews](/components/bazaarvoice/actions#retrieve-reviews)                                                     
  Action returns Reviews and Rating and related data.

  2. [Submit review](/components/bazaarvoice/actions#submit-review)                                                           
  Action submit reviews on a product.

  3. [Retrieve products](/components/bazaarvoice/actions#retrieve-products)                                                   
  Action returns Product data.

  4. [Retrieve categories](/components/bazaarvoice/actions#retrieve-categories)                                               
  Action returns Categories and related data.

  5. [Retrieve statistics](/components/bazaarvoice/actions#retrieve-statistics)                                               
  Action returns Product-based Review Statistics.

  6. [Retrieve comments](/components/bazaarvoice/actions#retrieve-comments)                                                   
  Action returns comments posted on reviews.

  7. [Submit question](/components/bazaarvoice/actions#submit-question)                                                       
  Action submit questions on a product.

  8. [Submit answer](/components/bazaarvoice/actions#submit-answer)                                                           
  Action submit answers on questions.

  9. [Submit comment](/components/bazaarvoice/actions#submit-comment)                                                         
  Action submit a comment on a review.

  10. [Submit photo](/components/bazaarvoice/actions#submit-photo)                                                            
  Action upload photos for a review, question or answer.

  11. [Submit feedback](/components/bazaarvoice/actions#submit-feedback)                                                      
  Action submit feedback on a review, comment, question, answer.

  12. [Retrieve curations content](/components/bazaarvoice/actions#retrieve-curations-content)                                
  Action returns social content collected by Bazaarvoice.

## Links

*   Bazaarvoice [Conversations API documentation](https://developer.bazaarvoice.com/conversations-api)
*   How to retrieve [user's device fingerprint](https://developer.bazaarvoice.com/conversations-api/tutorials/authenticity#device-fingerprint)
