import moment from "moment";
import React from "react";
import { Container } from "react-bootstrap";
import "react-notifications/lib/notifications.css";
import { connect } from "react-redux";
import "../styles.css";
import { booking, dateRangeActions } from "../_actions";
import {CampaignSummary} from "./CampaignSummary"

const ShowMessage = ({ msg }) => {
  return (
    <div className={"messageHolder"}>
      <div className="message">{msg}</div>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    loadDashBoard: (article) => dispatch(booking.loadDashboard(article)),
    dateChangeFun: (data) => dispatch(dateRangeActions.dateChange(data)),
    focusChangeFun: (focusInput) =>
      dispatch(dateRangeActions.focusChange(focusInput)),
    bookRoom: (data, callback) => dispatch(booking.bookRoom(data, callback)),
    checkAvailable: (data) => dispatch(booking.checkAvailable(data)),
    setMessage: (data) => dispatch(booking.setMessage(data)),
    resetDatePicker: (data) => dispatch(dateRangeActions.resetDatePicker(data)),
  };
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      errors: [],
    };
  }

  handleInputChange(event) {
    let key = event.target.name;
    let value = event.target.value;
    let obj = {};
    obj[key] = value;
    this.setState(obj);
  }

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  handleSubmit(event) {
    event.preventDefault();

    let errors = [];

    if (this.state.firstname === "") {
      errors.push("firstname");
    }

    if (this.state.lastname === "") {
      errors.push("lastname");
    }

    const expression = /\S+@\S+/;
    let validEmail = expression.test(String(this.state.email).toLowerCase());

    if (!validEmail) {
      errors.push("email");
    }

    let startDate = moment(this.props.startDate).format("YYYY-MM-DD");
    let endDate = moment(this.props.endDate).format("YYYY-MM-DD");
    let reservation_date = [];

    for (
      let m = moment(startDate);
      m.isSameOrBefore(endDate);
      m.add(1, "days")
    ) {
      reservation_date.push(m.format("YYYY-MM-DD"));
    }

    if (reservation_date.length === 0) {
      errors.push("daterange");
    }

    this.setState({
      errors: errors,
    });

    if (errors.length > 0) {
      return false;
    } else {
      if (this.props.isAvailable) {
        this.props.bookRoom(
          {
            lastname: this.state.lastname,
            firstname: this.state.firstname,
            email: this.state.email,
            reservation_date: reservation_date,
          },
          () => {
            this.setState({
              lastname: "",
              firstname: "",
              email: "",
            });
            this.props.resetDatePicker();
            this.props.loadDashBoard();
          }
        );
      } else {
        this.props.checkAvailable({
          reservation_date: reservation_date,
        });
      }
    }
  }

  componentDidMount() {
    // this.props.loadDashBoard();
  }

  render() {
    let blockDates = [];
    this.props.reservations.map((data) => {
      return blockDates.push(new Date(data.reservation_date));
    });

    let tipMessage = "";

    if (this.props.message !== "") {
      setTimeout(() => {
        this.props.setMessage("");
      }, 5000);

      tipMessage = <ShowMessage msg={this.props.message} />;
    }
    return (
      <div className="App">
          <CampaignSummary/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { startDate, endDate, focusedInput } = state.daterange;
  const { isAvailable, buttonText, message, reservations, loading } =
    state.booking;
  return {
    loading,
    reservations,
    startDate,
    endDate,
    focusedInput,
    isAvailable,
    buttonText,
    message,
  };
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export { connectedApp as App };
