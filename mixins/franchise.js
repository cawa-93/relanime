export default {
	computed: {
		franchiselinkIndex () {
			if (!this.franchise || !this.anime) return null
			return this.franchise.nodes.findIndex(n => n.id === this.anime.id)
		},
		prequels () {
			return this.getSortedNodes('prequel').reverse()
		},
		sequels () {
			return this.getSortedNodes('sequel')
		},
		parent () {
			if (!this.franchiselinkIndex) return null

			const link = this.getLink(this.franchiselinkIndex, 'parent_story')
			if (!link) return null

			return this.franchise.nodes[link.target]
		},
		childs () {
			if (!this.franchiselinkIndex) return null

			return this.franchise.links
				.filter(l => l.source === this.franchiselinkIndex && l.relation === 'side_story')
				.map(l => this.franchise.nodes[l.target])
				.sort((node1, node2) => node1.weight - node2.weight)
		},
	},
	methods: {
		getLink (id, type) {
			return this.franchise.links.find(l => l.relation === type && l.source === id)
		},
		getSortedNodes (type) {
			const nodes = []

			if (!this.franchiselinkIndex) {
				return nodes
			}

			let node = this.getLink(this.franchiselinkIndex, type)
			while (node !== undefined) {
				nodes.push(this.franchise.nodes[node.target])
				node = this.getLink(node.target, type)
			}
			return nodes
		},
	},
}
