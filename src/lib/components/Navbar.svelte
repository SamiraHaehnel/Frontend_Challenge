<script lang="ts">
  import { page } from "$app/stores";
  import { slide } from "svelte/transition";
  import { supabase } from "$lib/supabaseClient";
  import { userStore, loadUserData } from "../stores/UserStore.js";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { logout } from "$lib/auth/authService";

  let open = $state(false);

  onMount(() => {
    loadUserData();
  });
</script>

<nav class="bg-nav sticky w-full z-20 top-0 start-0 border-b border-gray-200">
  <div
    class="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4"
  >
    <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="/logo.png" class="h-15" alt="Rekursiver Blog Logo" />
      <span
        class="self-center text-2xl font-semibold whitespace-nowrap text-white"
        >Rekursiver Blog</span
      >
    </a>

    {#if !$userStore.isLoggedIn}
      <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <button
          type="button"
          class="bg-purple-dark text-yellow-bright font-medium rounded-lg text-sm px-5 py-2.5 text-left flex justify-between items-center
               hover:bg-purple focus:ring-2 focus:ring-yellow-bright"
          onclick={() => (window.location.href = "/auth?mode=login")}
        >
          Login
        </button>
      </div>
    {:else}
      <button
        type="button"
        class="bg-purple-dark text-yellow-bright
            font-medium rounded-xl text-sm px-5 py-2.5 ml-5 text-left flex justify-between items-center
           hover:bg-purple focus:ring-2 focus:ring-yellow-bright"
        onclick={() => (window.location.href = "/dashboard")}
      >
        <span>{$userStore.display_name}</span>
      </button>
      <button
        onclick={logout}
        class="bg-purple-dark text-yellow-bright
      font-medium rounded-xl text-sm px-5 py-2.5 ml-5 text-left flex justify-between items-center
     hover:bg-purple focus:ring-2 focus:ring-yellow-bright">Logout</button
      >
    {/if}
    <!-- Hamburger -->
    <button
      onclick={() => (open = !open)}
      type="button"
      class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden
               hover:bg-dark-purple focus:outline-none focus:ring-2 focus:ring-gray-200"
      aria-controls="navbar-sticky"
      aria-expanded={open}
    >
      <span class="sr-only">Öffne das Menü</span>
      <svg
        class="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 17 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M1 1h15M1 7h15M1 13h15"
        />
      </svg>
    </button>

    <!-- Menü -->
    <div
      class="items-center justify-between w-full md:flex md:w-auto md:order-1"
      class:hidden={!open}
      transition:slide
      id="navbar-sticky"
    >
      <ul
        class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg
               md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0"
      >
        <li>
          <a
            href="/"
            class="block py-2 px-3 text-purple-dark rounded-sm md:bg-transparent md:p-0"
            class:font-bold={$page.url.pathname === "/"}
            aria-current="page"
          >
            Home
          </a>
        </li>
        <!-- <li>
          <a
            href="/lore"
            class="block py-2 px-3 text-white rounded-sm hover:bg-text-yellow-bright md:hover:text-yellow-bright md:p-0"
          >
            Über
          </a>
        </li> -->
        <li>
          <a
            href="/fights"
            class="block py-2 px-3 text-white rounded-sm hover:bg-text-yellow-bright md:hover:text-yellow-bright md:p-0 cursor-not-allowed"
          >
            Schlichtungsstelle
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
