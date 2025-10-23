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
    InvisibleButtonGroup,
    LayoutButtonGroup,
    ListButtonGroup,
    SourceButtonGroup,
    TableButtonGroup1,
    TableButtonGroup2,
    TaskListButtonGroup,
    UndoRedoButtonGroup,
    YoutubeButtonGroup,
  } from "flowbite-svelte";
  import { Button } from "flowbite-svelte";
  import type { Editor } from "@tiptap/core";

  let editorInstance: Editor | null = null;
  let isEditable = true;

  function getEditorContent() {
    return editorInstance?.getHTML() ?? "";
  }

  function setEditorContent(content: string) {
    editorInstance?.commands.setContent(content);
  }

  const content = `<p>Flowbite-Svelte is an <strong>open-source library of UI components</strong>...</p>`;

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
  ];
</script>

<TextEditor
  bind:editor={editorInstance}
  {content}
  {mentions}
  file
  {isEditable}
  contentprops={{ id: "drag-handle-editable" }}
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
    <InvisibleButtonGroup editor={editorInstance} />
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
      <CharacterCount editor={editorInstance} limit={700} />
    {/if}
  {/snippet}
</TextEditor>

<div class="mt-4 flex gap-2">
  <Button on:click={() => console.log(getEditorContent())}>Log Content</Button>
  <Button on:click={() => setEditorContent("<p>New content!</p>")}
    >Set Content</Button
  >
</div>
