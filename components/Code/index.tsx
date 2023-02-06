import React from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

function onChange(newValue: any) {
  console.log("change", newValue);
}

// Render editor
const Code = () => {
    return (
        <AceEditor
        mode="javascript"
        theme="monokai"
        onChange={onChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
      />
    )
}

export default Code;