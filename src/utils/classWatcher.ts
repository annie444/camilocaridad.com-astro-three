export class ClassWatcher {
	targetNode: HTMLElement
	classToWatch: string
	classAddedCallback: () => void
	classRemovedCallback: () => void
	observer: MutationObserver
	lastClassState: boolean

	constructor(
		targetNode: HTMLElement,
		classToWatch: string,
		classAddedCallback: () => void,
		classRemovedCallback: () => void
	) {
		this.targetNode = targetNode
		this.classToWatch = classToWatch
		this.classAddedCallback = classAddedCallback
		this.classRemovedCallback = classRemovedCallback
		this.observer = null
		this.lastClassState = targetNode.classList.contains(this.classToWatch)

		this.init()
	}

	init() {
		this.observer = new MutationObserver(this.mutationCallback)
		this.observe()
	}

	observe() {
		this.observer.observe(this.targetNode, { attributes: true })
	}

	disconnect() {
		this.observer.disconnect()
	}

	mutationCallback = (mutationsList: MutationRecord[]) => {
		for (let mutation of mutationsList) {
			if (
				mutation.type === "attributes" &&
				mutation.attributeName === "class" &&
				mutation.target instanceof HTMLElement
			) {
				// If classList is not available, skip processing
				let currentClassState = mutation.target.classList.contains(
					this.classToWatch
				)
				if (this.lastClassState !== currentClassState) {
					this.lastClassState = currentClassState
					if (currentClassState) {
						this.classAddedCallback()
					} else {
						this.classRemovedCallback()
					}
				}
			}
		}
	}
}
