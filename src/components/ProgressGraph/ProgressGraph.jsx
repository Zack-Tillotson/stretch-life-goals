import React from 'react';
import InlineCss from "react-inline-css";
import ChartistGraph from 'react-chartist';
import moment from 'moment';

import styles from './styles';

const dateFormats = {
  day: 'MMM DD, YYYY',
  week: 'MMM DD, YYYY',
  month: 'MMM, YYYY'
};

const ProgressGraph = React.createClass({

  propTypes: {
    milestones: React.PropTypes.array.isRequired,
    progress: React.PropTypes.object.isRequired,
    startDate: React.PropTypes.object.isRequired,
    endDate: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      period: 'day'
    };
  },

  getPeriod() {
    return this.state.period;
  },

  getPeriodControls() {
    const dayClass = this.state.period == 'day' ? 'active' : '';
    const weekClass = this.state.period == 'week' ? 'active' : '';
    const monthClass = this.state.period == 'month' ? 'active' : '';
    return (
      <ul className="periodControls">
        <li className={['control', dayClass].join(' ')} onClick={this.setPeriod.bind(this, 'day')}>
          Daily
        </li>
        <li className={['control', weekClass].join(' ')} onClick={this.setPeriod.bind(this, 'week')}>
          Weekly
        </li>
        <li className={['control', monthClass].join(' ')} onClick={this.setPeriod.bind(this, 'month')}>
          Monthly
        </li>
      </ul>
    );
  },

  setPeriod(period) {
    this.setState({period});
  },

  getDataPeriods() {

    const endDate = moment(this.props.endDate);
    const {period} = this.state;
    
    let timePeriod = moment(this.props.startDate);
    const ret = [];

    do {
      ret.push(moment(timePeriod));
      timePeriod = timePeriod.add(1, `${period}s`);
    } while(timePeriod.isBefore(endDate));

    return ret;

  },

  getDataPeriodBounds() {
    const dataPeriods = this.getDataPeriods();
    const maxIndex = dataPeriods.length - 1;

    return dataPeriods.map((startDate, index) => {
      const endDate = index < maxIndex ? dataPeriods[index + 1] : moment(new Date(9999999999999));
      return {startDate, endDate};
    });
  },

  getFormattedDate(date) {
    const {period} = this.state;
    const dateFormat = dateFormats[period];
    return date.format(dateFormat)
  },

  getProgressDuringPeriod(dates) {
    const {startDate, endDate} = dates;

    return Object.keys(this.props.progress).filter(key => {
      const progress = this.props.progress[key];
      return startDate.isBefore(moment(progress.timestamp)) && endDate.isAfter(moment(progress.timestamp))
    }).length;
  },

  filterAxisLabels(label, index, ary) {
    const labelCount = 15;
    if(ary.length > labelCount) {
      const divisor = parseInt(ary.length / labelCount);
      let trueIndex = -9999999;
      return ary.map((item, aryIndex) => {
        if(aryIndex > trueIndex + divisor) {
          trueIndex = aryIndex;
          return true;
        } else {
          return false;
        }
      })[index] ? label : null;
    } else {
      return label;
    }
  },

  getChartData() {
    return {
      labels: this.getDataPeriods().map(this.getFormattedDate).map(this.filterAxisLabels),
      series: [this.getDataPeriodBounds().map(this.getProgressDuringPeriod)],
    }
  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="component">
        {this.getPeriodControls()}
        <ChartistGraph data={this.getChartData()} type="Bar" />
      </InlineCss>
    );
  }
});

export default ProgressGraph;