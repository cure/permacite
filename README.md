
## permacite

Google Scholar has archived a lot of case law.

Unfortunately, Google does not make it easy to generate permanent links to
those cases. Such permanent links are a requirement to cite those cases.

It is possible to generated permalinks - but the feature is undocumented.

The trick is to use the link generated when searching for case law by reporter
citation, and transform it in a specific way.

This Chrome extension does the transformation automatically, and pastes the
permalink into the clipboard buffer of your computer.

### Example

Searching Google Scholar for case law on 'Eldred vs Ashcroft' yields the famous case at this URL:

  https://scholar.google.com/scholar_case?case=12147684852241107557&q=eldred+vs+ashcroft&hl=en&as_sdt=40000006

This is not a permanent link. The case ID is not guaranteed to be immutable
(this has been confirmed with folks at Google), and there search string could
point to other Eldred Vs. Ashcroft cases in the future.

Searching by the reporter citation, however, yields a slightly different URL:

  https://scholar.google.com/scholar_case?case=12147684852241107557&q=537+U.S.+186&hl=en&as_sdt=40000006

The same problem with the case ID exists, but the search query is a unique identifier for this particular case.

The permalink for this case, suitable for use in citations, is

  https://scholar.google.com/scholar?q=537+U.S.+186&hl=en&as_sdt=2&btnI=1

Note that visiting this URL leads to an immediate redirect to the version with case ID.

### Credits

Icon courtesy of [Daniel Bruce](http://danielbruce.se/), under the [Creative Commons Attribution-Share Alike 3.0 Unported License](http://creativecommons.org/licenses/by-sa/3.0/).
