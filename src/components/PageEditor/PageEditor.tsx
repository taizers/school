import React, { FC, useRef } from 'react';

import { Editor } from '@tinymce/tinymce-react';

type PageEditorType = {
  content: any;
  setContent: (data: any) => void;
};

export const PageEditor: FC<PageEditorType> = ({ content, setContent }) => {
  const editorRef: any = useRef(null);

  const handleEditorChange = (data: any) => {
    setContent(data);
  };

  return (
    <Editor
      apiKey="1cs9xqrstvmxlr7f78fxt1s1you6uqb46nkav54d4axf6ftc"
      onInit={(evt, editor) => (editorRef.current = editor)}
      value={content || ''}
      onEditorChange={handleEditorChange}
      init={{
        height: '600px',
        menubar: true,
        language: 'ru',
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code',
          'insertdatetime media table paste code help',
        ],
        toolbar:
          'undo redo | formatselect | image | link | ' +
          'bold italic | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      }}
    />
  );
};
