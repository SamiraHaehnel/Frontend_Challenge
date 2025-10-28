<script lang="ts">
  import { onMount } from "svelte";
  import { userStore, loadUserData } from "../stores/UserStore.js";
  import { supabase } from "$lib/supabaseClient";

  let title = "Willkommen beim Rekursiven Blog!";
  let subtitle =
    "Lerne aus meinen Fehlern und schreibe deine eigenen Erfahrungen!";

  // Posts laden
  let posts = $state<any[]>([]);
  let loading = $state(true);
  let errorMsg = $state("");

  async function loadPosts() {
    loading = true;
    const { data, error } = await supabase
      .from("posts")
      .select(`id, title, excerpt, date`)
      .order("date", { ascending: false });

    if (error) {
      console.error("Fehler beim Laden der Beiträge:", error);
      errorMsg = "Konnte keine Beiträge laden.";
    } else {
      posts = data || [];
    }
    loading = false;
  }

  onMount(() => {
    loadUserData();
    loadPosts();
  });

  function openPost(id: number) {
    window.location.href = `/post/${id}`;
  }
</script>

<header>
  <section
    class="relative min-h-screen flex flex-col items-center justify-center text-center
             bg-gradient-to-br from-purple-900 via-purple-700 to-purple-900
             text-yellow-300 overflow-hidden"
  >
    <div class="max-w-3xl p-6 animate-fadeInUp">
      <h1
        class="text-6xl font-bold tracking-tight mb-4 drop-shadow-xl animate-bounceSlow"
      >
        {title}
      </h1>
      <p class="text-xl text-purple-200 mb-8">{subtitle}</p>

      {#if $userStore.isLoggedIn}
        <div
          class="mb-6 p-4 bg-purple-800/50 rounded-xl border border-purple-400/30"
        >
          <p class="text-lg text-yellow-300 font-semibold">
            Willkommen zurück,
            <span class="text-yellow-100">{$userStore.display_name}</span>!
          </p>
        </div>
      {/if}

      <button
        class="px-6 py-3 rounded-2xl bg-yellow-300 text-purple-900 font-semibold
                 hover:scale-110 hover:rotate-2 transition-transform duration-300 shadow-xl"
        onclick={() =>
          $userStore.isLoggedIn
            ? (window.location.href = "/dashboard")
            : (window.location.href = "/auth")}
      >
        {$userStore.isLoggedIn ? "Zum Dashboard" : "Logge dich ein!"}
      </button>
    </div>
  </section>

  <section class="bg-gray-50 py-12 px-6">
    <h2 class="text-3xl font-semibold mb-6 text-center text-white">
      Die Beiträge
    </h2>

    {#if loading}
      <p class="text-center text-gray-500">Beiträge werden geladen...</p>
    {:else if errorMsg}
      <p class="text-center text-red-500">{errorMsg}</p>
    {:else if posts.length === 0}
      <p class="text-center text-gray-500">Noch keine Beiträge vorhanden.</p>
    {:else}
      <div class="max-w-3xl mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {#each posts as post}
          <div
            class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow cursor-pointer hover:bg-gray-50 transition"
            onclick={() => openPost(post.id)}
          >
            <h3 class="text-lg font-semibold text-purple-dark mb-2">
              {post.title}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
              {post.excerpt}
            </p>
            <p class="text-xs text-gray-400 mt-2">
              {new Date(post.date).toLocaleDateString()}
            </p>
          </div>
        {/each}
      </div>
    {/if}
  </section>
</header>
