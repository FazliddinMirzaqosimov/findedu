import {Button, Col, Form, Input, message, Row, Spin} from 'antd';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {API_URL} from 'shared/constants/ActionTypes';
import './index.scss';
import EduTable from './EduTable';
import EduModal from './EduModal';

const Page1 = () => {
  const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGUxYmU1MjNiNWZhYmM1YjUxYjc5ZCIsImlhdCI6MTY3NTYwNTUyMywiZXhwIjoxNjgzMzgxNTIzfQ.pEUX_SAIUZ2qjmPLpKz4TvXCOuyln_O84hXyNWQpn_c`;
  const [isVisible, setIsVisible] = useState(false);
  const [edus, setEdus] = useState([]);
  const [loading, setLoading] = useState({table: true, modal: false});
  const [lesson, setLesson] = useState({
    langs: [],
    subjects: [],
    it: [],
    others: [],
  });
  const [form] = Form.useForm();

  const getEduCenters = async () => {
    setEdus((await axios.get(`${API_URL}api/v1/edu/`)).data.data);
    setLoading({...loading, table: false});
  };

  useEffect(async () => {
    const categories = {
      langs: (await axios.get(`${API_URL}api/v1/langs`)).data.data,
      subjects: (await axios.get(`${API_URL}api/v1/it`)).data.data,
      it: (await axios.get(`${API_URL}api/v1/other`)).data.data,
      others: (await axios.get(`${API_URL}api/v1/subjects`)).data.data,
    };
    setLesson(categories);
    getEduCenters();
  }, []);

  // const patchEdu = (data) => {
  //   console.log(data);
  // };
  const postEdu = (data) => {
    const formData = new FormData();
    formData.append('photo', data.photo?.file);
    formData.append('description_Uz', data.description_Uz);
    formData.append('description_En', data.description_En);
    formData.append('description_Ru', data.description_Ru);
    formData.append('name_Uz', data.name_Uz);
    formData.append('name_En', data.name_En);
    formData.append('name_Ru', data.name_Ru);
    formData.append('langs', data.langs || []);
    formData.append('it', data.it || []);
    formData.append('other', data.other || []);
    formData.append('subjects', data.subjects || []);
    formData.append('phone', [data.phone?.join()]);
    formData.append('links', [
      ...(data.telegram
        ? [
            {
              name: 'telegram',
              link: data.telegram,
            },
          ]
        : []),
      ...(data.instagram
        ? [
            {
              name: 'instagram',
              link: data.instagram,
            },
          ]
        : []),
      ...(data.web
        ? [
            {
              name: 'web',
              link: data.web,
            },
          ]
        : []),
    ]);
    console.log(data.photo);

    console.log(Object.fromEntries(formData.entries()));
    setLoading({...loading, modal: true});
    axios
      .post(`${API_URL}api/v1/edu`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        form.resetFields();
        getEduCenters();
        setLoading({...loading, modal: false});
        setIsVisible(false);
        message.success('Added succesfuly', 3);
      })
      .catch((err) => {
        console.dir(err);
        setLoading({...loading, modal: false});
        message.error("Didn't post", 3);
      });
  };
  function editBtn(edu) {
    console.log(edu);
    edu.phone = edu.phone[0].split(',');
    edu.langs = [];
    const fields = [];
    for (const key in edu) {
      if (edu[key] === 'undefined' || edu[key] === '[]') continue;
      fields.push({name: key, value: edu[key]});
    }
    form.setFields(fields);

    setIsVisible(true);
  }
  return (
    <div>
      <Row justify='space-between' align='center' gutter={12}>
        <Col span={20}>
          <Input block placeholder='Search...' />
        </Col>
        <Col span={4}>
          <Button
            type='primary'
            block
            onClick={() => {
              form.resetFields();
              setIsVisible(true);
            }}>
            Add
          </Button>
        </Col>
      </Row>
      <Spin spinning={loading.table}>
        <EduTable
          getEduCenters={getEduCenters}
          token={token}
          editBtn={editBtn}
          edus={edus}></EduTable>
      </Spin>
      <EduModal
        form={form}
        handleSubmit={postEdu}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        lesson={lesson}
        setLoading={setLoading}
        spinning={loading}></EduModal>
    </div>
  );
};

export default Page1;
