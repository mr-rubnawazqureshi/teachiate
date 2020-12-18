import { all, takeEvery, put, call, select } from "redux-saga/effects";
import * as groupApi from "./services";
import actions from "./actions";

const getGroupState = (state) => state.groups;

export function* LOAD_GROUP({ payload }) {
  const response = yield call(groupApi.loadGroup, payload.id);
  if (response) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        group: response,
      },
    });
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        group: {},
        showMessageError: true,
        message: "Failed to load group, please try later!",
      },
    });
  }
}

export function* CREATE_NEW_POST({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: { loading: true },
  });
  debugger
  const response = yield call(groupApi.createNewPost, {payload});
  if (response) {
    const { page, group } = yield select(getGroupState);
    yield put({
      type: actions.GET_GROUP_POST,
      payload: { id: group._id, page: page },
    });
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        notificationMessage: "Error occurred, please try later",
        notificationType: "error",
        loading: false,
        openNotification: true,
      },
    });
  }
}

export function* GET_GROUP_POST({ payload }) {
  const { page, id } = payload;
  yield put({
    type: actions.SET_STATE,
    payload: { loading: true },
  });
  const response = yield call(groupApi.getGroupPosts, id, page);
  if (response) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        posts: response.posts,
        totalElement: response.totalElement,
        page: response.page,
        loading: true,
      },
    });
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        notificationMessage: "Error occurred, please try later",
        notificationType: "error",
        loading: false,
        openNotification: true,
      },
    });
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOAD_GROUP, LOAD_GROUP),
    takeEvery(actions.CREATE_NEW_POST, CREATE_NEW_POST),
  ]);
}
