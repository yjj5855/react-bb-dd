import React from 'react'
import Router, { Link, Route }  from 'react-router'
import { NavBar, Icon, TabBar } from 'antd-mobile'
// import PhotoGrid from '../../components/PhotoGrid'
import Banbu from '../../components/Banbu'

let Home = React.createClass({

    getInitialState() {
        return {
            selectedTab: 'redTab',
            hidden: false,
        }
    },

    axiosAction(){
        console.log(this)
        this.props.getConfig()
            .then((data)=>{
                console.log(data)
            })
            .catch((err)=>{
                console.error(err)
            })
    },


    render(){

        return (
            <div>

                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                    <TabBar.Item
                        title="班步"
                        key="班步"
                        icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/UNQhIatjpNZHjVf.png' }}
                        selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/HLkBvJOKnmOfBPO.png' }}
                        selected={this.state.selectedTab === 'blueTab'}
                        badge={1}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'blueTab',
                            });
                        }}
                        data-seed="logId"
                    >
                        <h1>班步</h1>
                        <Banbu />
                    </TabBar.Item>
                    <TabBar.Item
                        icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/UNQhIatjpNZHjVf.png' }}
                        selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/HLkBvJOKnmOfBPO.png' }}
                        title="首页"
                        key="首页"
                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'redTab',
                            });
                        }}
                        data-seed="logId1"
                    >
                        <h1>首页</h1>
                    </TabBar.Item>
                    <TabBar.Item
                        icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/cKhfyLTszUeFARPgfokz.png' }}
                        selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/bqUXyjiOyKrXRfiIZVsZ.png' }}
                        title="我的"
                        key="我的"
                        selected={this.state.selectedTab === 'yellowTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'yellowTab',
                            });
                        }}
                    >
                        <h1>我的</h1>
                    </TabBar.Item>
                </TabBar>
            </div>

        )
    }
});

export default Home;