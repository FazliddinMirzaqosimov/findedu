import React, {useEffect, useState} from 'react';
import {
  Button,
  Form,
  Modal,
  Input,
  Upload,
  Row,
  Col,
  Spin,
  Table,
  message,
  Select,
} from 'antd';
import {
  DeleteTwoTone,
  EditTwoTone,
  PlusCircleTwoTone,
  UploadOutlined,
  ExclamationCircleTwoTone,
} from '@ant-design/icons';
import axios from '@crema/services/auth/jwt-auth/jwt-api';
import scss from '../main.module.scss';
// axios.defaults.headers.common['Authorization'] =
//   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGUxYmU1MjNiNWZhYmM1YjUxYjc5ZCIsImlhdCI6MTY3NTYwNTUyMywiZXhwIjoxNjgzMzgxNTIzfQ.pEUX_SAIUZ2qjmPLpKz4TvXCOuyln_O84hXyNWQpn_c';

const Template = ({url, title}) => {
  const [modal, setModal] = useState({modal: false, delete: false});
  const [loading, setLoading] = useState({modal: false, table: true});
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [submitType, setSubmitType] = useState(true);
  const [current, setCurrent] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const [update, setUpdate] = useState(true);
  const [search, setSearch] = useState('');
  const [lang, setLang] = useState('uz');
  const {confirm} = Modal;

  useEffect(() => {
    axios.get(`${url}`).then((res) => {
      setLoading({...loading, table: false});
      setData(res.data.data);
    });
  }, [update]);

  const showModal = () => {
    setModal({...modal, modal: true});
  };

  const onOk = () => {
    setModal({...modal, modal: false});
  };

  const onCencel = () => {
    setModal({...modal, modal: false});
    form.resetFields();
  };

  const result = () => {
    setLoading({...loading, modal: false});
  };

  const deleteItem = (record) => {
    setLoading({...loading, table: true});
    axios
      .delete(`${url}/${record._id}`, {
        data: record,
      })
      .then((res) => {
        setUpdate(!update);
        setLoading({...loading, table: false});
        messageApi.open({
          type: 'success',
          content: 'Deleted successfully',
        });
        console.log('Deleted', res);
      })
      .catch((err) => {
        console.log(err);
        setLoading({...loading, table: false});
        messageApi.open({
          type: 'error',
          content: 'Something went wrong',
        });
      });
  };

  const showDeleteConfirm = (record) => {
    confirm({
      title: 'Are you sure to delete this?',
      icon: <ExclamationCircleTwoTone twoToneColor='red' />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteItem(record);
      },
      onCancel() {
        setModal({...modal, delete: false});
      },
    });
  };

  const onChange = (record) => {
    setSubmitType(false);
    setCurrent(record);
    form.setFieldsValue(record);
    showModal();
  };

  const onFinish = (data) => {
    setLoading({...loading, modal: true});
    if (submitType) {
      const formData = new FormData();
      data.name_Uz && formData.append('name_Uz', data.name_Uz);
      data.name_Ru && formData.append('name_Ru', data.name_Ru);
      data.name_En && formData.append('name_En', data.name_En);
      data.photo && formData.append('photo', data.photo['file']);
      axios
        .post(`${url}`, formData)
        .then((res) => {
          console.log(res);
          setLoading({...loading, modal: false});
          onCencel();
          messageApi.open({
            type: 'success',
            content: 'Added successfully',
          });
          setUpdate(!update);
          console.log(res);
        })
        .catch((err) => {
          setLoading({...loading, modal: false});
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
        .patch(`${url}/${current._id}`, formData)
        .then((res) => {
          setLoading({...loading, modal: false});
          onCencel();
          messageApi.open({
            type: 'success',
            content: 'Updated successfully',
          });
          setUpdate(!update);
          console.log(res);
        })
        .catch((err) => {
          setLoading({...loading, modal: false});
          messageApi.open({
            type: 'error',
            content: `${err}`,
          });
          console.log(err);
        });
    }
  };

  const setLanguage = (value) => {
    setLang(value);
  };

  const columns = [
    {
      key: 1,
      title: 'ID',
      dataIndex: '_id',
    },
    {
      key: 2,
      title: 'Name(Uz)',
      dataIndex: 'name_Uz',
    },
    {
      key: 3,
      title: 'Name(Ru)',
      dataIndex: 'name_Ru',
    },
    {
      key: 4,
      title: 'Name(En)',
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
              onClick={() => showDeleteConfirm(record)}
              className={scss.btn}
              twoToneColor='red'
            />
          </>
        );
      },
    },
  ];

  if (lang == 'uz') {
    columns[1] = {
      ...columns[1],
      filteredValue: [search.toLocaleLowerCase()],
      onFilter: (value, record) => {
        return String(record.name_Uz).toLocaleLowerCase().includes(value);
      },
    };
  } else if (lang == 'ru') {
    columns[2] = {
      ...columns[2],
      filteredValue: [search.toLocaleLowerCase()],
      onFilter: (value, record) => {
        return String(record.name_Ru).toLocaleLowerCase().includes(value);
      },
    };
  } else {
    columns[3] = {
      ...columns[3],
      filteredValue: [search.toLocaleLowerCase()],
      onFilter: (value, record) => {
        return String(record.name_En).toLocaleLowerCase().includes(value);
      },
    };
  }

  return (
    <>
      {contextHolder}
      <Row gutter={15}>
        <Col span={5}>
          <h1 className={scss.title}>{title} list</h1>
        </Col>
        <Col span={14} className={scss.center}>
          <Input
            allowClear
            placeholder='Search by name. . .'
            className={scss.search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            className={scss.select}
            defaultValue='UZ'
            onChange={setLanguage}
            options={[
              {value: 'ru', label: 'RU'},
              {value: 'en', label: 'EN'},
            ]}
          />
        </Col>
        <Col span={5}>
          <Button
            className={scss.addBtn}
            icon={<PlusCircleTwoTone />}
            type='primary'
            onClick={() => [showModal(), setSubmitType(true)]}>
            Add {title}
          </Button>
        </Col>
      </Row>

      <Modal
        title='Enter languae name'
        width={800}
        centered={true}
        footer={null}
        visible={modal.modal}
        onCancel={onCencel}
        onOk={onOk}>
        <Spin spinning={loading.modal}>
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
              ]}
              hasFeedback>
              <Input placeholder='Enter the name in Uzbek' />
            </Form.Item>

            <Form.Item
              name='name_Ru'
              label='Name in Russian'
              rules={[
                {required: true, message: 'Please enter the name in Russian'},
              ]}
              hasFeedback>
              <Input placeholder='Enter the name in Russian' />
            </Form.Item>

            <Form.Item
              name='name_En'
              label='Name in English'
              rules={[
                {required: true, message: 'Please enter the name in English'},
              ]}
              hasFeedback>
              <Input placeholder='Enter the name in English' />
            </Form.Item>

            <Form.Item
              name='photo'
              label='Image'
              rules={[{required: true, message: 'Please upload photo'}]}>
              <Upload.Dragger
                listType='picture'
                maxCount={1}
                accept='image/png, image/jpeg'
                beforeUpload={(file) => {
                  console.log({file});
                  return false;
                }}>
                Drag file here OR <br />
                <Button icon={<UploadOutlined />} className={scss.upload}>
                  Click to Upload
                </Button>
              </Upload.Dragger>
            </Form.Item>

            <Form.Item className={scss.buttons}>
              <Button
                danger
                htmlType='button'
                onClick={onCencel}
                className={scss.button}>
                Cencel
              </Button>
              <Button type='primary' className={scss.button} htmlType='submit'>
                {submitType ? 'Add' : 'Update'}
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>

      <Spin spinning={loading.table}>
        <Table columns={columns} dataSource={data}></Table>
      </Spin>
    </>
  );
};

export default Template;
