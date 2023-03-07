import React, { Dispatch, SetStateAction, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import styles from './styles.module.css'
import { tiptapMenuButtons } from '../constants/tiptapMenuButtons'
import Placeholder from '@tiptap/extension-placeholder'
import Button from './Button'

interface TipTapProps {
    title: string,
    setTitle: Dispatch<SetStateAction<string>>,
    content: string,
    setContent: Dispatch<SetStateAction<string>>,
    saveTask: () => void
}

interface MenuBarProps {
    editor: any,
    saveTask: () => void
}

const MenuBar = ({ editor, saveTask }: MenuBarProps) => {
    if (!editor) {
        return null
    }

    return (
        <div className="bg-white border-b shadow-sm mb-6 top-0 sticky z-50 flex md:flex-row flex-col items-center">
            <div className="p-2 flex flex-wrap">
                {tiptapMenuButtons(editor).map(x => (
                    <div key={x.value} className="flex items-center">
                        <button
                            onClick={x.onClick}
                            className={`py-2 px-4 ${x.isActiveCheck && x.isActiveCheck() ? 'text-white bg-gray-500 rounded-md' : 'hover:bg-indigo-50 rounded-md bg-white'}`}>
                            <i className={x.icon} >{x.headingLevel ? <span className="font-bold ml-1 text-base font-sans">{x.headingLevel}</span> : <></>}</i>
                        </button>
                        {x.rightSeparator && <div className="md:bg-gray-100 md:w-px md:h-8 mx-2" />}
                    </div>
                ))}
            </div>
            <div className="ml-auto p-4">
                <Button text="Salvar" action={() => saveTask()} />
            </div>
        </div>
    )
}

export default function TipTap({ title, setTitle, content, setContent, saveTask }: TipTapProps) {
    const editor = useEditor({
        content,
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Escreva algo',
                emptyEditorClass: styles.placeholderClass
            })
        ],
        onUpdate({ editor }) {
            setContent(editor.getHTML())
        },
    })

    return (
        <div className="pb-8">
            <MenuBar editor={editor} saveTask={saveTask} />
            <input style={{ outline: 'none' }} onChange={e => setTitle(e.target.value)} value={title} className="block w-full text-3xl font-bold mb-2 placeholder-gray-500 bg-white rounded" type="text" name="" placeholder="Título" />
            <EditorContent editor={editor} className={styles.tiptap} />
        </div>
    )
}