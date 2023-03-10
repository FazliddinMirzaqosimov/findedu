import {Button, message, Modal, Space, Spin, Table} from 'antd';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {BsCheckLg} from 'react-icons/bs';
import {ImCross} from 'react-icons/im';
import jwtAxios from '@crema/services/auth/jwt-auth/jwt-api';
import parse from 'html-react-parser';
import {DeleteOutlined, EditTwoTone} from '@ant-design/icons';

function EduTable(props) {
  const [eduId, setEduId] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const {editBtn, getEduCenters, edus} = props;

  const deleteButton = (id) => {};
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
      title: 'Image',
      dataIndex: 'photo',
      key: 'photo',
      render: (text) => {
        console.log(text);
        return !text ? (
          ''
        ) : (
          <img
            src={`http://18.216.178.179/api/v1/img/${text}`}
            style={{height: 40, width: 40, objectFit: 'cover'}}
          />
        );
      },
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
      render: (_, edu) => {
        return (
          <Space>
            <Button
              onClick={() => editBtn(edu)}
              icon={<EditTwoTone />}></Button>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                setVisible(true);
                setEduId(edu._id);
              }}></Button>
          </Space>
        );
      },
    },
  ];
  edus.forEach((el, index) => (el.key = index));
  return (
    <>
      <Table
        columns={columns}
        dataSource={edus}
        expandable={{
          expandedRowRender: (record) =>
            record.description_En && (
              <p
                style={{
                  margin: '10px 40px',
                }}>
                {parse(record.description_En)}
              </p>
            ),
        }}
      />
      <Modal
        visible={visible}
        onOk={() => {
          setLoading(true);
          jwtAxios
            .delete(`edu/${eduId}`)
            .then(() => {
              getEduCenters();
              setVisible(false);
              setLoading(false);
            })
            .catch(() => {
              message.error('Cannot delete this Edu Center', 3);
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
