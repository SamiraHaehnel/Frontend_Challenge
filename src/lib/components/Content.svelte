<script lang="ts">
  import { onMount } from "svelte";
  import { userStore, loadUserData } from "$lib/stores/userStore.ts";
  import { supabase } from "$lib/supabaseClient";
  import { goto } from "$app/navigation";
  import Checkbox from "$lib/components/Checkbox.svelte";

  let title = $state("Willkommen beim Rekursiven Blog!");
  let subtitle = $state(
    "Lerne aus meinen Fehlern und ziehe deine eigenen Erfahrungen!"
  );
  let genres = $state<{ id: number; name: string }[]>([]);
  let selectedGenreId: number | null = $state(null);
  let posts = $state<any[]>([]);
  let filteredPosts = $state<any[]>([]);
  let loading = $state(true);
  let errorMsg = $state("");

  let search = $state("");
  let selectedGenreIds = new Set<number>();

  async function loadPosts() {
    loading = true;
    const { data, error } = await supabase
      .from("posts")
      .select(`id, title, excerpt, date, genre:genres(id, name), status_id`)
      .eq("status_id", 2)
      .order("date", { ascending: false });

    if (error) {
      console.error("Fehler beim Laden der Beiträge:", error);
      errorMsg = "Konnte keine Beiträge laden.";
    } else {
      posts = data || [];
      filteredPosts = posts;
      filterPosts();
    }
    loading = false;
  }
  async function loadGenres() {
    const { data, error } = await supabase.from("genres").select("id, name");
    if (error) {
      console.error("Fehler beim Laden der Genres:", error);
      return;
    }
    genres = data;
  }
  function filterPosts() {
    const lowerSearch = search.toLowerCase();

    filteredPosts = posts.filter((post) => {
      const matchesSearch =
        !search || post.title.toLowerCase().includes(lowerSearch);
      const matchesGenre =
        selectedGenreIds.size === 0 || selectedGenreIds.has(post.genre?.id);
      return matchesSearch && matchesGenre;
    });
  }

  onMount(() => {
    loadUserData();
    loadPosts();
    loadGenres();
  });
</script>

<header class="bg-purple-900">
  <section
    class="relative min-h-100 flex flex-col items-center justify-center text-center
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
    </div>
  </section>

  <section class="py-12 px-6">
    <h2 class="text-3xl font-semibold mb-6 text-center text-white">
      Alle Beiträge
    </h2>

    <div class="max-w-3xl mx-auto mb-6">
      <input
        type="text"
        placeholder="Beiträge nach Titel suchen..."
        bind:value={search}
        oninput={filterPosts}
        class="w-full p-3 rounded-xl border border-purple-400/30 bg-purple-800/50 text-yellow-300 placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-300"
      />
    </div>
    {#if genres.length > 0}
      <div class="max-w-3xl mx-auto mb-6">
        <Checkbox
          options={genres.map((g) => ({
            label: g.name,
            value: g.id.toString(),
          }))}
          onSelect={(selected: Set<string>) => {
            // Umwandeln in Set<number>
            selectedGenreIds = new Set([...selected].map((v) => parseInt(v)));
            filterPosts();
          }}
        />
      </div>
    {:else}
      <p class="text-gray-400 text-sm">Genres werden geladen...</p>
    {/if}

    {#if loading}
      <p class="text-center text-gray-500">Beiträge werden geladen...</p>
    {:else if errorMsg}
      <p class="text-center text-red-500">{errorMsg}</p>
    {:else if filteredPosts.length === 0}
      <p class="text-center text-gray-500">
        Keine passenden Beiträge gefunden.
      </p>
    {:else}
      <div
        class="max-w-3xl mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6 p-4 bg-purple-800/50 rounded-xl border border-purple-400/30"
      >
        {#each filteredPosts as post}
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
              {new Date(post.date).toLocaleDateString()} – {post.genre?.name}
            </p>
            <p class="text-xs text-gray-400 mt-2"></p>
          </div>
        {/each}
      </div>
    {/if}
  </section>
</header>
