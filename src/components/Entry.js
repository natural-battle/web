import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Cmp extends Component {
  constructor(props) {
    super(props);

    this.reanimate = this.reanimate.bind(this);
  }

  startDowngrade(entryId, basicProgress) {
    const { onProgress } = this.props;

    let p = basicProgress;

    // remove a previous timer
    clearInterval(this.timerProgress);

    this.timerProgress = setInterval(() => {
      p = p - 25;

      if (p > 0) {
        onProgress(entryId, p);
      } else {
        clearInterval(this.timerProgress);
        onProgress(entryId, 0);
      }
    }, 1500);
  }

  // a timer created by click
  reanimate(entryId) {
    const { onProgress } = this.props;

    const highProgress = 100;

    onProgress(entryId, highProgress); // set to 100%

    this.startDowngrade(entryId, highProgress);
  }

  componentDidMount() {
    const item = this.props.item;

    if (item.progress > 0) {
      this.startDowngrade(item.id, item.progress);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerProgress);
  }

  render() {
    const { item } = this.props;

    const styleProgress = {
      opacity: item.progress / 100
    };

    return (
      <div className="entry"
           onClick={() => this.reanimate(item.id)}>
        <div className="entry__id">
          {item.id}
        </div>
        <div className="entry__progress" style={styleProgress}>
          {item.progress}
        </div>
      </div>
    );
  }
}

Cmp.propTypes = {
  item: PropTypes.object.isRequired,
  onProgress: PropTypes.func.isRequired
}

export default Cmp
