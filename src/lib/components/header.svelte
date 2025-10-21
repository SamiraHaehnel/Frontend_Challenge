<script>
  import { onMount } from 'svelte';
  import { userStore, loadUserData } from '../stores/userStore.js';
  
  let title = "Willkommen beim Rekursiven Blog!";
  let subtitle = "Lerne aus meinen Fehlern und schreibe deine eigenen Erfahrungen!";

  onMount(() => {
    loadUserData();
  });
</script>

<header>
  <section 
    class="relative h-screen flex flex-col items-center justify-center text-center 
           bg-gradient-to-br from-purple-900 via-purple-700 to-purple-900 
           text-yellow-300 overflow-hidden"
  >
    <!-- Content -->
    <div class="max-w-3xl p-6 animate-fadeInUp">
      <h1 class="text-6xl font-bold tracking-tight mb-4 drop-shadow-xl animate-bounceSlow">
        {title}
      </h1>
      <p class="text-xl text-purple-200 mb-8">
        {subtitle}
      </p>
      
      <!-- Display Name Anzeige -->
      {#if $userStore.isLoggedIn}
        <div class="mb-6 p-4 bg-purple-800/50 rounded-xl border border-purple-400/30">
          <p class="text-lg text-yellow-300 font-semibold">
            Willkommen zurück, <span class="text-yellow-100">{$userStore.display_name}</span>!
          </p>
        </div>
      {/if}
      
      <button
        class="px-6 py-3 rounded-2xl bg-yellow-300 text-purple-900 font-semibold 
               hover:scale-110 hover:rotate-2 transition-transform duration-300 shadow-xl"
        on:click={() => window.location.href = '/auth'}
      >
        {$userStore.isLoggedIn ? 'Zum Dashboard' : 'Logge dich ein!'}
      </button>
    </div>
    </section>
</header>
