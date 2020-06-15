import React from 'react';
import './NavigationBar.css';
import { connect } from 'react-redux';

// Import actions
import {changeAlgorithm, generateData } from '../actions/buttonActions'
import switchSort from '../actions/switchSort'
import {select, deselect, markSorted, pick} from '../actions/manipulateArray'

class NavigationBar extends React.Component {
    handleClickOnMenu(e) {
        let target = e.target;
        if (target.nodeName === 'SPAN') {
            target = target.parentElement;
        }
        if (!this.props.isRunning) {
            if (target.id === 'sort') {
                this.handleSortButton(target);
            } else if (target.className === 'dropdown-item') {
                this.handleClickOnDropdownMenu(target);
            } else if (target.id === 'generate-array') {
                this.props.generateData(this.props.size);
            }
        } else {
            console.log('Still running...');
        }
    }

    handleClickOnDropdownMenu(target) {
        let algorithm = target.id;
        let algoInText = target.textContent;
        target.parentElement.parentElement.childNodes[0].textContent = algoInText;
        this.props.changeAlgorithm(algorithm);
    }

    handleSortButton(target) {
        if (this.props.algorithm !== null) {
            this.props.switchSort();
            const sort = this.props.algorithm;
            sort(this.props, this.props.speed);
        } else {
            console.log('No algorithm selected');
        }
    }

    handleSlider(e) {
        if (!this.props.isRunning) {
            const size = e.target.value;
            this.props.generateData(size);
        }
    }

    render() {
        return (
            <nav className='nav-bar'>
                <div className='title'><h2>Sorting Visualizer</h2></div>
                <ul className='nav-list' onClick={e => this.handleClickOnMenu(e)}>
                    <NavItem title='Generate Array'/>
                    <NavItem title='Change Size and Speed'>
                    <div className='slider-container'>
                        <input type='range' 
                            min='50' 
                            max='250' 
                            step='1' 
                            className='slider' 
                            onChange={e => this.handleSlider(e)}/>
                    </div>
                    </NavItem>
                    <NavItem title='Sorting Algorithm'>
                        <ul className='dropdown-menu'>
                            <DropDownItem title='Bubble Sort'/>
                            <DropDownItem title='Insertion Sort' />
                            <DropDownItem title='Selection Sort'/>
                            <DropDownItem title='Quick Sort' />
                            <DropDownItem title='Merge Sort' />
                            <DropDownItem title='Heap Sort' />
                        </ul>
                    </NavItem>
                    <NavItem title='Sort'/>
                </ul>
            </nav>
        );
    }
}

function NavItem(props) {
    let title = props.title;
    let id = title.toLowerCase().split(' ').join('-');
    return (
        <li className='nav-item' id={id}>
            <span>{title}</span>
            {props.children}
        </li>);
}

function DropDownItem({title}) {
    let id = title.toLowerCase().split(' ').join('-');
    return (
    <li class='dropdown-item' id={id}>{title}</li>
    )
}

function mapStateToProps(state) {
    return {
        isRunning: state.running,
        algorithm: state.algorithm,
        data: state.data,
        size: state.size,
        colors: state.colors,
        speed: state.speed
    }
}

function mapDispatchToProps(dispatch) {
    return {
        switchSort: () => dispatch(switchSort()),
        changeAlgorithm: algorithm => dispatch(changeAlgorithm(algorithm)),
        generateData: size => dispatch(generateData(size)),
        select: (index) => dispatch(select(index)),
        deselect: (index) => dispatch(deselect(index)),
        markSorted: (index) => dispatch(markSorted(index)),
        pick: (index) => dispatch(pick(index))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);