import {UploadOutlined} from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Upload,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import {Option} from 'antd/lib/mentions';
import React from 'react';
import PropTypes from 'prop-types';

function EduModal(props) {
  const {setIsVisible, isVisible, handleSubmit, lesson} = props;
  return (
    <Modal
      title='Add education'
      visible={isVisible}
      onOk={() => setIsVisible(!isVisible)}
      onCancel={() => setIsVisible(!isVisible)}
      width={'100%'}
      style={{top: '10vh'}}
      footer={[]}>
      <div className='content-modal'>
        <Form
          layout='vertical'
          style={{margin: '0 2px', width: '98%'}}
          onFinish={handleSubmit}>
          <Row justify={'space-between'} gutter={15}>
            <Col span={8}>
              <Form.Item name={'name_Uz'} label='Name (uz)'>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={'name_Ru'} label='Name (ru)'>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={'name_En'} label='Name (en)'>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={'space-between'} gutter={15}>
            <Col span={8}>
              <Form.Item name={'description_Uz'} label='Description (uz)'>
                <TextArea />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={'description_Ru'} label='Description (ru)'>
                <TextArea />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={'description_En'} label='Description (en)'>
                <TextArea />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name={'photo'} label='Image'>
            <Upload.Dragger>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload.Dragger>
          </Form.Item>
          <Row justify={'space-between'} gutter={15}>
            <Col span={12}>
              <Form.Item name={'langs'} label='Languages'>
                <Select mode='multiple' placeholder='Please select' allowClear>
                  {lesson.langs.map((data) => (
                    <Option key={data._id} value={data._id}>
                      {data.name_En}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>{' '}
            <Col span={12}>
              <Form.Item name={'it'} label='IT'>
                <Select mode='multiple' placeholder='Please select' allowClear>
                  {lesson.it.map((data) => (
                    <Option key={data._id} value={data._id}>
                      {data.name_En}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>{' '}
          <Row justify={'space-between'} gutter={15}>
            <Col span={12}>
              <Form.Item name={'subjects'} label='Subjects'>
                <Select mode='multiple' placeholder='Please select' allowClear>
                  {lesson.subjects.map((data) => (
                    <Select.Option key={data._id} value={data._id}>
                      {data.name_En}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>{' '}
            <Col span={12}>
              <Form.Item name={'other'} label='Others'>
                <Select mode='multiple' placeholder='Please select' allowClear>
                  {lesson.others.map((data) => (
                    <Option key={data._id} value={data._id}>
                      {data.name_En}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row justify={'space-between'} gutter={15}>
            <Col span={8}>
              <Form.Item name={'instagram'} label='Instagram'>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={'telegram'} label='Telegram'>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={'web'} label='Website'>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col span={12}>
              <Form.Item name='mainAddress' label='Main address'>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='phone' label='Phone'>
                <Select
                  mode='tags'
                  size={100}
                  placeholder='Please select'
                  style={{width: '100%'}}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name='isOnlineExists' valuePropName='checked'>
            <Checkbox>Is online exist</Checkbox>
          </Form.Item>
          <Row
            gutter={12}
            justify='end'
            style={({width: '100%'}, {type: ['number']})}>
            <Col>
              <Form.Item>
                <Button htmlType='submit' type='primary'>
                  Submit
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button type='default' onClick={() => setIsVisible(false)}>
                  Cancel
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
}

EduModal.propTypes = {
  lesson: PropTypes.object,
  setIsVisible: PropTypes.func,
  isVisible: PropTypes.bool,
  handleSubmit: PropTypes.func,
};

export default EduModal;
