export interface ScrollRevealOptions {
	/** Fraction of element visible to trigger (0–1). Default 0.1 */
	threshold?: number;
	/** Root margin (e.g. "0px 0px -40px 0px" to trigger slightly early). Default "0px" */
	rootMargin?: string;
	/** If true, animate only once (never reset). Default true */
	once?: boolean;
}

const defaultOptions: Required<ScrollRevealOptions> = {
	threshold: 0.1,
	rootMargin: '0px 0px -40px 0px',
	once: true
};

/**
 * Svelte action: add `data-in-view` when the element enters the viewport.
 * Use with `.scroll-reveal` + CSS for scroll-triggered animations.
 */
export function scrollReveal(
	node: HTMLElement,
	options: ScrollRevealOptions = {}
): { destroy: () => void } {
	const opts = { ...defaultOptions, ...options };
	let observer: IntersectionObserver | null = null;

	observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.setAttribute('data-in-view', '');
					if (opts.once && observer) {
						observer.unobserve(node);
						observer = null;
					}
				} else if (!opts.once) {
					node.removeAttribute('data-in-view');
				}
			}
		},
		{ threshold: opts.threshold, rootMargin: opts.rootMargin }
	);

	observer.observe(node);

	return {
		destroy() {
			observer?.unobserve(node);
			observer = null;
		}
	};
}
