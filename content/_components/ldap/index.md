---
title: Ldap component
layout: component
section: Protocol components
description: A protocol for accessing and maintaining distributed directory information services over an IP network.
icon: ldap.png
icontext: Ldap component
category: ldap
updatedDate: 2023-04-07
ComponentVersion: 1.0.3
---

## AVA 1.0.0 release status — 2026-10-30

**Published conditionally: #84/#72 host integration and #57/#58 credential UI/save acceptance remain required.** [Exact source](https://github.com/thatapp/connector-ldap/tree/70a2e0fa4a1ea6155e337942dc49bd51a6c31ae4) · [Full report](https://github.com/thatapp/connector-ldap/blob/70a2e0fa4a1ea6155e337942dc49bd51a6c31ae4/REPORT.md) · [Packaged intake](https://github.com/thatapp/connector-ldap/blob/70a2e0fa4a1ea6155e337942dc49bd51a6c31ae4/INTAKE.json) · [Independent review](https://github.com/thatapp/connector-ldap/blob/70a2e0fa4a1ea6155e337942dc49bd51a6c31ae4/evidence/independent-host870b30c-review.md). Source publication does not establish installation or live directory interoperability.

One Search action accepts base/filter/scope (base, one or sub) and emits complete entries individually; an empty result emits nothing. There are no triggers. Saved URL/user/password bind the parent connection to the organisation/workspace and are withheld from the worker. Node/message fields cannot redirect it. Verification proves successful bind authentication only, not all search permissions. No connector environment variables are needed.

The reviewed parent is870b30c240ee6e11c9c1ab83f4357ca170ffd749 in Draft MR163, with MR161/MR162 prerequisites. LDAP workers remain sealed and the require allowlist is unchanged. The original bd459a8 host is rejected: independent review found malformed replies, invalid UTF-8 identifiers and a SASL overload accepted. The correction validates bounded BER IDs/operations/mandatory fields and fatal UTF-8 before driver normalization; all three findings are resolved. Properly encoded literal U+FFFD remains valid in DN/value text. Both original and corrected evidence are preserved.

Search uses one unpaged LDAPv3 request, at most1000 entries/4MiB JSON/15seconds. The parent stages the whole result and refuses server limits, incomplete responses, referrals, malformed text, binary attributes, response controls and duplicate/DN-overwriting attributes before release. Socket bytes, structures, cancellation and cleanup are bounded. No unlimited paging, full binary parity, schema discovery or exactly-once guarantee is made. LDAPS verifies certificates with TLS1.2 minimum; explicit LDAP remains plaintext. StartTLS, SASL and custom CA controls are unsupported. Reserved SASL username inputs refuse before connection.

Each Node20.20.2/24.13.0 final committed checkout passes23 offline tests,30 canonical isolated workers, the require allowlist and47-file secret scan, plus standalone hostcheck and14 saved-credential checks/12 workers. Independent paired review passes303 host tests and60 actual workers each, zero external network attempts. Saved-credential proofs use real AES/store/resolver code with synthetic in-memory persistence. They do not establish deployed database/UI or live TLS/directory behavior. Clean-room reads require separate explicit recorded responses and cannot fall back to a live provider.

Main remains4380845474849e82ac44f7a09c96134df6acc20e; annotated1.0.0 tag object6862a13cde0a446fecb075e11f58c850b974a9b4 peels to the source above. Host MR163 remains Draft with prerequisite conflicts; no merge, installation or deployment is claimed. Follow the single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Historical source release notes below remain verbatim and do not describe an installed build.

---

## Technical Notes

The [technical notes](technical-notes) page gives some technical details about Ldap component like [changelog](/components/ldap/technical-notes#changelog).

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Search

Performs an [LDAP search operation](https://www.ldap.com/the-ldap-search-operation) on the instance.

{% include img.html max-width="100%" url="img/ldap-search.png" title="Search action" %}

* *Base* refers to the base object in the directory from which to start the search.
* *Filter* allows you to specify one or more [LDAP filters](https://www.ldap.com/ldap-filters) to restrict the results of the search.
* *Scope* refers to the [search scope](https://www.ldap.com/the-ldap-search-operation).  Options are `base`,
 `one` or `sub` (sometimes called `baseObject`, `singleLevel` or `wholeSubtree`
 respectively). The `subordinates` (a.k.a. `subordinateSubtree`) scope is not
 yet supported.

Each matched result is returned individually.

## Development

This component has some integration tests.  In order to run the integration
tests, one needs to create a `.env` file which contains the following
environment variables:

```
LDAP_URL=<URL To Test Instance>
LDAPUSER=<User For Test Instance>
PASSWORD=<Password For Test Instance>
BASE=<Search Criteria which should match exactly 4 results>
```

## Configuration Info

### Required environment variables

No environment variables need to be configured.

### Version and compatibility information

This component interacts with LDAP v3.
