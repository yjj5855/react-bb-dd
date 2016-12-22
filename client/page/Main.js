import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import style from '../styles/router.css'
import '../styles/style.scss'
import { is } from 'immutable';


const Main = React.createClass({

    shouldComponentUpdate: function(nextProps, nextState) {
        return !(this.props === nextProps || is(this.props, nextProps)) ||
            !(this.state === nextState || is(this.state, nextState));
    },
    componentWillMount() {
        document.body.style.margin = "0px";
        // 这是防止页面被拖拽
        document.body.addEventListener('touchmove', (ev) => {
            ev.preventDefault();
        });
    },

    render(){
        let direction = window.direction;
        let routerTransition = 'transitionWrapper-'+(direction === 'forward' ? 'in' : 'out')
        console.log(routerTransition)
        return (
            <CSSTransitionGroup
                transitionName={routerTransition}
                component="div"
                className={style[routerTransition]}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>

                <div key={this.props.location.pathname}
                     style={{position:"absolute",left: 0,right: 0,top:0,bottom:0,overflow:'auto',background:'#fff'}}
                >
                    {React.cloneElement(this.props.children, this.props)}
                </div>
            </CSSTransitionGroup>
        )
    }
});

export default Main;