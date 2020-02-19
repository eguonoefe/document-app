/* global expect test */
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actionType from '../../actions/actionTypes';
import RoleActions from '../../actions/RoleActions';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Role Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  describe('Create Roles', () => {
    it('Should make an AJAX call to create Role', (done) => {
      moxios.stubRequest('/api/v1/roles', {
        status: 201,
        response: {
          savedRole: { title: 'Eguono' },
          message: 'Role created'
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.ROLE_CREATED,
        role: { title: 'Eguono' },
        message: null
      }];
      store.dispatch(RoleActions.createRole({
        title: 'Eguono',
        description: 'eguono'
      })).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it('Should make an AJAX call to view Role', (done) => {
      moxios.stubRequest('/api/v1/roles', {
        status: 403,
        response: {
          message: 'There are no roles currently'
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.ROLE_ERROR,
        message: 'There was an error please try again'
      }];
      store.dispatch(RoleActions.createRole()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest('/api/v1/roles', {
          status: 400,
          response: {
            message: 'error'
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.ROLE_ERROR,
          message: 'error'
        }];
        store.dispatch(RoleActions.createRole({
          title: 'hello@hello.com',
          des: 'eguono'
        })).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });
  describe('View Roles', () => {
    it('Should make an AJAX call to view Roles', (done) => {
      moxios.stubRequest('/api/v1/roles', {
        status: 200,
        response: {
          roles: [{ title: 'Eguono' }, { title: 'June' }],
          message: 'Roles found'
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.VIEW_ROLE,
        message: null,
        roleList: [{ title: 'Eguono' }, { title: 'June' }]
      }];
      store.dispatch(RoleActions.viewRole()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest('/api/v1/roles', {
          status: 403,
          response: {
            message: 'error'
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.ROLE_ERROR,
          message: 'There was an error please try again'
        }];
        store.dispatch(RoleActions.viewRole()).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest('/api/v1/roles', {
          status: 400,
          response: {
            message: 'error'
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.ROLE_ERROR,
          message: 'error'
        }];
        store.dispatch(RoleActions.viewRole()).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest('/api/v1/roles', {
          status: 404,
          response: {
            roleList: []
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.NO_ROLES,
          roleList: []
        }];
        store.dispatch(RoleActions.viewRole()).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });
  describe('Delete Role', () => {
    it('Should make an AJAX call to view a Roles', (done) => {
      moxios.stubRequest('/api/v1/roles/1', {
        status: 200,
        response: {
          message: 'Role has been deleted'
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.ROLE_DELETED,
        message: 'Role has been deleted'
      }];
      store.dispatch(RoleActions.deleteRole(1)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest('/api/v1/roles/300000', {
          status: 403,
          response: {
            message: 'error'
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.ROLE_ERROR,
          message: 'There was an error please try again'
        }];
        store.dispatch(RoleActions.deleteRole(300000)).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });
  describe('Update Role', () => {
    it('Should make an AJAX call to update a Roles', (done) => {
      moxios.stubRequest('/api/v1/roles/1', {
        status: 200,
        response: {
          updatedRole: { title: 'Eguono' },
          message: 'Role has been updated'
        }
      });
      const store = mockStore({});
      const expectedAction = [{
        type: actionType.ROLE_UPDATED,
        message: null,
        role: { title: 'Eguono' }
      }];
      store.dispatch(
        RoleActions.updateRole({ title: 'Eguono' }, 1)).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      done();
    });
    it(
      'Should make an AJAX call to update a Roles and fail if title exists',
      (done) => {
        moxios.stubRequest('/api/v1/roles/1', {
          status: 400,
          response: {
            updatedRole: { title: 'Eguono' },
            message: "we're sorry, role title must be unique"
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.ROLE_UPDATE_ERROR,
          message: 'Role title must be unique, please rename role'
        }];
        store.dispatch(
          RoleActions.updateRole({ title: 'Eguono' }, 1)).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
          });
        done();
      });
    it(
      'Should make an AJAX call to update a Roles and fail if title exists',
      (done) => {
        moxios.stubRequest('/api/v1/roles/1', {
          status: 400,
          response: {
            updatedRole: { title: 'Eguono' },
            message: "we're sorry, role title must be uniqu"
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.ROLE_ERROR,
          message: "we're sorry, role title must be uniqu"
        }];
        store.dispatch(
          RoleActions.updateRole({ title: 'Eguono' }, 1)).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
          });
        done();
      });
    it("Should dispatch the appropraite action type if there's an error",
      (done) => {
        moxios.stubRequest('/api/v1/roles/300000', {
          status: 403,
          response: {
            message: 'error'
          }
        });
        const store = mockStore({});
        const expectedAction = [{
          type: actionType.ROLE_ERROR,
          message: 'There was an error please try again'
        }];
        store.dispatch(RoleActions.updateRole(300000)).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
        done();
      });
  });
});
