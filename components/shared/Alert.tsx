
import { Alert as ChakraAlert } from '@chakra-ui/react';

interface AlertProps {
  children: React.ReactNode,
  status?: ChakraAlert.RootProps['status']
}

/**
 * Alert component for displaying messages with different statuses.
 */
const Alert = ({ children, status = "error" }: AlertProps) => {
  return (
    <ChakraAlert.Root role="alert" status={status} >
      <ChakraAlert.Indicator />
      <ChakraAlert.Title>
        {children}
      </ChakraAlert.Title>
    </ChakraAlert.Root>
  );
};

export default Alert;
