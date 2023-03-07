<script lang="ts">
	import { onMount } from 'svelte';
	import Worker from '$lib/pyodide-worker.mjs?worker';
	import { runPyodide } from '$lib/toWorker';
	let worker: Worker | undefined;
	let value: string;
	let result: any;

	onMount(async () => {
		worker = new Worker();
	});

	const handleClick = async () => {
		result = await runPyodide(value, worker!);
	};
</script>

<div class="p-20 border border-slate-800 m-auto max-w-md">
	<input type="text" bind:value class="bg-transparent border border-purple-700" />
	<button on:click={handleClick} class=" bg-purple-700">Extremstellen</button>
	<div>{result}</div>
</div>
