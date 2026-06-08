/**
 * Smoothly scrolls to an element with an offset for the sticky header,
 * but only if the element is not already comfortably visible in the viewport.
 */
export const scrollToElement = (elementId: string, offsetBuffer = 24) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const rect = element.getBoundingClientRect();
  const header = document.querySelector('header');
  const headerHeight = header ? header.offsetHeight : 80;
  const totalOffset = headerHeight + offsetBuffer;

  // 1. Check if the element is already aligned at the top (below the header)
  const isAligned = Math.abs(rect.top - totalOffset) < 10;

  // 2. Check if the element is already fully visible in the viewport
  const isFullyVisible = 
    rect.top >= totalOffset && 
    rect.bottom <= window.innerHeight;

  if (isAligned || isFullyVisible) {
    // Already in view / aligned, no scroll needed
    return;
  }

  // Scroll to the element such that the top of the element is aligned below the sticky header
  const targetPosition = rect.top + window.scrollY - totalOffset;
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
};
