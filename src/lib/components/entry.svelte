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

  // --- EDITOR SETUP ---
  let editorInstance: Editor | null = null;
  let isEditable = true;

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

  async function saveToSupabase() {
    const htmlContent = getEditorContent();

    const user = await getCurrentUserProfile();
    if (!user) {
      alert("Bitte zuerst einloggen!");
      return;
    }

    const newPost = {
      title: "Mein Testbeitrag", //Notiz an mich, das sauberer gestalten
      excerpt: "Ein kleiner Auszug...", //Das auch
      content: htmlContent,
      date: new Date().toISOString(),
      views: 0,
      likes: 0,
      dislikes: 0,
      status: "draft",
      user_id: user.id,
    };

    const { data, error } = await supabase
      .from("posts")
      .insert([newPost])
      .select();

    if (error) {
      console.error("Fehler beim Speichern:", error);
      alert("Fehler beim Speichern: " + error.message);
    } else {
      console.log("Erfolgreich gespeichert:", data);
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
      <CharacterCount editor={editorInstance} limit={1800} />
    {/if}
  {/snippet}
</TextEditor>

<div class="mt-4 flex gap-2 justify-center">
  <Button onclick={() => console.log(getEditorContent())}>Log Content</Button>
  <Button onclick={() => setEditorContent("<p>Neuer Inhalt!</p>")}
    >Set Content</Button
  >
  <Button color="green" onclick={saveToSupabase}>Speichern</Button>
</div>
