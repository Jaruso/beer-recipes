# The Brewbook 🍺

A clean, static beer-recipe collection hosted on **GitHub Pages**. Recipes are individual YAML files, so adding a new brew never requires editing HTML, CSS, JavaScript, a manifest, or a recipe index.

**How it works:** GitHub Pages runs its built-in Jekyll generator. Jekyll automatically reads every `.yml` / `.yaml` file in `_data/recipes/` and renders the recipe cards and details into static HTML. The tiny bit of browser JavaScript is just for search, style filters, and navigating between recipes.

## Publishing the site

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose branch **`main`** and folder **`/(root)`**, then **Save**.
4. Visit **https://jaruso.github.io/beer-recipies/** once the first Pages build completes.

> Do **not** add a `.nojekyll` file: GitHub Pages needs Jekyll to transform the recipe YAML files into HTML.

## Add a beer recipe (no code changes)

1. Copy one of the example files in `_data/recipes/` to a new file, such as `_data/recipes/my-neipa.yml`. Use lowercase letters, numbers, and hyphens in the **filename**; it becomes the recipe's permanent link (`#recipe-my-neipa`).
2. Edit `name`, `style`, `batch`, `stats`, ingredients, process, and notes as desired. You can omit any optional section you don't need. Remove `demo: true` for a real batch.
3. Optionally add a photo to `assets/images/`, then set `image: "assets/images/my-neipa.jpg"` in your YAML. For more photos, add a `gallery` list of image paths.
4. Commit the YAML and any photos to `main`. GitHub Pages automatically rebuilds the website. The card, style filter, search, and detail view appear without editing any source code.

### Minimal recipe example

```yaml
name: "My New England IPA"
style: "New England IPA"
summary: "A juicy, soft hazy IPA."
date: "2026-11-15"
tags: [Hazy, All grain]
image: "assets/images/my-neipa.jpg" # optional
batch:
  size: "5 US gal"
  method: "All grain"
  boil: "60 minutes"
stats:
  og: "1.060"
  fg: "1.012"
  abv: "6.3%"
  ibu: "35"
  color: "5 SRM"
fermentables:
  - amount: "10 lb"
    name: "Pale 2-row"
hops:
  - amount: "2 oz"
    name: "Citra"
    timing: "Whirlpool, 170°F for 20 min"
yeast:
  - amount: "1 packet"
    name: "American ale yeast"
process:
  - name: "Mash"
    instructions: "Hold at 152°F for 60 min."
  - name: "Ferment"
    instructions: "Ferment at 68°F until gravity is stable."
notes:
  - "Tasting note or brew-day observation."
# gallery:
#   - assets/images/my-neipa-pour.jpg
```

The example values above are illustrative, not a saved recipe. The two starter YAML files are also **demo recipes**. Delete or replace them before sharing the site as your real brew log.

### Optional recipe fields

- `summary`, `date`, `tags`, `image`, `gallery`, and `demo`
- `other_ingredients`: same entries as hops (`amount`, `name`, optional `timing`)
- `yeast[].notes`, `hops[].timing`, `stats`, `batch`, `process`, and `notes`

Paths to images are relative to the repository root (for example `assets/images/ipa.jpg`). GitHub Pages automatically handles the `/beer-recipies/` URL prefix.

## Local preview

You need Ruby and Bundler installed.

```bash
bundle install
bundle exec jekyll serve
```

Then open `http://localhost:4000/beer-recipies/`.

## Project structure

```text
_config.yml              Site title, URL, and description
_data/recipes/*.yml       One source-controlled YAML file per recipe
_includes/recipe-card.html
_includes/recipe-detail.html
assets/images/            Optional beer photos (and a sample illustration)
assets/css/styles.css     Site styling
assets/js/site.js         Search, style filtering, and recipe navigation
index.html                Jekyll-generated single-page recipe site
```

No database. No custom CI workflow. No third-party JavaScript dependencies.
