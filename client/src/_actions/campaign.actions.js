import { CampaignConstants } from "../_constants";

export const campaign = {
  loadDashboard,
  createCampaign,
  getCampaignContacts,
};

const BASE_URL = "http://localhost:3000";

const getCampaignListSuccess = (lists) => ({
  type: CampaignConstants.CAMPAIGN_LIST_SUCCESS,
  payload: lists,
});

const getCampaignContactList = (lists) => ({
  type: CampaignConstants.CAMPAIGN_CONTACT_LIST_SUCCESS,
  payload: lists,
});

const setMessageText = (msg) => ({
  type: CampaignConstants.BUTTON_MESSAGE_SET,
  payload: { message: msg },
});

const setButtonText = (msg) => ({
  type: CampaignConstants.CAMPAIGN_SUBMIT_LOADING,
  payload: { buttonText: msg },
});

const setValidationError = (payload) => ({
  type: CampaignConstants.CAMPAIGN_SUBMIT_VALIDATION_FAIL,
  payload: payload,
});

function loadDashboard() {
  return (dispatch) => {
    fetch(BASE_URL + "/campaign/lists")
      .then((response) => response.json())
      .then((data) => {
        dispatch(getCampaignListSuccess(data.payload));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

function getCampaignContacts() {
  return (dispatch) => {
    fetch(BASE_URL + "/campaign/contact/lists")
      .then((response) => response.json())
      .then((data) => {
        dispatch(getCampaignContactList(data.payload));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

function setMessage(msg) {
  return (dispatch) => {
    dispatch(setMessageText(msg));
  };
}

function createCampaign(params, callback) {
  const requestOptions = {
    method: "POST",
    body: params,
  };

  return (dispatch) => {
    dispatch(setButtonText("Please wait & Processing...."));

    fetch(BASE_URL + "/campaign/add", requestOptions).then((response) => {
      return response.text().then((text) => {
        const data = JSON.parse(text);

        if (data.status === "validation-error") {
          dispatch(setValidationError(data.payload));
        }
        dispatch(setButtonText("Sorrry Submit Again"));
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        callback();
      });
    });
  };
}
