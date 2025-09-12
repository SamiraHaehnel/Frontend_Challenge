<script lang="ts">
  import { onMount } from "svelte";

  let selected = "babycat";
  let open = false;
  let activeIndex = 0;

  let options = [
    { label: "Baby Katze", value: "babycat" },
    { label: "Kleine Katze", value: "littlecat" },
    { label: "Orange Katze", value: "orangecat" },
    { label: "Tabby", value: "tabby" }
  ];

  let menuEl: HTMLUListElement | null = null;

  function toggleMenu() {
    open = !open;
    if (open) activeIndex = options.findIndex(o => o.value === selected);
  }

  function choose(value: string) {
    selected = value;
    open = false;
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
      choose(options[activeIndex].value);
    } else if (event.key === "Escape") {
      event.preventDefault();
      open = false;
    }
  }

  onMount(() => {
    if (menuEl) menuEl.focus();
  });
</script>

<div class="relative max-w-sm mx-auto m-50">
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
    <ul
      bind:this={menuEl}
      tabindex="0"
      role="listbox"
      aria-activedescendant={"option-" + activeIndex}
      class="absolute mt-1 w-full bg-purple-dark border border-purple rounded-lg shadow-lg z-10"
      on:keydown={handleKeyDown}
    >
      {#each options as option, i}
        <li
          id={"option-" + i}
          role="option"
          aria-selected={selected === option.value}
        >
          <button
            class="block w-full text-left px-5 py-2.5 hover:bg-purple text-yellow-bright
                   {i === activeIndex ? 'bg-purple' : ''}"
            on:click={() => choose(option.value)}
          >
            {option.label}
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>
