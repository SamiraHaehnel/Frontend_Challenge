<script lang="ts">
  import Card from '$lib/components/card.svelte';
  import Dropdown from "$lib/components/dropdown_div.svelte";


  let selected = "babycat";

  const options = [
    { label: "Baby Katze", value: "babycat", image: "src/images/babycat.jpg", description: "Wenn du dachtest, du brauchst was Süßes, dann bist du hier schonmal falsch. Spirituel gesagt, war diese Katze einst ein Piercer.", hashtags: ["cute", "dangerous", "gourmet"]  },
    { label: "Tabby", value: "tabby", image: "src/images/tabby.jpg", description: "Aha? Du siehst und hörst den Kater nicht? Naja, vielleicht bringt er dir auch gerade eine lebendige Weser-Ratte.", hashtags: ["outside", "sleep", "stressresistent"]  },
    { label: "Kleine Katze", value: "tinycat", image: "src/images/tinycat.jpg", description: "Eine Kameralinse sorgt für den sofortigen Stimmungsabfall, um das Bild (erfolgreich) zu ruinieren.", hashtags: ["grumpy", "nichtlebensfähigalleine", "gourmet"]  },
  ];

  function handleChange(val: string) {
    selected = val;
  }
</script>
<div class="space-y-4">
<Dropdown bind:value={selected} {options} onChange={(value: string) => selected = value} />

{#if selected}
  <Card 
    label={options.find(o => o.value === selected)?.label} 
    image={options.find(o => o.value === selected)?.image}
    description={options.find(o => o.value === selected)?.description}
    hashtags={options.find(o => o.value === selected)?.hashtags}
  />
{/if}
</div>

