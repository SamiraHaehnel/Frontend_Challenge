<script lang="ts">
  import { onMount } from "svelte";
  import { userStore, loadUserData } from "../stores/UserStore.js";
  import { supabase } from "$lib/supabaseClient";
  import { goto } from "$app/navigation";

  let title = "Willkommen beim Rekursiven Blog!";
  let subtitle =
    "Lerne aus meinen Fehlern und ziehe deine eigenen Erfahrungen!";

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
  let filteredPosts = $state([]);

  let search = $state("");
  let selectedGenre = $state("all");

  onMount(() => {
    loadUserData();
    loadPosts();
  });
</script>

<header class="bg-purple-900">
  <section
    class="relative min-h-200 flex flex-col items-center justify-center text-center
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
      >
        Zu den Beiträgen
      </button>
    </div>
  </section>

  <section class=" py-12 px-6 border-t-1 border-yellow-300">
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
      <div
        class="max-w-3xl mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6 p-4 bg-purple-800/50 rounded-xl border border-purple-400/30"
      >
        {#each posts as post}
          <div
            onclick={() => goto(`/post/${post.id}`)}
            class="cursor-pointer p-2
         bg-purple-800/40 border border-purple-300/20
         rounded-2xl shadow-lg
         backdrop-blur-md backdrop-saturate-150
         hover:bg-purple-800/50 hover:border-purple-300/30
         transition-all duration-300 min-h-10"
          >
            <div class="hidden">
              {post.title}
            </div>
            <h3 class="text-lg font-semibold text-yellow-300 mb-2">
              {post.title}
            </h3>
            <p class="text-sm text-gray-50 line-clamp-3">
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
