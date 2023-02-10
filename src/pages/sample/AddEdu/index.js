import {Button, Col, Form, Input, message, Row, Spin} from 'antd';
import React, {useEffect, useState} from 'react';
import './index.scss';
import EduTable from './EduTable';
import EduModal from './EduModal';
import jwtAxios from '@crema/services/auth/jwt-auth/jwt-api';
import {BiRefresh} from 'react-icons/bi';

const Page1 = () => {
  // console.log(jwtAxios.defaults.headers.common['Authorization']);
  // jwtAxios.defaults.headers.common['Authorization'] =
  //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGUxYmU1MjNiNWZhYmM1YjUxYjc5ZCIsImlhdCI6MTY3NTYwNTUyMywiZXhwIjoxNjgzMzgxNTIzfQ.pEUX_SAIUZ2qjmPLpKz4TvXCOuyln_O84hXyNWQpn_c';
  const [isVisible, setIsVisible] = useState(false);
  const [edus, setEdus] = useState([]);
  const [sotedEdus, setSortdEdus] = useState([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState('');
  const [loading, setLoading] = useState({table: true, modal: false});
  const [lesson, setLesson] = useState({
    langs: [],
    subjects: [],
    it: [],
    other: [],
  });

  const [form] = Form.useForm();

  const getEduCenters = async () => {
    setLoading({...loading, table: true});
    setEdus((await jwtAxios.get(`edu`)).data.data);
    setLoading({...loading, table: false});
  };
  useEffect(() => {
    // setSortdEdus([]);
    // console.log(edus);
    setSortdEdus(
      edus.filter(
        (edu) =>
          edu.name_En?.toLowerCase().includes(input.toLowerCase()) ||
          edu.name_Uz?.toLowerCase().includes(input.toLowerCase()) ||
          edu.name_Ru?.toLowerCase().includes(input.toLowerCase()) ||
          edu.description_En?.toLowerCase().includes(input.toLowerCase()) ||
          edu.description_Ru?.toLowerCase().includes(input.toLowerCase()) ||
          edu.description_Uz?.toLowerCase().includes(input.toLowerCase()),
      ),
    );
  }, [input, edus]);

  useEffect(async () => {
    const [
      {
        data: {data: langs},
      },
      {
        data: {data: subjects},
      },
      {
        data: {data: it},
      },
      {
        data: {data: other},
      },
    ] = await Promise.all([
      jwtAxios.get(`langs`),
      jwtAxios.get(`subjects`),
      jwtAxios.get(`it`),
      jwtAxios.get(`other`),
    ]);

    setLesson({
      langs,
      subjects,
      it,
      other,
    });
    getEduCenters();
  }, []);

  const postEdu = (data) => {
    const formData = new FormData();
    data.photo?.['file'] && formData.append('photo', data.photo['file']);
    data.name_Uz && formData.append('name_Uz', data.name_Uz);
    data.name_En && formData.append('name_En', data.name_En);
    data.name_Ru && formData.append('name_Ru', data.name_Ru);
    data.mainAddress && formData.append('mainAddress', data.mainAddress);
    formData.append('langs', JSON.stringify(data.langs || []));
    formData.append('it', JSON.stringify(data.it || []));
    formData.append('other', JSON.stringify(data.other || []));
    formData.append('subjects', JSON.stringify(data.subjects || []));
    data.phone?.[0] && formData.append('phone', data.phone.join());
    data.description_Uz &&
      formData.append('description_Uz', data.description_Uz);
    data.description_En &&
      formData.append('description_En', data.description_En);
    data.description_Ru &&
      formData.append('description_Ru', data.description_Ru);
    formData.append('isOnlineExists', !!data.isOnlineExists);
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

    console.log(data);
    console.log([...formData]);
    setLoading({...loading, modal: true});

    if (editId) {
      jwtAxios
        .patch(`edu/${editId}`, formData)
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
        .post(`edu`, formData)
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
    }
  };
  function editBtn(edu) {
    console.log(edu);
    form.resetFields();

    const logEdu = JSON.parse(JSON.stringify(edu));
    logEdu.phone = edu.phone?.[0]?.split(',');
    logEdu.langs = edu.langs.map((lang) => lang._id);
    logEdu.other = edu.other.map((other) => other._id);
    logEdu.subjects = edu.subjects.map((subject) => subject._id);
    logEdu.it = edu.it.map((it) => it._id);
    edu.links.forEach((link) => {
      logEdu[link.name] = link.link;
    });
    const fields = [];
    for (const key in logEdu) {
      fields.push({name: key, value: logEdu[key]});
    }
    form.setFields(fields);
    setEditId(edu._id);
    setIsVisible(true);
  }
  return (
    <div>
      <h1>Educations</h1>
      <Row justify='space-between' align='center' gutter={12}>
        <Col span={18}>
          <Input
            block
            placeholder='Search...'
            onChange={(e) => setInput(e.target.value)}
          />
        </Col>
        <Col span={2}>
          <Button
            icon={<BiRefresh size={'large'} />}
            block
            onClick={getEduCenters}></Button>
        </Col>{' '}
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
          editBtn={editBtn}
          edus={sotedEdus}></EduTable>
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
