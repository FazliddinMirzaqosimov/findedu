import React, {useEffect, useState} from 'react';
import {Button,Form,Modal,Input,Upload,Row,Col,Spin,Table,message,} from 'antd';
import {DeleteTwoTone, EditTwoTone, PlusCircleTwoTone, UploadOutlined} from '@ant-design/icons';
import axios from '../../../shared/AxiosInstance';
import scss from '../main.module.scss'

const Page2 = () => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [submitType, setSubmitType] = useState(true);
  const [current, setCurrent] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const [update, setUpdate] = useState(true);
  const [search, setSearch] = useState()

  useEffect(() => {
    axios.get('langs')
      .then((res) => setData(res.data.data));
  }, [update]);

  const showModal = () => {
    setModal(true);
  };

  const onOk = () => {
    setModal(false);
  };

  const onCencel = () => {
    setModal(false);
    form.resetFields();
  };

  const result = () => {
    setLoading(false);
  };

  const deleteItem = (record) => {
    setLoading(true);
    axios
      .delete(`langs/${record._id}`, {
        headers: {
          Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGUxYmU1MjNiNWZhYmM1YjUxYjc5ZCIsImlhdCI6MTY3NTYwNTUyMywiZXhwIjoxNjgzMzgxNTIzfQ.pEUX_SAIUZ2qjmPLpKz4TvXCOuyln_O84hXyNWQpn_c'}`,
        },
        data: record,
      })
      .then((res) => {
        setUpdate(!update);
        messageApi.open({
          type: 'success',
          content: 'Deleted successfully',
        });
        setLoading(false);
        console.log('Deleted', res);
      })
      .catch((err) => {
        console.log(err);
        messageApi.open({
          type: 'error',
          content: 'Something went wrong',
        });
      });
  };

  const onChange = (record) => {
    setSubmitType(false);
    setCurrent(record);
    form.setFieldsValue(record);
    showModal();
  };

  const onFinish = (data) => {
    setLoading(true);
    if (submitType) {
      const formData = new FormData();
      formData.append('name_Uz', data.name_Uz);
      formData.append('name_Ru', data.name_Ru);
      formData.append('name_En', data.name_En);
      formData.append('photo', data.photo['file']);
      axios.post(`langs`, formData, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGUxYmU1MjNiNWZhYmM1YjUxYjc5ZCIsImlhdCI6MTY3NTYwNTUyMywiZXhwIjoxNjgzMzgxNTIzfQ.pEUX_SAIUZ2qjmPLpKz4TvXCOuyln_O84hXyNWQpn_c`,
          },
        }).then((res) => {console.log(res);
          setLoading(false);
          onCencel();
          messageApi.open({
            type: 'success',
            content: 'Added successfully',
          });
          setUpdate(!update);
          console.log(res);
        })
        .catch((err) => {
          setLoading(false);
          messageApi.open({
            type: 'error',
            content: `${err}`,
          });
          console.log(err);
        });
    } else {
      const formData = new FormData();
      formData.append('name_Uz', data.name_Uz);
      formData.append('name_Ru', data.name_Ru);
      formData.append('name_En', data.name_En);
      formData.append('photo', data.photo['file']);
      axios
        .patch(`langs/${current._id}`, formData, {
          headers: {
            authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGUxYmU1MjNiNWZhYmM1YjUxYjc5ZCIsImlhdCI6MTY3NTYwNTUyMywiZXhwIjoxNjgzMzgxNTIzfQ.pEUX_SAIUZ2qjmPLpKz4TvXCOuyln_O84hXyNWQpn_c`,
          },
        })
        .then((res) => {
          setLoading(false);
          onCencel();
          messageApi.open({
            type: 'success',
            content: 'Updated successfully',
          });
          setUpdate(!update);
          console.log(res);
        })
        .catch((err) => {
          setLoading(false);
          messageApi.open({
            type: 'error',
            content: `${err}`,
          });
          console.log(err);
        });
    }
  };

  const columns = [
    {
      key: 1,
      title: 'ID',
      dataIndex: '_id',
    },
    {
      key: 2,
      title: 'Name Uz',
      dataIndex: 'name_Uz',
    },
    {
      key: 3,
      title: 'Name Ru',
      dataIndex: 'name_Ru',
    },
    {
      key: 4,
      title: 'Name En',
      dataIndex: 'name_En',
    },
    {
      key: 5,
      title: 'URL',
      dataIndex: 'photo',
    },
    {
      key: 6,
      title: 'Actions',
      render: (record) => {
        return (
          <>
            <EditTwoTone
              className={scss.btn}
              onClick={() => onChange(record)}
            />
            <DeleteTwoTone
              onClick={() => deleteItem(record)}
              className={scss.btn}
              twoToneColor='red'
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      {contextHolder}
      <Row gutter={15}>
        <Col span={4.5}>
          <h1 className={scss.title}>Languages list</h1>
        </Col>
        <Col span={14}>
          <Input placeholder="Search..." className={scss.search} onChange={(e) => setSearch(e.target.value)} />
        </Col>
        <Col span={5}>
          <Button
            className={scss.addBtn}
            icon={<PlusCircleTwoTone />}
            type='primary'
            onClick={() => [showModal(), setSubmitType(true)]}>
            Add language
          </Button>
        </Col>
      </Row>

      <Modal
        title='Enter languae name'
        width={800}
        centered={true}
        footer={null}
        visible={modal}
        onCancel={onCencel}
        onOk={onOk}>
        <Spin spinning={loading}>
          <Form
            onKeyPress={(e) => {
              if (e.key === 'Enter') form.submit();
            }}
            onFinish={onFinish}
            form={form}
            onFinishFailed={result}
            layout='vertical'
            className={scss.form}>
            <Form.Item
              name='name_Uz'
              label='Name in Uzbek'
              rules={[
                {required: true, message: 'Please enter the name in Uzbek'},
                {whitespace: true, message: 'Please enter Valid name'},
              ]}
              hasFeedback>
              <Input placeholder='Enter the name in Uzbek' />
            </Form.Item>

            <Form.Item
              name='name_Ru'
              label='Name in Russian'
              rules={[
                {required: true, message: 'Please enter the name in Russian'},
                {whitespace: true, message: 'Please enter Valid name'},
              ]}
              hasFeedback>
              <Input placeholder='Enter the name in Russian' />
            </Form.Item>

            <Form.Item
              name='name_En'
              label='Name in English'
              rules={[
                {required: true, message: 'Please enter the name in English'},
                {whitespace: true, message: 'Please enter Valid name'},
              ]}
              hasFeedback>
              <Input placeholder='Enter the name in English' />
            </Form.Item>

            <Form.Item
              name='photo'
              label="Image"
              rules={[{required: true, message: 'Please upload photo'}]}>
              <Upload.Dragger
                maxCount={1}
                accept='image/png, image/jpeg'
                beforeUpload={(file) => {
                  console.log({file});
                  return false;
                }}>
                Drag file here OR <br />
                <Button icon={<UploadOutlined />}
                className={scss.upload}>
                  Click Upload
                </Button>
              </Upload.Dragger>
            </Form.Item>

            <Form.Item className={scss.buttons}>
              <Button
                danger
                htmlType='button'
                onClick={onCencel}
                className={scss.button}
                >
                Cencel
              </Button>
              <Button
                type='primary'
                className={scss.button}
                htmlType='submit'>
                {submitType ? 'Add' : 'Update'}
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>

      <Table columns={columns} dataSource={data}></Table>
    </>
  );
};

export default Page2;
