import { useEditor, EditorContent, Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import BulletList from "@tiptap/extension-bullet-list"
import Underline from "@tiptap/extension-underline"
import { cva } from "class-variance-authority"
import { Bold, Italic, Underline as UnderScore, List } from "tabler-icons-react"

const editorStyle = cva(["p-2"])
const editorControlStyle = cva(["border", "rounded", "shadow"], {
  variants: {
    intent: {
      primary: [],
      active: ["bg-slate-400"],
    },
  },
})

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null
  }
  return (
    <div className="flex flex-row p-2 space-x-3 border">
      {/* bold */}
      <div
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editorControlStyle({
          intent: editor.isActive("bold") ? "active" : "primary",
        })}
      >
        <Bold />
      </div>
      {/* italic */}
      <div
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editorControlStyle({
          intent: editor.isActive("italic") ? "active" : "primary",
        })}
      >
        <Italic />
      </div>
      {/* underscore */}
      <div
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editorControlStyle({
          intent: editor.isActive("underline") ? "active" : "primary",
        })}
      >
        <UnderScore />
      </div>
      {/* bullet points */}
      <div
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editorControlStyle({
          intent: editor.isActive("bulletList") ? "active" : "primary",
        })}
      >
        <List />
      </div>
    </div>
  )
}

export const RichTextEditor = ({
  content,
  editable = true,
  onChange
}: {
  content: string
  editable: boolean
  onChange: (event: any) => void
}) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline, BulletList],
    content,
    editable,
    editorProps: {
      attributes: {
        class: "focus:outline-none [&>*]:list-disc [&>*]:list-inside",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange(html)
    }
  })

  return (
    <div key="editor" className="border-stone-400 border rounded min-h-[200px]">
      {editable && <MenuBar editor={editor} />}
      <EditorContent className={editorStyle()} editor={editor} />
    </div>
  )
}
