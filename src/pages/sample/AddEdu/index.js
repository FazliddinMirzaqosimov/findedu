import {Button, Col, Input, Row} from 'antd';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {API_URL} from 'shared/constants/ActionTypes';
import './index.scss';
import EduTable from './EduTable';
import EduModal from './EduModal';

const Page1 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [edus, setEdus] = useState([]);
  const [lesson, setLesson] = useState({
    langs: [],
    subjects: [],
    it: [],
    others: [],
  });

  function editBtn(id) {
    console.log(id);
  }
  function deleteBtn() {}

  useEffect(async () => {
    const categories = {
      langs: (await axios.get(`${API_URL}api/v1/langs`)).data.data,
      subjects: (await axios.get(`${API_URL}api/v1/it`)).data.data,
      it: (await axios.get(`${API_URL}api/v1/other`)).data.data,
      others: (await axios.get(`${API_URL}api/v1/subjects`)).data.data,
    };
    setEdus((await axios.get(`${API_URL}api/v1/edu/`)).data.data);
    setLesson(categories);
  }, []);

  const handleSubmit = (data) => {
    console.log(data);
    axios.post(`${API_URL}api/v1/edu`, data).then((res) => console.log(res));
  };
  return (
    <div>
      <Row justify='space-between' align='center' gutter={12}>
        <Col span={20}>
          <Input block placeholder='Search...' />
        </Col>
        <Col span={4}>
          <Button type='primary' block onClick={() => setIsVisible(true)}>
            Add
          </Button>
        </Col>
      </Row>
      <EduTable editBtn={editBtn} deleteBtn={deleteBtn} edus={edus}></EduTable>
      <EduModal
        handleSubmit={handleSubmit}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        lesson={lesson}></EduModal>
    </div>
  );
};

export default Page1;
