import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_USERS } from './queries';
import styles from './styles.module.css';

const { Option } = Select;

function NewPostForm() {
  const { loading: get_users_loading, data: users_data } = useQuery(GET_USERS);

  return (
    <Form
      name='basic'
      initialValues={{ remember: true }}
      // onFinish={onFinish}
      //onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <Form.Item
        name='username'
        rules={[{ required: true, message: 'Please input title!' }]}
      >
        <Input size='large' placeholder='Title' />
      </Form.Item>

      <Form.Item name='shortDescription'>
        <Input size='large' placeholder='Short Description' />
      </Form.Item>

      <Form.Item name='description'>
        <Input.TextArea size='large' placeholder='Description' />
      </Form.Item>

      <Form.Item name='cover'>
        <Input size='large' placeholder='Cover' />
      </Form.Item>

      <Form.Item
        name='user'
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          disabled={get_users_loading}
          loading={get_users_loading}
          placeholder='Please select a user!'
          size='large'
        >
          {users_data &&
            users_data.users.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.fullName}
              </Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item className={styles.buttons}>
        <Button size='large' type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default NewPostForm;
