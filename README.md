# Brew Free or Die 🍺

### The Caruso Brew Book

The recipe archive for **Brew Free or Die**, home of **The Caruso Brew Book**. A clean, static beer-recipe collection hosted on **GitHub Pages**. Recipes are individual YAML files, so adding a new brew never requires editing HTML, CSS, JavaScript, a manifest, or a recipe index.

**How it works:** GitHub Pages runs its built-in Jekyll generator. Jekyll automatically reads every `.yml` / `.yaml` file in `_data/recipes/` and renders only recipes explicitly marked `featured: true` into static HTML. The tiny bit of browser JavaScript is just for search, style filters, and navigating between recipes.

## Publishing the site

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose branch **`main`** and folder **`/(root)`**, then **Save**.
4. Visit **https://jaruso.github.io/beer-recipies/** once the first Pages build completes.

> Do **not** add a `.nojekyll` file: GitHub Pages needs Jekyll to transform the recipe YAML files into HTML.

## Choose which recipes appear on the website

Each recipe has an explicit top-level YAML boolean:

```yaml
featured: true    # Display the recipe on the website
# or
featured: false   # Hide from the website
```

The website renders **only** recipes with `featured: true`. A missing flag is also considered hidden. The catalog cards, search/style filters, featured count and recipe detail pages are all filtered during the Jekyll build. Hidden recipes are not present in the generated HTML, even if someone tries a direct `#recipe-slug` URL.

**Currently featured (12):** Banana Blueberry Berliner, Barre Blonde, Boys in Barre Ale, Can o' Corn I'll be Fine, Jocko's Enkel, Rye so Malty, Salty Melons Pseudo Lager, Mars and Beer, Super Bowl Lager, Travelers Trappist, Peaches and Cream, and Stupid Sexy. The remaining 35 are hidden from the website (21 archived Instagram imports plus the previously hidden records).

**Visibility is not privacy:** Because this GitHub repository is public, anyone can still see the YAML source for all 47 recipes, including those with `featured: false`.

## Add a beer recipe (no code changes)

1. Copy an existing file in `_data/recipes/` to a new file, such as `_data/recipes/my-neipa.yml`. Use lowercase letters, numbers, and hyphens in the **filename**; it becomes the recipe's permanent link (`#recipe-my-neipa`).
2. Edit `name`, `style`, `batch`, `stats`, ingredients, process, and notes as desired. Set `featured: true` to publish a recipe on the website (missing or `false` keeps it hidden).
3. Optionally add a photo to `assets/images/`, then set `image: "assets/images/my-neipa.jpg"` in your YAML. For more photos, add a `gallery` list of image paths.
4. Commit the YAML and any photos to `main`. GitHub Pages automatically rebuilds the website. The card, style filter, search, and detail view appear without editing any source code.

### Minimal recipe example

```yaml
featured: false # change to true to publish
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

The example values above are illustrative, not a saved recipe. The collection includes 25 public recipes imported from [Brew Free or Die's Brewer's Friend profile](https://www.brewersfriend.com/homebrew/brewer/344442/brew-free-or-die), the Stupid Sexy 2026 revival, and 21 historical recipe records reconstructed from the brewer's Instagram captions.

### Optional recipe fields

- `summary`, `date`, `tags`, `image`, `gallery`, `source_url`, and `source_id`
- `other_ingredients`: same entries as hops (`amount`, `name`, optional `timing`)
- `yeast[].notes`, `hops[].timing`, `stats`, `batch`, `process`, and `notes`

Paths to images are relative to the repository root (for example `assets/images/ipa.jpg`). GitHub Pages automatically handles the `/beer-recipies/` URL prefix.

## Rich recipe details (optional)

Recipes can include additional fields without needing further template edits:

- `source_url` and `source_label`: link back to a source document (Google Docs or otherwise). If no `source_label` is provided, imported Brewer's Friend recipes keep their existing attribution.
- `water_profile.source`, `water_profile.planned_total`, `water_profile.target_mash_ph`, and `water_profile.minerals[]` (`name`, `tap`, `after`, `goal`): display a water treatment section.
- `brew_log[]` (`measurement`, `target`, `actual`): display observed results beside recipe targets, including in-progress fermentation readings.

**Example:** [Stupid Sexy — 2026 Revival](_data/recipes/stupid-sexy.yml), brewed November 15, 2026, includes a complete grain bill, hop schedule, fermentation plan, water additions, and an explicitly time-stamped Tilt snapshot. It is a **2026 reconstruction**, not a recovered original 2020 recipe. Its source is the linked Google Doc.

## Instagram brew notes (optional)

When a beer is described in an Instagram post, keep the original recipe estimates and add the post as **brewer observation**, not an unverified replacement for the grain bill or hop schedule:

```yaml
instagram_posts:
  - url: "https://www.instagram.com/jaruso23/p/EXAMPLE/"
    notes: "A tasting observation or documented brew-day detail."
    source_difference: "Optional: explain how this differs from the planned Brewer's Friend recipe."
```

The optional Instagram notes appear on a recipe detail page with a direct link to each source post. Source discrepancies remain visible rather than being silently reconciled. The initial pass added eight identified beer-related feed posts. The later archive migration added 21 new historical recipe YAML files (including one explicitly labeled cider/wine) and four more Instagram post references across three pre-existing recipes. The 12 featured recipe flags were not changed.

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

## Brewer's Friend migration

All **25 public** Brew Free or Die recipes on the profile were copied into individual source-controlled YAML files. The profile reports 26 total recipes; the one non-public recipe was not accessible. The migration includes recipe stats, fermentables, hops (including their schedules), yeast when recorded, other ingredients, and selected brewing instructions and notes. Each recipe links to its original public Brewer's Friend entry.

- `date` means a documented **brew session** date, not the original recipe creation date. It is omitted when no brew session date was listed on the public profile. When multiple brew sessions exist, the most recent was used.
- Numeric recipe OG/FG/ABV/IBU/SRM are the **published recipe estimates**. Actual measured gravity and process deviations are preserved in notes when available.
- No recipe photographs or private brew-session logs were copied. Add your own local files under `assets/images/` and reference them from recipe YAML when desired.
- This import is a **snapshot**, not an ongoing synchronization. Editing a Brewer's Friend recipe will not update the YAML automatically.
- Where the rendered Brewer's Friend hop table showed dry-hop durations in **days** but its copied text export mislabeled them as minutes, the YAML follows the rendered table.

## Historic Instagram recipe archive

The repository includes 21 additional historical brew records recovered from captions on [@jaruso23](https://www.instagram.com/jaruso23/). Every new entry is `featured: false`, and each links to its original Instagram post. The original 2020 Stupid Sexy is its own file and **does not overwrite** the separately featured 2026 revival. Salty Melon Göse and Salty Melons Pseudo Lager are also distinct records. Sparkling Apple Chardonnay is explicitly labeled as cider/fruit wine, not beer.

Some archived recipes are **partial**: captions give ingredient names or proportions but not exact weights, timings, yeast or original gravity. Missing values are marked "Amount not recorded" or omitted; they are not calculated or replaced with values from other batches. Reported finishing measurements are labeled as brewer observations. Future recipe ideas are presented as notes, not ingredients of the original batches.

The highlighted homepage remains a curated selection of **12** recipes, while all **47** YAML files are retained in source control. Historical posts without enough evidence to describe a finished brew (for example a wild-yeast collection experiment or an unidentifiable unnamed beer) are not merged into unrelated recipes.
