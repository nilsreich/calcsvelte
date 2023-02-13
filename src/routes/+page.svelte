<script lang="ts">
	let code = '';
	let ergebnis = '';
	const getNullstellen = async () => {
		const response = await fetch('/api/cas', {
			method: 'POST',
			body: JSON.stringify({ code,type: 'nullstellen' }),
			headers: {
				'content-type': 'application/json'
			}
		});

		let total = await response.json();
		ergebnis = await total.slice(1).slice(0, -1).split(',');
	};
	const getExtrema = async () => {
		const response = await fetch('/api/cas', {
			method: 'POST',
			body: JSON.stringify({ code, type: 'extrema' }),
			headers: {
				'content-type': 'application/json'
			}
		});

		let total = await response.json();
		console.log(total)

	};
</script>

<input type="text" bind:value={code} />
<button on:click={getNullstellen}>Nullstellen</button>
<button on:click={getExtrema}>Extremstellen</button>
<div>
	{#each ergebnis as item, index}
		<div>N{index}({item}|0)</div>
	{/each}
</div>
