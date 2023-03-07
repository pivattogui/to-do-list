type TipTapButtonProps = {
    value: string,
    icon: string,
    onClick: () => void,
    rightSeparator?: boolean,
    isActiveCheck?: () => boolean,
    headingLevel?: number
}

export const tiptapMenuButtons = (editor: any): TipTapButtonProps[] => [
    {
        value: 'undo',
        icon: "fas fa-undo",
        onClick: () => editor.chain().focus().undo().run()
    },
    {
        value: 'redo',
        icon: "fas fa-redo",
        onClick: () => editor.chain().focus().redo().run(),
        rightSeparator: true
    },
    {
        value: 'bold',
        icon: "fas fa-bold",
        onClick: () => editor.chain().focus().toggleBold().run(),
        isActiveCheck: () => editor.isActive('bold')
    },
    {
        value: 'italic',
        icon: "fas fa-italic",
        onClick: () => editor.chain().focus().toggleItalic().run(),
        isActiveCheck: () => editor.isActive('italic')
    },
    {
        value: 'strike',
        icon: "fas fa-strikethrough",
        onClick: () => editor.chain().focus().toggleStrike().run(),
        isActiveCheck: () => editor.isActive('strike')
    },
    {
        value: 'code',
        icon: "fas fa-code",
        onClick: () => editor.chain().focus().toggleCode().run(),
        isActiveCheck: () => editor.isActive('code')
    },
    {
        value: 'paragraph',
        icon: "fas fa-paragraph",
        onClick: () => editor.chain().focus().setParagraph().run(),
        isActiveCheck: () => editor.isActive('paragraph'),
        rightSeparator: true
    },
    {
        value: 'h1',
        icon: "fas fa-heading",
        onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        isActiveCheck: () => editor.isActive('heading', { level: 1 }),
        headingLevel: 1
    },
    {
        value: 'h2',
        icon: "fas fa-heading",
        onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        isActiveCheck: () => editor.isActive('heading', { level: 2 }),
        headingLevel: 2
    },
    {
        value: 'h3',
        icon: "fas fa-heading",
        onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        isActiveCheck: () => editor.isActive('heading', { level: 3 }),
        headingLevel: 3
    },
    {
        value: 'h4',
        icon: "fas fa-heading",
        onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
        isActiveCheck: () => editor.isActive('heading', { level: 4 }),
        rightSeparator: true,
        headingLevel: 4
    },
    {
        value: 'bullet-list',
        icon: "fas fa-list-ul",
        onClick: () => editor.chain().focus().toggleBulletList().run(),
        isActiveCheck: () => editor.isActive('bulletList')
    },
    {
        value: 'ordered-list',
        icon: "fas fa-list-ol",
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        isActiveCheck: () => editor.isActive('orderedList'),
        rightSeparator: true
    },
    {
        value: 'blockquote',
        icon: "fas fa-quote-right",
        onClick: () => editor.chain().focus().toggleBlockquote().run(),
        isActiveCheck: () => editor.isActive('blockquote')
    },
    {
        value: 'horizontalrule',
        icon: "fas fa-ruler-horizontal",
        onClick: () => editor.chain().focus().setHorizontalRule().run(),
    }
]