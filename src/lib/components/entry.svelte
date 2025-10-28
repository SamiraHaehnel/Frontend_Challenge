<script lang="ts">
  import {
    TextEditor,
    ToolbarRowWrapper,
    AlignmentButtonGroup,
    CharacterCount,
    DetailsButtonGroup,
    Divider,
    EditableButton,
    ExportButtonGroup,
    FormatButtonGroup,
    HeadingButtonGroup,
    ImageButtonGroup,
    LayoutButtonGroup,
    ListButtonGroup,
    SourceButtonGroup,
    TableButtonGroup1,
    TableButtonGroup2,
    TaskListButtonGroup,
    UndoRedoButtonGroup,
    YoutubeButtonGroup,
  } from "@flowbite-svelte-plugins/texteditor";

  import type { Editor } from "@tiptap/core";
  import { Button } from "flowbite-svelte";
  import { supabase } from "$lib/supabaseClient";
  import { getCurrentUserProfile } from "$lib/userProfile";
  import DropdownRadio from "$lib/components/DropdownRadio.svelte";
  import Checkbox from "$lib/components/Checkbox.svelte";
  import DialogWindow from "$lib/components/DialogWindow.svelte";
  let editorInstance: Editor | null = $state(null);
  let isEditable = $state(true);
  let genres = $state<{ id: number; name: string }[]>([]);
  let status = $state<{ id: number; name: string }[]>([]);
  let selectedGenreId: number | null = null;
  let selectedStatusId: number | null = null;
  let showDialog = $state(false);
  let dialogData = $state({ title: "", excerpt: "" });

  async function openDialog() {
    showDialog = true;
  }
  async function loadGenres() {
    const { data, error } = await supabase.from("genres").select("id, name");
    if (error) {
      console.error("Fehler beim Laden der Genres:", error);
      return;
    }
    genres = data;
  }
  loadGenres();

  async function loadStatus() {
    const { data, error } = await supabase.from("status").select("id, name");

    if (error) {
      console.error("Fehler beim Laden der Status:", error);
      return;
    }
    status = data;
  }
  loadStatus();

  const content = `<p></p>`;
  const mentions = [
    "Lea Thompson",
    "Tom Cruise",
    "Madonna",
    "Elton John",
    "Winona Ryder",
  ];

  function getEditorContent() {
    return editorInstance?.getHTML() ?? "";
  }

  function setEditorContent(content: string) {
    editorInstance?.commands.setContent(content);
  }

  function handleEditableToggle(editable: boolean) {
    isEditable = editable;
    console.log("Editor is now:", editable ? "editable" : "read-only");
  }
  async function handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const fileName = `${Date.now()}-${file.name}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("images")
      .upload(fileName, file, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      console.error("Fehler beim Hochladen:", uploadError);
      alert("Bild konnte nicht hochgeladen werden!");
      return;
    }

    const { data } = supabase.storage.from("images").getPublicUrl(fileName);

    if (!data || !data.publicUrl) {
      console.error("Fehler beim Abrufen der URL: Keine publicUrl gefunden");
      return;
    }

    // if (urlError) {
    //   console.error("Fehler beim Abrufen der URL:", urlError);
    //   return;
    // }

    const publicUrl = data.publicUrl;

    editorInstance?.chain().focus().setImage({ src: publicUrl }).run();
  }

  async function handleDialogClose(saved: boolean) {
    showDialog = false;

    if (!saved) return;

    const htmlContent = editorInstance?.getHTML?.() ?? "";
    const user = await getCurrentUserProfile();
    if (!user) return alert("Bitte zuerst einloggen!");

    const newPost = {
      title: dialogData.title,
      excerpt: dialogData.excerpt,
      content: htmlContent,
      date: new Date().toISOString(),
      views: 0,
      likes: 0,
      dislikes: 0,
      status_id: selectedStatusId,
      genre_id: selectedGenreId,
      user_id: user.id,
    };

    const { error } = await supabase.from("posts").insert([newPost]);
    if (error) {
      console.error("Fehler beim Speichern:", error);
      alert("Fehler beim Speichern: " + error.message);
    } else {
      alert("Beitrag erfolgreich gespeichert!");
    }
  }
</script>

<p class="text-gray-600">
  Deiner Kreativität sind nur rechtliche Grenzen gesetzt
</p>
<TextEditor
  bind:editor={editorInstance}
  {content}
  {mentions}
  file
  {isEditable}
  contentprops={{ id: "drag-handle-editable" }}
  class="w-450 max-w-sm sm:max-w-md md:max-w-lg min-h-200 lg:max-w-xl bg-white border border-gray-200 rounded-lg shadow-sm mx-auto mb-10 dark:bg-white dark:text-grey-500"
>
  <ToolbarRowWrapper>
    <EditableButton
      editor={editorInstance}
      bind:isEditable
      onToggle={handleEditableToggle}
    />
    <Divider />
    <FormatButtonGroup editor={editorInstance} />
    <Divider />
    <HeadingButtonGroup editor={editorInstance} />
  </ToolbarRowWrapper>

  <ToolbarRowWrapper toolbarrawprops={{ top: false }}>
    <UndoRedoButtonGroup editor={editorInstance} />
    <Divider />
    <LayoutButtonGroup editor={editorInstance} />
    <Divider />
    <ImageButtonGroup editor={editorInstance} />
    <Divider />
    <YoutubeButtonGroup editor={editorInstance} />
    <Divider />
    <SourceButtonGroup editor={editorInstance} />
  </ToolbarRowWrapper>

  <ToolbarRowWrapper toolbarrawprops={{ top: false }}>
    <DetailsButtonGroup editor={editorInstance} />
    <Divider />
    <ListButtonGroup editor={editorInstance} />
    <Divider />
    <AlignmentButtonGroup editor={editorInstance} />
    <Divider />
    <ExportButtonGroup editor={editorInstance} />
  </ToolbarRowWrapper>

  <ToolbarRowWrapper toolbarrawprops={{ top: false }}>
    <TaskListButtonGroup editor={editorInstance} />
  </ToolbarRowWrapper>

  <ToolbarRowWrapper toolbarrawprops={{ top: false }}>
    <TableButtonGroup1 editor={editorInstance} />
    <TableButtonGroup2 editor={editorInstance} />
  </ToolbarRowWrapper>

  {#snippet footer()}
    {#if editorInstance}
      <CharacterCount editor={editorInstance} limit={2800} />
    {/if}
  {/snippet}
</TextEditor>

<div
  class="
  max-w-sm
  sm:max-w-md
  md:max-w-lg
  lg:max-w-xl
  mx-auto
  mb-10
  flex
  justify-center"
>
  {#if genres.length > 0}
    <Checkbox
      options={genres.map((g) => ({ label: g.name, value: g.id.toString() }))}
      onSelect={(value: string) => (selectedGenreId = parseInt(value))}
    />
  {:else}
    <p class="text-gray-400 text-sm">Genres werden geladen...</p>
  {/if}
  {#if status.length > 0}
    <DropdownRadio
      options={status.map((g) => ({ label: g.name, value: g.id.toString() }))}
      onSelect={(value: string) => (selectedStatusId = parseInt(value))}
    />
  {:else}
    <p class="text-gray-400 text-sm">Statusoptionen werden geladen...</p>
  {/if}

  <button
    class="bg-purple-dark text-yellow-bright px-4 py-2 rounded hover:bg-purple"
    onclick={openDialog}
  >
    Beitrag abschließen
  </button>
  <Button
    class="bg-purple-dark text-yellow-bright 
            font-medium rounded-lg text-sm px-5 py-2.5 ml-2 mr-2 text-left flex justify-between items-center
           hover:bg-purple focus:ring-2 focus:ring-yellow-bright h-10"
    >Schließen</Button
  >
  {#if showDialog}
    <DialogWindow data={dialogData} onClose={handleDialogClose} />
  {/if}
</div>
<div class="mb-4 text-center">
  <label
    class="bg-purple-dark text-yellow-bright px-4 py-2 rounded cursor-pointer hover:bg-purple"
  >
    Bild hochladen
    <input
      type="file"
      accept="image/*"
      onchange={handleFileUpload}
      class="hidden"
    />
  </label>
</div>
