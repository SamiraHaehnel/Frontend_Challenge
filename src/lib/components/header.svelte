<script>
  let title = "Willkommen beim Rekursiven Blog!";
  let subtitle = "Lerne aus meinen Fehlern und schreibe deine eigenen Erfahrungen!";
</script>

<header>
  <section 
    class="relative min-h-screen flex flex-col items-center justify-center text-center 
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
      <button
        class="px-6 py-3 rounded-2xl bg-yellow-300 text-purple-900 font-semibold 
               hover:scale-110 hover:rotate-2 transition-transform duration-300 shadow-xl"
        on:click={() => window.location.href = '/cats'}
      >
        Logge dich ein!
      </button>
    </div>
    </section>
</header>
