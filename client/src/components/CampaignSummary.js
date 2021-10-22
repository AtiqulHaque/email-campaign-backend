import React from "react";
import { connect } from "react-redux";
import { campaign } from "../_actions";

function mapDispatchToProps(dispatch) {
  return {
    loadDashBoard: (article) => dispatch(campaign.loadDashboard(article)),
  };
}

let CampainTemplate = (props) => {
  let status = "";
  if (props.data.status === 0) {
    status = "Going To Process";
  } else if (props.data.status === 1) {
    status = "Processing";
  } else {
    status = "Finished";
  }
  return (
    <div className="col-xl-3 col-md-6 mb-4">
      <div className="card border-left-primary shadow h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                {props.data.campaigns_name} ({props.data.total_contacts})
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {status}
              </div>
            </div>
            <div className="col-auto">
              <i className="fas fa-envelope-open-text fa-2x text-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

class CampaignSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.loadDashBoard();
  }

  render() {
    let container = [];
    this.props.campaigns.map((data) => {
      return container.push(<CampainTemplate data={data} />);
    });

    return <div className="row">{container}</div>;
  }
}

function mapStateToProps(state) {
  console.log(state);
  const { campaigns, loading } = state.campaign;
  return {
    loading,
    campaigns,
  };
}

const connectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignSummary);
export { connectedApp as CampaignSummary };
