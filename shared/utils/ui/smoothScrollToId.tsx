/**
 * Scrolls smoothly to the specified element ID.
 * @param elementId - The ID of the element to scroll to.
 */
export const smoothScrollToId = (elementId: string): void => {
    const scrollSection = document.getElementById(elementId);

    const header = document.querySelector('header');
    const offset = header ? header.clientHeight : 70;
    const targetPosition = scrollSection!.offsetTop - offset;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
};
