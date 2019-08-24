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
          onSwipeRight={this.onSwipeRight.bind(this, data)}
          onSwipeLeft={this.onSwipeLeft.bind(this)}
          data={data}
        >
          <img
            key={data.ndx}
            src={data.url_to_picture}
            style={{ width: "350px", height: "350px", margin: "20px" }}
          ></img>
          <h2 style={{ margin: "20px" }}>
            We're {data.ibm_confidence} confident that there's a fig tree here.
          </h2>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <img
              src={"badapple.png"}
              style={{ width: "30px", height: "30px", margin: "20px" }}
            />
            <img
              src={"goodapple.png"}
              style={{ width: "30px", height: "30px", margin: "20px" }}
            />
          </div>
        </Card>
      );
    });
  }

  render() {
    return <CardWrapper>{this.renderCards()}</CardWrapper>;
  }
}
