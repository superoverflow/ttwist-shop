import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { cva } from "class-variance-authority"

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<b>Hello World! 🌎️</b>",
  })

  return (
    <EditorContent
      className="border rounded shadow mx-4 p-2 min-h-full"
      editor={editor}
    />
  )
}

export default Tiptap
