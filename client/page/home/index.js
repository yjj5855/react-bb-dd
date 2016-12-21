import React from 'react'
import Router, { Link, Route }  from 'react-router'
import { NavBar, Icon, TabBar } from 'antd-mobile'
import PhotoGrid from '../../components/PhotoGrid'

let Home = React.createClass({

    getInitialState() {
        return {
            selectedTab: 'redTab',
            hidden: false,
        }
    },

    render(){

        return (
            <div>
                <NavBar leftContent="返回" mode="light" onLeftClick={() => console.log('onLeftClick')}
                        rightContent={[<Icon key="0" type="search" />, <Icon key="1" type="ellipsis" />]}
                        style={{position:'fixed',width:'100%'}}>
                    <Link to="/">Reduxstagram</Link>
                </NavBar>

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
                        <PhotoGrid {...this.props} />
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
                    </TabBar.Item>
                </TabBar>
            </div>

        )
    }
});

export default Home;