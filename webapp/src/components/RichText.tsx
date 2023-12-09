/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC, useRef } from "react";
import classNames from "classnames";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import { Level } from "@tiptap/extension-heading";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import { ListBulletIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { getCIDLink, uploadToWeb3Storage } from "../utils/web3Storage";

const extensions = [StarterKit, Underline, Image];

const MenuBarButton: FC<{
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}> = ({ children, onClick, active }) => {
  return (
    <button
      className={classNames("btn btn-sm w-8 h-8 first:ml-0 ml-2", {
        "btn-active": active,
      })}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};

export const RichTextMenuBar: FC = () => {
  const { current: imageInputId } = useRef(
    "RichText-" + (Math.random().toString(36) + "00000000000000000").slice(2, 7)
  );
  const uploadFileMutation = useMutation({
    mutationKey: ["upload-file-to-web3-storage"],
    mutationFn: ({ file }: { file: File }) => {
      return uploadToWeb3Storage([file], {
        wrapWithDirectory: false,
      });
    },
  });
  const { editor } = useCurrentEditor();
  if (!editor) {
    return null;
  }
  const onImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files[0].length === 0) {
      return;
    }
    const [file] = e.target.files;
    const cid = await uploadFileMutation.mutateAsync({ file });
    editor
      .chain()
      .focus()
      .setImage({ src: getCIDLink(cid) })
      .run();
  };
  return (
    <div className="flex bg-base-200 p-2">
      <div>
        {([1, 2, 3] as Level[]).map((level: Level) => (
          <MenuBarButton
            onClick={() => {
              editor.chain().focus().toggleHeading({ level }).run();
            }}
            active={editor.isActive("heading", { level })}
          >
            H{level}
          </MenuBarButton>
        ))}
      </div>
      <div className="border-l pl-2 ml-2">
        <MenuBarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        >
          B
        </MenuBarButton>
        <MenuBarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        >
          <span className="italic normal-case">i</span>
        </MenuBarButton>
        <MenuBarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
        >
          <span className="underline normal-case">U</span>
        </MenuBarButton>
        <MenuBarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
        >
          <span className="line-through normal-case">S</span>
        </MenuBarButton>
      </div>
      <div className="border-l pl-2 ml-2">
        <MenuBarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        >
          <span className="line-through normal-case">
            <ListBulletIcon className="h-5 w-5" />
          </span>
        </MenuBarButton>
      </div>
      <div className="border-l pl-2 ml-2">
        <label
          className="btn btn-sm w-8 h-8 first:ml-0 ml-2 p-0"
          htmlFor={imageInputId}
        >
          <PhotoIcon className="h-5 w-5" />
          <input
            type="file"
            className="hidden"
            id={imageInputId}
            onChange={(e) => onImageFileChange(e)}
          />
        </label>
      </div>
    </div>
  );
};

export const RichText: FC<{
  initialValue: string;
  onChange: (html: string) => void;
  onBlur?: (props: { event: FocusEvent }) => void;
  hasError?: boolean;
}> = ({ initialValue, onChange, onBlur, hasError }) => {
  return (
    <div>
      <div
        className={classNames(
          "border border-base-content border-opacity-0 bg-base-100 rounded-md overflow-hidden [&>div>.tiptap]:prose [&>div>.tiptap]:outline-none [&>div>.tiptap]:p-6",
          { "border-error": hasError }
        )}
      >
        <EditorProvider
          extensions={extensions}
          slotBefore={<RichTextMenuBar />}
          children={null}
          content={initialValue}
          onUpdate={({ editor }) => {
            onChange(editor.getHTML());
          }}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
};
