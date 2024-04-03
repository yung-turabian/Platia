<script>
    export let scoops = 1;
</script>

<h2>Size</h2>

<label>
    <input type="radio" bind:group={scoops} value={1} />
    One scoop
</label>

<label>
    <input type="radio" bind:group={scoops} value={2} />
    Two scoops
</label>

<label>
    <input type="radio" bind:group={scoops} value={3} />
    Three scoops
</label>
