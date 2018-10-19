import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import GroupTable from './GroupTable';
import { addFolder, copyObject } from '../../../actions/api';

class Users extends Component {

  handleMember = (user) => {
    const { addFolder, copyObject, volume } = this.props;
    return addFolder('Volumes', {}, user._id, 'user').then(folder => {
      return copyObject(volume._id, 'folder', folder._id, 'folder');
    })
  }

  render() {
    const { volume: {meta: data} } = this.props;

    return (
      <div>
        <h3>Manage {data.shortName} Users</h3>
        <p className="pt-3">
          Here you can add, edit, or remove Users of the {data.shortName} Activity Set, and add, edit, or delete Viewers of their data.
          <br/>
          Users perform Activities in the App, and Viewers can view their data in a Dashboard.
        </p>
        <GroupTable group='users' groupName='User' onAddMember={this.handleMember} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  volume: state.entities.volume,
})

const mapDispatchToProps = {
  copyObject,
  addFolder,
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
