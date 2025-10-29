<script lang="ts">
  import { onMount } from "svelte";
  import { userStore, loadUserData } from "$lib/stores/UserStore";
  import Entry from "$lib/components/Entry.svelte";
</script>

<div class="min-h-screen bg-gray-50 p-6">
  <div class="mb-8">
    <h1 class="text-4xl font-bold text-gray-900 mb-2">
      Na <span class="text-purple-600">{$userStore.display_name}</span>?
    </h1>
    <p class="text-gray-600">
      Bereicht deine Community mit weiteren geistreichen Ideen zu inspirieren?
    </p>
  </div>
  <Entry />
</div>
