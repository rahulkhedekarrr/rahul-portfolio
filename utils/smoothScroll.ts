// Smooth scroll function
export const smoothScrollTo = (targetId: string) => {
  console.log("Scrolling to:", targetId); // Debug log
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    console.log("Target element found:", targetElement); // Debug log
    const headerHeight = 120; // Account for fixed header height
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  } else {
    console.log("Target element not found for:", targetId); // Debug log
  }
};
