import { useEffect, useState } from 'react';
import { useSubscription, useMutation } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import { Container, Textarea, Center, Box, Flex, Button, Stack } from '@chakra-ui/react';
import { MESSAGE_SUBSCRIPTION, MESSAGE_MUTATION } from './queries';

const userId = uuidv4();

function App() {
  const [textMessage, setTextMessage] = useState([]);
  const [text, setText] = useState('');

  const { loading, data } = useSubscription(MESSAGE_SUBSCRIPTION);
  const [saveMessage] = useMutation(MESSAGE_MUTATION);

  useEffect(() => {
    if (!loading || data) {
      setTextMessage((prev) => [...prev, data.messageCreated]);
    }
  }, [data, loading]);

  const handleBtn = async () => {
    try {
      await saveMessage({
        variables: {
          data: {
            message: text,
            user: userId,
          },
        },
      });
      setText('');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Flex direction='column'>
      <Center>
        <Container
          maxW='2xl'
          bg='orange.100'
          color='black'
          borderRadius='md'
          height='xl'
          marginTop='10'
          overflow='auto'
        >
          <Flex direction='column'>
            {data &&
              textMessage.map((message, index) => (
                <Flex justify={message.user === userId ? 'flex-end' : 'flex-start'}>
                  <Box
                    p='5px'
                    color='black'
                    mt='4'
                    bg={message.user === userId ? 'teal.100' : 'blue.50'}
                    rounded='md'
                    shadow='md'
                    maxW='400px'
                  >
                    {message.message}
                  </Box>
                </Flex>
              ))}
          </Flex>
        </Container>
      </Center>
      <Center>
        <Container
          maxW='2xl'
          color='black'
          borderRadius='md'
          p='0'
          marginTop='10'
          marginBottom='10'
        >
          <Stack direction='column' spacing={4} align='flex-end'>
            <Textarea
              placeholder='Message..'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              loadingText='Sending'
              colorScheme='teal'
              variant='outline'
              spinnerPlacement='start'
              onClick={handleBtn}
            >
              Send Message
            </Button>
          </Stack>
        </Container>
      </Center>
    </Flex>
  );
}

export default App;
