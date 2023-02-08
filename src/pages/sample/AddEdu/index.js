import {Button, Col, Form, Input, message, Row, Spin} from 'antd';
import React, {useEffect, useState} from 'react';
import './index.scss';
import EduTable from './EduTable';
import EduModal from './EduModal';
import jwtAxios from '@crema/services/auth/jwt-auth/jwt-api';

const Page1 = () => {
  const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGUxYmU1MjNiNWZhYmM1YjUxYjc5ZCIsImlhdCI6MTY3NTYwNTUyMywiZXhwIjoxNjgzMzgxNTIzfQ.pEUX_SAIUZ2qjmPLpKz4TvXCOuyln_O84hXyNWQpn_c`;
  const [isVisible, setIsVisible] = useState(false);
  const [edus, setEdus] = useState([]);
  const [editId, setEditId] = useState('');
  const [loading, setLoading] = useState({table: true, modal: false});
  const [lesson, setLesson] = useState({
    langs: [],
    subjects: [],
    it: [],
    others: [],
  });

  const [form] = Form.useForm();

  const getEduCenters = async () => {
    setEdus((await jwtAxios.get(`edu`)).data.data);
    setLoading({...loading, table: false});
  };

  useEffect(async () => {
    const categories = {
      langs: (await jwtAxios.get(`langs`)).data.data,
      subjects: (await jwtAxios.get(`it`)).data.data,
      it: (await jwtAxios.get(`other`)).data.data,
      others: (await jwtAxios.get(`subjects`)).data.data,
    };
    setLesson(categories);
    getEduCenters();
  }, []);

  // const patchEdu = (data) => {
  //   console.log(data);
  // };
  const postEdu = (data) => {
    const formData = new FormData();
    data.photo['file'] && formData.append('photo', data.photo['file']);
    data.description_Uz &&
      formData.append('description_Uz', data.description_Uz);
    data.description_En &&
      formData.append('description_En', data.description_En);
    data.description_Ru &&
      formData.append('description_Ru', data.description_Ru);
    data.name_Uz && formData.append('name_Uz', data.name_Uz);
    data.name_En && formData.append('name_En', data.name_En);
    data.name_Ru && formData.append('name_Ru', data.name_Ru);
    data.langs[0] && formData.append('langs', JSON.stringify(data.langs));
    data.it[0] && formData.append('it', JSON.stringify(data.it));
    data.other[0] && formData.append('other', JSON.stringify(data.other));
    data.subjects[0] &&
      formData.append('subjects', JSON.stringify(data.subjects));
    data.phone[0] && formData.append('phone', [data.phone?.join()]);
    data.telegram &&
      formData.append(
        'links',
        JSON.stringify({name: 'telegam', link: data.telegram}),
      );
    data.instagram &&
      formData.append(
        'links',
        JSON.stringify({name: 'instagram', link: data.instagram}),
      );
    data.web &&
      formData.append('links', JSON.stringify({name: 'web', link: data.web}));

    data.photo['file'] &&
      formData.append(
        'links',
        JSON.stringify([
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
        ]),
      );

    console.log(formData.getAll('links'));
    console.log([...formData]);
    setLoading({...loading, modal: true});

    console.log(editId);
    if (editId) {
      jwtAxios
        .patch(`edu/${editId}`, formData, {
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
        .catch(() => {
          setLoading({...loading, modal: false});
          message.error("Didn't post", 3);
        });
    } else {
      jwtAxios
        .post(`edu`, formData, {
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
        .catch(() => {
          setLoading({...loading, modal: false});
          message.error("Didn't post", 3);
        });
    }
  };
  function editBtn(edu) {
    console.log(edu);
    edu.phone = edu.phone?.[0] && edu.phone[0].split(',');
    edu.langs = [];
    edu.links.forEach((link) => {
      edu[link.name] = link.link;
    });
    const fields = [];
    for (const key in edu) {
      if (edu[key] === 'undefined' || edu[key] === '[]') continue;
      fields.push({name: key, value: edu[key]});
    }
    form.setFields(fields);
    setEditId(edu._id);
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
              setEditId('');
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
