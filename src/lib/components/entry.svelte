<script lang="ts">
  import { onMount } from "svelte";
  import { Editor } from "@tiptap/core";
  import StarterKit from "@tiptap/starter-kit";
  import Highlight from "@tiptap/extension-highlight";
  import Underline from "@tiptap/extension-underline";
  import Subscript from "@tiptap/extension-subscript";
  import Superscript from "@tiptap/extension-superscript";
  import { TextStyle } from "@tiptap/extension-text-style";
  import { FontFamily } from "@tiptap/extension-font-family";
  import { Color } from "@tiptap/extension-color";
  import Bold from "@tiptap/extension-bold";

  import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
  //   import { lowlight } from "lowlight/lib/common";

  import DropdownRadio from "./DropdownRadio.svelte";
  let selected = "comedy";
  let options = [
    { label: "Horror", value: "horror" },
    { label: "Fantasy", value: "fantasy" },
    { label: "Unterhaltung", value: "comedy" },
    { label: "Persönliches", value: "personal" },
  ];

  function handleSelect(value: string) {
    selected = value;
    console.log("Ausgewählt:", value);
  }

  let editor: Editor;

  onMount(() => {
    const targetEl = document.getElementById("wysiwyg-text-example");
    if (!targetEl) return;

    const FontSizeTextStyle = TextStyle.extend({
      addAttributes() {
        return {
          fontSize: {
            default: null,
            parseHTML: (el) => el.style.fontSize,
            renderHTML: (attrs) =>
              attrs.fontSize ? { style: `font-size: ${attrs.fontSize}` } : {},
          },
        };
      },
    });

    editor = new Editor({
      element: targetEl,
      extensions: [
        StarterKit.configure({ bold: false }),
        Bold,
        Highlight,
        Underline,
        Subscript,
        Superscript,
        TextStyle,
        FontSizeTextStyle,
        Color,
        FontFamily,
      ],
      content: `
          <p></p>
        `,
    });

    // Toolbar Helper
    const getById = (id: string) => document.getElementById(id);
    const safeAddListener = (
      id: string,
      event: string,
      handler: EventListener
    ) => {
      const el = getById(id);
      if (el) el.addEventListener(event, handler);
    };

    // Buttons
    safeAddListener("toggleBoldButton", "click", () =>
      editor.chain().focus().toggleBold().run()
    );
    safeAddListener("toggleItalicButton", "click", () =>
      editor.chain().focus().toggleItalic().run()
    );
    safeAddListener("toggleUnderlineButton", "click", () =>
      editor.chain().focus().toggleUnderline().run()
    );
    safeAddListener("toggleStrikeButton", "click", () =>
      editor.chain().focus().toggleStrike().run()
    );
    safeAddListener("toggleHighlightButton", "click", () => {
      const active = editor.isActive("highlight");
      editor
        .chain()
        .focus()
        .toggleHighlight({ color: active ? "" : "#ffeb3b" })
        .run();
    });
    safeAddListener("toggleSubscriptButton", "click", () =>
      editor.chain().focus().toggleSubscript().run()
    );
    safeAddListener("toggleSuperscriptButton", "click", () =>
      editor.chain().focus().toggleSuperscript().run()
    );
    safeAddListener("toggleCodeButton", "click", () =>
      editor.chain().focus().toggleCode().run()
    );

    // Font size
    const sizeButton = getById("fontSizeButton");
    const sizeMenu = getById("fontSizeMenu");
    if (sizeButton && sizeMenu) {
      sizeButton.addEventListener("click", () =>
        sizeMenu.classList.toggle("hidden")
      );
      sizeMenu.querySelectorAll("[data-text-size]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const size = btn.getAttribute("data-text-size");
          if (size)
            editor
              .chain()
              .focus()
              .setMark("textStyle", { fontSize: size })
              .run();
          sizeMenu.classList.add("hidden");
        });
      });
    }

    // Font family Horror
    const fontButton = getById("fontFamilyButton");
    const fontMenu = getById("fontFamilyMenu");
    if (fontButton && fontMenu) {
      fontButton.addEventListener("click", () =>
        fontMenu.classList.toggle("hidden")
      );
      fontMenu.querySelectorAll("[data-font-family]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const family = btn.getAttribute("data-font-family");
          if (family) editor.chain().focus().setFontFamily(family).run();
          fontMenu.classList.add("hidden");
        });
      });
    }

    // Color picker
    const colorPicker = getById("color") as HTMLInputElement | null;
    if (colorPicker) {
      colorPicker.addEventListener("input", (e) => {
        const target = e.target as HTMLInputElement;
        editor.chain().focus().setColor(target.value).run();
      });
    }

    // Reset color
    safeAddListener("reset-color", "click", () =>
      editor.chain().focus().unsetColor().run()
    );
  });
</script>

<DropdownRadio {options} {selected} onSelect={handleSelect} />
<div class="p-4 max-w-3xl mx-auto">
  <p class="text-gray-600">
    Deiner Kreativität sind nur rechtliche Grenzen gesetzt...
  </p>

  <div class="mb-2 flex flex-wrap gap-2 items-center">
    <button id="toggleBoldButton" class="btn">B</button>
    <button id="toggleItalicButton" class="btn italic">I</button>
    <button id="toggleUnderlineButton" class="btn underline">U</button>
    <button id="toggleStrikeButton" class="btn line-through">S</button>
    <button id="toggleHighlightButton" class="btn bg-yellow-300">HL</button>
    <button id="toggleSubscriptButton" class="btn text-xs">x₂</button>
    <button id="toggleSuperscriptButton" class="btn text-xs">x²</button>
    <button id="toggleCodeButton" class="btn font-mono">&lt;/&gt;</button>
    <button
      class="btn"
      on:click={() => apply((e) => e.chain().focus().toggleCodeBlock().run())}
      >Code</button
    >

    <div class="relative inline-block">
      <button id="fontSizeButton" class="btn">Size</button>
      <div id="fontSizeMenu" class="dropdown hidden">
        <button data-text-size="12px">12px</button>
        <button data-text-size="16px">16px</button>
        <button data-text-size="20px">20px</button>
        <button data-text-size="24px">24px</button>
      </div>
    </div>

    <div class="relative inline-block">
      <button id="fontFamilyButton" class="btn">Font</button>
      <div id="fontFamilyMenu" class="dropdown hidden">
        <button data-font-family="Arial">Arial</button>
        <button data-font-family="Georgia">Georgia</button>
        <button data-font-family="Courier New">Courier New</button>
        <button data-font-family="Times New Roman">Times</button>
        <button data-font-family="Comic Sans MS">Legende</button>
      </div>
    </div>

    <input id="color" type="color" class="ml-2 w-8 h-8 border rounded" />
    <button id="reset-color" class="btn">Zurück</button>
  </div>

  <div
    id="wysiwyg-text-example"
    class="border rounded-lg p-3 min-h-[200px] focus:outline-none"
  ></div>
</div>

<style>
  .btn {
    padding: 0.3rem 0.6rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    cursor: pointer;
  }
  .dropdown {
    display: none;
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    z-index: 10;
  }
  .dropdown button {
    display: block;
    width: 100%;
    padding: 0.25rem 0.5rem;
    text-align: left;
  }
  .dropdown.hidden {
    display: none;
  }
  .dropdown:not(.hidden) {
    display: block;
  }
</style>
