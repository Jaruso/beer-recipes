(() => {
  document.documentElement.classList.add('js');

  const catalog = document.querySelector('[data-catalog]');
  const detailPages = Array.from(document.querySelectorAll('[data-recipe-detail]'));
  const cards = Array.from(document.querySelectorAll('[data-recipe-card]'));
  const searchInput = document.querySelector('[data-search-input]');
  const styleFilter = document.querySelector('[data-style-filter]');
  const resultCount = document.querySelector('[data-result-count]');
  const emptyState = document.querySelector('[data-empty-state]');
  const resetButton = document.querySelector('[data-reset-filters]');
  const siteTitle = document.title;

  // The options come from the rendered YAML files, not a hardcoded list.
  const styles = [...new Set(cards.map((card) => card.dataset.style).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b));
  for (const style of styles) {
    const option = document.createElement('option');
    option.value = style;
    option.textContent = style;
    styleFilter.appendChild(option);
  }

  function filterRecipes() {
    const query = searchInput.value.trim().toLocaleLowerCase();
    const selectedStyle = styleFilter.value;
    let visible = 0;
    for (const card of cards) {
      const matchesText = (card.dataset.search || '').toLocaleLowerCase().includes(query);
      const matchesStyle = selectedStyle === 'all' || card.dataset.style === selectedStyle;
      card.hidden = !(matchesText && matchesStyle);
      if (!card.hidden) visible++;
    }
    resultCount.textContent = `${visible} ${visible === 1 ? 'recipe' : 'recipes'}`;
    emptyState.hidden = visible !== 0;
  }

  function showRoute() {
    let targetId = '';
    try { targetId = decodeURIComponent(location.hash.substring(1)); } catch (_) { /* invalid hash */ }
    const active = detailPages.find((page) => page.id === targetId);
    catalog.classList.toggle('is-hidden', Boolean(active));
    for (const page of detailPages) page.classList.toggle('is-active', page === active);
    document.title = active ? `${active.dataset.title} — ${siteTitle}` : siteTitle;
    if (active) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (targetId === 'catalog') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }

  searchInput.addEventListener('input', filterRecipes);
  styleFilter.addEventListener('change', filterRecipes);
  resetButton.addEventListener('click', () => {
    searchInput.value = '';
    styleFilter.value = 'all';
    filterRecipes();
    searchInput.focus();
  });
  for (const button of document.querySelectorAll('[data-print]')) {
    button.addEventListener('click', () => window.print());
  }
  window.addEventListener('hashchange', showRoute);
  filterRecipes();
  showRoute();
})();
