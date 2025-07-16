import Link, { LinkProps } from "next/link";
import {
  Button,
  ButtonProps,
} from "@chakra-ui/react"

type LinkButtonProps = ButtonProps & LinkProps;

/**
 * Reusable component that combines NextJS link with ChakraUI's Button style.
 */
const LinkButton = (props: LinkButtonProps) => (<Button as={Link} {...props} />);

export default LinkButton
