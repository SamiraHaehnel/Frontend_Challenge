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

  let editorInstance = $state<Editor | null>(null);
  let isEditable = $state(true);

  function getEditorContent() {
    return editorInstance?.getHTML() ?? "";
  }

  function setEditorContent(content: string) {
    editorInstance?.commands.setContent(content);
  }

  const content = `<p>Hallo</p>`;

  function handleEditableToggle(editable: boolean) {
    isEditable = editable;
    console.log("Editor is now:", editable ? "editable" : "read-only");
  }

  const mentions = [
    "Lea Thompson",
    "Cyndi Lauper",
    "Tom Cruise",
    "Madonna",
    "Jerry Hall",
    "Joan Collins",
    "Winona Ryder",
    "Christina Applegate",
    "Alyssa Milano",
    "Molly Ringwald",
    "Ally Sheedy",
    "Debbie Harry",
    "Olivia Newton-John",
    "Elton John",
    "Michael J. Fox",
    "Axl Rose",
    "Emilio Estevez",
    "Ralph Macchio",
    "Rob Lowe",
    "Jennifer Grey",
    "Mickey Rourke",
    "John Cusack",
    "Matthew Broderick",
    "Justine Bateman",
    "Lisa Bonet",
  ];
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
  <ToolbarRowWrapper
    class="
    "
  >
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
<div class="mt-4">
  <Button onclick={() => console.log(getEditorContent())}
    >Log den Quatsch</Button
  >
  <Button onclick={() => setEditorContent("<p>New content!</p>")}
    >Set Content</Button
  >
</div>
