// 3rd party imports
import React from 'react';
import { Grid } from '@material-ui/core';
import { CompositeDecorator,
         ContentBlock,
         ContentState,
         EditorState,
         genKey
       } from 'draft-js';

//Components
import AcronymDecorator from './AcronymDecorator';
import BulletMenu from './BulletMenu';
import BulletRange from './BulletRange';
import Ruler from './Ruler';

//Logic
import { graberSpace } from '../logic/GraberUtils.js';


/* This component holds the editor and menus associated with the
 * bullets. For now, it is essentially the top level component,
 * ignoring the header and app drawer.
 */
export default class BulletComposer extends React.Component {

  GUIDE_DEFAULT = 763;

  constructor(props) {
    super(props);

    const  acronymStrategy = (contentBlock, callback, contentState) =>{
      const findWithRegex = (regex, contentBlock, callback) => {
        const text = contentBlock.getText();
        let matchArr, start;
        while ((matchArr = regex.exec(text)) !== null) {
          start = matchArr.index;
          callback(start, start + matchArr[0].length);
        }
      };
      findWithRegex(props.regexp, contentBlock, callback);
    };

    const compositeDecorator = new CompositeDecorator([
      {
        strategy:acronymStrategy,
        component:AcronymDecorator,
      },
    ]);

    this.state = {
      editorState: EditorState.createEmpty(compositeDecorator),
      bulletWidths: new Map(),
      graberized: false,
      guide: this.GUIDE_DEFAULT, //px
      regexp: this.props.regexp,
    };
  }

  renderRulers() {
    let rulers = [];
    const blockArray = this.state.editorState.getCurrentContent().getBlocksAsArray();

    blockArray.forEach((block) => {
      rulers.push(
        <Ruler
          onChange={(width) => this.handleWidthMeasurement(block.getKey(), width)}
          content={block.getText()}
        />
      );
    }, this);

    return(rulers);
  }

  graberizeContent(forceReview=false) {
    const graberize = this.state.graberized;
    let editorState = this.state.editorState;
    let content = editorState.getCurrentContent();
    let blockMap = content.getBlockMap(); //resetting
    let bulletWidths = this.state.bulletWidths;
    for (const entry of bulletWidths.entries()) {
      const key = entry[0];
      const width = entry[1][0];
      const finished = entry[1][1];
      const block = content.getBlockForKey(key);
      if (block) {
        if (!finished || forceReview) {
          let result = [];
          if (graberize) {
            const guide = this.state.guide;
            result = graberSpace(block.getText(), width, guide);
          } else {
            result = [block.getText().replace(/[\u2004\u2006\u2007\u2009]/g,' '), true];
          }
          const newBlock = new ContentBlock({
            text: result[0],
            key: key,
            type: 'unstyled',
          });
          
          blockMap = blockMap.set(key, newBlock);
          bulletWidths.set(key, [width, result[1]]);
        }
      } else {
        bulletWidths.delete(key);
      }
    }
    const newContentState = ContentState.createFromBlockArray(blockMap.toArray());
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      'insert-characters'
    );
    this.setState({editorState: newEditorState,
                   bulletWidths: bulletWidths});
  }

  handleGraberize() {
    const graberize = !this.state.graberized;
    this.setState({graberized: graberize}, () => this.graberizeContent(true));
  }

  handleEditorChange(editorState) {
    this.setState({editorState});
  };

  handleWidthMeasurement(key, width) {
    let bulletWidths = this.state.bulletWidths;
    const guide = this.state.guide;
    bulletWidths.set(key, [width, !(width-guide)]);
    this.setState({bulletWidths});
    this.graberizeContent();
  }

  handleTrim(arg) {
    const guide = this.GUIDE_DEFAULT + arg;
    this.setState({guide});
    this.graberizeContent(true);
  }

  render() {
    return (
      <div>
        <Grid container spacing={1}>
          <Grid item xs>
            <BulletRange
              editorState={this.state.editorState}
              guide={this.state.guide}
              disabled={this.state.graberized}
              onChange={editorState => this.handleEditorChange(editorState)}
              onWidthMeasurement={(key, width) => this.handleWidthMeasurement(key, width)}
            />
          </Grid>
          <Grid item>
            <BulletMenu
              graberized={this.state.graberized}
              onGraberize={() => this.handleGraberize()}
              onTrim={(arg) => this.handleTrim(arg)}
            />
          </Grid>
        </Grid>
        {this.state.graberized && this.renderRulers()}
      </div>
    );
  }
}