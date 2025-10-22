<script lang="ts">
  let selected = "babycat";

  function handleChange(event: Event) {
    selected = (event.target as HTMLSelectElement).value;
  }

  // Mock-Daten
  let options = [
    { label: "Baby Katze", value: "babycat" },
    { label: "Kleine Katze", value: "littlecat" },
    { label: "Orange Katze", value: "orangecat" },
    { label: "Tabby", value: "tabby" },
  ];
</script>

<form class="max-w-sm mx-auto group">
  <label
    for="dropdown"
    class="font-medium text-sm px-5 py-2.5 inline-flex items-center"
  >
    Wähle deine Katze:
  </label>
  <select
    id="dropdown"
    class="bg-purple-dark text-yellow-bright font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center
           hover:bg-purple focus:ring-2 focus:outline-none focus:ring-yellow-bright"
    bind:value={selected}
    onchange={handleChange}
  >
    {#each options as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
</form>
