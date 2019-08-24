import React from "react";
import { Card, CardWrapper } from "react-swipeable-cards";

export default class CardResponses extends React.PureComponent {
  onSwipe(data) {
    console.log("I was swiped.");
  }

  onSwipeLeft(data) {
    console.log("I was swiped left.");
  }

  onSwipeRight(data) {
    console.log("I was swiped right.");
    console.log(data);
    this.props.savedTrees.push(data);
  }

  onDoubleTap(data) {
    console.log("I was double tapped.");
  }
  renderCards() {
    return this.props.responses.map((data, ndx) => {
      return (
        <Card
          key={data.ndx}
          onSwipe={this.onSwipeRight.bind(this, data)}
          data={data}
        >
          <img
            key={data.ndx}
            src={data.url_to_picture}
            style={{ width: "350px", height: "350px", margin: "20px" }}
          ></img>
        </Card>
      );
    });
  }

  render() {
    return <CardWrapper>{this.renderCards()}</CardWrapper>;
  }
}
