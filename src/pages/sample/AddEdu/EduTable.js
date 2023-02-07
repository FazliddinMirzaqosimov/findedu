import {Button, Checkbox, Space, Table} from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

function EduTable(props) {
  console.log(props);
  const {editBtn, deleteBtn, edus} = props;
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name_En',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Online',
      dataIndex: 'isOnlineExist',
      key: 'name',
      render: (text) => <Checkbox value={text} disabled></Checkbox>,
    },
    {
      title: 'Address',
      dataIndex: 'mainAddress',
      key: 'name',
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: 'name',
      render: (id) => (
        <Space>
          <Button onClick={() => editBtn(id)}>Edit</Button>
          <Button danger onClick={() => deleteBtn(id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={edus}
      expandable={{
        expandedRowRender: (record) => (
          <p
            style={{
              margin: 0,
            }}>
            {record.description_En}
          </p>
        ),
        rowExpandable: (record) => record.name !== 'Not Expandable',
      }}
    />
  );
}
EduTable.propTypes = {
  edus: PropTypes.array,
  editBtn: PropTypes.func,
  deleteBtn: PropTypes.func,
};

export default EduTable;
