<script lang="ts">
  let { data = { title: "", excerpt: "" }, onClose = () => {} } = $props();

  $effect(() => {
    console.log("DialogWindow data:", data);
  });

  function handleCancel() {
    onClose(false);
  }

  function handleSave() {
    if (!data.title || !data.excerpt) {
      alert("Bitte Titel und Beschreibung eingeben!");
      return;
    }
    onClose(true);
  }
</script>

<div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
  <div class="bg-white p-6 rounded-2xl shadow-lg w-96">
    <h2 class="text-lg font-semibold mb-4 text-gray-800">
      Werk abschließen
    </h2>

    <label class="block text-sm text-gray-600 dark:text-gray-300 mb-1"
      >Titel</label
    >
    <input
      class="border rounded w-full p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-purple-dark"
      bind:value={data.title}
      placeholder="Dein Titel"
    />

    <label class="block text-sm text-gray-600 dark:text-gray-300 mb-1"
      >Kurzbeschreibung</label
    >
    <textarea
      class="border rounded w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-dark"
      rows="3"
      bind:value={data.excerpt}
      placeholder="Kurze Beschreibung deines Werks..."
    />

    <div class="flex justify-end space-x-2">
      <button
        class="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 rounded text-gray-800"
        onclick={handleCancel}
      >
        Abbrechen
      </button>
      <button
        class="px-3 py-1.5 bg-purple-dark text-yellow-bright rounded hover:bg-purple"
        onclick={handleSave}
      >
        Speichern
      </button>
    </div>
  </div>
</div>
