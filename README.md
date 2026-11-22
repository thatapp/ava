# AVA Documentation


This repository contains the documentation of the AVA iPaaS platform. Visit
the [docs.thatapp.io](https://docs.thatapp.io) to see it live.

*   [Contributing](#contributing)
*   [White-labeling](#white-labeling)
*   [Search](#search)
*   [Testing locally](#testing-locally)

## Contributing
Contributions are welcome. If you create a pull request with some changes, we will review and incorporate as appropriate.

## Style Guidelines
* In order to maximize re-use for white-label customers who run AVA software under a different brand, it is important to use the handlebars replacements when appropriate. For example, instead of referencing `AVA` within a document, `{{site.data.tenant.name}}` should be used instead. [A full list of substitution values can be found here.](_data/tenant.yml)
* All git commits should have meaningful messages. Related commits should be combined into a single commit.
* Commits should be ideally be scoped to a single feature as much as possible.

## White-labeling
*(Follow the instructions in this section if you wish to set up a white-labeled copy of the documentation.)*

To provide a white-labeled documentation to your customers, please follow the
following steps:

1. Fork this repository
2. Customize [variables](_data/tenant.yml) used in documentation pages
3. Customize the [styles](./assets/css/common.css)
4.  Customize `CNAME` file (OPTIONAL: This is only required if documentation hosted on GitHub, but not necessary if documentation hosted on servers)
5. DO NOT edit any content to avoid merging conflicts
6. Pull changes from the original repository regularly so that your docs are up-to-date

## Search

The documentation uses a local client-side search.

Jekyll generates the search index at:

`/assets/js/search-data.json`

The index is regenerated automatically whenever the documentation site is built:

```bash
bundle exec jekyll build
```

## Testing locally

Install Ruby and the Bundler version listed at the end of `Gemfile.lock`. From the root of this repository, install the locked dependencies and start the preview.

```sh
bundle install
./start.sh
```

On Windows with PowerShell, run `bundle exec jekyll serve --host 127.0.0.1 --port 4000` after installing the bundle.

When Jekyll reports that the server is running, open [http://127.0.0.1:4000/](http://127.0.0.1:4000/). Press Ctrl+C in the terminal to stop it.
