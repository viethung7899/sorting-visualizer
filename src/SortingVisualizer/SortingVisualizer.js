import React from 'react'
import './SortingVisualizer.css'

import {connect} from 'react-redux'

// Import actions
import {generateData} from '../actions/buttonActions'

class SortingVisualizer extends React.Component {
    componentDidMount() {
        this.props.generateData(100);
    }

    render() {
        let barList = this.props.data.map((value, index) => {
            return <Bar value={value} index={index} color={this.props.colors[index]} />
        })
        return (
            <div className='visualizer' onChange={this.sort}>
                {barList}
            </div>
        );
    }
}

function Bar(props) {
    let {value, index, color} = props
    return (
        <div 
            className='array-bar'
            key = {index}
            style = {{
                backgroundColor: color,
                height: `${value}px`
            }}>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        isRunning: state.running,
        data: state.data,
        colors: state.colors,
        algorithm: state.algorithm
    }
}

function mapDispatchToProps(dispatch) {
    return {
        generateData: size => dispatch(generateData(size))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortingVisualizer);