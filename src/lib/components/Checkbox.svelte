<script lang="ts">
  let {
    options = [],
    selected = new Set<string>(),
    onSelect = () => {},
  } = $props();

  function handleChange(value: string, checked: boolean) {
    const nextSelected = new Set(selected);
    checked ? nextSelected.add(value) : nextSelected.delete(value);
    selected = nextSelected;
    onSelect(selected);
  }
</script>

<div class="max-w-sm mx-auto ml-2 mr-2">
  <fieldset
    role="group"
    class="w-full p-3 rounded-xl border border-purple-400/30 bg-purple-800/50 text-yellow-300 placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-300"
  >
    {#each options as option, i}
      <label
        id={"check-" + i}
        class="flex items-center space-x-2 cursor-pointer px-5 py-2.5 hover:bg-purple rounded"
      >
        <input
          type="checkbox"
          class="form-checkbox text-yellow-bright w-4 h-4 accent-yellow-bright"
          checked={selected.has(option.value)}
          onchange={(e) => handleChange(option.value, e.target.checked)}
        />
        <span class="text-yellow-bright">{option.label}</span>
      </label>
    {/each}
  </fieldset>
</div>
