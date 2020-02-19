import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
/**
* Sidebar component that displays a Sidebar.
* @param {Object} props { match, user }
* @returns {String} The HTML markup for the Sidebar component
*/
const SideBar = ({ match, user }) => (
  <ul id="slide-out" className="side-nav fixed ">
    <li><div className="user-view">
      <div className="side-logo center">
        <Link to="/" className="brand-logo">
          <img
            className="brand-img"
            src="../../img/logo2.jpg" alt="sidebar-logo" /> ms</Link>
      </div>
    </div></li>
    <ul className="collapsible" data-collapsible="accordion">
      <li>
        <div className="collapsible-header" id="document-header">
          <i className="material-icons">note</i>Document</div>
        <div className="collapsible-body" id="document">
          <ul>
            <li><Link to={`${match.url}/document`} id="create-document">
              <i className="material-icons">note_add</i>
              Create Document</Link>
            </li>
            <li><Link to={`${match.url}/all-documents`}>
              <i className="material-icons">perm_media</i>
              All Document</Link></li>
          </ul>
        </div>
      </li>
      <li>
        <div className="collapsible-header" id="user-header">
          <i className="material-icons">people</i>Users</div>
        <div className="collapsible-body" id="user">
          <ul>
            <li><Link to={`${match.url}/profile`} id="profile">
              <i className="material-icons">perm_identity</i>
              Profile</Link></li>
            {user.roleId === 1 && <li>
              <Link to={`${match.url}/all-users`} id="userList">
                <i className="material-icons">people_outline</i>
                All Users</Link></li>}
          </ul>
        </div>
      </li>
      {user.roleId === 1 && <li>
        <div className="collapsible-header" id="role-header">
          <i className="material-icons">face</i>Roles</div>
        <div className="collapsible-body">
          <ul>
            {user.roleId === 1 && <li><Link
              to={`${match.url}/role`}
              id="create-role">
              <i className="material-icons">create</i>
              Create Role</Link>
            </li>}
            {user.roleId === 1 && <li><Link
              to={`${match.url}/all-roles`}
              id="roleList">
              <i className="material-icons">wc</i>
              All Roles</Link></li>}
          </ul>
        </div>
      </li>}
    </ul >
  </ul >
);

SideBar.propTypes = {
  match: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SideBar;

