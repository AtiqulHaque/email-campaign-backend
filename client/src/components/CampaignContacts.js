import React from "react";
import DataGrid from "react-data-grid";
import { connect } from "react-redux";
import { campaign } from "../_actions";
const columns = [
  { key: "contact_id", name: "ID" },
  { key: "name", name: "Name" },
  { key: "email", name: "Email" },
  { key: "campaign_indentifier", name: "Campaign Identifier" },
  { key: "send_at", name: "Send at" },
];

function mapDispatchToProps(dispatch) {
  return {
    getCampaignContacts: (article) =>
      dispatch(campaign.getCampaignContacts(article)),
  };
}

class CampaignContacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getCampaignContacts();
  }

  render() {
    return <DataGrid columns={columns} rows={this.props.contacts} />;
  }
}

function mapStateToProps(state) {
  const { contacts, loading } = state.campaign;
  return {
    loading,
    contacts,
  };
}

const connectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignContacts);
export { connectedApp as CampaignContacts };
