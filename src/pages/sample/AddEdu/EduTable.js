import {Button, Modal, Space, Spin, Table} from 'antd';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {API_URL} from 'shared/constants/ActionTypes';
import axios from 'axios';
import {BsCheckLg} from 'react-icons/bs';
import {ImCross} from 'react-icons/im';

function EduTable(props) {
  const [eduId, setEduId] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const {editBtn, getEduCenters, token, edus} = props;

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name_En',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },

    {
      title: 'Address',
      dataIndex: 'mainAddress',
      key: 'address',
    },
    {
      title: 'Online',
      dataIndex: 'isOnlineExists',
      key: 'online',
      render: (isOnline) => (isOnline ? <BsCheckLg /> : <ImCross />),
    },
    {
      title: 'Action',
      key: 'action',
      render: (edu) => (
        <Space>
          <Button onClick={() => editBtn(edu)}>Edit</Button>
          <Button
            danger
            onClick={() => {
              setVisible(true);
              setEduId(edu._id);
            }}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  edus.forEach((el, index) => (el.key = index));
  return (
    <>
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
      <Modal
        visible={visible}
        onOk={() => {
          setLoading(true);
          axios
            .delete(`${API_URL}api/v1/edu/${eduId}`, {
              headers: {
                Authorization: token,
              },
            })
            .then(() => {
              getEduCenters();
              setVisible(false);
              setLoading(false);
            });
        }}
        onCancel={() => setVisible(false)}>
        <Spin spinning={loading}>
          <p style={{margin: 30}}>
            Are you sure you wanna delete this edu center?
          </p>
        </Spin>
      </Modal>
    </>
  );
}
EduTable.propTypes = {
  edus: PropTypes.array,
  editBtn: PropTypes.func,
  deleteBtn: PropTypes.func,
};

export default EduTable;
