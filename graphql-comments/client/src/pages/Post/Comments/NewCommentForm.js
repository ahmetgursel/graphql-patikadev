import { useRef } from 'react';
import { Button, Form, Input, Select, message } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS, NEW_COMMENT_MUTATION } from './queries';
import styles from './styles.module.css';

const { Option } = Select;

function NewCommentForm({ post_id }) {
  const { loading: get_users_loading, data: users_data } = useQuery(GET_USERS);
  const [createComment, { loading }] = useMutation(NEW_COMMENT_MUTATION);

  const formRef = useRef();

  const handleSubmit = async (values) => {
    try {
      await createComment({
        variables: {
          data: { ...values, post_id },
        },
      });

      message.success('Comment saved!', 4);
      formRef.current.resetFields();
    } catch (e) {
      console.log(e);
      message.error('Comment not saved!', 10);
    }
  };

  return (
    <Form name='basic' onFinish={handleSubmit} autoComplete='off' ref={formRef}>
      <Form.Item
        disabled={loading}
        name='user_id'
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
          size='medium'
        >
          {users_data &&
            users_data.users.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.fullName}
              </Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item
        disabled={loading}
        name='text'
        rules={[{ required: true, message: 'Please enter a message!' }]}
      >
        <Input size='medium' placeholder='Message' />
      </Form.Item>

      <Form.Item className={styles.buttons}>
        <Button
          disabled={loading}
          size='medium'
          type='primary'
          htmlType='submit'
        >
          Add
        </Button>
      </Form.Item>
    </Form>
  );
}

export default NewCommentForm;
