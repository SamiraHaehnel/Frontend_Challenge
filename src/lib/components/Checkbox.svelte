<script lang="ts">
  let { options = [], selected = "", onSelect = () => {} } = $props();
  // So Zustände
  let open = $state(false);
  let activeIndex = $state(0);

  function selectOption(value: string) {
    selected = value;
    open = false;

    onSelect(value);
  }
</script>

<div class="max-w-sm mx-auto ml-2 mr-2">
  <fieldset
    role="checkgroup"
    tabindex="0"
    aria-activedescendant={"check-" + activeIndex}
    class="w-full bg-purple-dark border border-purple rounded-lg shadow-lg z-10"
  >
    {#each options as option, i}
      <label
        id={"check-" + i}
        class="flex items-center space-x-2 cursor-pointer px-5 py-2.5 hover:bg-purple rounded
           {i === activeIndex ? 'bg-purple' : ''}"
        onclick={() => selectOption(option.value)}
      >
        <input
          type="checkbox"
          class="form-checkbox text-yellow-bright w-4 h-4 accent-yellow-bright"
          bind:group={selected}
          value={option.value}
        />
        <span class="text-yellow-bright">{option.label}</span>
      </label>
    {/each}
  </fieldset>
</div>
