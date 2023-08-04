const STYLE_TAG_TO_INJECT = `<style>
@media (prefers-color-scheme: dark) {
	body {
		background: #121212;
	}
	.pagetop {
		color:#ddd;
	}
	.c00, .c00 a:link {
		color:#fff;
	}
	a:link, .pagetop a, .pagetop a:visited {
		color: #fff;
	}
	td {
		background-color: #333 ;
	}
	table {
		background-color: #333;
	}
	tr {
		background-color: #333;
	}
	td[bgcolor] table, td[bgcolor] tr, td[bgcolor] td {
		background-color: #222;
	}
	textarea {
		background: #121212;
	}
}</style>`;

const rewriter = new HTMLRewriter().on("head", {
  element(element) {
    element.append(STYLE_TAG_TO_INJECT, { html: true });
  },
});

export default {
  async fetch(request: Request) {
    const url = new URL(request.url);
    const response = await fetch(
      `https://news.ycombinator.com${url.pathname}${url.search}`
    );

    return rewriter.transform(response);
  },
};
