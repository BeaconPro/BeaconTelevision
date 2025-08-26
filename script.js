document.addEventListener('DOMContentLoaded', () => {
  // === Carousel Logic ===
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;

  function showSlide(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    currentIndex = index;
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });

  setInterval(() => {
    let nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
  }, 5000);

  showSlide(0);

  // === "Leaving Soon" Badge Logic ===
  const cards = document.querySelectorAll('.episode-card');
  const today = new Date();
  cards.forEach(card => {
    const expiry = new Date(card.dataset.expiry);
    const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    const badge = card.querySelector('.badge');
    if (diffDays > 0 && diffDays <= 7) {
      badge.textContent = `Leaving Soon (${diffDays}d left)`;
    } else if (diffDays <= 0) {
      badge.textContent = 'Expired';
      badge.style.background = '#555';
    } else {
      badge.style.display = 'none';
    }
  });

  // === Ad Rendering ===
  const ads = [
    {
      title: 'BeaconMusic 2.0',
      desc: 'Stream high-fidelity tracks.',
      img: 'ads/music.jpg',
      url: 'https://beaconpro.github.io/BeaconMusic-2.0/'
    }
  ];

  const container = document.getElementById('ads');
  ads.forEach(ad => {
    const a = document.createElement('a');
    a.href = ad.url;
    a.target = '_blank';
    a.className = 'ad-card';
    a.innerHTML = `
      <img src="${ad.img}" alt="${ad.title}">
      <div class="ad-content">
        <h4>${ad.title}</h4>
        <p>${ad.desc}</p>
      </div>`;
    container.appendChild(a);
  });
});
