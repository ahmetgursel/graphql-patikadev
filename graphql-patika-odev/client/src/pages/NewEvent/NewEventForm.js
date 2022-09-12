import React from 'react';
import { Button, Form, Input, Select, message } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_ALL_USER, GET_ALL_LOCATION, NEW_EVENT_MUTATION } from './queries';
import styles from './styles.module.css';

const { Option } = Select;

function NewEventForm() {
  const navigate = useNavigate();

  const { loading: get_users_loading, data: users_data } = useQuery(GET_ALL_USER);
  const { loading: get_locations_loading, data: locations_data } = useQuery(GET_ALL_LOCATION);
  const [saveEvent, { loading: save_event_loading }] = useMutation(NEW_EVENT_MUTATION);

  const handleSubmit = async (values) => {
    try {
      await saveEvent({
        variables: {
          data: values,
        },
      });
      message.success('Event saved!', 4);
      navigate('/');
    } catch (e) {
      console.log(e);
      message.error('Post not saved!', 10);
    }
  };

  return (
    <Form
      name='basic'
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
      autoComplete='off'
    >
      <Form.Item name='title' rules={[{ required: true, message: 'Please input title!' }]}>
        <Input disabled={save_event_loading} size='large' placeholder='Title' />
      </Form.Item>

      <Form.Item name='desc'>
        <Input disabled={save_event_loading} size='large' placeholder='Description' />
      </Form.Item>

      <Form.Item name='date'>
        <Input disabled={save_event_loading} size='large' placeholder='Date' />
      </Form.Item>

      <Form.Item name='from'>
        <Input disabled={save_event_loading} size='large' placeholder='From' />
      </Form.Item>

      <Form.Item name='to'>
        <Input disabled={save_event_loading} size='large' placeholder='To' />
      </Form.Item>

      <Form.Item
        name='user_id'
        rules={[
          {
            required: true,
            message: 'Please select user!',
          },
        ]}
      >
        <Select
          disabled={get_users_loading || save_event_loading}
          loading={get_users_loading}
          placeholder='Please select a user!'
          size='large'
        >
          {users_data &&
            users_data.users.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.username}
              </Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item
        name='location_id'
        rules={[
          {
            required: true,
            message: 'Please select location!',
          },
        ]}
      >
        <Select
          disabled={get_locations_loading}
          loading={get_locations_loading}
          placeholder='Please select a location!'
          size='large'
        >
          {locations_data &&
            locations_data.locations.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item className={styles.buttons}>
        <Button loading={save_event_loading} size='large' type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default NewEventForm;
