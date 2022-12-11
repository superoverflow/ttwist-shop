import { useEditor, EditorContent, Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import BulletList from "@tiptap/extension-bullet-list"
import { cva } from "class-variance-authority"
import { Bold, Italic, List } from "tabler-icons-react"

const editorStyle = cva(["border", "rounded", "shadow", "p-2", "min-h-full"])
const editorControlStyle = cva(["border", "rounded", "shadow"], {
  variants: {
    intent: {
      primary: [],
      active: ["bg-teal-400"],
    },
  },
})

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null
  }
  return (
    <div className="flex flex-row p-2 border">
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

const Tiptap = ({
  content,
  editable = true,
}: {
  content: string
  editable: boolean
}) => {
  const editor = useEditor({
    extensions: [StarterKit, BulletList],
    content: `<ul>
              <li> That’s a bullet list with one … </li>
              <li> … or two list items.</li>
            </ul>`,
    editable,
    editorProps: {
      attributes: {
        class: "focus:outline-none [&>*]:list-disc [&>*]:list-inside",
      },
    },
  })

  return (
    <div>
      {editable && <MenuBar editor={editor} />}
      <EditorContent className={editorStyle()} editor={editor} />
    </div>
  )
}

export default Tiptap
