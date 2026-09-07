document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.legal-section');
  const tocLinks = document.querySelectorAll('.legal-toc a');

  if (!sections.length || !tocLinks.length || !('IntersectionObserver' in window)) return;

  const linkBySectionId = new Map();
  tocLinks.forEach(link => {
    const id = link.getAttribute('href').replace('#', '');
    linkBySectionId.set(id, link);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = linkBySectionId.get(entry.target.id);
      if (!link) return;
      if (entry.isIntersecting) {
        tocLinks.forEach(l => l.style.color = '');
        link.style.color = 'var(--blue-deep)';
        link.style.fontWeight = '600';
      } else {
        link.style.fontWeight = '';
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(section => observer.observe(section));
});
