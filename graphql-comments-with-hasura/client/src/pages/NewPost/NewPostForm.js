import { Button, Form, Input, Select, message } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_USERS, NEW_POST_MUTATION } from './queries';
import styles from './styles.module.css';

const { Option } = Select;

function NewPostForm() {
  const navigate = useNavigate();
  const [savePost, { loading }] = useMutation(NEW_POST_MUTATION);
  const { loading: get_users_loading, data: users_data } = useQuery(GET_USERS);

  const handleSubmit = async (values) => {
    try {
      await savePost({
        variables: {
          data: values,
        },
      });

      message.success('Post saved!', 4);
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
        <Input disabled={loading} size='large' placeholder='Title' />
      </Form.Item>

      <Form.Item name='short_description'>
        <Input disabled={loading} size='large' placeholder='Short Description' />
      </Form.Item>

      <Form.Item name='description'>
        <Input.TextArea disabled={loading} size='large' placeholder='Description' />
      </Form.Item>

      <Form.Item name='cover'>
        <Input disabled={loading} size='large' placeholder='Cover' />
      </Form.Item>

      <Form.Item
        name='user'
        rules={[
          {
            required: true,
            message: 'Please select user!',
          },
        ]}
      >
        <Select
          disabled={get_users_loading || loading}
          loading={get_users_loading}
          placeholder='Please select a user!'
          size='large'
        >
          {users_data &&
            users_data.users.map((item) => (
              <Option key={item._id} value={item._id}>
                {item.fullName}
              </Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item className={styles.buttons}>
        <Button loading={loading} size='large' type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default NewPostForm;
