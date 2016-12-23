import React, { PropTypes } from 'react'
import { createForm } from 'rc-form';
import { is } from 'immutable';
import { List, InputItem, Switch } from 'antd-mobile';


let Banbu = React.createClass({

    propTypes: {
        form: PropTypes.object,
    },
    render(){
        let { getFieldProps } = this.props.form;

        return (
            <List>
                <List.Item
                    extra={<Switch
                        {...getFieldProps('Switch1', {
                            initialValue: true,
                            valuePropName: 'checked',
                        })}
                    />}
                >默认开</List.Item>
                <InputItem
                    placeholder="请输入"
                    data-seed="logId"
                >标题</InputItem>
            </List>
        )
    }
})

Banbu = createForm()(Banbu)

export default Banbu