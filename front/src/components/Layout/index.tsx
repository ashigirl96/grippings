import { FC } from 'react'
import { Box, Flex, Heading, Spacer } from '@chakra-ui/react'

export const Layout: FC = ({ children }) => {
  return (
    <Box m={10}>
      <Flex className="m-10">
        <Spacer />
        <Heading size="md">GRIPPING</Heading>
        <Spacer />
        <div>Hello</div>
      </Flex>
      <Box>{children}</Box>
    </Box>
  )
}
