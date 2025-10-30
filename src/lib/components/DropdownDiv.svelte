<script lang="ts">
  import { clickOutside } from "$lib/actions/ClickOutside.svelte";

  let {
    value,
    options,
    onChange,
  }: {
    value: string;
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
  } = $props();

  let open = $state(false);
  let activeIndex = $state(0);

  function choose(val: string) {
    value = val;
    open = false;
    onChange?.(val);
  }

  function toggleMenu() {
    open = !open;
    if (open) activeIndex = options.findIndex((o) => o.value === value);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (!open) {
      if (["ArrowDown", "Enter", " "].includes(event.key)) {
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
</script>

<div class="relative max-w-sm mx-auto" use:clickOutside={() => (open = false)}>
  <button
    type="button"
    class="w-full bg-purple-dark text-yellow-bright font-medium rounded-lg text-sm px-5 py-2.5 text-left flex justify-between items-center
           hover:bg-purple focus:ring-2 focus:ring-yellow-bright mt-1 mb-1"
    onclick={toggleMenu}
    onkeydown={handleKeyDown}
    aria-haspopup="listbox"
    aria-expanded={open}
  >
    {options.find((o) => o.value === value)?.label ?? "Bitte wählen..."}
    <svg
      class="w-4 h-4 ml-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </button>

  {#if open}
    <ul
      class="absolute mt-1 w-full bg-purple-dark border border-purple rounded-lg shadow-lg z-10"
    >
      {#each options as option, i}
        <li>
          <button
            class="block w-full text-left px-5 py-2.5 text-yellow-bright rounded-lg
             hover:bg-purple
             {i === activeIndex ? 'bg-purple font-bold' : ''}"
            onclick={() => choose(option.value)}
          >
            {option.label}
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>
