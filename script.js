// Dynamically show "Leaving Soon" only if within 7 days of expiry
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.episode-card');
  const today = new Date();

  cards.forEach(card => {
    const expiry = new Date(card.dataset.expiry);
    const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

    const badge = card.querySelector('.badge');
    if (diffDays > 0 && diffDays <= 7) {
      badge.textContent = `Leaving Soon (${diffDays}d left)`;
      badge.style.display = 'block';
    } else if (diffDays <= 0) {
      // Option: hide expired episodes entirely
      // card.style.display = 'none';
      badge.textContent = 'Expired';
      badge.style.background = '#555';
      badge.style.display = 'block';
    } else {
      // More than 7 days away: hide badge
      badge.style.display = 'none';
    }
  });
});
