<script lang="ts">
  let selected = "babycat";
  let open = false;
  let activeIndex = 0;

  let options = [
    { label: "Baby Katze", value: "babycat" },
    { label: "Kleine Katze", value: "littlecat" },
    { label: "Orange Katze", value: "orangecat" },
    { label: "Tabby", value: "tabby" }
  ];

  function toggleMenu() {
    open = !open;
    if (open) activeIndex = options.findIndex(o => o.value === selected);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (!open) {
      if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleMenu();
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      activeIndex = (activeIndex + 1) % options.length;
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      activeIndex = (activeIndex - 1 + options.length) % options.length;
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selected = options[activeIndex].value;
      open = false;
    } else if (event.key === "Escape") {
      event.preventDefault();
      open = false;
    }
  }
</script>

<div class="relative max-w-sm mx-auto">
  <button
    type="button"
    class="w-full bg-purple-dark text-yellow-bright font-medium rounded-lg text-sm px-5 py-2.5 text-left flex justify-between items-center
           hover:bg-purple focus:ring-2 focus:ring-yellow-bright"
    aria-haspopup="listbox"
    aria-expanded={open}
    on:click={toggleMenu}
    on:keydown={handleKeyDown}
  >
    {options.find(o => o.value === selected)?.label}
    <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {#if open}
    <fieldset
      role="radiogroup"
      tabindex="0"
      aria-activedescendant={"radio-" + activeIndex}
      class="absolute mt-1 w-full bg-purple-dark border border-purple rounded-lg shadow-lg z-10"
      on:keydown={handleKeyDown}
    >
      {#each options as option, i}
        <label
          id={"radio-" + i}
          class="flex items-center space-x-2 cursor-pointer px-5 py-2.5 hover:bg-purple rounded
                 {i === activeIndex ? 'bg-purple' : ''}"
        >
          <input
            type="radio"
            class="form-radio text-yellow-bright w-4 h-4 accent-yellow-bright"
            bind:group={selected}
            value={option.value}
          />
          <span class="text-yellow-bright">{option.label}</span>
        </label>
      {/each}
    </fieldset>
  {/if}
</div>
