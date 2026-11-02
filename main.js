// Isibindi GBV website — Part 3 JavaScript enhancements.
document.addEventListener('DOMContentLoaded', () => {
  // Responsive navigation with an accessible expanded/collapsed state.
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.site-nav');
  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const open = navigation.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.textContent = open ? 'Close' : 'Menu';
    });
    navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      navigation.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.textContent = 'Menu';
    }));
  }
  // Dynamic copyright year.
  document.querySelectorAll('.current-year').forEach(el => { el.textContent = new Date().getFullYear(); });
  // Live filtering of the resource cards on the Support & Services page.
  const search = document.getElementById('resource-search');
  const cards = [...document.querySelectorAll('#resource-list .service-card')];
  const count = document.getElementById('resource-count');
  if (search && count && cards.length) {
    search.addEventListener('input', () => {
      const query = search.value.trim().toLowerCase();
      let visible = 0;
      cards.forEach(card => {
        const matches = card.textContent.toLowerCase().includes(query);
        card.hidden = !matches;
        if (matches) visible++;
      });
      count.textContent = `Showing ${visible} of ${cards.length} resources`;
    });
  }
  // Front-end validation and clear feedback. Forms intentionally do not transmit or save data.
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const status = form.querySelector('.form-status') || document.getElementById('form-status');
      if (!form.checkValidity()) {
        form.reportValidity();
        if (status) status.textContent = 'Please check the required fields and enter a valid email address.';
        return;
      }
      if (status) status.textContent = 'Demo validation successful. Your information has NOT been sent or stored. This form is not monitored.';
      form.reset();
    });
  });
});
