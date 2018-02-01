
import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import { EditorState, ContentState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

class RichTextEditor extends Component {
  constructor(props) {
    super(props);

    let editorState;
    try{
      editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.value)));
    }catch(err){
      editorState = EditorState.createWithContent(ContentState.createFromText(this.props.value));
    }

    this.state = {
      editorState,
    };
  }

  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });

    if(this.props.onChange){
      this.props.onChange(null, {name: this.props.name, value: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))});
    }
  };

  render() {
    const { editorState } = this.state;

    const toolbar = {
      options:   ['blockType', 'list', 'textAlign', 'link', 'history'],
      textAlign: {
        options: ['left', 'center', 'right'],
      },
      list: {
        options: ['unordered', 'ordered'],
      },
    };

    return (
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={this.onEditorStateChange}
        toolbar={toolbar}
      />
    )
  }
}

registerComponent('RichTextEditor', RichTextEditor);
