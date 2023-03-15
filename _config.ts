import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import metas from "lume/plugins/metas.ts";
import postcss from "lume/plugins/postcss.ts";
import minifyHTML from "lume/plugins/minify_html.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import basePath from "lume/plugins/base_path.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import netlifyCMS from "lume/plugins/netlify_cms.ts";
import pageFind from "lume/plugins/pagefind.ts";

const site = lume({
  location: new URL("https://mx.sb"),
});

site
  .ignore("README.md")
  .copy("img")
  .copy("favicon.ico")
  .copy("favicon.png")
  .use(metas())
  .use(postcss())
  .use(minifyHTML({
    extensions: [".html", ".js", ".css"]
  }))
  .use(date())
  .use(codeHighlight())
  .use(basePath())
  .use(pageFind({
    ui: {
      resetStyles: false,
    },
  }))
  .use(slugifyUrls({ alphanumeric: false }))
  .use(resolveUrls())
  .use(netlifyCMS({ netlifyIdentity: true }));

export default site;
