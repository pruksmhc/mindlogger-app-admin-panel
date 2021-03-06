import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/AddCircleOutline';

import { getPath, getFoldersDict } from '../../../actions/api';
import LButton from '../../controls/LButton';


class ActRow extends Component {
  static propTypes = {
    act: PropTypes.object.isRequired
  }

  componentWillMount() {
    const {getFoldersDict, act} = this.props;
    getFoldersDict('folder', act._id);
  }

  render() {
    const {variants, act, onEdit, onAddInfo, onEditInfo} = this.props;
    let info;
    if(variants) {
      Object.keys(variants).forEach(key => {
        const variant = variants[key];
        if(variant.meta && variant.meta.info) {
          info = variant;
        }
      })
    }
    return (
      <Grid container>
        <Grid item xs={6}><LButton onClick={() => onEdit(act)}>{(act.meta && act.meta["schema:name"] && act.meta["schema:name"]["@value"]) ? act.meta["schema:name"]["@value"] : act.name}</LButton></Grid>
        <Grid item xs={6}>{info ? <LButton onClick={() => onEditInfo(info)}>{(info.meta && info.meta["schema:name"] && info.meta["schema:name"]["@value"]) ? info.meta["schema:name"]["@value"] : info.name}</LButton> : <LButton onClick={() => onAddInfo(act, 'info')}><AddIcon/></LButton>}</Grid>
      </Grid>
    )
  }
}

const mapStateToProps = ({entities: {objects}}, ownProps) => ({
  variants: (objects && objects[`folder/${ownProps.act._id}`]) || {},
})

const mapDispatchToProps = {
  getFoldersDict, getPath
}

export default connect(mapStateToProps, mapDispatchToProps)(ActRow)
